import re

files_to_fix = [
    'noor-app/data/quranic-duas.ts',
    'noor-app/data/quran-part2.ts',
    'noor-app/data/quran-part3.ts',
    'noor-app/data/asbab-nuzul.ts',
    'noor-app/data/topics.ts'
]

for fpath in files_to_fix:
    try:
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Fix broken hamzas:
        content = re.sub(r'لِءَا', 'لِـَٔا', content)
        content = re.sub(r'بِءَا', 'بِـَٔا', content)
        content = re.sub(r'بِٱلْءَا', 'بِٱلْـَٔا', content)
        content = re.sub(r'ٱلْءَا', 'ٱلْـَٔا', content)
        content = re.sub(r'فِى ٱلْءَا', 'فِى ٱلْـَٔا', content)
        content = re.sub(r'وَٱلْءَا', 'وَٱلْـَٔا', content)
        content = content.replace('\u06DF', '')

        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Cleaned {fpath}")
    except Exception as e:
        print(fpath, e)
