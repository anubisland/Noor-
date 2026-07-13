import fs from 'fs';
import path from 'path';

const DATA_DIR = path.resolve('data');
const TMP = process.env.TEMP || 'C:\\Temp';

function escapeText(s) {
  if (typeof s !== 'string') return '';
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, ' ').replace(/\r/g, '').trim();
}

function generateAdhkar() {
  console.log('=== Generating adhkar.ts from Hisn al-Muslim ===');

  const rawPath = path.join(TMP, 'adhkar.json');
  if (!fs.existsSync(rawPath)) {
    console.error(`File not found: ${rawPath}`);
    return;
  }

  const rawData = JSON.parse(fs.readFileSync(rawPath, 'utf-8'));
  console.log(`  Total categories: ${rawData.length}`);

  let totalEntries = 0;
  for (const cat of rawData) {
    totalEntries += cat.array.length;
  }
  console.log(`  Total dhikr entries: ${totalEntries}`);

  let code = `// Auto-generated from rn0x/Adhkar-json (Hisn al-Muslim)\n`;
  code += `// ${rawData.length} categories, ${totalEntries} dhikr entries\n\n`;

  code += `export interface DhikrEntry {\n`;
  code += `  id: number;\n`;
  code += `  text: string;\n`;
  code += `  count: number;\n`;
  code += `}\n\n`;

  code += `export interface AdhkarCategory {\n`;
  code += `  id: number;\n`;
  code += `  name: string;\n`;
  code += `  entries: DhikrEntry[];\n`;
  code += `}\n\n`;

  code += `export const adhkarData: AdhkarCategory[] = [\n`;

  for (const cat of rawData) {
    const catName = escapeText(cat.category);
    code += `  {\n`;
    code += `    id: ${cat.id},\n`;
    code += `    name: '${catName}',\n`;
    code += `    entries: [\n`;

    for (const entry of cat.array) {
      const text = escapeText(entry.text);
      code += `      { id: ${entry.id}, text: '${text}', count: ${entry.count} },\n`;
    }

    code += `    ],\n`;
    code += `  },\n`;
  }

  code += `];\n`;

  const outPath = path.join(DATA_DIR, 'adhkar.ts');
  fs.writeFileSync(outPath, code, 'utf-8');
  console.log(`  Written to data/adhkar.ts`);
}

generateAdhkar();
