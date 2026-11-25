import AsyncStorage from '@react-native-async-storage/async-storage';

export type EnglishTafsirSource = 'mukhtasar' | 'jalalayn';

export const ENGLISH_TAFSIR_SOURCES: { id: EnglishTafsirSource; name: string; nameEn: string }[] = [
  { id: 'mukhtasar', name: 'المختصر في التفسير (افتراضي)', nameEn: 'Al-Mukhtasar in Tafsir' },
  { id: 'jalalayn', name: 'تفسير الجلالين', nameEn: 'Tafsir Al-Jalalayn' },
];

const memoryCache = new Map<string, string>();

/**
 * Fetches strictly verse-by-verse (ayah-by-ayah) English Tafsir
 * Default: Al-Mukhtasar fi Tafsir al-Qur'an (Tafsir Center, Riyadh)
 * Option: Tafsir al-Jalalayn in English (Royal Aal al-Bayt Institute)
 */
export async function fetchEnglishTafsir(
  surahId: number,
  ayahNumber: number,
  source: EnglishTafsirSource = 'mukhtasar'
): Promise<string | null> {
  const edition = source === 'jalalayn' ? 'en-al-jalalayn' : 'en-tafsir-al-mukhtasar';
  const key = `en_tafsir_${edition}_${surahId}_${ayahNumber}`;

  if (memoryCache.has(key)) {
    return memoryCache.get(key) || null;
  }

  try {
    const cached = await AsyncStorage.getItem(key);
    if (cached) {
      memoryCache.set(key, cached);
      return cached;
    }
  } catch (e) {
    // Ignore cache read errors
  }

  try {
    const url = `https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@v1.2.3/tafsir/${edition}/${surahId}/${ayahNumber}.json`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      const text = data.text ? String(data.text).trim() : null;
      if (text) {
        memoryCache.set(key, text);
        AsyncStorage.setItem(key, text).catch(() => {});
        return text;
      }
    }
  } catch (e) {
    console.log('Error fetching verse English tafsir:', e);
  }

  return null;
}
