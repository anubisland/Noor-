import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = path.resolve('data/tafsir');
const TEMP_DIR = path.join(OUTPUT_DIR, '_temp');

const ALQURAN_SOURCES = [
  { edition: 'ar.muyassar',  sourceId: 'muyassar' },
  { edition: 'ar.jalalayn',  sourceId: 'jalalayn' },
  { edition: 'ar.qurtubi',   sourceId: 'qurtubi' },
  { edition: 'ar.waseet',    sourceId: 'waseet' },
  { edition: 'ar.baghawi',   sourceId: 'baghawi' },
];

const TAFSEER_COM_SOURCES = ['ibn-kathir', 'sa3di', 'tabari'];

function escapeText(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, ' ').replace(/\r/g, '');
}

function generateFile(entries, exportName) {
  let code = `import type { TafsirEntry } from './types';\n\n`;
  code += `export const ${exportName}: TafsirEntry[] = [\n`;
  for (const e of entries) {
    code += `  { surahId: ${e.surahId}, ayahNumber: ${e.ayahNumber}, text: '${escapeText(e.text)}' },\n`;
  }
  code += '];\n';
  return code;
}

async function fetchAlquranSource(edition, sourceId) {
  console.log(`Fetching ${sourceId} from alquran.cloud...`);
  const allEntries = [];
  for (let surahId = 1; surahId <= 114; surahId++) {
    const url = `https://api.alquran.cloud/v1/surah/${surahId}/${edition}`;
    try {
      const res = await fetch(url);
      const json = await res.json();
      for (const ayah of json.data.ayahs) {
        const text = (ayah.text || '').trim();
        if (text && text.length > 3) {
          allEntries.push({ surahId, ayahNumber: ayah.numberInSurah, text });
        }
      }
    } catch (e) {
      console.error(`  Error ${sourceId} surah ${surahId}: ${e.message}`);
    }
    if (surahId % 20 === 0) console.log(`  ${sourceId}: ${surahId}/114 (${allEntries.length} entries)`);
  }
  console.log(`  ${sourceId}: Done - ${allEntries.length} entries`);
  return allEntries;
}

function extractValidEntries(content, surahId) {
  // Try full parse first
  try {
    const data = JSON.parse(content);
    if (!Array.isArray(data)) return [];
    return data.filter(e => (e.text || '').trim().length > 3).map(e => ({
      surahId,
      ayahNumber: e.ayah_number,
      text: e.text.trim()
    }));
  } catch (e) {
    // Truncated JSON - find last complete object and close the array
    const lastBrace = content.lastIndexOf('}');
    if (lastBrace < 1) return [];
    const fixed = content.substring(0, lastBrace + 1) + ']';
    try {
      const data = JSON.parse(fixed);
      if (!Array.isArray(data)) return [];
      return data.filter(e => (e.text || '').trim().length > 3).map(e => ({
        surahId,
        ayahNumber: e.ayah_number,
        text: e.text.trim()
      }));
    } catch (e2) {
      return [];
    }
  }
}

function readTempSource(sourceId) {
  console.log(`Reading ${sourceId} from temp files...`);
  const allEntries = [];

  for (let surahId = 1; surahId <= 114; surahId++) {
    const filePath = path.join(TEMP_DIR, `${sourceId}-${surahId}.json`);
    if (!fs.existsSync(filePath)) continue;

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.length < 20) continue;
      const entries = extractValidEntries(content, surahId);
      allEntries.push(...entries);
    } catch (e) {
      console.error(`  Error reading ${sourceId} surah ${surahId}: ${e.message}`);
    }
  }

  // Deduplicate
  const seen = new Set();
  const deduped = [];
  for (let i = allEntries.length - 1; i >= 0; i--) {
    const e = allEntries[i];
    const key = `${e.surahId}-${e.ayahNumber}`;
    if (!seen.has(key)) {
      seen.add(key);
      deduped.unshift(e);
    }
  }

  console.log(`  ${sourceId}: ${deduped.length} unique entries`);
  return deduped;
}

async function main() {
  console.log('=== Tafsir Data Generator ===\n');
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const results = {};

  console.log('--- Phase 1: Al Quran Cloud ---');
  for (const { edition, sourceId } of ALQURAN_SOURCES) {
    results[sourceId] = await fetchAlquranSource(edition, sourceId);
  }

  console.log('\n--- Phase 2: Quran Tafseer API (from temp files) ---');
  for (const sourceId of TAFSEER_COM_SOURCES) {
    results[sourceId] = readTempSource(sourceId);
  }

  console.log('\n=== Generating files ===\n');
  const sources = ['ibn-kathir', 'sa3di', 'tabari', 'jalalayn', 'qurtubi', 'baghawi', 'waseet', 'muyassar'];
  for (const sourceId of sources) {
    if (!results[sourceId] || results[sourceId].length === 0) {
      console.log(`SKIP ${sourceId}: no data`);
      continue;
    }
    const exportName = sourceId.replace(/-/g, '') + 'Tafsir';
    const content = generateFile(results[sourceId], exportName);
    fs.writeFileSync(path.join(OUTPUT_DIR, `${sourceId}.ts`), content);
    const lines = content.split('\n').length;
    const sizeKB = (content.length / 1024).toFixed(0);
    console.log(`Wrote ${sourceId}.ts (${lines} lines, ${results[sourceId].length} entries, ${sizeKB}KB)`);
  }

  console.log('\n=== Summary ===');
  let total = 0;
  for (const [src, entries] of Object.entries(results)) {
    console.log(`  ${src}: ${entries.length} entries`);
    total += entries.length;
  }
  console.log(`  TOTAL: ${total} entries`);
}

main().catch(console.error);
