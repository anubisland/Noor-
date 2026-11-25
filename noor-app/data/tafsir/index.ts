export type { TafsirEntry } from './types';
export { muyassarTafsir } from './muyassar';
export { jalalaynTafsir } from './jalalayn';
export { sa3diTafsir } from './sa3di';
export { waseetTafsir } from './waseet';
export { baghawiTafsir } from './baghawi';

import { muyassarTafsir } from './muyassar';
import { jalalaynTafsir } from './jalalayn';
import { sa3diTafsir } from './sa3di';
import { waseetTafsir } from './waseet';
import { baghawiTafsir } from './baghawi';
import type { TafsirEntry } from './types';

const tafsirSources: Record<string, TafsirEntry[]> = {
  'muyassar': muyassarTafsir,
  'jalalayn': jalalaynTafsir,
  'sa3di': sa3diTafsir,
  'waseet': waseetTafsir,
  'baghawi': baghawiTafsir,
};

export function getTafsirForAyah(
  surahId: number,
  ayahNumber: number,
  source: string
): string | undefined {
  const tafsirData = tafsirSources[source];
  if (!tafsirData) return undefined;

  const exact = tafsirData.find(
    (e) => e.surahId === surahId && e.ayahNumber === ayahNumber
  );
  if (exact && exact.text && exact.text.trim()) {
    return exact.text;
  }
  return undefined;
}
