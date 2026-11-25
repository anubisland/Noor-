import fs from 'fs';
import path from 'path';

const TAFSEER_CONFIGS = [
  {
    repoName: 'ar-tafsir-ibn-kathir',
    outFile: 'data/tafsir/ibn-kathir.ts',
    exportName: 'ibnkathirTafsir',
    sourceTitle: 'ابن كثير',
  },
  {
    repoName: 'ar-tafsir-as-saadi',
    outFile: 'data/tafsir/sa3di.ts',
    exportName: 'sa3diTafsir',
    sourceTitle: 'السعدي',
  },
  {
    repoName: 'ar-tafsir-al-tabari',
    outFile: 'data/tafsir/tabari.ts',
    exportName: 'tabariTafsir',
    sourceTitle: 'الطبري',
  },
];

function escapeText(s) {
  if (!s) return '';
  return s
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r/g, '')
    .replace(/\n/g, '\\n');
}

async function fetchWithRetry(url, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      if (attempt === retries) throw e;
      await new Promise((r) => setTimeout(r, 500 * attempt));
    }
  }
}

async function processTafsir(config) {
  console.log(`\n========================================`);
  console.log(`Fetching and processing ${config.sourceTitle} (${config.repoName})...`);

  const allEntries = [];

  for (let surahId = 1; surahId <= 114; surahId++) {
    const url = `https://raw.githubusercontent.com/spa5k/tafsir_api/main/tafsir/${config.repoName}/${surahId}.json`;
    try {
      const data = await fetchWithRetry(url);
      if (Array.isArray(data)) {
        for (const item of data) {
          const ayahNumber = item.ayah || item.ayah_number;
          const text = (item.text || '').trim();
          if (ayahNumber && text) {
            allEntries.push({
              surahId,
              ayahNumber,
              text,
            });
          }
        }
      }
      if (surahId % 20 === 0 || surahId === 114) {
        console.log(`  Surah ${surahId}/114 fetched (${allEntries.length} ayahs accumulated)...`);
      }
    } catch (e) {
      console.error(`  Error in Surah ${surahId}:`, e.message);
    }
  }

  console.log(`Finished fetching ${config.sourceTitle}: Total ${allEntries.length} ayahs.`);

  const destPath = path.resolve(config.outFile);
  console.log(`Writing to ${destPath}...`);

  let code = `import type { TafsirEntry } from './types';\n\n`;
  code += `export const ${config.exportName}: TafsirEntry[] = [\n`;
  for (const e of allEntries) {
    code += `  { surahId: ${e.surahId}, ayahNumber: ${e.ayahNumber}, text: '${escapeText(e.text)}' },\n`;
  }
  code += `];\n`;

  fs.writeFileSync(destPath, code, 'utf8');
  const sizeMb = (fs.statSync(destPath).size / 1024 / 1024).toFixed(2);
  console.log(`Saved ${destPath} (${sizeMb} MB) with ${allEntries.length} complete entries.`);
}

async function main() {
  for (const cfg of TAFSEER_CONFIGS) {
    await processTafsir(cfg);
  }
  console.log('\nAll 3 tafsirs processed successfully!');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
