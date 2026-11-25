import json
import re

# Load qurancom_map from quran.ts or fetch
import urllib.request
url = 'https://api.quran.com/api/v4/quran/verses/uthmani'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode('utf-8'))
    verses = data['verses']

qmap = {v['verse_key']: v['text_uthmani'].strip() for v in verses}

def update_topics():
    path = 'noor-app/data/topics.ts'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # In topics.ts, ayahs have:
    # "surahId": X,
    # "ayahNumber": Y,
    # "text": "..."
    # or surahId: X, ayahNumber: Y, text: '...'
    def repl(m):
        full = m.group(0)
        s_m = re.search(r'["\']?surahId["\']?:\s*(\d+)', full)
        a_m = re.search(r'["\']?ayahNumber["\']?:\s*(\d+)', full)
        if s_m and a_m:
            s_id = s_m.group(1)
            a_id = a_m.group(1)
            key = f"{s_id}:{a_id}"
            if key in qmap:
                txt = qmap[key].replace('\\', '\\\\').replace('"', '\\"').replace("'", "\\'")
                # replace the text field inside this block
                new_full = re.sub(r'(["\']?text["\']?:\s*["\'])([^"\']+)(["\'])', rf'\g<1>{txt}\g<3>', full)
                return new_full
        return full

    # Match blocks of ayah objects
    pattern = re.compile(r'\{[^{}]*?["\']?surahId["\']?:\s*\d+[^{}]*?["\']?ayahNumber["\']?:\s*\d+[^{}]*?\}', re.DOTALL)
    new_content = pattern.sub(repl, content)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Updated topics.ts!")

def update_duas():
    path = 'noor-app/data/quranic-duas.ts'
    try:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()

        def repl(m):
            full = m.group(0)
            s_m = re.search(r'["\']?surahId["\']?:\s*(\d+)', full)
            a_m = re.search(r'["\']?ayahNumber["\']?:\s*(\d+)', full)
            if s_m and a_m:
                key = f"{s_m.group(1)}:{a_m.group(1)}"
                if key in qmap:
                    txt = qmap[key].replace('\\', '\\\\').replace('"', '\\"').replace("'", "\\'")
                    return re.sub(r'(["\']?text["\']?:\s*["\'])([^"\']+)(["\'])', rf'\g<1>{txt}\g<3>', full)
            return full

        pattern = re.compile(r'\{[^{}]*?["\']?surahId["\']?:\s*\d+[^{}]*?["\']?ayahNumber["\']?:\s*\d+[^{}]*?\}', re.DOTALL)
        new_content = pattern.sub(repl, content)

        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Updated quranic-duas.ts!")
    except Exception as e:
        print("Duas update:", e)

def update_asbab():
    path = 'noor-app/data/asbab-nuzul.ts'
    try:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()

        def repl(m):
            full = m.group(0)
            s_m = re.search(r'["\']?surahId["\']?:\s*(\d+)', full)
            a_m = re.search(r'["\']?ayahNumber["\']?:\s*(\d+)', full)
            if s_m and a_m:
                key = f"{s_m.group(1)}:{a_m.group(1)}"
                if key in qmap:
                    txt = qmap[key].replace('\\', '\\\\').replace('"', '\\"').replace("'", "\\'")
                    return re.sub(r'(["\']?ayahText["\']?:\s*["\'])([^"\']+)(["\'])', rf'\g<1>{txt}\g<3>', full)
            return full

        pattern = re.compile(r'\{[^{}]*?["\']?surahId["\']?:\s*\d+[^{}]*?["\']?ayahNumber["\']?:\s*\d+[^{}]*?\}', re.DOTALL)
        new_content = pattern.sub(repl, content)

        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Updated asbab-nuzul.ts!")
    except Exception as e:
        print("Asbab update:", e)

update_topics()
update_duas()
update_asbab()
