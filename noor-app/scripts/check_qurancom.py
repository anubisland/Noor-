import urllib.request
import json

# Let's inspect quran.com API or tanzil
# Quran.com API v4: https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=2
try:
    req = urllib.request.Request(
        'https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=2',
        headers={'User-Agent': 'Mozilla/5.0'}
    )
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        verses = data.get('verses', [])
        print("Fetched from quran.com api v4:")
        # Look at ayah 4:
        for v in verses[:5]:
            if v['verse_key'] == '2:4':
                print("2:4 uthmani:", repr(v['text_uthmani']))
                print("2:4 displayed:", v['text_uthmani'])
        for v in verses:
            if v['verse_key'] == '2:34':
                print("2:34 uthmani:", repr(v['text_uthmani']))
                print("2:34 displayed:", v['text_uthmani'])
except Exception as e:
    print("Error fetching from quran.com:", e)
