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
  text: '#1A1A2E',
  textSecondary: '#636E72',
  textLight: '#95A5A6',
  border: '#E8E8E3',
  borderLight: '#F0F0EB',
  error: '#E74C3C',
  errorLight: '#FDEDEC',
  success: '#27AE60',
  successLight: '#EAFAF1',
  warning: '#F39C12',
  warningLight: '#FEF9E7',
  info: '#3498DB',
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
  background: '#0F0F1A',
  surface: '#1A1A2E',
  surfaceVariant: '#252540',
  text: '#ECEFF1',
  textSecondary: '#95A5A6',
  textLight: '#636E72',
  border: '#2C2C45',
  borderLight: '#252540',
  error: '#E74C3C',
  errorLight: '#2C1A1A',
  success: '#27AE60',
  successLight: '#1A2C1A',
  warning: '#F39C12',
  warningLight: '#2C2A1A',
  info: '#3498DB',
  infoLight: '#1A2A3C',
  overlay: 'rgba(0, 0, 0, 0.7)',
  shadow: 'rgba(0, 0, 0, 0.3)',
};

export const Fonts = {
  arabic: {
    regular: 'System',
    bold: 'System',
  },
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    quran: 26,
    quranLg: 30,
    title: 28,
    header: 32,
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
