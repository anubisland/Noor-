from fontTools.ttLib import TTFont

kfg = TTFont('noor-app/assets/fonts/KFGQPC-Hafs.otf')
cmap = kfg.getBestCmap()

print("0x06DF in cmap:", 0x06DF in cmap)
glyph_name = cmap.get(0x06DF)
print("0x06DF glyph name in KFGQPC:", glyph_name)
