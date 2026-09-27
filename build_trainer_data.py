import io, os, re, json, datetime

BASE = r"C:/Users/RobotComp/Projects/discrete-math-exam"
BLOCK_FILES = [
    ("01-chisla-i-rsa.md", "Числа и RSA"),
    ("02-gruppy.md", "Группы"),
    ("03-mnozhestva-i-otnosheniya.md", "Множества и отношения"),
    ("04-bulevy-funkcii-1.md", "Булевы функции и Пост"),
    ("05-minimizaciya-dnf.md", "Минимизация ДНФ"),
    ("06-kombinatorika.md", "Комбинаторика"),
    ("07-grafy-osnovy.md", "Графы: основы"),
    ("08-potoki-i-algoritmy.md", "Потоки и алгоритмы"),
    ("09-eiler-gamilton-planarnost.md", "Эйлер, Гамильтон, планарность"),
]

def sanitize(t):
    t = t.replace(" \u2014 ", ", ").replace("\u2014", ",").replace(" \u2013 ", ", ").replace("\u2013", "-")
    t = t.replace(" ,", ",")
    return t

LABEL_RULES = [
    ("sutie", lambda l: l.startswith("суть") or l.startswith("in plain words")),
    ("defs", lambda l: l.startswith("определ") or l.startswith("definition")),
    ("theorems", lambda l: l.startswith("теоремы") or l.startswith("теорема") or l == "формулы" or l.startswith("theorem") or l == "formulas"),
    ("example", lambda l: l.startswith("пример") or l.startswith("example")),
    ("exam", lambda l: ("спросит" in l) or ("examiner" in l)),
]

def split_sections(text):
    marks = list(re.finditer(r"\*\*([^*]+?)\*\*\s*:?", text))
    found = []
    for m in marks:
        line_start = text.rfind("\n", 0, m.start()) + 1
        prefix = text[line_start:m.start()]
        if not re.fullmatch(r"[\s>*\u2022-]*", prefix):
            continue
        label = m.group(1).strip().lower()
        for key, rule in LABEL_RULES:
            if rule(label):
                found.append((m.start(), key, m.end()))
                break
    firsts = {}
    for pos, key, end in found:
        if key not in firsts:
            firsts[key] = (pos, end)
    order = sorted(firsts.items(), key=lambda kv: kv[1][0])
    sections = {}
    for i, (key, (pos, end)) in enumerate(order):
        nxt = order[i + 1][1][0] if i + 1 < len(order) else len(text)
        sections[key] = text[end:nxt].strip()
    return sections

def bullet_items(text):
    items, cur = [], None
    for line in text.split("\n"):
        s = line.strip()
        if not s:
            continue
        m = re.match(r"^([-*\u2022]|\d+[.)])\s+(.*)$", s)
        if m:
            if cur:
                items.append(cur.strip())
            cur = m.group(2).strip()
        else:
            cur = (cur + " " + s) if cur else s
    if cur:
        items.append(cur.strip())
    return [i for i in items if i]

def parse_block(path):
    if not os.path.exists(path):
        return None, [], []
    t = sanitize(io.open(path, encoding="utf-8").read())
    mtitle = re.search(r"^#\s+(.+)$", t, re.M)
    title = mtitle.group(1).strip() if mtitle else ""
    title = re.sub(r"^(Блок|Block)\s+\d+[.:]?\s*", "", title)
    chunks = re.split(r"(?m)^##\s+", t)
    cheat, questions = [], []
    for ch in chunks[1:]:
        head, _, body = ch.partition("\n")
        head = head.strip()
        mq = re.match(r"(?:Вопрос|Question)\s+(\d+)[.:]?\s*(.*)", head)
        if mq:
            n = int(mq.group(1))
            qtitle = mq.group(2).strip().rstrip(".")
            secs = split_sections(body)
            questions.append({
                "n": n, "title": qtitle,
                "sutie": secs.get("sutie", "").strip(),
                "defs": bullet_items(secs.get("defs", "")),
                "theorems": secs.get("theorems", "").strip(),
                "example": secs.get("example", "").strip(),
                "exam": bullet_items(secs.get("exam", "")),
            })
        elif ("шпаргал" in head.lower()) or ("cheat" in head.lower()):
            cheat = bullet_items(body)
    questions.sort(key=lambda q: q["n"])
    return title, cheat, questions

blocks = []
for idx, (fname, label) in enumerate(BLOCK_FILES, 1):
    ru_title, ru_cheat, ru_qs = parse_block(os.path.join(BASE, "blocks", fname))
    if ru_title is None:
        blocks.append({"id": idx, "title": label, "questions": [], "cheat": []})
        print(f"block {idx}: MISSING {fname}")
        continue
    en_title, en_cheat, en_qs = parse_block(os.path.join(BASE, "blocks-en", fname))
    en_by_n = {q["n"]: q for q in en_qs}
    warns = []
    merged = 0
    for q in ru_qs:
        e = en_by_n.get(q["n"])
        if not e:
            continue
        q["title_en"] = e["title"] or None
        q["sutie_en"] = e["sutie"] or None
        if e["defs"] and len(e["defs"]) == len(q["defs"]):
            q["defs_en"] = e["defs"]
        elif e["defs"]:
            warns.append(f"q{q['n']}: defs {len(q['defs'])} vs {len(e['defs'])}")
        q["theorems_en"] = e["theorems"] or None
        q["example_en"] = e["example"] or None
        if e["exam"] and len(e["exam"]) == len(q["exam"]):
            q["exam_en"] = e["exam"]
        elif e["exam"]:
            warns.append(f"q{q['n']}: exam {len(q['exam'])} vs {len(e['exam'])}")
        merged += 1
    blk = {"id": idx, "title": ru_title, "questions": ru_qs, "cheat": ru_cheat}
    if en_title:
        blk["title_en"] = en_title
    if en_cheat and len(en_cheat) == len(ru_cheat):
        blk["cheat_en"] = en_cheat
    elif en_cheat:
        warns.append(f"cheat {len(ru_cheat)} vs {len(en_cheat)}")
    blocks.append(blk)
    ru_d = sum(x.count("$") for q in ru_qs for x in [q["sutie"], q["theorems"], q["example"]] + q["defs"] + q["exam"])
    en_d = sum(x.count("$") for q in en_qs for x in [q["sutie"], q["theorems"], q["example"]] + q["defs"] + q["exam"]) if en_qs else -1
    line = f"block {idx}: {ru_title} | q {len(ru_qs)} | en merged {merged}"
    if en_qs and ru_d != en_d:
        line += f" | $ parity ru {ru_d} vs en {en_d}"
    if warns:
        line += " | WARN: " + "; ".join(warns)
    print(line)

defs_index = []
for b in blocks:
    for q in b["questions"]:
        for d in q["defs"]:
            if 25 <= len(d) <= 800:
                defs_index.append({"t": d, "n": q["n"], "b": b["id"]})

en_q = sum(1 for b in blocks for q in b["questions"] if q.get("defs_en"))
data = {"generated": datetime.datetime.now().isoformat(timespec="seconds"), "blocks": blocks, "defs": defs_index}
os.makedirs(os.path.join(BASE, "trainer"), exist_ok=True)
io.open(os.path.join(BASE, "trainer", "data.js"), "w", encoding="utf-8").write(
    "window.DM_DATA=" + json.dumps(data, ensure_ascii=False) + ";\n")
tot_q = sum(len(b["questions"]) for b in blocks)
print(f"TOTAL: blocks={len(blocks)} questions={tot_q} defs={len(defs_index)} questions_with_en={en_q}")
print("written: trainer/data.js")
