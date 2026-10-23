#!/usr/bin/env python3
import sys

try:
    import pdfplumber
except ImportError:
    print("Thiếu pdfplumber. Chạy: pip install pdfplumber", file=sys.stderr)
    sys.exit(2)

if len(sys.argv) != 2:
    print("Cách dùng: pdf_bang.py <tệp.pdf>", file=sys.stderr)
    sys.exit(2)

o = lambda c: " ".join(str(c or "").split())
dong, quet = [], []
with pdfplumber.open(sys.argv[1]) as pdf:
    for n, trang in enumerate(pdf.pages, 1):
        if not (trang.extract_text() or "").strip():
            quet.append(n)
        for bang in trang.extract_tables():
            for r in bang:
                dong.append([n, len(dong) + 1] + [o(c) for c in r])

for n in quet:
    print(f"Trang {n} không có chữ (trang trống hoặc PDF quét). Không trích được số từ trang này.", file=sys.stderr)
# A blank trailing page is common; rows lost on a scanned page are caught by kiem-sao-ke's balance check.
if dong == [] and quet:
    sys.exit(1)
sys.stdout.write("".join("\t".join(map(str, r)) + "\n" for r in dong))
