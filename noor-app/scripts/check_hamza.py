import urllib.request
import json

# Let's check what editions alquran.cloud or tanzil provides
# Commonly: quran-uthmani, ar.alafasy (simple), quran-tajweed, etc.
# Tanzil has multiple types:
# 1. 'quran-uthmani': Uthmani Script (according to Medina Mushaf)
# But Tanzil has a known issue with isolated hamza before alif: "ءَا" vs U+065F or U+0671 / dagger alif / etc.

with open('noor-app/data/quran.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's find occurrences of ءَا in quran.ts
import re
matches = re.findall(r'(\S*ءَا\S*)', text)
print(f"Total words with ءَا: {len(matches)}")
print("Sample words with ءَا:")
for m in set(matches[:20]):
    print(" ", m)
