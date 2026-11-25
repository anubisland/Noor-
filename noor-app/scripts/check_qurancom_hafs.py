import urllib.request
import json

# Let's inspect surah 2 in quran.com
url = 'https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=2'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode('utf-8'))
    verses = data['verses']

# Check how quran.com writes:
# 1. 2:4 (aakhirah)
# 2. 2:34 (adam)
# 3. 2:39 (aayaatina)
# 4. 2:25 (aamanoo)
for v in verses:
    if v['verse_key'] in ['2:4', '2:25', '2:34', '2:39']:
        print(f"{v['verse_key']}: {v['text_uthmani']}")
