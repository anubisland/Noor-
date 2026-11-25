from fontTools.ttLib import TTFont

kfg = TTFont('noor-app/assets/fonts/KFGQPC-Hafs.otf')
cmap = kfg.getBestCmap()

# Find all marks
for cp, name in sorted(cmap.items()):
    if cp >= 0x06D6 and cp <= 0x06ED:
        print(f"U+{cp:04X}: {name}")
