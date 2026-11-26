import { Platform } from 'react-native';

export const APP_CONFIG = {
  name: Platform.OS === 'web' ? 'نور القرآن الكريم' : 'زاد القرآن الكريم',
  nameEn: Platform.OS === 'web' ? 'Noor Al-Quran' : 'Zad Al-Quran',
  version: '2.1.5',
  description: 'تطبيق شامل لخدمة القرآن الكريم وتدبر آياته',
  totalSurahs: 114,
  totalJuz: 30,
  totalAyahs: 6236,
};

// الشيخ محمود خليل الحصري - المصحف المرتل برواية حفص عن عاصم
export const DEFAULT_RECITER = {
  id: 'ar.husary',
  name: 'محمود خليل الحصري (مرتل)',
  baseUrl: 'https://cdn.islamic.network/quran/audio/128/ar.husary/',
};

export const AUDIO_BASE_URL = DEFAULT_RECITER.baseUrl;

export const RECITERS = [
  {
    id: 'ar.husary',
    name: 'الشيخ محمود خليل الحصري',
    description: 'المصحف المرتل - برواية حفص عن عاصم',
    baseUrl: 'https://cdn.islamic.network/quran/audio/128/ar.husary/',
  },
  {
    id: 'ar.minshawi',
    name: 'الشيخ محمد صديق المنشاوي',
    description: 'المصحف المرتل - برواية حفص عن عاصم',
    baseUrl: 'https://cdn.islamic.network/quran/audio/128/ar.minshawi/',
  },
  {
    id: 'ar.abdulbasitmurattal',
    name: 'الشيخ عبد الباسط عبد الصمد',
    description: 'المصحف المرتل - برواية حفص عن عاصم',
    baseUrl: 'https://cdn.islamic.network/quran/audio/192/ar.abdulbasitmurattal/',
  },
  {
    id: 'ar.alafasy',
    name: 'الشيخ مشاري راشد العفاسي',
    description: 'المصحف المرتل - برواية حفص عن عاصم',
    baseUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/',
  },
  {
    id: 'ar.hudhaify',
    name: 'الشيخ علي بن عبد الرحمن الحذيفي',
    description: 'المصحف المرتل - برواية حفص عن عاصم',
    baseUrl: 'https://cdn.islamic.network/quran/audio/128/ar.hudhaify/',
  },
];

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
  { id: 'muyassar', name: 'الميسر', nameEn: 'Al-Muyassar', description: 'التفسير الميسر - مجمع الملك فهد لطباعة المصحف الشريف' },
  { id: 'jalalayn', name: 'الجلالين', nameEn: 'Al-Jalalayn', description: 'تفسير الجلالين - تفسير مختصر وموجز' },
  { id: 'sa3di', name: 'السعدي', nameEn: 'Al-Saadi', description: 'تيسير الكريم الرحمن - تفسير واضح ومبسط' },
  { id: 'ibn-kathir', name: 'ابن كثير', nameEn: 'Ibn Kathir', description: 'تفسير القرآن العظيم - من أشهر التفاسير بالمأثور' },
  { id: 'tabari', name: 'الطبري', nameEn: 'Al-Tabari', description: 'جامع البيان - أقدم التفاسير وأشملها' },
  { id: 'qurtubi', name: 'القرطبي', nameEn: 'Al-Qurtubi', description: 'الجامع لأحكام القرآن - تفسير فقهي' },
  { id: 'baghawi', name: 'البغوي', nameEn: 'Al-Baghawi', description: 'معالم التنزيل - تفسير متوازن بالرواية والدراية' },
  { id: 'waseet', name: 'الوسيط', nameEn: 'Al-Waseet', description: 'التفسير الوسيط - لشيخ الأزهر محمد سيد طنطاوي' },
] as const;

export const DEFAULT_SELECTED_TAFSIRS = ['muyassar', 'jalalayn'];

// Backward compatibility
export const TAFSIR_SOURCES = ALL_TAFSIR_SOURCES;
