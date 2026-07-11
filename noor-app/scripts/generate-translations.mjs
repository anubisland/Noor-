import https from 'https';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = path.resolve('data/translations');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'Accept': 'application/json' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

function escapeText(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, ' ');
}

async function main() {
  console.log('Fetching Saheeh International translation...');
  const json = await fetchJson('https://api.alquran.cloud/v1/quran/en.sahih');
  const surahs = json.data.surahs;

  // Collect all translation entries per batch
  const batch1 = []; // surahs 1-5   -> en.ts
  const batch2 = []; // surahs 6-40  -> en-batch1.ts
  const batch3 = []; // surahs 41-77 -> en-batch2.ts
  const batch4 = []; // surahs 78-114 -> en-batch3.ts

  for (const surah of surahs) {
    const surahId = surah.number;
    for (const ayah of surah.ayahs) {
      const entry = { surahId, ayahNumber: ayah.numberInSurah, text: ayah.text };
      if (surahId <= 5) batch1.push(entry);
      else if (surahId <= 40) batch2.push(entry);
      else if (surahId <= 77) batch3.push(entry);
      else batch4.push(entry);
    }
  }

  function generateFile(entries, header, exportName) {
    let code = header + '\n\n';
    code += `export const ${exportName}: TranslationEntry[] = [\n`;
    for (const e of entries) {
      code += `  { surahId: ${e.surahId}, ayahNumber: ${e.ayahNumber}, text: '${escapeText(e.text)}' },\n`;
    }
    code += '];\n';
    return code;
  }

  const headerBase = `import { TranslationEntry } from './en';`;
  const headerEn = `import { TranslationEntry } from './en';\n\nexport interface TranslationEntry {\n  surahId: number;\n  ayahNumber: number;\n  text: string;\n}`;

  const files = {
    'en.ts': generateFile(batch1, headerEn, 'englishTranslation'),
    'en-batch1.ts': generateFile(batch2, headerBase, 'englishBatch1'),
    'en-batch2.ts': generateFile(batch3, headerBase, 'englishBatch2'),
    'en-batch3.ts': generateFile(batch4, headerBase, 'englishBatch3'),
  };

  for (const [name, content] of Object.entries(files)) {
    const filepath = path.join(OUTPUT_DIR, name);
    fs.writeFileSync(filepath, content);
    const lines = content.split('\n').length;
    console.log(`Wrote ${name} (${lines} lines, ~${content.length} chars)`);
  }

  console.log('\nDone!');
}

main().catch(console.error);
