import urllib.request
import json
import re
import os

print("1. Fetching complete official King Fahd Complex Uthmani text from Quran.com...")
url = 'https://api.quran.com/api/v4/quran/verses/uthmani'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode('utf-8'))
    verses = data['verses']

print(f"Fetched {len(verses)} verses.")

# Map verse_key ("1:1", "2:4", etc.) to clean text
qurancom_map = {}
for v in verses:
    key = v['verse_key']
    text = v['text_uthmani'].strip()
    qurancom_map[key] = text

# Verify crucial verses:
print("2:4:", qurancom_map['2:4'])
print("2:34:", qurancom_map['2:34'])
print("5:48 contains ءاتىكم:", 'ءَاتَىٰكُمْ' in qurancom_map['5:48'])

# Now let's update data/quran.ts
quran_ts_path = 'noor-app/data/quran.ts'
print(f"Reading {quran_ts_path}...")
with open(quran_ts_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
current_surah = 1
current_ayah = 1
updated_count = 0

for line in lines:
    surah_m = re.search(r'surahId:\s*(\d+)', line)
    if surah_m:
        current_surah = int(surah_m.group(1))

    ayah_m = re.search(r'ayahNumber:\s*(\d+)', line)
    if ayah_m:
        current_ayah = int(ayah_m.group(1))

    text_m = re.search(r"(\s*text:\s*')([^']+)(',)", line)
    if text_m:
        key = f"{current_surah}:{current_ayah}"
        if key in qurancom_map:
            official_text = qurancom_map[key].replace("'", "\\'")
            # Replace line
            line = f"{text_m.group(1)}{official_text}{text_m.group(3)}\n"
            updated_count += 1

    new_lines.append(line)

print(f"Total ayahs updated in data/quran.ts: {updated_count}")

with open(quran_ts_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Saved updated data/quran.ts successfully!")
