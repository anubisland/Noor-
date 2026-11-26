import { I18nManager } from 'react-native';

// Enable RTL for Arabic
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export const Colors = {
  primary: '#0D7C5F',
  primaryDark: '#095C46',
  primaryLight: '#E8F5F1',
  secondary: '#BF953F',
  secondaryLight: '#F5ECD7',
  gold: '#D4AF37',
  goldLight: '#FFF8E7',
  background: '#FAFAF5',
  surface: '#FFFFFF',
  surfaceVariant: '#F5F5F0',
  text: '#090A0F',
  textSecondary: '#1E293B',
  textLight: '#334155',
  border: '#E2E8F0',
  borderLight: '#EDF2F7',
  error: '#DC2626',
  errorLight: '#FDEDEC',
  success: '#16A34A',
  successLight: '#EAFAF1',
  warning: '#D97706',
  warningLight: '#FEF9E7',
  info: '#2563EB',
  infoLight: '#EBF5FB',
  overlay: 'rgba(0, 0, 0, 0.5)',
  shadow: 'rgba(0, 0, 0, 0.08)',
};

export const DarkColors = {
  primary: '#0FA97E',
  primaryDark: '#0D7C5F',
  primaryLight: '#1A3A30',
  secondary: '#D4AF37',
  secondaryLight: '#2A2515',
  gold: '#D4AF37',
  goldLight: '#2A2515',
  background: '#0B0F19',
  surface: '#111827',
  surfaceVariant: '#1F2937',
  text: '#FFFFFF',
  textSecondary: '#F1F5F9',
  textLight: '#CBD5E1',
  border: '#374151',
  borderLight: '#1F2937',
  error: '#EF4444',
  errorLight: '#2C1A1A',
  success: '#22C55E',
  successLight: '#1A2C1A',
  warning: '#F59E0B',
  warningLight: '#2C2A1A',
  info: '#3B82F6',
  infoLight: '#1A2A3C',
  overlay: 'rgba(0, 0, 0, 0.7)',
  shadow: 'rgba(0, 0, 0, 0.3)',
};

export const Fonts = {
  arabic: {
    regular: 'NotoNaskh',
    bold: 'Cairo',
    quran: 'KFGQPC',
    amiri: 'AmiriQuran',
    cairo: 'Cairo',
    naskh: 'NotoNaskh',
    hafs: 'KFGQPC',
  },
  sizes: {
    xs: 13,
    sm: 15,
    md: 17,
    lg: 19,
    xl: 22,
    xxl: 26,
    quran: 28,
    quranLg: 32,
    title: 30,
    header: 34,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.8,
    quran: 2.2,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
};

export const BorderRadius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  round: 50,
  full: 9999,
};

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
};
