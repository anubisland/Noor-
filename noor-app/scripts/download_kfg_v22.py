import urllib.request

# Check Quran.com frontend repository or fonts
urls = [
    'https://raw.githubusercontent.com/quran/quran.com-frontend-next/master/public/fonts/quran/hafs/v22/UthmanicHafs_v22.ttf',
    'https://raw.githubusercontent.com/quran/quran.com-frontend-next/master/public/fonts/quran/hafs/v1/UthmanicHafs1_Ver18.ttf',
    'https://github.com/quran/quran.com-frontend-next/raw/master/public/fonts/quran/hafs/uthmanic_hafs_v22.ttf',
]

for url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            data = resp.read()
            print(f"Success from {url}: {len(data)} bytes")
            with open('noor-app/assets/fonts/UthmanicHafs_v22.ttf', 'wb') as f:
                f.write(data)
            break
    except Exception as e:
        print(f"Failed {url}: {e}")
