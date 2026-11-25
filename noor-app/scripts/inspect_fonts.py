# Let's inspect font files using fontTools
from fontTools.ttLib import TTFont

amiri = TTFont('noor-app/assets/fonts/AmiriQuran.ttf')
kfg = TTFont('noor-app/assets/fonts/KFGQPC-Hafs.otf')

print("Amiri tables:", amiri.keys())
print("KFGQPC tables:", kfg.keys())

# Let's check glyph names or supported characters
cmap_amiri = amiri.getBestCmap()
cmap_kfg = kfg.getBestCmap()

# Check U+0621 (Hamza), U+0654 (Hamza Above), U+0640 (Tatweel)
for cp in [0x0621, 0x0654, 0x0640, 0x0671, 0x0670]:
    print(f"U+{cp:04X}: in Amiri={cp in cmap_amiri}, in KFG={cp in cmap_kfg}")
