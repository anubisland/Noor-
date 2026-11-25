with open('noor-app/data/quran.ts', 'r', encoding='utf-8') as f:
    text = f.read()

import re
m = re.search(r'ayahNumber:\s*25,[\s\S]*?text:\s*[\'\"]([^\'\"]+)[\'\"]', text)
if m:
    val = m.group(1)
    print("Ayah 25 text:", repr(val))
    for c in val:
        if ord(c) > 127 and ord(c) not in range(0x0600, 0x06FF):
            print(f"Non-standard char: {repr(c)} U+{ord(c):04X}")
