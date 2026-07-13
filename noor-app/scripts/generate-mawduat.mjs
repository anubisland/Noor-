import fs from 'fs';
import path from 'path';
import https from 'https';

const DATA_DIR = path.resolve('data');
const TMP = process.env.TEMP || 'C:\\Temp';

const SURAH_AYAH_COUNTS = [
  7,286,200,176,120,165,206,75,129,109,123,111,43,52,99,128,111,110,98,
  135,112,78,118,64,77,227,93,88,69,60,34,30,73,54,45,83,182,88,75,85,
  54,53,89,59,37,35,38,29,18,45,60,49,62,55,78,96,29,22,24,13,14,11,11,
  18,12,12,30,52,52,44,28,28,20,56,40,31,50,40,46,42,29,19,36,25,22,17,
  19,26,30,20,15,21,11,8,8,19,5,8,8,11,11,8,3,9,5,4,7,3,6,3,5,4,5,6
];

const SURAH_NAMES = [
  'الفاتحة','البقرة','آل عمران','النساء','المائدة','الأنعام','الأعراف','الأنفال',
  'التوبة','يونس','هود','يوسف','الرعد','إبراهيم','الحجر','النحل','الإسراء','الكهف',
  'مريم','طه','الأنبياء','الحج','المؤمنون','النور','الفرقان','الشعراء','النمل',
  'القصص','العنكبوت','الروم','لقمان','السجدة','الأحزاب','سبأ','فاطر','يس',
  'الصافات','ص','الزمر','غافر','فصلت','الشورى','الزخرف','الدخان','الجاثية',
  'الأحقاف','محمد','الفتح','الحجرات','ق','الذاريات','الطور','النجم','القمر',
  'الرحمن','الواقعة','الحديد','المجادلة','الحشر','الممتحنة','الصف','الجمعة',
  'المنافقون','التغابن','الطلاق','التحريم','الملك','القلم','الحاقة','المعارج',
  'نوح','الجن','المزمل','المدثر','القيامة','الإنسان','المرسلات','النبأ',
  'النازعات','عبس','التكوير','الانفطار','المطففين','الانشقاق','البروج',
  'الطارق','الأعلى','الغاشية','الفجر','البلد','الشمس','الليل','الضحى',
  'الشرح','التين','العلق','القدر','البينة','الزلزلة','العاديات','القارعة',
  'التكاثر','العصر','الهمزة','الفيل','قريش','الماعون','الكوثر','الكافرون',
  'النصر','المسد','الإخلاص','الفلق','الناس'
];

function escapeText(s) {
  if (typeof s !== 'string') return '';
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, ' ').replace(/\r/g, '');
}

function absoluteToSurahAyah(abs) {
  let remaining = abs - 1;
  for (let surah = 0; surah < SURAH_AYAH_COUNTS.length; surah++) {
    if (remaining < SURAH_AYAH_COUNTS[surah]) {
      return { surahId: surah + 1, ayahNumber: remaining + 1 };
    }
    remaining -= SURAH_AYAH_COUNTS[surah];
  }
  return null;
}

function readJsonFromFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'Accept': 'application/json' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function generateMutashabihat() {
  console.log('=== Generating mutashabihat.ts from Waqar144 data ===');
  const rawPath = path.join(TMP, 'mutashabiha_data.json');
  if (!fs.existsSync(rawPath)) {
    console.error(`File not found: ${rawPath}`);
    return;
  }

  const rawData = readJsonFromFile(rawPath);
  // rawData is keyed by juz number (1-30)
  const allPairs = [];

  for (const [juzKey, entries] of Object.entries(rawData)) {
    for (const entry of entries) {
      const srcAbs = entry.src.ayah;
      const srcArr = Array.isArray(srcAbs) ? srcAbs : [srcAbs];
      const srcMap = srcArr.map(a => absoluteToSurahAyah(a)).filter(Boolean);

      for (const mut of entry.muts) {
        const mutAbs = mut.ayah;
        const mutArr = Array.isArray(mutAbs) ? mutAbs : [mutAbs];
        const mutMap = mutArr.map(a => absoluteToSurahAyah(a)).filter(Boolean);

        allPairs.push({
          src: srcMap,
          muts: mutMap,
          ctx: entry.ctx || 0,
        });
      }
    }
  }

  console.log(`  Total mutashabihat pairs: ${allPairs.length}`);

  // Build surah-keyed lookup for easy access
  const surahLookup = {};
  for (const pair of allPairs) {
    for (const s of pair.src) {
      const key = `${s.surahId}:${s.ayahNumber}`;
      if (!surahLookup[key]) surahLookup[key] = [];
      surahLookup[key].push(pair.muts);
    }
  }

  let code = `// Auto-generated from Waqar144/Quran_Mutashabihat_Data\n`;
  code += `// Converts absolute ayah numbers to surah:ayah format\n\n`;

  code += `export interface MutashabihaPair {\n`;
  code += `  src: { surahId: number; ayahNumber: number }[];\n`;
  code += `  muts: { surahId: number; ayahNumber: number }[];\n`;
  code += `  ctx: number; // 0=none, 1=show next ayah context, 2=show 2 next ayahs\n`;
  code += `}\n\n`;

  // Export as lookup by ayah key "surahId:ayahNumber"
  code += `export const mutashabihatByAyah: Record<string, { surahId: number; ayahNumber: number }[][]> = {\n`;
  const keys = Object.keys(surahLookup).sort((a, b) => {
    const [sa, aa] = a.split(':').map(Number);
    const [sb, ab] = b.split(':').map(Number);
    return sa !== sb ? sa - sb : aa - ab;
  });
  for (const key of keys) {
    const pairs = surahLookup[key];
    code += `  '${key}': [\n`;
    for (const mutGroup of pairs) {
      code += `    [\n`;
      for (const m of mutGroup) {
        code += `      { surahId: ${m.surahId}, ayahNumber: ${m.ayahNumber} },\n`;
      }
      code += `    ],\n`;
    }
    code += `  ],\n`;
  }
  code += `};\n\n`;

  // Also export a flat array for browsing
  code += `export const mutashabihatPairs: MutashabihaPair[] = [\n`;
  for (const pair of allPairs) {
    code += `  {\n`;
    code += `    src: [\n`;
    for (const s of pair.src) {
      code += `      { surahId: ${s.surahId}, ayahNumber: ${s.ayahNumber} },\n`;
    }
    code += `    ],\n`;
    code += `    muts: [\n`;
    for (const m of pair.muts) {
      code += `      { surahId: ${m.surahId}, ayahNumber: ${m.ayahNumber} },\n`;
    }
    code += `    ],\n`;
    code += `    ctx: ${pair.ctx},\n`;
    code += `  },\n`;
  }
  code += `];\n`;

  fs.writeFileSync(path.join(DATA_DIR, 'mutashabihat-from-waqar.ts'), code, 'utf-8');
  console.log(`  Written to data/mutashabihat-from-waqar.ts`);
}

async function generateTopics() {
  console.log('\n=== Generating topics-from-quranpedia.ts ===');
  try {
    const topics = await fetchJson('https://api.quranpedia.net/v1/topics');
    console.log(`  Total topics fetched: ${topics.length}`);

    // Build parent-child tree
    const topicMap = {};
    for (const t of topics) {
      topicMap[t.id] = {
        id: t.id,
        name: t.name,
        parentId: t.parent_id,
        ayahs: t.ayahs || '',
        children: [],
      };
    }

    // Also collect roots
    const roots = [];
    for (const t of topics) {
      if (t.parent_id !== null && t.parent_id !== undefined && topicMap[t.parent_id]) {
        topicMap[t.parent_id].children.push(topicMap[t.id]);
      } else {
        roots.push(topicMap[t.id]);
      }
    }

    console.log(`  Root topics: ${roots.length}`);

    // Generate TypeScript with hierarchy preserved
    let code = `// Auto-generated from Quranpedia API v1/topics\n`;
    code += `// ${topics.length} topics with hierarchical parent-child structure\n\n`;

    code += `export interface QPTopic {\n`;
    code += `  id: number;\n`;
    code += `  name: string;\n`;
    code += `  parentId: number | null;\n`;
    code += `  ayahs: string; // format: "surah:ayah,surah:ayah,..."\n`;
    code += `}\n\n`;

    code += `export const quranpediaTopics: QPTopic[] = [\n`;
    for (const t of topics) {
      code += `  { id: ${t.id}, name: '${escapeText(t.name)}', parentId: ${t.parent_id === null ? 'null' : t.parent_id}, ayahs: '${escapeText(t.ayahs || '')}' },\n`;
    }
    code += `];\n\n`;

    // Build a flat "ayah lookup" - for each ayah, list topic IDs
    const ayahToTopics = {};
    for (const t of topics) {
      if (t.ayahs && t.ayahs.trim()) {
        const ayahList = t.ayahs.split(',').map(s => s.trim()).filter(Boolean);
        for (const ayahRef of ayahList) {
          const parts = ayahRef.split(':');
          if (parts.length === 2) {
            const surahId = parseInt(parts[0]);
            const ayahNumber = parseInt(parts[1]);
            const key = `${surahId}:${ayahNumber}`;
            if (!ayahToTopics[key]) ayahToTopics[key] = [];
            if (!ayahToTopics[key].includes(t.id)) {
              ayahToTopics[key].push(t.id);
            }
          }
        }
      }
    }

    code += `// Ayah→topic lookup: "surahId:ayahNumber" → topic IDs\n`;
    code += `export const ayahToTopicIds: Record<string, number[]> = {\n`;
    const ayahKeys = Object.keys(ayahToTopics).sort();
    for (const key of ayahKeys) {
      code += `  '${key}': [${ayahToTopics[key].join(', ')}],\n`;
    }
    code += `};\n`;

    fs.writeFileSync(path.join(DATA_DIR, 'topics-from-quranpedia.ts'), code, 'utf-8');
    console.log(`  Written to data/topics-from-quranpedia.ts`);
    console.log(`  Unique ayahs mapped: ${ayahKeys.length}`);
  } catch (e) {
    console.error(`  Error fetching topics: ${e.message}`);
  }
}

