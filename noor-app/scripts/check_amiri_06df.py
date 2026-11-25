from fontTools.ttLib import TTFont

amiri = TTFont('noor-app/assets/fonts/AmiriQuran.ttf')
cmap = amiri.getBestCmap()

# Check 0x06DF in Amiri
print("0x06DF in Amiri:", 0x06DF in cmap)
glyph_name = cmap.get(0x06DF)
print("0x06DF glyph name in Amiri:", glyph_name)
