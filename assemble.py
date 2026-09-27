import glob, os, re, io

BASE = r"C:/Users/RobotComp/Projects/discrete-math-exam"
BLOCKS = ["01-chisla-i-rsa.md","02-gruppy.md","03-mnozhestva-i-otnosheniya.md",
          "04-bulevy-funkcii-1.md","05-minimizaciya-dnf.md","06-kombinatorika.md",
          "07-grafy-osnovy.md","08-potoki-i-algoritmy.md","09-eiler-gamilton-planarnost.md"]
RANGES = {BLOCKS[0]:(1,7),BLOCKS[1]:(8,12),BLOCKS[2]:(13,16),BLOCKS[3]:(17,24),
          BLOCKS[4]:(25,29),BLOCKS[5]:(30,38),BLOCKS[6]:(39,48),
          BLOCKS[7]:(49,54),BLOCKS[8]:(55,60)}

def fix_dashes(t):
    n = t.count('\u2014') + t.count('\u2013')
    t = t.replace(' \u2014 ', ', ').replace('\u2014', ',').replace(' \u2013 ', ', ').replace('\u2013', '-')
    return t, n

texts = {}
report = []
for name in BLOCKS:
    p = os.path.join(BASE, 'blocks', name)
    if not os.path.exists(p):
        report.append("MISSING " + name); continue
    t = io.open(p, encoding='utf-8').read()
    t2, nd = fix_dashes(t)
    if nd:
        io.open(p, 'w', encoding='utf-8').write(t2)
    words = len(t2.split())
    qs = sorted(int(m) for m in re.findall(r'^##\s*Вопрос\s+(\d+)', t2, re.M))
    lo, hi = RANGES[name]
    missing = [i for i in range(lo, hi+1) if i not in qs]
    report.append(f"{name}: {words} words, dash_fixes={nd}, questions={len(qs)}, missing={missing}")
    texts[name] = t2

allq = set()
titles = {}
for t in texts.values():
    for m in re.finditer(r'^##\s*Вопрос\s+(\d+)\.\s*(.+?)\s*$', t, re.M):
        allq.add(int(m.group(1)))
        titles.setdefault(int(m.group(1)), m.group(2))
print("\n".join(report))
print("total questions:", len(allq), "missing 1..60:", [i for i in range(1,61) if i not in allq])

# merged
parts = ["# Дискретная математика: конспект к пересдаче (60 вопросов)\n",
         "Конспект по всем вопросам экзамена, разбитый на 9 блоков. Формулы записаны в LaTeX ($...$).\n",
         "## Содержание\n"]
for name in BLOCKS:
    if name not in texts: continue
    parts.append("**" + name + "**\n")
    for m in re.finditer(r'^##\s*Вопрос\s+(\d+)\.\s*(.+?)\s*$', texts[name], re.M):
        parts.append(f"- Вопрос {m.group(1)}. {m.group(2)}")
    parts.append("")
for name in BLOCKS:
    if name not in texts: continue
    parts.append("\n---\n")
    parts.append(texts[name])
merged = "\n".join(parts)
io.open(os.path.join(BASE, "Дискретная_математика_конспект.md"), "w", encoding='utf-8').write(merged)
print("merged words:", len(merged.split()))

# cheat sheet
cheat = ["# ШПОРА: дискретная математика, 60 вопросов\n",
         "Сжатая выжимка по всем блокам. Повторять за час до экзамена.\n"]
for name in BLOCKS:
    if name not in texts:
        continue
    m = re.search(r'^##\s*Шпаргалка блока\s*$\n(.*?)(?=\n##\s|\Z)', texts[name], re.M | re.S)
    if m:
        cheat.append("\n---\n")
        cheat.append("## " + name.replace('.md',''))
        cheat.append(m.group(1).strip())
    else:
        print("no cheat section in", name)
io.open(os.path.join(BASE, "ШПОРА.md"), "w", encoding='utf-8').write("\n".join(cheat))
print("cheat words:", len(" ".join(cheat).split()))
