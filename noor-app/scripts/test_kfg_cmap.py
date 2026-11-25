from fontTools.ttLib import TTFont

kfg = TTFont('noor-app/assets/fonts/KFGQPC-Hafs.otf')
cmap = kfg.getBestCmap()

# Check what glyphs exist for hamza sequences
print("Total glyphs in KFGQPC:", len(cmap))

# Check U+0622 (Alif with madda 'آ')
print("U+0622 in KFGQPC:", 0x0622 in cmap)

# Check U+0621 (Hamza)
print("U+0621 in KFGQPC:", 0x0621 in cmap)

# Check U+0654 (Hamza above)
print("U+0654 in KFGQPC:", 0x0654 in cmap)

# Check U+0640 (Tatweel)
print("U+0640 in KFGQPC:", 0x0640 in cmap)
