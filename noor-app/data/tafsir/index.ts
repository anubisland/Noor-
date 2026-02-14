export { TafsirEntry } from './ibn-kathir';
export { ibnKathirTafsir } from './ibn-kathir';
export { sadiTafsir } from './sa3di';
export { tabariTafsir } from './tabari';
export { jalalaynTafsir } from './jalalayn';
export { qurtubiTafsir } from './qurtubi';
export { baghawiTafsir } from './baghawi';
export { muyassarTafsir } from './muyassar';
export { muyassarBatch1 } from './muyassar-batch1';
export { muyassarBatch2 } from './muyassar-batch2';
export { muyassarBatch3 } from './muyassar-batch3';
export { waseetTafsir } from './waseet';

import { ibnKathirTafsir } from './ibn-kathir';
import { sadiTafsir } from './sa3di';
import { tabariTafsir } from './tabari';
import { jalalaynTafsir } from './jalalayn';
import { qurtubiTafsir } from './qurtubi';
import { baghawiTafsir } from './baghawi';
import { muyassarTafsir } from './muyassar';
import { muyassarBatch1 } from './muyassar-batch1';
import { muyassarBatch2 } from './muyassar-batch2';
import { muyassarBatch3 } from './muyassar-batch3';
import { waseetTafsir } from './waseet';
import type { TafsirEntry } from './ibn-kathir';

const allMuyassar = [...muyassarTafsir, ...muyassarBatch1, ...muyassarBatch2, ...muyassarBatch3];

const tafsirSources: Record<string, TafsirEntry[]> = {
  'ibn-kathir': ibnKathirTafsir,
  'sa3di': sadiTafsir,
  'tabari': tabariTafsir,
  'jalalayn': jalalaynTafsir,
  'qurtubi': qurtubiTafsir,
  'baghawi': baghawiTafsir,
  'muyassar': allMuyassar,
  'waseet': waseetTafsir,
};

/**
 * Retrieves the tafsir text for a specific ayah from a specific tafsir source.
 *
 * @param surahId - The surah number (1-114)
 * @param ayahNumber - The ayah number within the surah
 * @param source - The tafsir source identifier: 'ibn-kathir', 'sa3di', or 'tabari'
 * @returns The tafsir text if found, or undefined if not available
 */
export function getTafsirForAyah(
  surahId: number,
  ayahNumber: number,
  source: string
): string | undefined {
  const tafsirData = tafsirSources[source];
  if (!tafsirData) {
    return undefined;
  }

  // Try exact match first
  const exact = tafsirData.find(
    (e) => e.surahId === surahId && e.ayahNumber === ayahNumber
  );
  if (exact) return exact.text;

  // Fallback: find nearest entry in the same surah
  const surahEntries = tafsirData
    .filter((e) => e.surahId === surahId)
    .sort((a, b) => a.ayahNumber - b.ayahNumber);

  if (surahEntries.length === 0) return undefined;

  // Find closest preceding entry, or first entry in surah
  let nearest = surahEntries[0];
  for (const entry of surahEntries) {
    if (entry.ayahNumber <= ayahNumber) {
      nearest = entry;
    } else {
      break;
    }
  }

  return nearest.text;
}
