import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { BorderRadius, Fonts, Spacing } from '../../constants/theme';

interface BadgeProps {
  text: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'info';
  size?: 'sm' | 'md';
}

export default function Badge({ text, variant = 'primary', size = 'sm' }: BadgeProps) {
  const { colors } = useTheme();

  const colorMap = {
    primary: { bg: colors.primaryLight, text: colors.primary },
    secondary: { bg: colors.secondaryLight, text: colors.secondary },
    success: { bg: colors.successLight, text: colors.success },
    warning: { bg: colors.warningLight, text: colors.warning },
    info: { bg: colors.infoLight, text: colors.info },
  };

  const c = colorMap[variant];

  return (
    <View style={[styles.badge, { backgroundColor: c.bg }, size === 'md' && styles.badgeMd]}>
      <Text style={[styles.text, { color: c.text }, size === 'md' && styles.textMd]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  badgeMd: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  text: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '700',
  },
  textMd: {
    fontSize: Fonts.sizes.sm,
    fontWeight: '700',
  },
});
