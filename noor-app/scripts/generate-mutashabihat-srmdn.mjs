import fs from 'fs';
import path from 'path';

const DATA_DIR = path.resolve('data');
const TMP = process.env.TEMP || 'C:\\Temp';

function escapeText(s) {
  if (typeof s !== 'string') return '';
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, ' ').replace(/\r/g, '').trim();
}

function generateSrmdnMutashabihat() {
  console.log('=== Generating mutashabihat-from-srmdn.ts ===');

  const rawPath = path.join(TMP, 'pairs.json');
  if (!fs.existsSync(rawPath)) {
    console.error(`File not found: ${rawPath}`);
    return;
  }

  const rawData = JSON.parse(fs.readFileSync(rawPath, 'utf-8'));
  console.log(`  Total pairs: ${rawData.length}`);

  // Filter to curated only (have real category and note)
  const curated = rawData.filter(p => p.status === 'curated' && p.category && p.category.trim() !== '');
  console.log(`  Curated with category: ${curated.length}`);

  // Also include a few high-quality pending ones with notes but no category
  const pendingWithNotes = rawData.filter(p => p.status === 'pending' && p.note && p.note.trim() !== '');
  console.log(`  Pending with notes: ${pendingWithNotes.length}`);

  // Category display mapping
  const categoryDisplay = {
    'lafzi': { name: 'لفظي', nameEn: 'Verbal', color: '#2980B9' },
    'word_swap': { name: 'تبديل كلمات', nameEn: 'Word Swap', color: '#E67E22' },
    'addition_omission': { name: 'زيادة ونقص', nameEn: 'Addition/Omission', color: '#27AE60' },
    'context_shift': { name: 'تحول السياق', nameEn: 'Context Shift', color: '#8E44AD' },
    'structural': { name: 'تركيبي', nameEn: 'Structural', color: '#F39C12' },
    'order_change': { name: 'تغيير الترتيب', nameEn: 'Order Change', color: '#E74C3C' },
    'ending_variation': { name: 'اختلاف الخاتمة', nameEn: 'Ending Variation', color: '#16A085' },
    'pronoun_shift': { name: 'تحول الضمير', nameEn: 'Pronoun Shift', color: '#D35400' },
  };

  let code = `// Auto-generated from srmdn/quran-mutashabihat\n`;
  code += `// ${curated.length} curated pairs with categories and explanatory notes\n\n`;

  code += `export interface SrmdnPair {\n`;
  code += `  ayah1: string;   // "surahId:ayahNumber"\n`;
  code += `  ayah2: string;   // "surahId:ayahNumber"\n`;
  code += `  category: string;\n`;
  code += `  note: string;    // Human-readable explanation of the difference\n`;
  code += `}\n\n`;

  code += `export interface SrmdnCategory {\n`;
  code += `  id: string;\n`;
  code += `  name: string;\n`;
  code += `  nameEn: string;\n`;
  code += `  color: string;\n`;
  code += `}\n\n`;

  code += `export const srmdnCategories: SrmdnCategory[] = [\n`;
  for (const [catId, cat] of Object.entries(categoryDisplay)) {
    code += `  { id: '${catId}', name: '${cat.name}', nameEn: '${cat.nameEn}', color: '${cat.color}' },\n`;
  }
  code += `];\n\n`;

  code += `// Curated pairs with human-readable notes explaining the differences\n`;
  code += `export const srmdnPairs: SrmdnPair[] = [\n`;
  for (const p of curated) {
    const note = escapeText(p.note);
    code += `  { ayah1: '${p.ayah1}', ayah2: '${p.ayah2}', category: '${p.category}', note: '${note}' },\n`;
  }
  code += `];\n\n`;

  // Ayah-keyed lookup: for a given ayah "surahId:ayahNumber", find similar verses
  const ayahLookup = {};
  for (const p of curated) {
    if (!ayahLookup[p.ayah1]) ayahLookup[p.ayah1] = [];
    ayahLookup[p.ayah1].push({ ayah: p.ayah2, category: p.category, note: p.note });
    if (!ayahLookup[p.ayah2]) ayahLookup[p.ayah2] = [];
    ayahLookup[p.ayah2].push({ ayah: p.ayah1, category: p.category, note: p.note });
  }

  code += `// Ayah-keyed lookup: "surahId:ayahNumber" → similar verses\n`;
  code += `export const srmdnLookup: Record<string, { ayah: string; category: string; note: string }[]> = {\n`;
  const sortedKeys = Object.keys(ayahLookup).sort();
  for (const key of sortedKeys) {
    const matches = ayahLookup[key];
    code += `  '${key}': [\n`;
    for (const m of matches) {
      code += `    { ayah: '${m.ayah}', category: '${m.category}', note: '${escapeText(m.note)}' },\n`;
    }
    code += `  ],\n`;
  }
  code += `};\n`;

  // Count unique ayahs
  console.log(`  Unique ayahs in lookup: ${sortedKeys.length}`);

  const outPath = path.join(DATA_DIR, 'mutashabihat-from-srmdn.ts');
  fs.writeFileSync(outPath, code, 'utf-8');
  console.log(`  Written to data/mutashabihat-from-srmdn.ts`);
}

generateSrmdnMutashabihat();
