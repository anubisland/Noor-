import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, I18nManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { BorderRadius, Fonts, Shadows, Spacing } from '../../constants/theme';
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

      <View style={styles.right}>
        <Text style={[styles.surahNameDecor, { color: colors.primary }]}>{name}</Text>
        <Ionicons name="chevron-back" size={18} color={colors.textLight} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
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
    alignItems: I18nManager.isRTL ? 'flex-start' : 'flex-end',
  },
  nameAr: {
    fontSize: 19,
    fontWeight: '800',
    writingDirection: 'rtl',
    textAlign: 'right',
    alignSelf: 'stretch',
  },
  nameEn: {
    fontSize: Fonts.sizes.sm,
    fontWeight: '600',
    marginTop: 2,
    textAlign: 'right',
    alignSelf: 'stretch',
  },
  metaRow: {
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    alignItems: 'center',
    marginTop: Spacing.xs,
    gap: Spacing.sm,
  },
  meta: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '700',
    color: '#4B5563',
  },
  right: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  surahNameDecor: {
    fontSize: 24,
    fontWeight: '300',
    opacity: 0.15,
  },
});
