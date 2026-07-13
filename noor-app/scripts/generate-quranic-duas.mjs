import fs from 'fs';
import path from 'path';

const DATA_DIR = path.resolve('data');

// Helper: parse a TypeScript file that exports a const to get a preview
function extractExportedArray(filePath, exportName) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // For quran.ts: export const quranData: Surah[] = [...]
  if (exportName === 'quranData') {
    // Extract each surah's ayahs by parsing the text property
    const surahMatches = content.matchAll(/surahId:\s*(\d+)[^}]*?ayahNumber:\s*(\d+)[^}]*?text:\s*'((?:[^'\\]|\\.)*)'/gs);
    const result = {};
    for (const m of surahMatches) {
      const surahId = parseInt(m[1]);
      const ayahNumber = parseInt(m[2]);
      const text = m[3].replace(/\\'/g, "'");
      if (!result[surahId]) result[surahId] = {};
      result[surahId][ayahNumber] = text;
    }
    return result;
  }

  // For translation files
  if (exportName === 'englishTranslation') {
    const ayahMatches = content.matchAll(/surahId:\s*(\d+)[^}]*?ayahNumber:\s*(\d+)[^}]*?text:\s*'((?:[^'\\]|\\.)*)'/gs);
    const result = {};
    for (const m of ayahMatches) {
      const surahId = parseInt(m[1]);
      const ayahNumber = parseInt(m[2]);
      const text = m[3].replace(/\\'/g, "'");
      if (!result[surahId]) result[surahId] = {};
      result[surahId][ayahNumber] = text;
    }
    return result;
  }

  throw new Error(`Unknown export: ${exportName}`);
}

