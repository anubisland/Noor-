import urllib.request
import json

req = urllib.request.Request(
    'https://api.quran.com/api/v4/verses/by_key/2:4?language=ar&words=true&fields=text_uthmani,text_imlaei,text_uthmani_simple',
    headers={'User-Agent': 'Mozilla/5.0'}
)
with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode('utf-8'))
    print(json.dumps(data, indent=2, ensure_ascii=False))
