import urllib.request
import json

# Let's fetch surah 1 and 2 from quran.com api
url = 'https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=2'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode('utf-8'))
    verses = data['verses']
    print(f"Total verses in Surah 2: {len(verses)}")

# Look at 2:4 (Al-Baqarah 4):
v4 = next(v for v in verses if v['verse_key'] == '2:4')
print("2:4:", v4['text_uthmani'])

# Look at 2:34 (Al-Baqarah 34 - Adam):
v34 = next(v for v in verses if v['verse_key'] == '2:34')
print("2:34:", v34['text_uthmani'])

# Look at 5:48 (Al-Ma'idah 48 - Atakum):
url_m = 'https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=5'
req_m = urllib.request.Request(url_m, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req_m) as resp:
    data_m = json.loads(resp.read().decode('utf-8'))
    v48 = next(v for v in data_m['verses'] if v['verse_key'] == '5:48')
    print("5:48:", v48['text_uthmani'])