function generateAsbab() {
  console.log('\n=== Generating asbab-nuzul.ts ===');
  const rawPath = path.join(TMP, 'asbab-all.json');
  if (!fs.existsSync(rawPath)) {
    console.error(`File not found: ${rawPath}`);
    return;
  }

  const rawData = readJsonFromFile(rawPath);
  console.log(`  Total asbab entries: ${rawData.length}`);

  let code = `// Auto-generated from mostafaahmed97/asbab-al-nuzul-dataset\n`;
  code += `// Source: صحيح أسباب النزول - إبراهيم محمد العلي\n\n`;

  code += `export interface AsbabEntry {\n`;
  code += `  surahId: number;\n`;
  code += `  ayahs: number[];\n`;
  code += `  occasions: string[];\n`;
  code += `}\n\n`;

  code += `export const asbabData: AsbabEntry[] = [\n`;
  let totalOccasions = 0;
  for (const entry of rawData) {
    const ayahsStr = JSON.stringify(entry.ayahs);
    const occasionsEscaped = entry.occasions.map(o => `'${escapeText(o)}'`);
    code += `  { surahId: ${entry.surah}, ayahs: ${ayahsStr}, occasions: [${occasionsEscaped.join(', ')}] },\n`;
    totalOccasions += entry.occasions.length;
  }
  code += `];\n`;

  // Also add a surah-keyed lookup for quick access
  code += `\n// Surah-keyed lookup: surahId → entries\n`;
  code += `export const asbabBySurah: Record<number, AsbabEntry[]> = {\n`;
  const bySurah = {};
  for (const entry of rawData) {
    if (!bySurah[entry.surah]) bySurah[entry.surah] = [];
    bySurah[entry.surah].push({ surah: entry.surah, ayahs: entry.ayahs, occasions: entry.occasions });
  }
  const sortedSurahs = Object.keys(bySurah).map(Number).sort((a, b) => a - b);
  for (const surahId of sortedSurahs) {
    const entries = bySurah[surahId];
    code += `  ${surahId}: [\n`;
    for (const e of entries) {
      const ayahsStr = JSON.stringify(e.ayahs);
      const occasionsEscaped = e.occasions.map(o => `'${escapeText(o)}'`);
      code += `    { surahId: ${surahId}, ayahs: ${ayahsStr}, occasions: [${occasionsEscaped.join(', ')}] },\n`;
    }
    code += `  ],\n`;
  }
  code += `};\n`;

  fs.writeFileSync(path.join(DATA_DIR, 'asbab-nuzul.ts'), code, 'utf-8');
  console.log(`  Written to data/asbab-nuzul.ts`);
  console.log(`  Total occasions: ${totalOccasions}`);
}

async function main() {
  console.log('Generating mawduat (topics, mutashabihat, asbab) data files...\n');

  generateMutashabihat();
  await generateTopics();
  generateAsbab();

  console.log('\n=== Done! ===');
}

main().catch(e => console.error('Fatal:', e));
