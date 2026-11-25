with open('noor-app/data/quran.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines[:500]):
    if 'surahId: 2,' in line:
        for k in range(i, i+50):
            if 'ayahNumber: 4,' in lines[k]:
                for j in range(k-1, k+5):
                    print(lines[j].strip())
                break
        break