// Comprehensive list of Quranic duas (surahId:ayahNumber)
// Collected from Quranpedia topic "الأدعية الواردة في القرآن الكريم" + additional well-known duas
const DUA_AYAHS = [
  // === Al-Fatiha ===
  { surahId: 1, ayahNumber: 5, category: 'ibadah', order: 1 },

  // === Al-Baqarah ===
  { surahId: 2, ayahNumber: 126, category: 'prophets', order: 2 },
  { surahId: 2, ayahNumber: 127, category: 'prophets', order: 3 },
  { surahId: 2, ayahNumber: 128, category: 'prophets', order: 4 },
  { surahId: 2, ayahNumber: 129, category: 'prophets', order: 5 },
  { surahId: 2, ayahNumber: 201, category: 'believers', order: 6 },
  { surahId: 2, ayahNumber: 250, category: 'believers', order: 7 },
  { surahId: 2, ayahNumber: 286, category: 'believers', order: 8 },

  // === Aal-e-Imran ===
  { surahId: 3, ayahNumber: 8, category: 'believers', order: 9 },
  { surahId: 3, ayahNumber: 9, category: 'believers', order: 10 },
  { surahId: 3, ayahNumber: 16, category: 'believers', order: 11 },
  { surahId: 3, ayahNumber: 26, category: 'believers', order: 12 },
  { surahId: 3, ayahNumber: 38, category: 'prophets', order: 13 },
  { surahId: 3, ayahNumber: 53, category: 'believers', order: 14 },
  { surahId: 3, ayahNumber: 147, category: 'believers', order: 15 },
  { surahId: 3, ayahNumber: 173, category: 'believers', order: 16 },
  { surahId: 3, ayahNumber: 191, category: 'believers', order: 17 },
  { surahId: 3, ayahNumber: 193, category: 'believers', order: 18 },
  { surahId: 3, ayahNumber: 194, category: 'believers', order: 19 },

  // === An-Nisa ===
  { surahId: 4, ayahNumber: 75, category: 'believers', order: 20 },

  // === Al-Maidah ===
  { surahId: 5, ayahNumber: 114, category: 'prophets', order: 21 },
  { surahId: 5, ayahNumber: 83, category: 'believers', order: 22 },

  // === Al-An'am ===
  { surahId: 6, ayahNumber: 79, category: 'prophets', order: 23 },

  // === Al-A'raf ===
  { surahId: 7, ayahNumber: 23, category: 'prophets', order: 24 },
  { surahId: 7, ayahNumber: 47, category: 'believers', order: 25 },
  { surahId: 7, ayahNumber: 89, category: 'believers', order: 26 },
  { surahId: 7, ayahNumber: 126, category: 'believers', order: 27 },
  { surahId: 7, ayahNumber: 151, category: 'prophets', order: 28 },

  // === Al-Anfal ===
  { surahId: 8, ayahNumber: 9, category: 'believers', order: 29 },

  // === At-Tawbah ===
  { surahId: 9, ayahNumber: 129, category: 'believers', order: 30 },

  // === Yunus ===
  { surahId: 10, ayahNumber: 85, category: 'believers', order: 31 },
  { surahId: 10, ayahNumber: 86, category: 'believers', order: 32 },
  { surahId: 10, ayahNumber: 88, category: 'prophets', order: 33 },

  // === Hud ===
  { surahId: 11, ayahNumber: 45, category: 'prophets', order: 34 },
  { surahId: 11, ayahNumber: 47, category: 'prophets', order: 35 },
  { surahId: 11, ayahNumber: 61, category: 'prophets', order: 36 },

  // === Yusuf ===
  { surahId: 12, ayahNumber: 101, category: 'prophets', order: 37 },

  // === Ibrahim ===
  { surahId: 14, ayahNumber: 35, category: 'prophets', order: 38 },
  { surahId: 14, ayahNumber: 37, category: 'prophets', order: 39 },
  { surahId: 14, ayahNumber: 38, category: 'prophets', order: 40 },
  { surahId: 14, ayahNumber: 40, category: 'prophets', order: 41 },
  { surahId: 14, ayahNumber: 41, category: 'prophets', order: 42 },

  // === Al-Isra ===
  { surahId: 17, ayahNumber: 24, category: 'believers', order: 43 },
  { surahId: 17, ayahNumber: 80, category: 'believers', order: 44 },

  // === Al-Kahf ===
  { surahId: 18, ayahNumber: 10, category: 'believers', order: 45 },

  // === Maryam ===
  { surahId: 19, ayahNumber: 2, category: 'prophets', order: 46 },
  { surahId: 19, ayahNumber: 3, category: 'prophets', order: 47 },
  { surahId: 19, ayahNumber: 4, category: 'prophets', order: 48 },
  { surahId: 19, ayahNumber: 5, category: 'prophets', order: 49 },
  { surahId: 19, ayahNumber: 6, category: 'prophets', order: 50 },

  // === Taha ===
  { surahId: 20, ayahNumber: 25, category: 'prophets', order: 51 },
  { surahId: 20, ayahNumber: 26, category: 'prophets', order: 52 },
  { surahId: 20, ayahNumber: 27, category: 'prophets', order: 53 },
  { surahId: 20, ayahNumber: 28, category: 'prophets', order: 54 },
  { surahId: 20, ayahNumber: 29, category: 'prophets', order: 55 },
  { surahId: 20, ayahNumber: 30, category: 'prophets', order: 56 },
  { surahId: 20, ayahNumber: 31, category: 'prophets', order: 57 },
  { surahId: 20, ayahNumber: 32, category: 'prophets', order: 58 },
  { surahId: 20, ayahNumber: 33, category: 'prophets', order: 59 },
  { surahId: 20, ayahNumber: 34, category: 'prophets', order: 60 },
  { surahId: 20, ayahNumber: 35, category: 'prophets', order: 61 },
  { surahId: 20, ayahNumber: 114, category: 'believers', order: 62 },

  // === Al-Anbiya ===
  { surahId: 21, ayahNumber: 83, category: 'prophets', order: 63 },
  { surahId: 21, ayahNumber: 87, category: 'prophets', order: 64 },
  { surahId: 21, ayahNumber: 89, category: 'prophets', order: 65 },

  // === Al-Mu'minun ===
  { surahId: 23, ayahNumber: 29, category: 'prophets', order: 66 },
  { surahId: 23, ayahNumber: 97, category: 'believers', order: 67 },
  { surahId: 23, ayahNumber: 98, category: 'believers', order: 68 },
  { surahId: 23, ayahNumber: 109, category: 'believers', order: 69 },
  { surahId: 23, ayahNumber: 118, category: 'believers', order: 70 },

  // === Al-Furqan ===
  { surahId: 25, ayahNumber: 65, category: 'believers', order: 71 },
  { surahId: 25, ayahNumber: 66, category: 'believers', order: 72 },
  { surahId: 25, ayahNumber: 74, category: 'believers', order: 73 },

  // === Ash-Shu'ara ===
  { surahId: 26, ayahNumber: 83, category: 'prophets', order: 74 },
  { surahId: 26, ayahNumber: 84, category: 'prophets', order: 75 },
  { surahId: 26, ayahNumber: 85, category: 'prophets', order: 76 },
  { surahId: 26, ayahNumber: 86, category: 'prophets', order: 77 },
  { surahId: 26, ayahNumber: 87, category: 'prophets', order: 78 },
  { surahId: 26, ayahNumber: 168, category: 'prophets', order: 79 },

  // === An-Naml ===
  { surahId: 27, ayahNumber: 19, category: 'prophets', order: 80 },

  // === Al-Qasas ===
  { surahId: 28, ayahNumber: 16, category: 'prophets', order: 81 },
  { surahId: 28, ayahNumber: 24, category: 'prophets', order: 82 },

  // === Al-Ankabut ===
  { surahId: 29, ayahNumber: 30, category: 'prophets', order: 83 },

  // === As-Saffat ===
  { surahId: 37, ayahNumber: 100, category: 'prophets', order: 84 },

  // === Sad ===
  { surahId: 38, ayahNumber: 35, category: 'prophets', order: 85 },

  // === Ghafir ===
  { surahId: 40, ayahNumber: 60, category: 'believers', order: 86 },

  // === Ash-Shura ===
  { surahId: 42, ayahNumber: 19, category: 'believers', order: 87 },

  // === Ad-Dukhan ===
  { surahId: 44, ayahNumber: 12, category: 'believers', order: 88 },

  // === Al-Mumtahanah ===
  { surahId: 60, ayahNumber: 4, category: 'prophets', order: 89 },
  { surahId: 60, ayahNumber: 5, category: 'believers', order: 90 },

  // === At-Tahrim ===
  { surahId: 66, ayahNumber: 8, category: 'believers', order: 91 },

  // === Nuh ===
  { surahId: 71, ayahNumber: 28, category: 'prophets', order: 92 },

  // === Al-Muzzammil ===
  { surahId: 73, ayahNumber: 20, category: 'believers', order: 93 },

  // === Al-Hashr ===
  { surahId: 59, ayahNumber: 10, category: 'believers', order: 94 },

  // === Aal-e-Imran (angels) ===
  { surahId: 3, ayahNumber: 87, category: 'angels', order: 95 },

  // === Al-Baqarah ===
  { surahId: 2, ayahNumber: 186, category: 'encouragement', order: 96 },

  // === Aal-e-Imran ===
  { surahId: 3, ayahNumber: 35, category: 'believers', order: 97 },
];

