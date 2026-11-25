import urllib.request
import json

url = 'https://api.quran.com/api/v4/quran/verses/uthmani'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode('utf-8'))
    verses = data['verses']

# Check 1:1, 2:1, 9:1, 114:1
for v in verses:
    if v['verse_key'] in ['1:1', '2:1', '9:1', '112:1', '114:1']:
        print(f"{v['verse_key']}: {repr(v['text_uthmani'])}")
