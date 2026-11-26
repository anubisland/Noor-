import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Platform, Dimensions, Modal, FlatList, TextInput, I18nManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useHifz } from '../../context/HifzContext';
import { Fonts, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { surahsMetadata } from '../../data/metadata';
import { MEMORIZATION_MODES } from '../../constants/config';

const { width } = Dimensions.get('window');

// Strip Arabic diacritics for search
function stripTashkeel(text: string): string {
  return text
    .replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED]/g, '')
    .replace(/\u0671/g, '\u0627')
    .replace(/\s+/g, ' ')
    .trim();
}

export default function HifzScreen() {
  const { colors } = useTheme();
  const { records, stats, getDueReviews, getMemorizationProgress } = useHifz();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'surahs' | 'review'>('overview');
  const [showSurahPicker, setShowSurahPicker] = useState(false);
  const [pendingMode, setPendingMode] = useState<string | null>(null);
  const [surahSearch, setSurahSearch] = useState('');

  const dueReviews = getDueReviews();
  const shortSurahs = surahsMetadata.filter((s) => s.versesCount <= 20).slice(-20);

  const filteredSurahs = useMemo(() => {
    if (!surahSearch.trim()) return surahsMetadata;
    const q = stripTashkeel(surahSearch.trim());
    const qLower = q.toLowerCase();
    return surahsMetadata.filter((s) => {
      const nameNorm = stripTashkeel(s.name);
      return nameNorm.includes(q) || s.nameEn.toLowerCase().includes(qLower) || s.id.toString() === q;
    });
  }, [surahSearch]);

  const modes = [
    { id: MEMORIZATION_MODES.REPETITION, title: 'التكرار', icon: 'repeat' as const, color: '#3498DB', desc: 'استمع وكرر الآيات' },
    { id: MEMORIZATION_MODES.FILL_BLANK, title: 'إكمال الفراغات', icon: 'text' as const, color: '#E67E22', desc: 'أكمل الكلمات الناقصة' },
    { id: MEMORIZATION_MODES.ORDERING, title: 'الترتيب', icon: 'swap-vertical' as const, color: '#9B59B6', desc: 'رتب الآيات بالتسلسل الصحيح' },
    { id: MEMORIZATION_MODES.VOICE_TEST, title: 'الاختبار الصوتي', icon: 'mic' as const, color: '#E74C3C', desc: 'سجل تلاوتك وقارنها' },
    { id: MEMORIZATION_MODES.TASMI, title: 'التسميع', icon: 'eye-off' as const, color: '#16A085', desc: 'سمّع من حفظك - الآيات مخفية' },
    { id: 'mutashabihat', title: 'تمييز المتشابهات', icon: 'git-compare' as const, color: '#16A085', desc: 'تعرف على الآيات المتشابهة وفرق بينها', route: '/mutashabihat/srmdn' as const },
  ];

  const openSurahPicker = (modeId: string) => {
    setPendingMode(modeId);
    setSurahSearch('');
    setShowSurahPicker(true);
  };

  const selectSurah = (surahId: number) => {
    setShowSurahPicker(false);
    if (pendingMode) {
      router.push(`/memorize/${surahId}?mode=${pendingMode}`);
    } else {
      router.push(`/memorize/${surahId}`);
    }
    setPendingMode(null);
  };

  const renderOverview = () => (
    <>
      {/* Stats Cards */}
      <View style={styles.statsRow}>
        <View style={[styles.miniStat, { backgroundColor: colors.primaryLight }]}>
          <Text style={[styles.miniStatNumber, { color: colors.primary }]}>{stats.totalVerses}</Text>
          <Text style={[styles.miniStatLabel, { color: colors.primary }]}>آية محفوظة</Text>
        </View>
        <View style={[styles.miniStat, { backgroundColor: colors.secondaryLight }]}>
          <Text style={[styles.miniStatNumber, { color: colors.secondary }]}>{Math.round(stats.averageAccuracy)}%</Text>
          <Text style={[styles.miniStatLabel, { color: colors.secondary }]}>الدقة</Text>
        </View>
        <View style={[styles.miniStat, { backgroundColor: colors.successLight }]}>
          <Text style={[styles.miniStatNumber, { color: colors.success }]}>{stats.streakDays}</Text>
          <Text style={[styles.miniStatLabel, { color: colors.success }]}>أيام متتالية</Text>
        </View>
      </View>

      {/* Due Reviews */}
      {dueReviews.length > 0 && (
        <View style={[styles.section, { backgroundColor: colors.warningLight, borderColor: colors.warning }]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="alarm" size={22} color={colors.warning} />
            <Text style={[styles.sectionTitle, { color: colors.warning }]}>
              مراجعات مستحقة ({dueReviews.length})
            </Text>
          </View>
          {dueReviews.slice(0, 3).map((review, index) => {
            const surah = surahsMetadata.find((s) => s.id === review.surahId);
            return (
              <TouchableOpacity
                key={index}
                style={[styles.reviewItem, { borderColor: colors.warning + '40' }]}
                onPress={() => router.push(`/memorize/${review.surahId}?ayah=${review.ayahStart}`)}
              >
                <Text style={[styles.reviewText, { color: colors.text }]}>
                  {surah?.name} - الآيات {review.ayahStart}-{review.ayahEnd}
                </Text>
                <Ionicons name="arrow-back" size={18} color={colors.warning} />
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* Memorization Modes */}
      <Text style={[styles.heading, { color: colors.text }]}>أوضاع الحفظ</Text>
      <View style={styles.modesContainer}>
        {[0, 2, 4].map((startIndex) => (
          <View key={startIndex} style={styles.modeRow}>
            {modes.slice(startIndex, startIndex + 2).map((mode) => (
              <TouchableOpacity
                key={mode.id}
                style={[styles.modeCard, { backgroundColor: colors.surface }, Shadows.sm]}
                onPress={() => mode.route ? router.push(mode.route) : openSurahPicker(mode.id)}
              >
                <View style={[styles.modeIcon, { backgroundColor: mode.color + '15' }]}>
                  <Ionicons name={mode.icon} size={28} color={mode.color} />
                </View>
                <Text style={[styles.modeTitle, { color: colors.text }]}>{mode.title}</Text>
                <Text style={[styles.modeDesc, { color: colors.textSecondary }]}>{mode.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      {/* Suggested Surahs */}
      <Text style={[styles.heading, { color: colors.text }]}>ابدأ بحفظ</Text>
      {shortSurahs.slice(0, 10).map((surah) => {
        const progress = getMemorizationProgress(surah.id);
        return (
          <TouchableOpacity
            key={surah.id}
            style={[styles.surahItem, { backgroundColor: colors.surface, borderColor: colors.borderLight }, Shadows.sm]}
            onPress={() => router.push(`/memorize/${surah.id}`)}
          >
            <View style={[styles.surahNumber, { backgroundColor: colors.primaryLight }]}>
              <Text style={[styles.surahNumberText, { color: colors.primary }]}>{surah.id}</Text>
            </View>
            <View style={styles.surahInfo}>
              <Text style={[styles.surahName, { color: colors.text }]}>{surah.name}</Text>
              <Text style={[styles.surahMeta, { color: colors.textSecondary }]}>{surah.versesCount} آية</Text>
            </View>
            <View style={styles.progressContainer}>
              <View style={[styles.progressBg, { backgroundColor: colors.borderLight }]}>
                <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: colors.primary }]} />
              </View>
              <Text style={[styles.progressText, { color: colors.textLight }]}>{Math.round(progress)}%</Text>
            </View>
          </TouchableOpacity>
        );
      })}

      {/* Browse All Surahs Button */}
      <TouchableOpacity
        style={[styles.browseAllBtn, { backgroundColor: colors.primaryLight }]}
        onPress={() => openSurahPicker('')}
      >
        <Ionicons name="list" size={20} color={colors.primary} />
        <Text style={[styles.browseAllText, { color: colors.primary }]}>تصفح جميع السور (114)</Text>
      </TouchableOpacity>
    </>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Ionicons name="school" size={30} color="#FFF" />
        <Text style={styles.headerTitle}>المحفظ الذكي</Text>
        <Text style={styles.headerSubtitle}>حفظ القرآن بطرق متعددة ومبتكرة</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {renderOverview()}
        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Surah Picker Modal */}
      <Modal visible={showSurahPicker} animationType="slide" transparent>
        <View style={[styles.modalOverlay]}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <View style={[styles.modalHeader, { borderBottomColor: colors.borderLight }]}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>اختر السورة</Text>
              <TouchableOpacity onPress={() => setShowSurahPicker(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <View style={[styles.searchContainer, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}>
              <Ionicons name="search" size={20} color={colors.textLight} />
              <TextInput
                value={surahSearch}
                onChangeText={setSurahSearch}
                placeholder="ابحث عن سورة..."
                placeholderTextColor={colors.textLight}
                style={[styles.searchInput, { color: colors.text }]}
                textAlign="right"
                autoFocus
              />
            </View>

            <FlatList
              data={filteredSurahs}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                const progress = getMemorizationProgress(item.id);
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
                        {item.nameEn} - {item.versesCount} آية
                      </Text>
                    </View>
                    {progress > 0 && (
                      <View style={[styles.pickerProgress, { backgroundColor: colors.successLight }]}>
                        <Text style={[styles.pickerProgressText, { color: colors.success }]}>{Math.round(progress)}%</Text>
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
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : (StatusBar.currentHeight || 0) + 10,
    paddingBottom: Spacing.xxl,
    alignItems: 'center',
    gap: Spacing.xs,
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
  },
  headerTitle: { color: '#FFF', fontSize: Fonts.sizes.title, fontWeight: '800' },
  headerSubtitle: { color: 'rgba(255,255,255,0.7)', fontSize: Fonts.sizes.sm },
  scrollContent: { paddingTop: Spacing.lg },
  statsRow: {
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  miniStat: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  miniStatNumber: { fontSize: Fonts.sizes.xxl, fontWeight: '900' },
  miniStatLabel: { fontSize: 13.5, fontWeight: '800' },
  section: {
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1.5,
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  sectionTitle: { fontSize: Fonts.sizes.md, fontWeight: '800', textAlign: 'right' },
  reviewItem: {
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderTopWidth: 1,
  },
  reviewText: { fontSize: 15, fontWeight: '700', textAlign: 'right' },
  heading: {
    fontSize: 22,
    fontWeight: '900',
    marginHorizontal: Spacing.xxl,
    marginBottom: Spacing.md,
    writingDirection: 'rtl',
    textAlign: 'right',
  },
  modesContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    ...(Platform.OS === 'web' ? { direction: 'rtl' as any } : {}),
  },
  modeRow: {
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
    ...(Platform.OS === 'web' ? { direction: 'rtl' as any } : {}),
  },
  modeCard: {
    flex: 1,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
    alignItems: I18nManager.isRTL ? 'flex-start' : 'flex-end',
  },
  modeIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modeTitle: { fontSize: 17, fontWeight: '900', writingDirection: 'rtl', textAlign: 'right' },
  modeDesc: { fontSize: 13.5, fontWeight: '700', lineHeight: 20, writingDirection: 'rtl', textAlign: 'right' },
  surahItem: {
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    alignItems: 'center',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    ...(Platform.OS === 'web' ? { direction: 'rtl' as any } : {}),
  },
  surahNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Spacing.xs,
  },
  surahNumberText: { fontSize: 15, fontWeight: '900' },
  surahInfo: {
    flex: 1,
    marginHorizontal: Spacing.sm,
    alignItems: I18nManager.isRTL ? 'flex-start' : 'flex-end',
  },
  surahName: {
    fontSize: 18,
    fontWeight: '900',
    writingDirection: 'rtl',
    textAlign: 'right',
    alignSelf: 'stretch',
  },
  surahMeta: {
    fontSize: 14,
    fontWeight: '800',
    marginTop: 2,
    writingDirection: 'rtl',
    textAlign: 'right',
    alignSelf: 'stretch',
  },
  progressContainer: { alignItems: 'center', gap: 4, width: 60 },
  progressBg: { width: '100%', height: 7, borderRadius: 3.5 },
  progressFill: { height: '100%', borderRadius: 3.5 },
  progressText: { fontSize: 13, fontWeight: '800' },
  browseAllBtn: {
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.sm,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
  },
  browseAllText: { fontSize: 17, fontWeight: '900' },
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
  searchContainer: {
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
  pickerItem: {
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
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
    marginHorizontal: Spacing.xs,
  },
  pickerNumberText: { fontSize: Fonts.sizes.sm, fontWeight: '800' },
  pickerInfo: {
    flex: 1,
    marginHorizontal: Spacing.sm,
    alignItems: I18nManager.isRTL ? 'flex-start' : 'flex-end',
  },
  pickerName: {
    fontSize: Fonts.sizes.md,
    fontWeight: '800',
    textAlign: 'right',
    writingDirection: 'rtl',
    alignSelf: 'stretch',
  },
  pickerMeta: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '600',
    marginTop: 2,
    textAlign: 'right',
    writingDirection: 'rtl',
    alignSelf: 'stretch',
  },
  pickerProgress: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    marginLeft: Spacing.sm,
  },
  pickerProgressText: { fontSize: Fonts.sizes.xs, fontWeight: '600' },
});
