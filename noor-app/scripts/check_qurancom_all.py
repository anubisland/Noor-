import urllib.request
import json
import time

url = 'https://api.quran.com/api/v4/quran/verses/uthmani'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
t0 = time.time()
with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode('utf-8'))
    verses = data['verses']
    print(f"Fetched {len(verses)} verses from Quran.com in {time.time()-t0:.2f}s")

# Let's inspect verses that had issues in our current database:
# 1. 2:4 (Al-Baqarah 4 - وبالآخرة)
v_2_4 = next(v for v in verses if v['verse_key'] == '2:4')
print("2:4:", v_2_4['text_uthmani'])

# 2. 2:34 (Al-Baqarah 34 - لآدم)
v_2_34 = next(v for v in verses if v['verse_key'] == '2:34')
print("2:34:", v_2_34['text_uthmani'])

# 3. 5:48 (Al-Ma'idah 48 - ءاتاكم)
v_5_48 = next(v for v in verses if v['verse_key'] == '5:48')
print("5:48:", v_5_48['text_uthmani'])

# 4. Check for any isolated ءَا in Quran.com's text
count_isolated = sum(1 for v in verses if 'لِءَ' in v['text_uthmani'] or 'بِءَ' in v['text_uthmani'] or 'ٱلْءَ' in v['text_uthmani'])
print("Total occurrences of لِءَ or بِءَ or ٱلْءَ in Quran.com text:", count_isolated)
