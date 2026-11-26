import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Modal, FlatList, TextInput, I18nManager } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { Fonts, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import Header from '../../components/ui/Header';
import { asbabData } from '../../data/asbab-nuzul';
import { surahsMetadata } from '../../data/metadata';
import { quranData } from '../../data/quran';
import { audioService } from '../../services/audioService';

const { width } = Dimensions.get('window');

const getAyahObj = (surahId: number, ayahNumber: number) => {
  const surah = quranData.find((s) => s.id === surahId);
  return surah?.ayahs.find((a) => a.ayahNumber === ayahNumber);
};

const getAyahText = (surahId: number, ayahNumber: number): string => {
  return getAyahObj(surahId, ayahNumber)?.text || '';
};

function stripTashkeel(text: string): string {
  return text
    .replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED]/g, '')
    .replace(/\u0671/g, '\u0627')
    .replace(/\s+/g, ' ')
    .trim();
}

export default function AsbabNuzulScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const routeSurahId = parseInt(id || '0');
  const [viewSurahId, setViewSurahId] = useState(0);
  const surahId = viewSurahId > 0 ? viewSurahId : routeSurahId;
  const { colors } = useTheme();
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showSurahPicker, setShowSurahPicker] = useState(false);
  const [surahSearch, setSurahSearch] = useState('');

  const entries = surahId > 0
    ? asbabData.filter((e) => e.surahId === surahId)
    : asbabData;

  const surahMeta = surahsMetadata.find((s) => s.id === surahId);

  // Get surahs that have asbab entries
  const surahsWithAsbab = useMemo(() => {
    const ids = new Set(asbabData.map((e) => e.surahId));
    return surahsMetadata.filter((s) => ids.has(s.id));
  }, []);

  const filteredSurahs = useMemo(() => {
    const allSurahs = surahsMetadata;
    if (!surahSearch.trim()) return allSurahs;
    const q = stripTashkeel(surahSearch.trim());
    const qLower = q.toLowerCase();
    return allSurahs.filter((s) => {
      const nameNorm = stripTashkeel(s.name);
      return nameNorm.includes(q) || s.nameEn.toLowerCase().includes(qLower) || s.id.toString() === q;
    });
  }, [surahSearch]);

  const getEntryCount = (sId: number) => asbabData.filter((e) => e.surahId === sId).length;

  const selectSurah = (sId: number) => {
    setShowSurahPicker(false);
    setViewSurahId(sId);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title={surahMeta ? surahMeta.name : 'أسباب النزول'}
        subtitle={surahMeta ? 'أسباب النزول' : undefined}
        source="من كتاب صحيح أسباب النزول • إبراهيم محمد العلي"
        showBack
        onBackPress={viewSurahId > 0 ? () => setViewSurahId(0) : undefined}
        rightIcon="list-outline"
        onRightPress={() => { setSurahSearch(''); setShowSurahPicker(true); }}
      />

      {/* Quick Surah Selection & Intro - OUTSIDE ScrollView for gesture fix */}
      {surahId === 0 && (
        <View style={styles.chipsOuter}>
          <View style={[styles.introCard, { backgroundColor: colors.primaryLight, borderColor: colors.primary }]}>
            <Ionicons name="time-outline" size={22} color={colors.primary} />
            <Text style={[styles.introText, { color: colors.text }]}>
              تعرّف على السياق التاريخي والمكاني والقصص وراء نزول الآيات القرآنية
            </Text>
          </View>
          <Text style={[styles.chipsTitle, { color: colors.text }]}>اختر السورة:</Text>
          <View style={styles.chipsRow}>
            <TouchableOpacity
              style={[styles.chip, { backgroundColor: colors.primary }]}
              onPress={() => setViewSurahId(0)}
            >
              <Text style={[styles.chipText, { color: '#FFF' }]}>الكل</Text>
            </TouchableOpacity>
            {surahsWithAsbab.map((s) => (
              <TouchableOpacity
                key={s.id}
                style={[styles.chip, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}
                onPress={() => selectSurah(s.id)}
              >
                <Text style={[styles.chipText, { color: colors.text }]}>{s.name}</Text>
                <View style={[styles.chipBadge, { backgroundColor: colors.secondaryLight }]}>
                  <Text style={[styles.chipBadgeText, { color: colors.secondary }]}>{getEntryCount(s.id)}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={[styles.browseBtn, { backgroundColor: colors.secondaryLight }]}
            onPress={() => { setSurahSearch(''); setShowSurahPicker(true); }}
          >
            <Ionicons name="search" size={18} color={colors.secondary} />
            <Text style={[styles.browseBtnText, { color: colors.secondary }]}>البحث في جميع السور (114)</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Selected surah info */}
        {surahId > 0 && surahMeta && (
          <View style={[styles.surahInfoCard, { backgroundColor: colors.surface, borderColor: colors.borderLight }, Shadows.sm]}>
            <View style={styles.surahInfoRow}>
              <View style={[styles.surahIdBadge, { backgroundColor: colors.primaryLight }]}>
                <Text style={[styles.surahIdText, { color: colors.primary }]}>{surahMeta.id}</Text>
              </View>
              <View style={styles.surahDetails}>
                <Text style={[styles.surahNameText, { color: colors.text }]}>{surahMeta.name}</Text>
                <Text style={[styles.surahMetaText, { color: colors.textSecondary }]}>
                  {surahMeta.nameEn} - {surahMeta.versesCount} آية - {surahMeta.revelationType === 'meccan' ? 'مكية' : 'مدنية'}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.changeSurahBtn, { backgroundColor: colors.primaryLight }]}
              onPress={() => { setSurahSearch(''); setShowSurahPicker(true); }}
            >
              <Ionicons name="swap-horizontal" size={16} color={colors.primary} />
              <Text style={[styles.changeSurahText, { color: colors.primary }]}>تغيير السورة</Text>
            </TouchableOpacity>
          </View>
        )}

        {entries.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={48} color={colors.textLight} />
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              لا توجد أسباب نزول مسجلة لهذه السورة
            </Text>
            <TouchableOpacity
              style={[styles.browseBtn, { backgroundColor: colors.primaryLight }]}
              onPress={() => setViewSurahId(0)}
            >
              <Text style={[styles.browseBtnText, { color: colors.primary }]}>عرض جميع أسباب النزول</Text>
            </TouchableOpacity>
          </View>
        )}

        {entries.map((entry, index) => {
          const isExpanded = expandedId === index;
          const entrySurah = surahsMetadata.find((s) => s.id === entry.surahId);
          const ayahStart = entry.ayahs[0];
          const ayahEnd = entry.ayahs[entry.ayahs.length - 1];
          const storyText = entry.occasions[0] || '';

          return (
            <TouchableOpacity
              key={`${entry.surahId}_${ayahStart}_${index}`}
              activeOpacity={0.8}
              onPress={() => setExpandedId(isExpanded ? null : index)}
              style={[styles.storyCard, { backgroundColor: colors.surface, borderColor: colors.borderLight }, Shadows.md]}
            >
              {/* Story Header */}
              <View style={styles.storyHeader}>
                <View style={[styles.storyNumber, { backgroundColor: colors.secondaryLight }]}>
                  <Text style={[styles.storyNumberText, { color: colors.secondary }]}>{index + 1}</Text>
                </View>
                <View style={styles.storyHeaderInfo}>
                  <Text style={[styles.storyTitle, { color: colors.text }]}>
                    سبب نزول الآية {ayahStart}{ayahEnd > ayahStart ? `-${ayahEnd}` : ''}
                  </Text>
                  <Text style={[styles.storyRef, { color: colors.primary }]}>
                    {entrySurah?.name || `سورة ${entry.surahId}`} - الآيات {ayahStart}
                    {ayahEnd > ayahStart ? `-${ayahEnd}` : ''}
                  </Text>
                </View>
                <Ionicons
                  name={isExpanded ? 'chevron-up' : 'chevron-down'}
                  size={22}
                  color={colors.textLight}
                />
              </View>

              {/* Expanded Content */}
              {isExpanded && (
                <View style={[styles.storyContent, { borderTopColor: colors.borderLight }]}>
                  {/* Quranic Verse Display */}
                  <View style={[styles.verseDisplayCard, { backgroundColor: colors.surfaceVariant, borderColor: colors.borderLight }]}>
                    <View style={styles.verseHeaderRow}>
                      <View style={styles.verseHeaderBadge}>
                        <Ionicons name="sparkles" size={14} color={colors.primary} />
                        <Text style={[styles.verseHeaderBadgeText, { color: colors.primary }]}>الآية الكريمة</Text>
                      </View>
                      <TouchableOpacity
                        style={[styles.verseAudioBtn, { backgroundColor: colors.primaryLight }]}
                        onPress={() => {
                          const aObj = getAyahObj(entry.surahId, ayahStart);
                          if (aObj) audioService.playAyah(aObj.id);
                        }}
                      >
                        <Ionicons name="volume-high" size={16} color={colors.primary} />
                        <Text style={[styles.verseAudioBtnText, { color: colors.primary }]}>استمع للآية</Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={[styles.verseUthmaniText, { color: colors.text }]}>
                      {entry.ayahs.map((aNum) => getAyahText(entry.surahId, aNum)).filter(Boolean).join(' ۝ ')} ۝
                    </Text>
                  </View>

                  {/* Story Narrative */}
                  <View style={styles.narrativeSection}>
                    <View style={styles.narrativeIcon}>
                      <Ionicons name="book-outline" size={20} color={colors.secondary} />
                    </View>
                    <Text style={[styles.narrativeText, { color: colors.text }]}>{storyText}</Text>
                  </View>

                  {/* Additional occasions */}
                  {entry.occasions.length > 1 && (
                    <View style={[styles.contextCard, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}>
                      <View style={styles.contextHeader}>
                        <Ionicons name="repeat" size={18} color={colors.secondary} />
                        <Text style={[styles.contextTitle, { color: colors.secondary }]}>روايات أخرى</Text>
                      </View>
                      {entry.occasions.slice(1).map((oc, oi) => (
                        <Text key={oi} style={[styles.contextText, { color: colors.text, marginTop: oi > 0 ? 12 : 0 }]}>
                          {oi + 1}. {oc}
                        </Text>
                      ))}
                    </View>
                  )}

                  {/* Source attribution */}
                  <View style={[styles.contextCard, { backgroundColor: colors.primaryLight, borderColor: colors.primary }]}>
                    <View style={styles.contextHeader}>
                      <Ionicons name="book" size={18} color={colors.primary} />
                      <Text style={[styles.contextTitle, { color: colors.primary }]}>المصدر</Text>
                    </View>
                    <Text style={[styles.contextText, { color: colors.text }]}>
                      كتاب "صحيح أسباب النزول" - إبراهيم محمد العلي
                    </Text>
                  </View>

                  {/* Go to Surah button */}
                  <TouchableOpacity
                    style={[styles.goToSurahBtn, { backgroundColor: colors.primary }]}
                    onPress={() => router.push(`/surah/${entry.surahId}`)}
                  >
                    <Ionicons name="book" size={18} color="#FFF" />
                    <Text style={styles.goToSurahText}>اقرأ الآيات في السورة</Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          );
        })}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Surah Picker Modal */}
      <Modal visible={showSurahPicker} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <View style={[styles.modalHeader, { borderBottomColor: colors.borderLight }]}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>اختر السورة</Text>
              <TouchableOpacity onPress={() => setShowSurahPicker(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <View style={[styles.searchBar, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}>
              <Ionicons name="search" size={20} color={colors.textLight} />
              <TextInput
                value={surahSearch}
                onChangeText={setSurahSearch}
                placeholder="ابحث عن سورة..."
                placeholderTextColor={colors.textLight}
                style={[styles.searchInput, { color: colors.text }]}
                textAlign="right"
              />
            </View>

            {/* Show all entries option */}
            <TouchableOpacity
              style={[styles.allEntriesBtn, { backgroundColor: colors.primaryLight }]}
              onPress={() => { setShowSurahPicker(false); setViewSurahId(0); }}
            >
              <Ionicons name="list" size={20} color={colors.primary} />
              <Text style={[styles.allEntriesText, { color: colors.primary }]}>
                عرض جميع أسباب النزول ({asbabData.length})
              </Text>
            </TouchableOpacity>

            <FlatList
              data={filteredSurahs}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                const count = getEntryCount(item.id);
                return (
                  <TouchableOpacity
                    style={[styles.pickerItem, { borderBottomColor: colors.borderLight }]}
                    onPress={() => selectSurah(item.id)}
                  >
                    <View style={[styles.pickerNumber, { backgroundColor: colors.primaryLight }]}>
                      <Text style={[styles.pickerNumberText, { color: colors.primary }]}>{item.id}</Text>
                    </View>
                    <View style={styles.pickerInfo}>
                      <Text style={[styles.pickerName, { color: colors.text }]}>{item.name}</Text>
                      <Text style={[styles.pickerMeta, { color: colors.textSecondary }]}>
                        {item.nameEn} - {item.revelationType === 'meccan' ? 'مكية' : 'مدنية'}
                      </Text>
                    </View>
                    {count > 0 && (
                      <View style={[styles.countBadge, { backgroundColor: colors.secondaryLight }]}>
                        <Text style={[styles.countBadgeText, { color: colors.secondary }]}>{count}</Text>
                      </View>
                    )}
                    <Ionicons name="chevron-back" size={20} color={colors.textLight} />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: Spacing.lg },
  introCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  chipsOuter: {
    padding: Spacing.lg,
    paddingBottom: 0,
  },
  introText: { flex: 1, fontSize: Fonts.sizes.md, lineHeight: 24 },
  surahChips: { marginBottom: Spacing.lg, gap: Spacing.sm },
  chipsTitle: { fontSize: Fonts.sizes.md, fontWeight: '700', writingDirection: 'rtl' },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, paddingVertical: Spacing.xs },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    gap: Spacing.xs,
  },
  chipText: { fontSize: Fonts.sizes.sm, fontWeight: '600' },
  chipBadge: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 10,
  },
  chipBadgeText: { fontSize: Fonts.sizes.xs, fontWeight: '700' },
  surahInfoCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.lg,
    gap: Spacing.md,
  },
  surahInfoRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  surahIdBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  surahIdText: { fontSize: Fonts.sizes.lg, fontWeight: '700' },
  surahDetails: { flex: 1 },
  surahNameText: { fontSize: Fonts.sizes.lg, fontWeight: '700' },
  surahMetaText: { fontSize: Fonts.sizes.sm, marginTop: 2 },
  changeSurahBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  changeSurahText: { fontSize: Fonts.sizes.sm, fontWeight: '600' },
  browseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
  },
  browseBtnText: { fontSize: Fonts.sizes.sm, fontWeight: '600' },
  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
    gap: Spacing.md,
  },
  emptyText: { fontSize: Fonts.sizes.md, textAlign: 'center' },
  storyCard: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: Spacing.md,
  },
  storyHeader: {
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    alignItems: 'center',
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  storyNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyNumberText: { fontSize: Fonts.sizes.md, fontWeight: '800' },
  storyHeaderInfo: { flex: 1, gap: 4, alignItems: I18nManager.isRTL ? 'flex-start' : 'flex-end' },
  storyTitle: { fontSize: Fonts.sizes.md, fontWeight: '800', textAlign: 'right', writingDirection: 'rtl', alignSelf: 'stretch' },
  storyRef: { fontSize: Fonts.sizes.sm, fontWeight: '700', textAlign: 'right', writingDirection: 'rtl', alignSelf: 'stretch' },
  themeBadge: {
    alignSelf: I18nManager.isRTL ? 'flex-start' : 'flex-end',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    marginTop: 4,
  },
  themeBadgeText: { fontSize: Fonts.sizes.xs, fontWeight: '700' },
  storyContent: {
    padding: Spacing.lg,
    borderTopWidth: 1,
    gap: Spacing.lg,
  },
  verseDisplayCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  verseHeaderRow: {
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  verseHeaderBadge: {
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    alignItems: 'center',
    gap: 4,
  },
  verseHeaderBadgeText: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '800',
  },
  verseAudioBtn: {
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    gap: 4,
  },
  verseAudioBtnText: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '700',
  },
  verseUthmaniText: {
    fontSize: 20,
    fontFamily: Fonts.arabic.quran,
    lineHeight: 38,
    textAlign: 'center',
    writingDirection: 'rtl',
    fontWeight: '700',
  },
  narrativeSection: {
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    gap: Spacing.md,
  },
  narrativeIcon: { marginTop: 4 },
  narrativeText: {
    flex: 1,
    fontSize: Fonts.sizes.md,
    lineHeight: 28,
    textAlign: 'right',
    writingDirection: 'rtl',
    fontWeight: '600',
    color: '#1E293B',
  },
  contextCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  contextHeader: {
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  contextTitle: { fontSize: Fonts.sizes.sm, fontWeight: '800', textAlign: 'right', writingDirection: 'rtl' },
  contextText: {
    fontSize: Fonts.sizes.sm,
    lineHeight: 24,
    textAlign: 'right',
    writingDirection: 'rtl',
    fontWeight: '600',
    color: '#1E293B',
  },
  figuresSection: { gap: Spacing.sm },
  figuresTitle: { fontSize: Fonts.sizes.sm, fontWeight: '800', textAlign: 'right', writingDirection: 'rtl' },
  figuresRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs },
  figureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    gap: 4,
  },
  figureBadgeText: { fontSize: Fonts.sizes.xs, fontWeight: '600' },
  metaSection: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  metaItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  metaLabel: { fontSize: Fonts.sizes.xs, fontWeight: '600' },
  metaValue: { fontSize: Fonts.sizes.sm, fontWeight: '500' },
  metaValueEn: { fontSize: Fonts.sizes.xs },
  mapPlaceholder: {
    height: 100,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  mapText: { fontSize: Fonts.sizes.md, fontWeight: '500' },
  mapCoords: { fontSize: Fonts.sizes.xs },
  goToSurahBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
  },
  goToSurahText: { color: '#FFF', fontSize: Fonts.sizes.md, fontWeight: '600' },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: '85%',
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
  },
  modalTitle: { fontSize: Fonts.sizes.xl, fontWeight: '700' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: Fonts.sizes.md,
    paddingVertical: Spacing.xs,
    writingDirection: 'rtl',
  },
  allEntriesBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
  },
  allEntriesText: { fontSize: Fonts.sizes.md, fontWeight: '600' },
  pickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 0.5,
  },
  pickerNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Spacing.md,
  },
  pickerNumberText: { fontSize: Fonts.sizes.sm, fontWeight: '700' },
  pickerInfo: { flex: 1, marginHorizontal: Spacing.sm },
  pickerName: { fontSize: Fonts.sizes.md, fontWeight: '600' },
  pickerMeta: { fontSize: Fonts.sizes.xs, marginTop: 2 },
  countBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    marginLeft: Spacing.sm,
  },
  countBadgeText: { fontSize: Fonts.sizes.xs, fontWeight: '700' },
});