function escapeText(s) {
  if (typeof s !== 'string') return '';
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, ' ').replace(/\r/g, '');
}

function generateQuranicDuas() {
  console.log('=== Generating quranic-duas.ts ===');

  // Extract Arabic text from quran.ts
  console.log('  Reading Arabic text from quran.ts...');
  const arabicText = extractExportedArray(path.join(DATA_DIR, 'quran.ts'), 'quranData');

  // Also read quran-part2, part3, part4
  for (const part of ['quran-part2.ts', 'quran-part3.ts', 'quran-part4.ts']) {
    const partPath = path.join(DATA_DIR, part);
    if (fs.existsSync(partPath)) {
      const partData = extractExportedArray(partPath, 'quranData');
      for (const [sId, ayahs] of Object.entries(partData)) {
        if (!arabicText[sId]) arabicText[sId] = {};
        Object.assign(arabicText[sId], ayahs);
      }
    }
  }

  console.log(`  Loaded Arabic text for ${Object.keys(arabicText).length} surahs`);

  // Extract English translation
  console.log('  Reading English translation...');
  const transFiles = ['en.ts', 'en-batch1.ts', 'en-batch2.ts', 'en-batch3.ts'];
  const englishTrans = {};
  for (const f of transFiles) {
    const fPath = path.join(DATA_DIR, 'translations', f);
    if (fs.existsSync(fPath)) {
      const partData = extractExportedArray(fPath, 'englishTranslation');
      for (const [sId, ayahs] of Object.entries(partData)) {
        if (!englishTrans[sId]) englishTrans[sId] = {};
        Object.assign(englishTrans[sId], ayahs);
      }
    }
  }

  console.log(`  Loaded translations for ${Object.keys(englishTrans).length} surahs`);

  // Surah names
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

  // Category definitions
  const CATEGORIES = {
    prophets: { name: 'دعاء الأنبياء', nameEn: 'Duas of the Prophets', icon: 'people' },
    believers: { name: 'دعاء المؤمنين', nameEn: 'Duas of the Believers', icon: 'heart' },
    angels: { name: 'دعاء الملائكة', nameEn: 'Duas of the Angels', icon: 'logo-ionitron' },
    ibadah: { name: 'دعاء العبادة', nameEn: 'Dua of Worship', icon: 'hand-left' },
    encouragement: { name: 'الحث على الدعاء', nameEn: 'Encouragement to Supplicate', icon: 'megaphone' },
  };

  // Build the data
  const entries = [];
  let missingText = 0;
  let missingTrans = 0;

  for (const item of DUA_AYAHS) {
    const { surahId, ayahNumber, category, order } = item;
    const arabic = arabicText[surahId]?.[ayahNumber];
    const trans = englishTrans[surahId]?.[ayahNumber];

    if (!arabic) {
      console.log(`  WARNING: Missing Arabic text for ${surahId}:${ayahNumber}`);
      missingText++;
    }
    if (!trans) {
      console.log(`  WARNING: Missing translation for ${surahId}:${ayahNumber}`);
      missingTrans++;
    }

    entries.push({
      id: entries.length + 1,
      surahId,
      ayahNumber,
      arabic: arabic || '',
      translation: trans || '',
      surahName: SURAH_NAMES[surahId - 1] || '',
      category,
      order,
    });
  }

  // Sort by order
  entries.sort((a, b) => a.order - b.order);

  console.log(`  Total entries: ${entries.length}`);
  console.log(`  Missing texts: ${missingText}`);
  console.log(`  Missing translations: ${missingTrans}`);

  // Generate TypeScript
  let code = `// Auto-generated from Quranic duas collection\n`;
  code += `// ${entries.length} duas from the Noble Quran, organized by surah order\n\n`;

  code += `export interface QuranicDua {\n`;
  code += `  id: number;\n`;
  code += `  surahId: number;\n`;
  code += `  ayahNumber: number;\n`;
  code += `  arabic: string;\n`;
  code += `  translation: string;\n`;
  code += `  surahName: string;\n`;
  code += `  category: string;\n`;
  code += `}\n\n`;

  code += `export interface DuaCategory {\n`;
  code += `  id: string;\n`;
  code += `  name: string;\n`;
  code += `  nameEn: string;\n`;
  code += `  icon: string;\n`;
  code += `}\n\n`;

  code += `export const duaCategories: DuaCategory[] = [\n`;
  for (const [catId, cat] of Object.entries(CATEGORIES)) {
    code += `  { id: '${catId}', name: '${cat.name}', nameEn: '${cat.nameEn}', icon: '${cat.icon}' },\n`;
  }
  code += `];\n\n`;

  code += `export const quranicDuas: QuranicDua[] = [\n`;
  for (const e of entries) {
    code += `  { id: ${e.id}, surahId: ${e.surahId}, ayahNumber: ${e.ayahNumber}, arabic: '${escapeText(e.arabic)}', translation: '${escapeText(e.translation)}', surahName: '${e.surahName}', category: '${e.category}' },\n`;
  }
  code += `];\n\n`;

  // Grouped by category for convenience
  code += `// Duas grouped by category\n`;
  code += `export const duasByCategory: Record<string, QuranicDua[]> = {\n`;
  for (const catId of Object.keys(CATEGORIES)) {
    const catEntries = entries.filter(e => e.category === catId);
    code += `  '${catId}': [\n`;
    for (const e of catEntries) {
      code += `    { id: ${e.id}, surahId: ${e.surahId}, ayahNumber: ${e.ayahNumber}, arabic: '${escapeText(e.arabic)}', translation: '${escapeText(e.translation)}', surahName: '${e.surahName}', category: '${e.category}' },\n`;
    }
    code += `  ],\n`;
  }
  code += `};\n`;

  fs.writeFileSync(path.join(DATA_DIR, 'quranic-duas.ts'), code, 'utf-8');
  console.log(`  Written to data/quranic-duas.ts`);
}

generateQuranicDuas();
