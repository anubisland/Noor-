import fs from 'fs';
import path from 'path';

async function generateQuranData() {
  console.log('Fetching official Uthmani Quran data from alquran.cloud...');
  const res = await fetch('https://api.alquran.cloud/v1/quran/quran-uthmani');
  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.statusText}`);
  }
  const json = await res.json();
  const rawSurahs = json.data.surahs;

  console.log(`Fetched ${rawSurahs.length} surahs.`);

  const bismillahRegex = /^[\uFEFF\s]*بّ?ِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ\s*/;

  let totalAyahs = 0;
  const surahs = [];
  const pages = Array.from({ length: 605 }, () => []);

  for (const s of rawSurahs) {
    const ayahs = [];
    for (const a of s.ayahs) {
      totalAyahs++;
      let text = a.text;
      if (s.number === 1) {
        text = text.replace(/^\uFEFF/, '').trim();
      } else if (s.number === 9) {
        text = text.replace(/^\uFEFF/, '').trim();
      } else if (a.numberInSurah === 1) {
        text = text.replace(bismillahRegex, '').trim();
      } else {
        text = text.trim();
      }

      // Escape quotes for TS
      const safeText = text.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

      const ayahObj = {
        id: a.number,
        surahId: s.number,
        ayahNumber: a.numberInSurah,
        text: safeText,
        juz: a.juz,
        page: a.page,
        hizbQuarter: a.hizbQuarter,
        sajda: a.sajda ? true : false,
      };

      ayahs.push(ayahObj);
      pages[a.page].push({
        globalId: a.number,
        surahId: s.number,
        ayahNumber: a.numberInSurah,
        text: safeText,
        juz: a.juz,
        page: a.page,
        hizbQuarter: a.hizbQuarter,
        sajda: a.sajda ? true : false,
      });
    }

    surahs.push({
      id: s.number,
      ayahs,
    });
  }

  console.log(`Processed ${totalAyahs} ayahs across ${surahs.length} surahs.`);

  // Verify all 604 pages have ayahs
  let missingPages = 0;
  for (let p = 1; p <= 604; p++) {
    if (!pages[p] || pages[p].length === 0) {
      missingPages++;
      console.error(`Missing page: ${p}`);
    }
  }

  if (missingPages > 0) {
    throw new Error(`Integrity check failed: ${missingPages} pages are empty!`);
  }
  console.log('Integrity check passed: All 604 pages are fully mapped.');

  // Write data/quran.ts
  const quranTsPath = path.resolve('data/quran.ts');
  console.log(`Writing to ${quranTsPath}...`);

  let quranTsContent = `export interface Ayah {
  id: number;          // Global ayah number (1-6236)
  surahId: number;     // Surah number (1-114)
  ayahNumber: number;  // Ayah number within surah
  text: string;        // Authentic Uthmani Arabic text
  juz: number;         // Juz number (1-30)
  page: number;        // Madinah Mushaf page (1-604)
  hizbQuarter?: number;// Hizb quarter (1-240)
  sajda?: boolean;     // Whether this ayah contains a sajda
}

export interface Surah {
  id: number;
  ayahs: Ayah[];
}

export const quranData: Surah[] = [\n`;

  for (const s of surahs) {
    quranTsContent += `  {\n    id: ${s.id},\n    ayahs: [\n`;
    for (const a of s.ayahs) {
      quranTsContent += `      {\n        id: ${a.id},\n        surahId: ${a.surahId},\n        ayahNumber: ${a.ayahNumber},\n        text: '${a.text}',\n        juz: ${a.juz},\n        page: ${a.page},\n        hizbQuarter: ${a.hizbQuarter},\n        sajda: ${a.sajda},\n      },\n`;
    }
    quranTsContent += `    ],\n  },\n`;
  }
  quranTsContent += `];\n\n`;

  // Add helper lookup functions
  quranTsContent += `// Quick Ayah Lookup by surahId and ayahNumber
export function getAyah(surahId: number, ayahNumber: number): Ayah | undefined {
  const surah = quranData.find((s) => s.id === surahId);
  return surah?.ayahs.find((a) => a.ayahNumber === ayahNumber);
}

// Quick Ayah Lookup by global ID (1-6236)
export function getAyahByGlobalId(id: number): Ayah | undefined {
  for (const surah of quranData) {
    const found = surah.ayahs.find((a) => a.id === id);
    if (found) return found;
  }
  return undefined;
}

// Get all ayahs in a specific Madinah Mushaf page (1-604)
export function getAyahsByPage(pageNumber: number): Ayah[] {
  const result: Ayah[] = [];
  for (const surah of quranData) {
    for (const ayah of surah.ayahs) {
      if (ayah.page === pageNumber) {
        result.push(ayah);
      }
    }
  }
  return result;
}
`;

  fs.writeFileSync(quranTsPath, quranTsContent, 'utf8');
  console.log(`Successfully generated ${quranTsPath} (${(fs.statSync(quranTsPath).size / 1024 / 1024).toFixed(2)} MB)`);

  // Write data/pages-metadata.ts
  const pagesMetaPath = path.resolve('data/pages-metadata.ts');
  console.log(`Writing pages metadata to ${pagesMetaPath}...`);

  let pagesMetaContent = `export interface PageMeta {
  page: number;
  juz: number;
  surahs: { id: number; startAyah: number; endAyah: number }[];
}

export const pagesMetadata: PageMeta[] = [\n`;

  for (let p = 1; p <= 604; p++) {
    const pageAyahs = pages[p];
    const juz = pageAyahs[0].juz;
    const surahMap = new Map();
    for (const a of pageAyahs) {
      if (!surahMap.has(a.surahId)) {
        surahMap.set(a.surahId, { startAyah: a.ayahNumber, endAyah: a.ayahNumber });
      } else {
        surahMap.get(a.surahId).endAyah = a.ayahNumber;
      }
    }

    const surahsArray = Array.from(surahMap.entries()).map(([id, range]) => {
      return `{ id: ${id}, startAyah: ${range.startAyah}, endAyah: ${range.endAyah} }`;
    });

    pagesMetaContent += `  { page: ${p}, juz: ${juz}, surahs: [${surahsArray.join(', ')}] },\n`;
  }

  pagesMetaContent += `];\n`;
  fs.writeFileSync(pagesMetaPath, pagesMetaContent, 'utf8');
  console.log(`Successfully generated ${pagesMetaPath}`);
}

generateQuranData().catch(e => {
  console.error(e);
  process.exit(1);
});
