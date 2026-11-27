import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Platform, I18nManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { Fonts, Spacing, BorderRadius, rtlRow } from '../../constants/theme';
import { useApp } from '../../context/AppContext';
import { quranicDuas, duaCategories, QuranicDua } from '../../data/quranic-duas';
import { quranData } from '../../data/quran';
import { audioService } from '../../services/audioService';

const DUA_COLOR = '#1B7F5A';

const getAyahText = (surahId: number, ayahNumber: number): string => {
  const surah = quranData.find(s => s.id === surahId);
  if (!surah) return '';
  const ayah = surah.ayahs.find(a => a.ayahNumber === ayahNumber);
  return ayah?.text || '';
};

const numberToArabic = (num: number): string => {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(num).split('').map((d) => arabicDigits[parseInt(d)]).join('');
};

export default function DuasScreen() {
  const { colors } = useTheme();
  const { showTranslation } = useApp();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredDuas = useMemo(() => {
    if (!selectedCategory) return quranicDuas;
    return quranicDuas.filter(d => d.category === selectedCategory);
  }, [selectedCategory]);

  const groupedBySurah = useMemo(() => {
    const groups: { [key: string]: QuranicDua[] } = {};
    for (const dua of filteredDuas) {
      const key = `${dua.surahId}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(dua);
    }
    return Object.entries(groups).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
  }, [filteredDuas]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={DUA_COLOR} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: DUA_COLOR }]}>
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
        <Ionicons name="hand-left" size={32} color="#FFF" />
        <Text style={styles.headerTitle}>الأدعية القرآنية</Text>
        <Text style={styles.headerSubtitle}>
          {quranicDuas.length} دعاء من القرآن الكريم • {showTranslation ? 'مع الترجمة' : 'بدون ترجمة'} • حسب الإعدادات
        </Text>
      </View>

      {/* Category Chips */}
      <View style={styles.chipsWrapper}>
        <View style={styles.chipsContainer}>
          <TouchableOpacity
            style={[
              styles.chip,
              { backgroundColor: selectedCategory === null ? DUA_COLOR : '#FFF', borderColor: DUA_COLOR },
            ]}
            onPress={() => setSelectedCategory(null)}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.chipText,
              { color: selectedCategory === null ? '#FFF' : DUA_COLOR },
            ]}>الكل</Text>
          </TouchableOpacity>
          {duaCategories.map(cat => {
            const count = quranicDuas.filter(d => d.category === cat.id).length;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.chip,
                  { backgroundColor: selectedCategory === cat.id ? DUA_COLOR : '#FFF', borderColor: DUA_COLOR },
                ]}
                onPress={() => setSelectedCategory(cat.id)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.chipText,
                  { color: selectedCategory === cat.id ? '#FFF' : DUA_COLOR },
                ]}>{cat.name} ({count})</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Duas List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {groupedBySurah.map(([surahId, duas]) => (
          <View key={surahId} style={styles.surahGroup}>
            <View style={[styles.surahDivider, { backgroundColor: DUA_COLOR + '15' }]}>
              <View style={[styles.surahDividerDot, { backgroundColor: DUA_COLOR }]} />
              <Text style={[styles.surahDividerText, { color: DUA_COLOR }]}>
                سورة {duas[0].surahName}
              </Text>
              <View style={[styles.surahDividerLine, { backgroundColor: DUA_COLOR + '30' }]} />
            </View>

            {duas.map((dua) => (
              <View
                key={dua.id}
                style={[styles.duaCard, { backgroundColor: colors.surface, borderColor: colors.borderLight, borderWidth: 1 }]}
              >
                {/* Card Meta Header with Audio Play */}
                <View style={styles.cardHeaderRow}>
                  <Text style={[styles.duaRefText, { color: colors.secondary }]}>
                    سورة {dua.surahName} • الآية {numberToArabic(dua.ayahNumber)}
                  </Text>
                  <TouchableOpacity
                    style={[styles.playAudioBtn, { backgroundColor: DUA_COLOR + '18' }]}
                    activeOpacity={0.7}
                    onPress={() => {
                      const surah = quranData.find(s => s.id === dua.surahId);
                      const ayah = surah?.ayahs.find(a => a.ayahNumber === dua.ayahNumber);
                      if (ayah) audioService.playAyah(ayah.id);
                    }}
                  >
                    <Ionicons name="volume-high" size={17} color={DUA_COLOR} />
                  </TouchableOpacity>
                </View>

                {/* Arabic Text - authentic Mushaf Font */}
                <View style={styles.arabicWrapper}>
                  <Text style={[styles.arabicText, { color: colors.text, fontSize: 24, lineHeight: 24 * 2.2 }]}>
                    {getAyahText(dua.surahId, dua.ayahNumber)}
                    <Text style={[styles.ayahNumber, { color: colors.primary }]}>
                      {' ﴿' + numberToArabic(dua.ayahNumber) + '﴾ '}
                    </Text>
                  </Text>
                </View>

                {/* Translation */}
                {showTranslation && (
                  <View style={[styles.translationSection, { borderTopColor: colors.borderLight }]}>
                    <Text style={[styles.translationText, { color: colors.textSecondary }]}>
                      {dua.translation}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  headerTitle: {
    color: '#FFF',
    fontSize: Fonts.sizes.title,
    fontWeight: '800',
    marginTop: Spacing.sm,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: Fonts.sizes.sm,
    textAlign: 'center',
  },
  chipsWrapper: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    alignItems: 'center',
  },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: BorderRadius.round,
    borderWidth: 1.5,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '700',
  },
  listContent: {
    padding: Spacing.lg,
    paddingBottom: 100,
  },
  surahGroup: {
    marginBottom: Spacing.lg,
  },
  surahDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
  },
  surahDividerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  surahDividerText: {
    fontSize: Fonts.sizes.lg,
    fontWeight: '800',
    writingDirection: 'rtl',
    textAlign: 'right',
  },
  surahDividerLine: {
    flex: 1,
    height: 1,
  },
  duaCard: {
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.xs,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  arabicWrapper: {
    padding: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  arabicText: {
    fontFamily: Fonts.arabic.quran,
    textAlign: 'center',
    fontWeight: '700',
    writingDirection: 'rtl',
    color: '#0F172A',
  },
  cardHeaderRow: {
    flexDirection: rtlRow,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
  },
  duaRefText: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '800',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  playAudioBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ayahNumber: {
    fontWeight: '700',
  },
  translationSection: {
    padding: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
  },
  translationText: {
    fontSize: Fonts.sizes.md,
    lineHeight: 24,
    textAlign: 'right',
    writingDirection: 'rtl',
    fontWeight: '600',
    color: '#1E293B',
  },
});
