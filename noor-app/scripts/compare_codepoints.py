qc_2_4 = 'وَبِٱلْـَٔاخِرَةِ'
our_2_4 = 'وَبِٱلْءَاخِرَةِ'

print("Quran.com codepoints:")
for c in qc_2_4:
    print(f"  {repr(c)}: U+{ord(c):04X} ({c})")

print("\nOur quran.ts codepoints:")
for c in our_2_4:
    print(f"  {repr(c)}: U+{ord(c):04X} ({c})")
