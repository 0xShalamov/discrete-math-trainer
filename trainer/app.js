"use strict";
(() => {
const DATA = window.DM_DATA || { blocks: [], defs: [] };
const BLOCKS = DATA.blocks || [];
const ALL = [];
BLOCKS.forEach(b => (b.questions || []).forEach(q => ALL.push(Object.assign({ b: b.id, btitle: b.title, btitle_en: b.title_en || b.title }, q))));
const QBY = {}; ALL.forEach(q => { QBY[q.n] = q; });
const TOTAL = ALL.length || 60;
const DEFS = [];
ALL.forEach(q => {
  const list = q.defs || [];
  const listEn = (q.defs_en && q.defs_en.length === list.length) ? q.defs_en : [];
  list.forEach((d, i) => { if (d) DEFS.push({ t: d, t_en: listEn[i] || null, n: q.n, b: q.b }); });
});
const CHEAT = {}; BLOCKS.forEach(b => { CHEAT[b.id] = b.cheat || []; });
const CHEAT_EN = {}; BLOCKS.forEach(b => { CHEAT_EN[b.id] = (b.cheat_en && b.cheat_en.length === (b.cheat || []).length) ? b.cheat_en : null; });

/* ---------- i18n ---------- */
let LANG = "ru";
try { LANG = localStorage.getItem("dm_trainer_lang") || "ru"; } catch (e) {}
function t(k, ...args) {
  const dict = (window.I18N && window.I18N[LANG]) || {};
  const fb = (window.I18N && window.I18N.ru) || {};
  let s = dict[k] !== undefined ? dict[k] : (fb[k] !== undefined ? fb[k] : k);
  args.forEach((a, i) => { s = s.split("{" + i + "}").join(String(a)); });
  return s;
}
function answersWord(n) {
  if (LANG === "en") return n === 1 ? t("answer1") : t("answer3");
  const a = Math.abs(n) % 100, b = a % 10;
  if (a > 10 && a < 20) return t("answer3");
  if (b === 1) return t("answer1");
  if (b >= 2 && b <= 4) return t("answer2");
  return t("answer3");
}
function qTitle(q) { return (LANG === "en" && q.title_en) ? q.title_en : q.title; }
function bName(b) { return (LANG === "en" && b.title_en) ? b.title_en : b.title; }
function bTitle(q) { return (LANG === "en" && q.btitle_en) ? q.btitle_en : q.btitle; }
function qDefs(q) { return (LANG === "en" && q.defs_en && q.defs_en.length === (q.defs || []).length) ? q.defs_en : (q.defs || []); }
function qSutie(q) { return (LANG === "en" && q.sutie_en) ? q.sutie_en : q.sutie; }
function qTheorems(q) { return (LANG === "en" && q.theorems_en) ? q.theorems_en : q.theorems; }
function qExample(q) { return (LANG === "en" && q.example_en) ? q.example_en : q.example; }
function qExam(q) { return (LANG === "en" && q.exam_en && q.exam_en.length === (q.exam || []).length) ? q.exam_en : (q.exam || []); }
function defText(d) { return (LANG === "en" && d.t_en) ? d.t_en : d.t; }
function cheatOf(bid) { const en = CHEAT_EN[bid]; return (LANG === "en" && en) ? en : (CHEAT[bid] || []); }

const KEY = "dm_trainer_v1";
const LANG_KEY = "dm_trainer_lang";
const STUDY_GATE = 0.7;
const fresh = () => ({ xp: 0, cards: {}, quiz: {}, sprintBest: 0, boss: {}, ach: {}, days: {}, quizTotal: 0, quizCorrect: 0, maxCombo: 0, study: {}, bossQ: {}, lastView: null });
let S = fresh();
try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign(fresh(), JSON.parse(raw)); } catch (e) {}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };

const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const esc = s => String(s == null ? "" : s).replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
const rnd = a => a[Math.floor(Math.random() * a.length)];
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
const nowMs = () => Date.now();
const fmtDate = d => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
const todayStr = () => fmtDate(new Date());

/* ---------- study gates ---------- */
function studiedCount(filter) { return ALL.filter(q => (!filter || q.b === filter) && S.study[q.n]).length; }
function blockGate(b) { return Math.ceil(STUDY_GATE * b.questions.length); }
function blockUnlocked(b) { return b.questions.length > 0 && studiedCount(b.id) >= blockGate(b); }
function allUnlocked() { return studiedCount() >= Math.ceil(STUDY_GATE * TOTAL); }
const STATUS = { nw: "st_nw", st: "st_st", rc: "st_rc", ln: "st_ln", ps: "st_ps" };
function qStatus(q) {
  if ((S.bossQ[q.n] || 0) >= 50) return "ps";
  const c = S.cards[q.n];
  if (c && c.box >= 5) return "ln";
  if (c && c.seen > 0) return "rc";
  if (S.study[q.n]) return "st";
  return "nw";
}
function nextStep() {
  const st = studiedCount();
  if (st < 8) return t("ns_1");
  const learned = ALL.filter(q => S.cards[q.n] && S.cards[q.n].box >= 5).length;
  if (learned < st) return t("ns_2");
  const unlocked = BLOCKS.filter(b => b.questions.length && blockUnlocked(b)).length;
  if (!unlocked) return t("ns_3");
  return t("ns_4");
}

