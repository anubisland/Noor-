import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Platform, I18nManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';
import {  Fonts, Spacing, BorderRadius, Shadows, rtlRow, rtlText } from '../../constants/theme';
import { srmdnPairs, srmdnCategories } from '../../data/mutashabihat-from-srmdn';
import { quranData } from '../../data/quran';
import { surahsMetadata } from '../../data/metadata';
import { englishTranslation } from '../../data/translations/en';
import { englishBatch1 } from '../../data/translations/en-batch1';
import { englishBatch2 } from '../../data/translations/en-batch2';
import { englishBatch3 } from '../../data/translations/en-batch3';

const allTranslations = [...englishTranslation, ...englishBatch1, ...englishBatch2, ...englishBatch3];

const MUTASHABIHAT_COLOR = '#16A085';

const getAyahText = (surahId: number, ayahNumber: number): string => {
  const surah = quranData.find(s => s.id === surahId);
  if (!surah) return '';
  const ayah = surah.ayahs.find(a => a.ayahNumber === ayahNumber);
  return ayah?.text || '';
};

const getTranslation = (surahId: number, ayahNumber: number): string | undefined => {
  return allTranslations.find(t => t.surahId === surahId && t.ayahNumber === ayahNumber)?.text;
};

const getSurahName = (surahId: number): string => {
  const meta = surahsMetadata.find(s => s.id === surahId);
  return meta?.name || `سورة ${surahId}`;
};

const numberToArabic = (num: number): string => {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(num).split('').map((d) => arabicDigits[parseInt(d)]).join('');
};

