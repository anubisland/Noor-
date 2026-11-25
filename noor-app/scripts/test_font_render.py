from PIL import Image, ImageDraw, ImageFont
import os

font_path = 'noor-app/assets/fonts/AmiriQuran.ttf'
kfg_path = 'noor-app/assets/fonts/KFGQPC-Hafs.otf'

print("Amiri exists:", os.path.exists(font_path))
print("KFGQPC exists:", os.path.exists(kfg_path))

# Let's test with arabic-reshaper and bidi if available, or raw
try:
    import arabic_reshaper
    from bidi.algorithm import get_display
    has_bidi = True
except ImportError:
    has_bidi = False
    print("bidi not installed")

text1 = "وَبِٱلْءَاخِرَةِ"  # Current in quran.ts (isolated hamza)
text2 = "وَبِٱلْـَٔاخِرَةِ"  # Quran.com King Fahd Complex (tatweel + hamza above)
text3 = "لِءَادَمَ"        # Current in quran.ts (isolated hamza)
text4 = "لِـَٔادَمَ"        # Quran.com King Fahd Complex
text5 = "وَإِذْ قُلْنَا لِلْمَلَـٰٓئِكَةِ ٱسْجُدُوا۟ لِـَٔادَمَ"

print("text1 (current):", [f"U+{ord(c):04X}" for c in text1])
print("text2 (quran.com):", [f"U+{ord(c):04X}" for c in text2])