/* ---------- markdown ---------- */
function protectMath(md) {
  const store = [];
  const tt = String(md || "").replace(/(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$)/g, m => { store.push(m); return "\u0001" + (store.length - 1) + "\u0001"; });
  return { t: tt, store };
}
function restoreMath(s, store) { return s.replace(/\u0001(\d+)\u0001/g, (_, i) => store[+i] || ""); }
function mdToHtml(md) {
  const { t: tt, store } = protectMath(md);
  const lines = tt.split(/\r?\n/);
  const out = []; let list = null; let para = [];
  const flushPara = () => { if (para.length) { out.push("<p>" + para.join(" ") + "</p>"); para = []; } };
  const flushList = () => { if (list) { out.push("<" + list.tag + ">" + list.items.map(i => "<li>" + i + "</li>").join("") + "</" + list.tag + ">"); list = null; } };
  const inline = s => {
    s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
    return s;
  };
  for (const raw of lines) {
    const line = esc(raw.trim());
    if (!line) { flushPara(); flushList(); continue; }
    let m;
    if ((m = line.match(/^(#{2,6})\s+(.*)$/))) { flushPara(); flushList(); out.push("<h" + m[1].length + ">" + m[2] + "</h" + m[1].length + ">"); continue; }
    if ((m = line.match(/^([-*\u2022]|\d+[.)])\s+(.*)$/))) {
      flushPara();
      const tag = /^[-*\u2022]/.test(m[1]) ? "ul" : "ol";
      if (!list || list.tag !== tag) { flushList(); list = { tag, items: [] }; }
      list.items.push(restoreMath(inline(m[2]), store));
      continue;
    }
    flushList();
    para.push(restoreMath(inline(line), store));
  }
  flushPara(); flushList();
  return out.join("");
}
function mathify(el) {
  if (!el || !window.renderMathInElement) return;
  try { window.renderMathInElement(el, { delimiters: [{ left: "$$", right: "$$", display: true }, { left: "$", right: "$", display: false }], throwOnError: false }); } catch (e) {}
}

/* ---------- levels / xp ---------- */
const LEVELS = [[0, "lvl0"], [120, "lvl1"], [320, "lvl2"], [650, "lvl3"], [1100, "lvl4"], [1700, "lvl5"], [2500, "lvl6"], [3500, "lvl7"], [4800, "lvl8"], [6500, "lvl9"]];
function levelIdx() { let i = 0; LEVELS.forEach((l, k) => { if (S.xp >= l[0]) i = k; }); return i; }
function addXP(n) {
  const before = levelIdx();
  S.xp += n; S.days[todayStr()] = 1;
  const after = levelIdx();
  if (after > before) toast(t("level_up", t(LEVELS[after][1])), true);
  save(); renderHeader();
}
function toast(html, gold) {
  const el = document.createElement("div");
  el.className = "toast" + (gold ? " gold" : "");
  el.innerHTML = html;
  $("#toasts").appendChild(el);
  setTimeout(() => { el.style.transition = "opacity .4s"; el.style.opacity = "0"; setTimeout(() => el.remove(), 420); }, gold ? 4200 : 2600);
}

/* ---------- achievements ---------- */
const ACH = [
  { id: "first", ok: () => cardSeen() >= 1 },
  { id: "study10", ok: () => studiedCount() >= 10 },
  { id: "study60", ok: () => studiedCount() >= TOTAL },
  { id: "firstboss", ok: () => BLOCKS.some(b => b.questions.length && blockUnlocked(b)) },
  { id: "cards10", ok: () => cardSeen() >= 10 },
  { id: "cards60", ok: () => cardSeen() >= TOTAL },
  { id: "firstblood", ok: () => S.quizCorrect >= 1 },
  { id: "combo10", ok: () => S.maxCombo >= 10 },
  { id: "quiz100", ok: () => S.quizTotal >= 100 },
  { id: "sprint40", ok: () => S.sprintBest >= 40 },
  { id: "boss1", ok: () => Object.keys(S.boss).length >= 1 },
  { id: "boss4", ok: () => bestBoss() >= 70 },
  { id: "boss5", ok: () => bestBoss() >= 85 },
  { id: "lvl4", ok: () => levelIdx() >= 4 },
  { id: "night", ok: () => new Date().getHours() < 5 },
];
function cardSeen() { return Object.values(S.cards).filter(c => c.seen > 0).length; }
function bestBoss() { let m = 0; Object.values(S.boss).forEach(x => { m = Math.max(m, x.best || 0); }); return m; }
function checkAch() {
  ACH.forEach(a => {
    if (!S.ach[a.id]) {
      let got = false;
      try { got = a.ok(); } catch (e) {}
      if (got) { S.ach[a.id] = true; toast(t("ach_unlock", t("ach_" + a.id), t("ach_" + a.id + "_d")), true); }
    }
  });
  save();
}

/* ---------- header / nav ---------- */
function renderHeader() {
  const i = levelIdx();
  $("#lvlname").textContent = t(LEVELS[i][1]);
  const next = LEVELS[i + 1];
  $("#lvlxp").textContent = next ? t("xp_ratio", S.xp, next[0]) : t("xp_max", S.xp);
  const base = LEVELS[i][0], top = next ? next[0] : (S.xp || 1);
  $("#xpbar").style.width = Math.min(100, Math.round(100 * (S.xp - base) / Math.max(1, (top - base)))) + "%";
  const learned = ALL.filter(q => S.cards[q.n] && S.cards[q.n].box >= 5).length;
  $("#hint").innerHTML = t("hint_theory", studiedCount(), TOTAL) + "<br>" + t("hint_cards", learned, TOTAL) + "<br>" + t("hint_quiz", quizAcc());
  let st = 0; const d = new Date();
  for (;;) { if (S.days[fmtDate(d)]) { st++; d.setDate(d.getDate() - 1); } else break; }
  $("#streak").textContent = st > 0 ? t("streak", st) : "";
}
function quizAcc() { return S.quizTotal ? Math.round(100 * S.quizCorrect / S.quizTotal) : 0; }
const TITLE_KEYS = { study: "title_study", cards: "title_cards", quiz: "title_quiz", sprint: "title_sprint", boss: "title_boss", prog: "title_prog" };
let curView = "study";
function go(v) {
  curView = v;
  S.lastView = v; save();
  $$("#nav button").forEach(b => b.classList.toggle("active", b.dataset.v === v));
  $("#title").textContent = t(TITLE_KEYS[v]);
  ({ study: renderStudy, cards: renderCards, quiz: renderQuiz, sprint: renderSprint, boss: renderBoss, prog: renderProg })[v]();
}
function langActive() {
  $$("#lang button").forEach(b => b.classList.toggle("active", b.dataset.lang === LANG));
}
function applyNavLabels() {
  $$("#nav button").forEach(b => { b.textContent = t("nav_" + b.dataset.v); });
}
function setLang(l) {
  LANG = l;
  try { localStorage.setItem(LANG_KEY, l); } catch (e) {}
  document.documentElement.lang = l;
  document.title = t("app_title");
  langActive();
  applyNavLabels();
  renderHeader();
  go(curView);
}

/* ---------- study ---------- */
const study = { qn: null };
function renderStudy() {
  study.qn = null;
  const v = $("#view");
  const tot = studiedCount();
  let html = "<div class='card'><div class='quizhead'><span class='muted mono'>" + t("theory_studied", tot, TOTAL) + "</span><span class='muted mono'>" + t("phase_prep") + "</span></div>" +
    "<div class='bar'><div style='width:" + Math.round(100 * tot / TOTAL) + "%'></div></div>" +
    "<div class='muted' style='margin-top:10px'>" + t("study_intro", Math.round(STUDY_GATE * 100)) + "</div>" +
    "<div class='muted' style='margin-top:8px'><b>" + t("next_step_label") + "</b> " + nextStep() + "</div></div>";
  BLOCKS.filter(b => b.questions.length).forEach(b => {
    const st = studiedCount(b.id);
    const open = blockUnlocked(b);
    html += "<div class='blockrow'><div class='r1'><span>" + t("block") + " " + b.id + ". " + esc(bName(b)) + "</span><span class='rv'>" + t("studied_of", st, b.questions.length) + (open ? t("boss_open_suffix") : t("boss_need_suffix", blockGate(b))) + "</span></div>" +
      "<div class='bar sm'><div style='width:" + Math.round(100 * st / b.questions.length) + "%'></div></div>" +
      "<div style='margin-top:10px'>" +
      b.questions.map(q => { const s = qStatus(q); const qt = qTitle(q); return "<button class='qchip " + s + "' data-qopen='" + q.n + "'><b>" + q.n + "</b> " + esc(qt.length > 54 ? qt.slice(0, 51) + "..." : qt) + "<i>" + t(STATUS[s]) + "</i></button>"; }).join("") +
      "</div></div>";
  });
  v.innerHTML = html;
}
function renderStudyQ(n) {
  const q = QBY[n];
  if (!q) { go("study"); return; }
  study.qn = n;
  const v = $("#view");
  const idx = ALL.indexOf(q);
  const nextQ = idx + 1 < ALL.length ? ALL[idx + 1] : null;
  let html = "<div class='quizhead'><button class='btn' data-sback='1'>" + t("back_to_list") + "</button><span class='muted mono'>" + t("status_word", t(STATUS[qStatus(q)])) + "</span></div>" +
    "<div class='card' id='studycard'><span class='tag'>" + t("block") + " " + q.b + ": " + esc(bTitle(q)) + "</span><h2 class='qt'>" + t("question_prefix") + " " + q.n + ". " + esc(qTitle(q)) + "</h2><div class='md'>" + fullAnswer(q) + "</div></div>" +
    "<div class='btnrow'>" +
    (S.study[n] ? "" : "<button class='btn primary' id='smark'>" + t("mark_studied") + "</button>") +
    (nextQ ? "<button class='btn' data-snext='1'>" + t("next_question") + "</button>" : "<button class='btn' data-sback='1'>" + t("to_end_list") + "</button>") +
    "</div>";
  v.innerHTML = html;
  mathify($("#studycard"));
}

/* ---------- question answer builder ---------- */
function fullAnswer(q) {
  let md = "";
  if (qSutie(q)) md += "**" + t("sec_sutie") + "** " + qSutie(q) + "\n\n";
  const defs = qDefs(q);
  if (defs.length) md += "**" + t("sec_defs") + "**\n" + defs.map(d => "- " + d).join("\n") + "\n\n";
  if (qTheorems(q)) md += "**" + t("sec_theorems") + "**\n" + qTheorems(q) + "\n\n";
  if (qExample(q)) md += "**" + t("sec_example") + "**\n" + qExample(q) + "\n\n";
  const ex = qExam(q);
  if (ex.length) md += "**" + t("sec_exam") + "**\n" + ex.map(e => "- " + e).join("\n");
  return mdToHtml(md);
}
function openModal(html) { $("#mbox").innerHTML = html + "<div class='btnrow'><button class='btn' data-close='1'>" + t("close") + "</button></div>"; $("#modal").classList.add("open"); mathify($("#mbox")); }
function closeModal() { $("#modal").classList.remove("open"); }

/* ---------- cards ---------- */
const BOX_MS = [60e3, 5 * 60e3, 15 * 60e3, 60 * 60e3, 4 * 3600e3, 24 * 3600e3];
const fc = { queue: [], cur: null, revealed: false, filter: 0 };
function learnedCount(filter) { return ALL.filter(q => (!filter || q.b === filter) && S.cards[q.n] && S.cards[q.n].box >= 5).length; }
function studyPool(filter) { return ALL.filter(q => (!filter || q.b === filter) && S.study[q.n]); }
function cardBack(q) {
  let md = "";
  if (qSutie(q)) md += qSutie(q) + "\n\n";
  const defs = qDefs(q).slice(0, 4);
  if (defs.length) md += "**" + t("sec_defs") + "**\n" + defs.map(d => "- " + d).join("\n") + "\n\n";
  const ch = cheatOf(q.b).slice(0, 5);
  if (ch.length) md += "**" + t("sec_cheat") + "**\n" + ch.map(c => "- " + c).join("\n");
  return mdToHtml(md);
}
function renderCards() {
  const v = $("#view");
  const pool = studyPool(fc.filter);
  const now = nowMs();
  const due = pool.filter(q => { const c = S.cards[q.n]; return !c || c.seen === 0 || (c.due || 0) <= now; });
  if (!fc.cur) {
    if (!fc.queue.length && due.length) fc.queue = shuffle(due.map(q => q.n));
    if (fc.queue.length) { fc.cur = QBY[fc.queue.shift()]; fc.revealed = false; }
  }
  const opts = ["<option value='0'>" + t("all_blocks") + "</option>"].concat(BLOCKS.filter(b => b.questions.length).map(b => "<option value='" + b.id + "'" + (fc.filter === b.id ? " selected" : "") + ">" + t("block") + " " + b.id + ". " + esc(bName(b)) + "</option>")).join("");
  let html = "<div class='quizhead'><div class='muted mono'>" + t("in_queue", fc.queue.length) + " · " + t("learned_short", learnedCount(fc.filter), pool.length) + "</div><select id='csel' class='btn'>" + opts + "</select></div>";
  if (!fc.cur) {
    if (!studiedCount(fc.filter)) {
      html += "<div class='card bigcenter'><h2 class='qt'>" + t("prep_gate_title") + "</h2><div class='muted'>" + t("prep_gate_text") + "</div><div class='btnrow' style='justify-content:center'><button class='btn primary' data-sgo='1'>" + t("go_study") + "</button></div></div>";
      v.innerHTML = html; return;
    }
    html += "<div class='card bigcenter'><h2 class='qt'>" + t("all_done_title") + "</h2><div class='muted'>" + t("all_done_text") + "</div><div class='btnrow' style='justify-content:center'><button class='btn primary' id='crestack'>" + t("review_again") + "</button></div></div>";
    v.innerHTML = html; return;
  }
  const q = fc.cur;
  html += "<div class='card flashbig' id='fcard'><span class='tag'>" + t("block") + " " + q.b + ": " + esc(bTitle(q)) + "</span><h2 class='qt'>" + t("question_prefix") + " " + q.n + ". " + esc(qTitle(q)) + "</h2>";
  if (!fc.revealed) {
    html += "<div class='muted'>" + t("say_aloud") + "</div><div class='btnrow'><button class='btn primary' id='reveal'>" + t("show_answer") + "</button><button class='btn cfull'>" + t("full_question") + "</button></div>";
  } else {
    html += "<div class='flashans md'>" + cardBack(q) + "</div><div class='btnrow'>" +
      "<button class='btn' data-g='0'>" + t("g0") + "</button>" +
      "<button class='btn' data-g='1'>" + t("g1") + "</button>" +
      "<button class='btn' data-g='2'>" + t("g2") + "</button>" +
      "<button class='btn cfull'>" + t("full_question") + "</button></div>";
  }
  html += "</div>";
  v.innerHTML = html;
  mathify($("#fcard"));
}
function gradeCard(g) {
  const q = fc.cur; if (!q) return;
  const c = S.cards[q.n] = S.cards[q.n] || { box: 0, due: 0, seen: 0 };
  if (g === 0) { c.box = 0; addXP(2); fc.queue.push(q.n); }
  else if (g === 1) { addXP(5); fc.queue.push(q.n); }
  else { c.box = Math.min(6, (c.box || 0) + 1); addXP(12); if (c.box < 5) fc.queue.push(q.n); }
  c.seen = (c.seen || 0) + 1;
  c.due = nowMs() + BOX_MS[Math.min(c.box, BOX_MS.length - 1)];
  fc.cur = null; fc.revealed = false;
  save(); checkAch(); renderCards(); renderHeader();
}

/* ---------- quiz ---------- */
const qz = { item: null, answered: false, combo: 0, score: 0, t0: 0, timer: null };
function makeQuizItem() {
  const stDefs = DEFS.filter(d => S.study[d.n]);
  if (stDefs.length < 8) return null;
  if (Math.random() < 0.55) {
    const d = rnd(stDefs); const q = QBY[d.n];
    const others = shuffle(ALL.filter(x => x.n !== q.n)).slice(0, 3);
    const opts = shuffle([{ t: qTitle(q), ok: true }].concat(others.map(o => ({ t: qTitle(o), ok: false }))));
    return { prompt: defText(d), label: t("whose_def"), opts, qn: q.n };
  } else {
    const cands = ALL.filter(q => q.defs && q.defs.length && S.study[q.n]);
    if (!cands.length) return null;
    const q = rnd(cands); const dd = qDefs(q); if (!dd.length) return null;
    const d = rnd(dd);
    const others = shuffle(DEFS.filter(x => x.n !== q.n)).slice(0, 3).map(x => ({ t: defText(x), ok: false }));
    const opts = shuffle([{ t: d, ok: true }].concat(others));
    return { prompt: t("question_prefix") + " " + q.n + ". " + qTitle(q), label: t("pick_def"), opts, qn: q.n };
  }
}
function renderQuiz() {
  const v = $("#view");
  if (!qz.item) qz.item = makeQuizItem();
  if (!qz.item) {
    v.innerHTML = "<div class='card bigcenter'><h2 class='qt'>" + t("quiz_locked_title") + "</h2><div class='muted'>" + t("quiz_locked_text", studiedCount(), TOTAL) + "</div><div class='btnrow' style='justify-content:center'><button class='btn primary' data-sgo='1'>" + t("go_study") + "</button></div></div>";
    return;
  }
  const it = qz.item;
  const html = "<div class='card' id='qcard'>" +
    "<div class='quizhead'><span class='muted mono'>" + t("correct_word") + ": " + S.quizCorrect + " / " + S.quizTotal + " (" + quizAcc() + "%)</span><span class='combo'>" + t("combo_word") + ": " + qz.combo + (qz.combo >= 5 ? t("streak_suffix") : "") + "</span><span class='muted mono'>" + t("score_word") + ": " + qz.score + "</span></div>" +
    "<div class='timerwrap'><div class='timerfill' id='tfill'></div></div>" +
    "<span class='tag'>" + esc(it.label) + "</span>" +
    "<div class='md' style='font-size:15px'>" + mdToHtml(it.prompt) + "</div>" +
    "<div id='qopts'>" + it.opts.map((o, i) => "<button class='opt' data-i='" + i + "'>" + (i + 1) + ") <span class='md'>" + mdToHtml(o.t) + "</span></button>").join("") + "</div>" +
    "</div>";
  v.innerHTML = html;
  mathify($("#qcard"));
  qz.answered = false;
  const Q_TIME = 15000; qz.t0 = nowMs();
  clearInterval(qz.timer);
  qz.timer = setInterval(() => {
    const left = Q_TIME - (nowMs() - qz.t0);
    const f = $("#tfill"); if (!f) { clearInterval(qz.timer); return; }
    f.style.width = Math.max(0, Math.round(100 * left / Q_TIME)) + "%";
    if (left <= 0) { clearInterval(qz.timer); if (curView === "quiz") answerQuiz(-1); else qz.item = null; }
  }, 100);
}
function answerQuiz(i) {
  if (qz.answered) return;
  qz.answered = true; clearInterval(qz.timer);
  const it = qz.item;
  const btns = $$("#qopts .opt");
  let correct = false;
  btns.forEach((b, k) => {
    b.disabled = true;
    if (it.opts[k].ok) b.classList.add("correct");
    if (k === i && !it.opts[k].ok) b.classList.add("wrong");
  });
  if (i >= 0 && it.opts[i] && it.opts[i].ok) {
    correct = true;
    qz.combo++; qz.score += 10;
    S.quizCorrect++; S.quizTotal++;
    S.maxCombo = Math.max(S.maxCombo, qz.combo);
    addXP(qz.combo % 5 === 0 ? 25 : 10);
    if (qz.combo % 5 === 0) toast(t("combo_toast", qz.combo));
  } else {
    qz.combo = 0; S.quizTotal++;
    addXP(2);
  }
  const qs = S.quiz[it.qn] = S.quiz[it.qn] || { c: 0, w: 0 };
  if (correct) qs.c++; else qs.w++;
  save(); checkAch(); renderHeader();
  setTimeout(() => {
    if (curView !== "quiz") { qz.item = null; return; }
    qz.item = makeQuizItem(); renderQuiz();
  }, correct ? 700 : 1700);
}

/* ---------- sprint ---------- */
const sp = { active: false, endAt: 0, score: 0, combo: 0, item: null, tickId: null, lock: false };
function makeSprintItem() {
  const stDefs = DEFS.filter(d => S.study[d.n]);
  if (stDefs.length < 4) return null;
  const d = rnd(stDefs); const q = QBY[d.n];
  if (Math.random() < 0.5) return { title: qTitle(q), n: q.n, text: defText(d), ok: true };
  const pool = ALL.filter(x => x.n !== q.n);
  const other = rnd(pool);
  return { title: qTitle(other), n: q.n, text: defText(d), ok: false };
}
function renderSprint() {
  const v = $("#view");
  if (!sp.active) {
    if (DEFS.filter(d => S.study[d.n]).length < 4) {
      v.innerHTML = "<div class='card bigcenter'><h2 class='qt'>" + t("sprint_locked_title") + "</h2><div class='muted'>" + t("sprint_locked_text") + "</div><div class='btnrow' style='justify-content:center'><button class='btn primary' data-sgo='1'>" + t("go_study") + "</button></div></div>";
      return;
    }
    v.innerHTML = "<div class='card'><h2 class='qt'>" + t("title_sprint") + "</h2>" +
      "<div class='md'>" + t("sprint_intro") + "</div>" +
      "<div class='muted'>" + t("sprint_best", S.sprintBest) + "</div>" +
      "<div class='btnrow'><button class='btn primary' id='sstart'>" + t("start") + "</button></div></div>";
    return;
  }
  if (!sp.item) sp.item = makeSprintItem();
  const it = sp.item;
  if (!it) { sp.active = false; renderSprint(); return; }
  const left = Math.max(0, Math.ceil((sp.endAt - nowMs()) / 1000));
  v.innerHTML = "<div class='card' id='scard'><div class='quizhead'><span class='mono muted'>" + t("time_left", left) + "</span><span class='combo'>" + t("score_combo", sp.score, sp.combo) + "</span><span class='mono muted'>" + t("sprint_best", S.sprintBest) + "</span></div>" +
    "<span class='tag'>" + t("question_prefix") + " " + it.n + ": " + esc(it.title) + "</span>" +
    "<div class='md' style='font-size:15px'>" + mdToHtml(it.text) + "</div>" +
    "<div class='btnrow'><button class='btn' data-sp='1'>" + t("sprint_true") + "</button><button class='btn' data-sp='0'>" + t("sprint_false") + "</button></div></div>";
  mathify($("#scard"));
}
function startSprint() {
  if (DEFS.filter(d => S.study[d.n]).length < 4) { go("study"); return; }
  sp.active = true; sp.endAt = nowMs() + 45000; sp.score = 0; sp.combo = 0; sp.item = makeSprintItem();
  clearInterval(sp.tickId);
  sp.tickId = setInterval(() => {
    if (!sp.active) { clearInterval(sp.tickId); return; }
    const left = Math.max(0, Math.ceil((sp.endAt - nowMs()) / 1000));
    if (!document.querySelector("#scard")) { sp.active = false; clearInterval(sp.tickId); return; }
    const heads = document.querySelectorAll("#scard .quizhead span");
    if (heads[0]) heads[0].textContent = t("time_left", left);
    if (nowMs() >= sp.endAt) finishSprint();
  }, 250);
  renderSprint();
}
function answerSprint(sayTrue) {
  if (!sp.active || sp.lock) return;
  sp.lock = true; setTimeout(() => { sp.lock = false; }, 160);
  const it = sp.item; if (!it) return;
  const ok = (sayTrue === it.ok);
  if (ok) { sp.score += 2; sp.combo++; toast(t("plus2")); } else { sp.combo = 0; toast(t(it.ok ? "miss_right" : "miss_wrong")); }
  sp.item = makeSprintItem();
  renderSprint();
}
function finishSprint() {
  sp.active = false; clearInterval(sp.tickId);
  if (sp.score > S.sprintBest) S.sprintBest = sp.score;
  addXP(sp.score + (sp.combo >= 5 ? 10 : 0));
  toast(t("sprint_done", sp.score), true);
  save(); checkAch(); renderHeader(); renderSprint();
}

/* ---------- boss ---------- */
const bs = { block: null, list: [], idx: 0, scores: [], revealed: false };
function renderBoss() {
  const v = $("#view");
  if (bs.block === null) {
    let html = "<div class='card'><h2 class='qt'>" + t("title_boss") + "</h2><div class='muted'>" + t("boss_intro", Math.round(STUDY_GATE * 100)) + "</div><div class='btnrow'>";
    if (allUnlocked()) html += "<button class='btn primary' data-bblk='0'>" + t("all_blocks_12") + (S.boss[0] ? " · " + t("best_short", S.boss[0].best) : "") + "</button>";
    else html += "<button class='btn' disabled>" + t("all_locked", studiedCount(), Math.ceil(STUDY_GATE * TOTAL)) + "</button>";
    BLOCKS.filter(b => b.questions.length).forEach(b => {
      const rec = S.boss[b.id];
      if (blockUnlocked(b)) {
        html += "<button class='btn' data-bblk='" + b.id + "'>" + t("block") + " " + b.id + ". " + esc(bName(b)) + " (" + b.questions.length + " " + t("q_short") + (rec ? ", " + t("best_short", rec.best) : "") + ")</button>";
      } else {
        html += "<button class='btn' disabled>" + t("block_locked", t("block"), b.id, studiedCount(b.id), blockGate(b)) + "</button>";
      }
    });
    html += "</div></div>";
    v.innerHTML = html; return;
  }
  if (bs.idx >= bs.list.length) {
    const avg = Math.round(bs.scores.reduce((a, b) => a + b, 0) / bs.list.length);
    const mark = avg >= 85 ? "5" : avg >= 70 ? "4" : avg >= 50 ? "3" : "2";
    const old = S.boss[bs.block] || { best: 0, runs: 0 };
    S.boss[bs.block] = { best: Math.max(old.best, avg), runs: old.runs + 1, last: avg };
    const xp = Math.round(avg * bs.list.length / 2);
    addXP(xp);
    save(); checkAch(); renderHeader();
    v.innerHTML = "<div class='card bigcenter'><h2 class='qt'>" + t("result_word", avg, mark) + "</h2><div class='muted'>" + t("xp_awarded", xp) + (avg > old.best ? t("new_record") : "") + "</div><div class='btnrow' style='justify-content:center'><button class='btn' data-bblk='reset'>" + t("to_blocks") + "</button><button class='btn primary' data-bblk='" + bs.block + "'>" + t("retry") + "</button></div></div>";
    return;
  }
  const q = bs.list[bs.idx];
  let html = "<div class='quizhead'><span class='mono muted'>" + t("question_of", bs.idx + 1, bs.list.length) + "</span><button class='btn' data-bblk='reset'>" + t("exit") + "</button></div><div class='card' id='bossq'><span class='tag'>" + t("block") + " " + q.b + ": " + esc(bTitle(q)) + "</span><h2 class='qt'>" + t("question_prefix") + " " + q.n + ". " + esc(qTitle(q)) + "</h2>";
  if (!bs.revealed) html += "<div class='muted'>" + t("boss_answer_hint") + "</div><div class='btnrow'><button class='btn primary' id='breveal'>" + t("reveal_model") + "</button></div>";
  else html += "<div class='flashans md'>" + fullAnswer(q) + "</div><div class='btnrow'><button class='btn' data-bg='0'>" + t("bg0") + "</button><button class='btn' data-bg='50'>" + t("bg50") + "</button><button class='btn' data-bg='100'>" + t("bg100") + "</button></div>";
  html += "</div>";
  v.innerHTML = html;
  mathify($("#bossq"));
}
function startBoss(block) {
  bs.block = block; bs.scores = []; bs.idx = 0; bs.revealed = false;
  if (block === 0) bs.list = shuffle(ALL).slice(0, 12);
  else bs.list = shuffle(ALL.filter(q => q.b === block));
  renderBoss();
}

/* ---------- progress ---------- */
function renderProg() {
  const v = $("#view");
  const learned = ALL.filter(q => S.cards[q.n] && S.cards[q.n].box >= 5).length;
  const seen = cardSeen();
  let html = "<div class='stats'>" +
    "<div class='stat'><b>" + t(LEVELS[levelIdx()][1]) + "</b><span>" + t("level_word", S.xp) + "</span></div>" +
    "<div class='stat'><b>" + studiedCount() + "/" + TOTAL + "</b><span>" + t("theory_done") + "</span></div>" +
    "<div class='stat'><b>" + quizAcc() + "%</b><span>" + t("quiz_acc", S.quizTotal, answersWord(S.quizTotal)) + "</span></div>" +
    "<div class='stat'><b>" + S.sprintBest + "</b><span>" + t("sprint_best_stat") + "</span></div>" +
    "<div class='stat'><b>" + learned + "/" + TOTAL + "</b><span>" + t("cards_learned") + "</span></div>" +
    "<div class='stat'><b>" + seen + "/" + TOTAL + "</b><span>" + t("questions_opened") + "</span></div>" +
    "<div class='stat'><b>" + Object.keys(S.boss).length + "/10</b><span>" + t("bosses_cleared") + "</span></div>" +
    "</div><div class='card'><h2 class='qt'>" + t("by_block") + "</h2>";
  BLOCKS.forEach(b => {
    const qs = b.questions; if (!qs.length) { html += "<div class='blockrow'><div class='r1'><span>" + t("block") + " " + b.id + ". " + esc(bName(b)) + "</span><span class='rv'>" + t("no_data") + "</span></div></div>"; return; }
    const lrn = qs.filter(q => S.cards[q.n] && S.cards[q.n].box >= 5).length;
    const st = studiedCount(b.id);
    let c = 0, w = 0;
    qs.forEach(q => { const x = S.quiz[q.n]; if (x) { c += x.c; w += x.w; } });
    const acc = (c + w) ? Math.round(100 * c / (c + w)) : 0;
    const rec = S.boss[b.id] ? (S.boss[b.id].best + "%") : t("no_data");
    html += "<div class='blockrow'><div class='r1'><span>" + t("block") + " " + b.id + ". " + esc(bName(b)) + "</span><span class='rv'>" + t("block_stat", st, qs.length, lrn, qs.length, acc, rec) + "</span></div><div class='bar sm'><div style='width:" + Math.round(100 * st / qs.length) + "%'></div></div></div>";
  });
  html += "</div><div class='card'><h2 class='qt'>" + t("achievements") + "</h2><div class='achgrid'>";
  ACH.forEach(a => { html += "<div class='achtile" + (S.ach[a.id] ? " got" : "") + "'><b>" + (S.ach[a.id] ? t("got_prefix") : t("locked_prefix")) + t("ach_" + a.id) + "</b><span>" + t("ach_" + a.id + "_d") + "</span></div>"; });
  html += "</div></div><div class='card'><button class='btn' id='reset'>" + t("reset_progress") + "</button></div>";
  v.innerHTML = html;
}

/* ---------- events ---------- */
function bind() {
  $("#nav").addEventListener("click", e => { const b = e.target.closest("button[data-v]"); if (b) go(b.dataset.v); });
  $("#lang").addEventListener("click", e => { const b = e.target.closest("button[data-lang]"); if (b) setLang(b.dataset.lang); });
  $("#view").addEventListener("change", e => {
    if (e.target.id === "csel") { fc.filter = +e.target.value; fc.cur = null; fc.queue = []; renderCards(); }
  });
  $("#view").addEventListener("click", e => {
    const el = e.target.closest("button");
    if (!el) return;
    if (el.dataset.sgo !== undefined) { go("study"); return; }
    if (el.dataset.qopen !== undefined) { renderStudyQ(+el.dataset.qopen); return; }
    if (el.id === "smark" && study.qn) {
      if (!S.study[study.qn]) {
        S.study[study.qn] = { ts: nowMs() };
        addXP(8); save(); checkAch();
        const bb = BLOCKS.find(b => b.id === QBY[study.qn].b);
        if (bb && blockUnlocked(bb)) toast(t("boss_unlock_toast", bb.id), true);
      }
      renderStudyQ(study.qn);
      return;
    }
    if (el.dataset.sback !== undefined) { go("study"); return; }
    if (el.dataset.snext !== undefined && study.qn) {
      const q = QBY[study.qn]; const idx = ALL.indexOf(q);
      if (idx + 1 < ALL.length) renderStudyQ(ALL[idx + 1].n); else go("study");
      return;
    }
    if (el.id === "reveal") { fc.revealed = true; renderCards(); return; }
    if (el.classList.contains("cfull") && fc.cur) {
      openModal("<h2 class='qt'>" + t("question_prefix") + " " + fc.cur.n + ". " + esc(qTitle(fc.cur)) + "</h2>" + fullAnswer(fc.cur));
      return;
    }
    if (el.dataset.g !== undefined) { gradeCard(+el.dataset.g); return; }
    if (el.id === "crestack") { fc.queue = shuffle(studyPool(fc.filter).map(q => q.n)); renderCards(); return; }
    if (el.dataset.i !== undefined && $("#qopts")) { answerQuiz(+el.dataset.i); return; }
    if (el.id === "sstart") { startSprint(); return; }
    if (el.dataset.sp !== undefined) { answerSprint(el.dataset.sp === "1"); return; }
    if (el.dataset.bblk !== undefined) {
      const x = el.dataset.bblk;
      if (x === "reset") { bs.block = null; renderBoss(); }
      else startBoss(+x);
      return;
    }
    if (el.id === "breveal") { bs.revealed = true; renderBoss(); return; }
    if (el.dataset.bg !== undefined) {
      const qq = bs.list[bs.idx];
      if (qq) S.bossQ[qq.n] = Math.max(S.bossQ[qq.n] || 0, +el.dataset.bg);
      bs.scores.push(+el.dataset.bg); bs.idx++; bs.revealed = false; save(); renderBoss();
      return;
    }
    if (el.id === "reset") {
      if (confirm(t("reset_confirm"))) { S = fresh(); save(); renderHeader(); go("study"); }
      return;
    }
    if (el.dataset.close) { closeModal(); return; }
  });
  $("#modal").addEventListener("click", e => { if (e.target.id === "modal" || e.target.dataset.close) closeModal(); });
  document.addEventListener("keydown", e => {
    if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "SELECT")) return;
    if (curView === "cards" && fc.cur) {
      if (e.code === "Space" && !fc.revealed) { e.preventDefault(); fc.revealed = true; renderCards(); return; }
      if (fc.revealed && ["Digit1", "Digit2", "Digit3"].includes(e.code)) { gradeCard(+e.code.slice(-1) - 1); return; }
    }
    if (curView === "quiz" && !qz.answered && $("#qopts")) {
      if (["Digit1", "Digit2", "Digit3", "Digit4"].includes(e.code)) answerQuiz(+e.code.slice(-1) - 1);
    }
    if (curView === "sprint" && sp.active) {
      if (e.code === "ArrowRight") answerSprint(true);
      if (e.code === "ArrowLeft") answerSprint(false);
    }
  });
}

/* ---------- init ---------- */
function init() {
  S.days[todayStr()] = 1; save();
  document.documentElement.lang = LANG;
  document.title = t("app_title");
  bind(); langActive(); applyNavLabels(); renderHeader(); checkAch(); go(S.lastView || "study");
}
init();
})();
