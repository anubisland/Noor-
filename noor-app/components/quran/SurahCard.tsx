import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, I18nManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import {  BorderRadius, Fonts, Shadows, Spacing, rtlRow, rtlAlign, rtlText } from '../../constants/theme';
import Badge from '../ui/Badge';

interface SurahCardProps {
  id: number;
  name: string;
  nameEn: string;
  nameTranslation: string;
  versesCount: number;
  revelationType: 'meccan' | 'medinan';
  juz: number[];
}

export default function SurahCard({ id, name, nameEn, nameTranslation, versesCount, revelationType, juz }: SurahCardProps) {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => router.push(`/surah/${id}`)}
      style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.borderLight }, Shadows.sm]}
    >
      <View style={[styles.numberContainer, { backgroundColor: colors.primaryLight }]}>
        <Text style={[styles.number, { color: colors.primary }]}>{id}</Text>
      </View>

      <View style={styles.info}>
        <Text style={[styles.nameAr, { color: colors.text }]}>{name}</Text>
        <Text style={[styles.nameEn, { color: colors.textSecondary }]}>{nameEn}</Text>
        <View style={styles.metaRow}>
          <Badge
            text={revelationType === 'meccan' ? 'مكية' : 'مدنية'}
            variant={revelationType === 'meccan' ? 'secondary' : 'info'}
          />
          <Text style={[styles.meta, { color: colors.textLight }]}>
            {versesCount} آية • الجزء {juz[0]}
          </Text>
        </View>
      </View>

      <View style={styles.chevronContainer}>
        <Ionicons name="chevron-back" size={20} color={colors.textLight} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: rtlRow,
    alignItems: 'center',
    padding: Spacing.md,
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.xs,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
  },
  numberContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Spacing.xs,
  },
  number: {
    fontSize: Fonts.sizes.md,
    fontWeight: '800',
  },
  info: {
    flex: 1,
    marginHorizontal: Spacing.sm,
    alignItems: rtlAlign,
  },
  nameAr: {
    width: '100%',
    fontSize: 19,
    fontWeight: '800',
    writingDirection: 'rtl',
    textAlign: rtlText,
  },
  nameEn: {
    width: '100%',
    fontSize: Fonts.sizes.sm,
    fontWeight: '600',
    marginTop: 2,
    textAlign: rtlText,
  },
  metaRow: {
    flexDirection: rtlRow,
    alignItems: 'center',
    marginTop: Spacing.xs,
    gap: Spacing.sm,
  },
  meta: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '700',
    color: '#4B5563',
  },
  chevronContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
