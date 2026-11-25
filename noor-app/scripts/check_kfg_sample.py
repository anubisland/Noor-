from fontTools.ttLib import TTFont

kfg = TTFont('noor-app/assets/fonts/KFGQPC-Hafs.otf')
cmap = kfg.getBestCmap()

# Check sample text characters in cmap:
sample = "وَٱلَّذِينَ يُؤْمِنُونَ بِمَآ أُنزِلَ إِلَيْكَ وَمَآ أُنزِلَ مِن قَبْلِكَ وَبِٱلْـَٔاخِرَةِ هُمْ يُوقِنُونَ"
missing = []
for ch in sample:
    if ord(ch) not in cmap and ord(ch) > 32:
        missing.append((ch, f"U+{ord(ch):04X}"))

print("Missing in KFGQPC for sample 2:4:", missing)

# Check sample 2:34:
sample2 = "وَإِذْ قُلْنَا لِلْمَلَـٰٓئِكَةِ ٱسْجُدُوا۟ لِـَٔادَمَ"
missing2 = []
for ch in sample2:
    if ord(ch) not in cmap and ord(ch) > 32:
        missing2.append((ch, f"U+{ord(ch):04X}"))

print("Missing in KFGQPC for sample 2:34:", missing2)
