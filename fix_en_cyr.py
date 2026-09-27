import io, glob, os

BASE = r"C:/Users/RobotComp/Projects/discrete-math-exam"

p1 = BASE + "/blocks-en/01-chisla-i-rsa.md"
t = io.open(p1, encoding="utf-8").read()
t = t.replace("# значение g^j -> показатель j", "# value g^j -> exponent j")
t = t.replace("# обратный элемент по расширенному Евклиду", "# inverse via the extended Euclidean algorithm")
io.open(p1, "w", encoding="utf-8").write(t)
print("01: code comments translated")

p2 = BASE + "/blocks-en/02-gruppy.md"
t = io.open(p2, encoding="utf-8").read()
n = t.count("\\text{НОК}")
t = t.replace("\\text{НОК}", "\\text{LCM}")
io.open(p2, "w", encoding="utf-8").write(t)
print("02: НОК->LCM replacements:", n)

for f in sorted(glob.glob(BASE + "/blocks-en/*.md")):
    t = io.open(f, encoding="utf-8").read()
    bad = [c for c in t if 0x0400 <= ord(c) <= 0x04FF]
    print(os.path.basename(f), "cyrillic chars left:", len(bad))
