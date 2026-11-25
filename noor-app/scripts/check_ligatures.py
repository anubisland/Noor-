# Let's inspect how KFGQPC-Hafs font handles ligatures for ءَا or ـَٔا
from fontTools.ttLib import TTFont

kfg = TTFont('noor-app/assets/fonts/KFGQPC-Hafs.otf')
amiri = TTFont('noor-app/assets/fonts/AmiriQuran.ttf')

# Check GSUB table for Arabic ligatures
gsub_kfg = kfg['GSUB'].table if 'GSUB' in kfg else None
gsub_amiri = amiri['GSUB'].table if 'GSUB' in amiri else None

print("KFG GSUB feature count:", len(gsub_kfg.FeatureList.FeatureRecord) if gsub_kfg else 0)
print("Amiri GSUB feature count:", len(gsub_amiri.FeatureList.FeatureRecord) if gsub_amiri else 0)