export default function SrmnMutashabihatScreen() {
  const { colors } = useTheme();
  const { showTranslation } = useApp();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedPair, setExpandedPair] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (!selectedCategory) return srmdnPairs;
    return srmdnPairs.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  const togglePair = (index: number) => {
    setExpandedPair(prev => prev === index ? null : index);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={MUTASHABIHAT_COLOR} />
      <View style={[styles.header, { backgroundColor: MUTASHABIHAT_COLOR }]}>
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace('/');
              }
            }}
          >
            <Ionicons name="arrow-forward" size={26} color="#FFF" />
          </TouchableOpacity>
        </View>
        <Ionicons name="git-compare" size={32} color="#FFF" />
        <Text style={styles.headerTitle}>تمييز المتشابهات</Text>
        <Text style={styles.headerSubtitle}>{srmdnPairs.length} زوجاً مع شرح الفرق</Text>
        <Text style={styles.headerSource}>من كتاب إغاثة اللهفان في ضبط متشابهات القرآن • عبدالله الوراقي</Text>
      </View>

      <View style={styles.chipsWrapper}>
        <View style={styles.chipsContainer}>
          <TouchableOpacity
            style={[styles.chip, { backgroundColor: selectedCategory === null ? MUTASHABIHAT_COLOR : colors.surface, borderColor: MUTASHABIHAT_COLOR }]}
            onPress={() => setSelectedCategory(null)}
            activeOpacity={0.7}
          >
            <Text style={[styles.chipText, { color: selectedCategory === null ? '#FFF' : MUTASHABIHAT_COLOR }]}>الكل ({srmdnPairs.length})</Text>
          </TouchableOpacity>
          {srmdnCategories.map(cat => {
            const count = srmdnPairs.filter(p => p.category === cat.id).length;
            if (count === 0) return null;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.chip, { backgroundColor: selectedCategory === cat.id ? cat.color : colors.surface, borderColor: cat.color }]}
                onPress={() => setSelectedCategory(cat.id)}
                activeOpacity={0.7}
              >
                <Text style={[styles.chipText, { color: selectedCategory === cat.id ? '#FFF' : cat.color }]}>{cat.name} ({count})</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
        {filtered.map((pair, index) => {
          const isExpanded = expandedPair === index;
          const cat = srmdnCategories.find(c => c.id === pair.category);
          const catColor = cat?.color || MUTASHABIHAT_COLOR;
          const [s1, a1] = pair.ayah1.split(':');
          const [s2, a2] = pair.ayah2.split(':');

          const sid1 = parseInt(s1);
          const sid2 = parseInt(s2);
          const aid1 = parseInt(a1);
          const aid2 = parseInt(a2);
          const ayahText1 = getAyahText(sid1, aid1);
          const ayahText2 = getAyahText(sid2, aid2);
          const translation1 = getTranslation(sid1, aid1);
          const translation2 = getTranslation(sid2, aid2);

          return (
            <View
              key={index}
              style={[styles.pairCard, { backgroundColor: colors.surface, borderColor: catColor + '30' }, Shadows.sm]}
            >
              {/* Ayah 1 */}
              <View style={styles.ayahSection}>
                <View style={[styles.ayahSectionHeader, { backgroundColor: catColor + '12' }]}>
                  <Text style={[styles.ayahSectionLabel, { color: catColor }]}>الأولى</Text>
                  <Text style={[styles.ayahSectionRef, { color: catColor }]}>{getSurahName(sid1)} - {aid1}</Text>
                </View>
                <Text style={[styles.ayahText, { color: colors.text }]}>
                  {ayahText1}
                  <Text style={styles.ayahNumberInline}>{' ﴿' + numberToArabic(aid1) + '﴾ '}</Text>
                </Text>
                {showTranslation && translation1 && (
                  <View style={[styles.translationSection, { borderTopColor: colors.borderLight }]}>
                    <Text style={[styles.translationText, { color: colors.textSecondary }]}>{translation1}</Text>
                  </View>
                )}
              </View>

              {/* Swap icon */}
              <View style={styles.swapRow}>
                <Ionicons name="swap-horizontal" size={22} color={catColor} />
              </View>

              {/* Ayah 2 */}
              <View style={styles.ayahSection}>
                <View style={[styles.ayahSectionHeader, { backgroundColor: catColor + '12' }]}>
                  <Text style={[styles.ayahSectionLabel, { color: catColor }]}>الثانية</Text>
                  <Text style={[styles.ayahSectionRef, { color: catColor }]}>{getSurahName(sid2)} - {aid2}</Text>
                </View>
                <Text style={[styles.ayahText, { color: colors.text }]}>
                  {ayahText2}
                  <Text style={styles.ayahNumberInline}>{' ﴿' + numberToArabic(aid2) + '﴾ '}</Text>
                </Text>
                {showTranslation && translation2 && (
                  <View style={[styles.translationSection, { borderTopColor: colors.borderLight }]}>
                    <Text style={[styles.translationText, { color: colors.textSecondary }]}>{translation2}</Text>
                  </View>
                )}
              </View>

              <View style={[styles.categoryTag, { backgroundColor: catColor + '20' }]}>
                <Text style={[styles.categoryTagText, { color: catColor }]}>{cat?.name || pair.category}</Text>
              </View>

              <TouchableOpacity style={styles.noteToggle} onPress={() => togglePair(index)} activeOpacity={0.7}>
                <Ionicons name={isExpanded ? 'chevron-up' : 'chevron-down'} size={18} color={catColor} />
                <Text style={[styles.noteToggleText, { color: catColor }]}>
                  {isExpanded ? 'إخفاء الشرح' : 'اضغط لمعرفة الفرق'}
                </Text>
              </TouchableOpacity>

              {isExpanded && (
                <View style={[styles.noteContainer, { backgroundColor: colors.surfaceVariant }]}>
                  <Text style={styles.noteLabel}>الفرق بينهما:</Text>
                  <Text style={[styles.noteText, { color: colors.text }]}>{pair.noteAr}</Text>
                  {showTranslation && pair.noteEn && (
                    <View style={[styles.noteTranslationSection, { borderTopColor: colors.borderLight }]}>
                      <Text style={[styles.noteTranslationText, { color: colors.textSecondary }]}>{pair.noteEn}</Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          );
        })}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : (StatusBar.currentHeight || 0) + 10,
    paddingBottom: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    gap: Spacing.xs,
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: Spacing.xs,
  },
  backButton: {
    padding: Spacing.xs,
  },
  headerTitle: { color: '#FFF', fontSize: Fonts.sizes.title, fontWeight: '800', marginTop: Spacing.sm },
  headerSubtitle: { color: 'rgba(255,255,255,0.75)', fontSize: Fonts.sizes.sm, textAlign: 'center' },
  headerSource: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: Fonts.sizes.xs,
    textAlign: 'center',
    marginTop: 4,
  },
  chipsWrapper: { paddingVertical: Spacing.md, paddingHorizontal: Spacing.lg },
  chipsContainer: { flexDirection: rtlRow, flexWrap: 'wrap', gap: Spacing.sm, alignItems: 'center' },
  chip: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.round,
    borderWidth: 1.5,
  },
  chipText: { fontSize: Fonts.sizes.sm, fontWeight: '700' },
  listContent: { padding: Spacing.lg, paddingBottom: 100 },
  pairCard: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
  },
  ayahSection: {
    marginBottom: Spacing.xs,
  },
  ayahSectionHeader: {
    flexDirection: rtlRow,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.sm,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.sm,
  },
  ayahSectionLabel: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '800',
    textAlign: rtlText,
    writingDirection: 'rtl',
  },
  ayahSectionRef: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '700',
    textAlign: rtlText,
    writingDirection: 'rtl',
  },
  ayahText: {
    fontFamily: Fonts.arabic.quran,
    fontSize: 22,
    lineHeight: 22 * 2.2,
    textAlign: 'center',
    writingDirection: 'rtl',
    paddingHorizontal: Spacing.xs,
  },
  ayahNumberInline: {
    fontWeight: '700',
  },
  swapRow: {
    alignItems: 'center',
    marginVertical: Spacing.xs,
  },
  translationSection: {
    padding: Spacing.md,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    marginTop: Spacing.sm,
  },
  translationText: {
    fontSize: Fonts.sizes.sm,
    lineHeight: 22,
    textAlign: rtlText,
    writingDirection: 'rtl',
    fontWeight: '600',
  },
  categoryTag: {
    alignSelf: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: BorderRadius.round,
    marginVertical: Spacing.sm,
  },
  categoryTagText: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '700',
  },
  noteToggle: {
    flexDirection: rtlRow,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
  },
  noteToggleText: {
    fontSize: Fonts.sizes.sm,
    fontWeight: '700',
  },
  noteContainer: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
  },
  noteLabel: {
    fontSize: Fonts.sizes.sm,
    fontWeight: '800',
    color: '#16A085',
    marginBottom: Spacing.xs,
    writingDirection: 'rtl',
    textAlign: rtlText,
  },
  noteText: {
    fontSize: Fonts.sizes.md,
    lineHeight: 26,
    writingDirection: 'rtl',
    textAlign: rtlText,
    fontWeight: '600',
  },
  noteTranslationSection: {
    padding: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    marginTop: Spacing.sm,
  },
  noteTranslationText: {
    fontSize: Fonts.sizes.sm,
    lineHeight: 22,
    textAlign: rtlText,
    writingDirection: 'rtl',
    fontWeight: '600',
  },
});
