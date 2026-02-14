export const APP_CONFIG = {
  name: 'نور',
  nameEn: 'Noor Islam',
  version: '1.0.0',
  description: 'تطبيق شامل لخدمة القرآن الكريم',
  totalSurahs: 114,
  totalJuz: 30,
  totalAyahs: 6236,
};

export const AUDIO_BASE_URL = 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/';

export const SURAH_TYPES = {
  meccan: 'مكية',
  medinan: 'مدنية',
} as const;

export const MEMORIZATION_MODES = {
  REPETITION: 'repetition',
  FILL_BLANK: 'fill_blank',
  ORDERING: 'ordering',
  VOICE_TEST: 'voice_test',
  TASMI: 'tasmi',
} as const;

export const MUTASHABIHAT_LEVELS = {
  SURAH: 'surah',
  JUZ: 'juz',
  QURAN: 'quran',
} as const;

export const ALL_TAFSIR_SOURCES = [
  { id: 'ibn-kathir', name: 'ابن كثير', nameEn: 'Ibn Kathir', description: 'تفسير القرآن العظيم - من أشهر التفاسير بالمأثور' },
  { id: 'sa3di', name: 'السعدي', nameEn: 'Al-Saadi', description: 'تيسير الكريم الرحمن - تفسير واضح ومبسط' },
  { id: 'tabari', name: 'الطبري', nameEn: 'Al-Tabari', description: 'جامع البيان - أقدم التفاسير وأشملها' },
  { id: 'jalalayn', name: 'الجلالين', nameEn: 'Al-Jalalayn', description: 'تفسير الجلالين - تفسير مختصر وموجز' },
  { id: 'qurtubi', name: 'القرطبي', nameEn: 'Al-Qurtubi', description: 'الجامع لأحكام القرآن - تفسير فقهي' },
  { id: 'baghawi', name: 'البغوي', nameEn: 'Al-Baghawi', description: 'معالم التنزيل - تفسير متوازن بالرواية والدراية' },
  { id: 'muyassar', name: 'الميسر', nameEn: 'Al-Muyassar', description: 'التفسير الميسر - مبسط وسهل الفهم' },
  { id: 'waseet', name: 'الوسيط', nameEn: 'Al-Waseet', description: 'التفسير الوسيط - لشيخ الأزهر محمد سيد طنطاوي' },
] as const;

export const DEFAULT_SELECTED_TAFSIRS = ['ibn-kathir', 'sa3di', 'tabari'];

// Backward compatibility
export const TAFSIR_SOURCES = ALL_TAFSIR_SOURCES;
