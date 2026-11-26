import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar, Platform, TouchableOpacity, I18nManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { Fonts, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import SearchBar from '../../components/ui/SearchBar';
import SurahCard from '../../components/quran/SurahCard';
import { surahsMetadata } from '../../data/metadata';
import { pagesMetadata } from '../../data/pages-metadata';

type MainTab = 'surahs' | 'pages' | 'juz';
type FilterType = 'all' | 'meccan' | 'medinan';

const toArabicDigits = (num: number): string => {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(num).split('').map((d) => arabicDigits[parseInt(d)] || d).join('');
};

export default function QuranScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [mainTab, setMainTab] = useState<MainTab>('surahs');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredSurahs = useMemo(() => {
    let result = surahsMetadata;
    if (filter !== 'all') {
      result = result.filter((s) => s.revelationType === filter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (s) =>
          s.name.includes(q) ||
          s.nameEn.toLowerCase().includes(q) ||
          s.nameTranslation.toLowerCase().includes(q) ||
          String(s.id).includes(q)
      );
    }
    return result;
  }, [searchQuery, filter]);

  const filteredPages = useMemo(() => {
    if (!searchQuery.trim()) return pagesMetadata;
    const q = searchQuery.trim();
    return pagesMetadata.filter((p) => {
      const pageStr = String(p.page);
      const hasSurah = p.surahs.some((s) => {
        const meta = surahsMetadata.find((sm) => sm.id === s.id);
        return meta && (meta.name.includes(q) || meta.nameEn.toLowerCase().includes(q.toLowerCase()));
      });
      return pageStr === q || hasSurah;
    });
  }, [searchQuery]);

  const juzList = useMemo(() => {
    const list = [];
    for (let j = 1; j <= 30; j++) {
      const firstPage = pagesMetadata.find((p) => p.juz === j);
      const surahsInJuz = pagesMetadata
        .filter((p) => p.juz === j)
        .flatMap((p) => p.surahs.map((s) => s.id));
      const uniqueSurahIds = Array.from(new Set(surahsInJuz));
      const surahNames = uniqueSurahIds
        .map((id) => surahsMetadata.find((s) => s.id === id)?.name)
        .filter(Boolean)
        .join(' - ');

      list.push({
        juz: j,
        startPage: firstPage ? firstPage.page : 1,
        firstSurahId: uniqueSurahIds[0] || 1,
        surahNames,
      });
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim();
      return list.filter((item) => String(item.juz) === q || item.surahNames.includes(q));
    }
    return list;
  }, [searchQuery]);

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'الكل' },
    { key: 'meccan', label: 'مكية' },
    { key: 'medinan', label: 'مدنية' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Text style={styles.headerTitle}>المصحف الشريف</Text>
        <Text style={styles.headerSubtitle}>مصحف المدينة النبوية • ٦٠٤ صفحات • ٣٠ جزء</Text>

        {/* Main Tabs */}
        <View style={styles.mainTabsContainer}>
          <TouchableOpacity
            style={[styles.mainTabBtn, mainTab === 'surahs' && styles.mainTabBtnActive]}
            onPress={() => setMainTab('surahs')}
          >
            <Text style={[styles.mainTabBtnText, mainTab === 'surahs' && styles.mainTabBtnTextActive]}>
              السور (١١٤)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.mainTabBtn, mainTab === 'pages' && styles.mainTabBtnActive]}
            onPress={() => setMainTab('pages')}
          >
            <Text style={[styles.mainTabBtnText, mainTab === 'pages' && styles.mainTabBtnTextActive]}>
              الصفحات (٦٠٤)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.mainTabBtn, mainTab === 'juz' && styles.mainTabBtnActive]}
            onPress={() => setMainTab('juz')}
          >
            <Text style={[styles.mainTabBtnText, mainTab === 'juz' && styles.mainTabBtnTextActive]}>
              الأجزاء (٣٠)
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search */}
      <View style={{ marginTop: -Spacing.md }}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={mainTab === 'surahs' ? 'ابحث عن سورة...' : mainTab === 'pages' ? 'ابحث برقم الصفحة أو اسم السورة...' : 'ابحث برقم الجزء...'}
        />
      </View>

      {/* Filter Tabs only for Surahs */}
      {mainTab === 'surahs' && (
        <View style={styles.filterContainer}>
          {filters.map((f) => (
            <TouchableOpacity
              key={f.key}
              onPress={() => setFilter(f.key)}
              style={[
                styles.filterTab,
                {
                  backgroundColor: filter === f.key ? colors.primary : colors.surfaceVariant,
                  borderColor: filter === f.key ? colors.primary : colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  { color: filter === f.key ? '#FFF' : colors.textSecondary },
                ]}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* View Content based on Main Tab */}
      {mainTab === 'surahs' && (
        <FlatList
          data={filteredSurahs}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <SurahCard
              id={item.id}
              name={item.name}
              nameEn={item.nameEn}
              nameTranslation={item.nameTranslation}
              versesCount={item.versesCount}
              revelationType={item.revelationType}
              juz={item.juz}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={48} color={colors.textLight} />
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>لا توجد نتائج</Text>
            </View>
          }
        />
      )}

      {mainTab === 'pages' && (
        <FlatList
          data={filteredPages}
          keyExtractor={(item) => `page_${item.page}`}
          renderItem={({ item }) => {
            const surahNames = item.surahs
              .map((s) => surahsMetadata.find((sm) => sm.id === s.id)?.name)
              .filter(Boolean)
              .join(' • ');

            return (
              <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.pageCard, { backgroundColor: colors.surface, borderColor: colors.borderLight }, Shadows.sm]}
                onPress={() => router.push(`/surah/${item.surahs[0].id}`)}
              >
                <View style={[styles.pageNumberBadge, { backgroundColor: colors.primaryLight }]}>
                  <Text style={[styles.pageNumberText, { color: colors.primary }]}>
                    {toArabicDigits(item.page)}
                  </Text>
                </View>

                <View style={styles.pageCardInfo}>
                  <Text style={[styles.pageSurahsText, { color: colors.text }]}>{surahNames}</Text>
                  <Text style={[styles.pageJuzText, { color: colors.textSecondary }]}>
                    الجزء {toArabicDigits(item.juz)} • صفحة {toArabicDigits(item.page)}
                  </Text>
                </View>

                <Ionicons name="chevron-back" size={18} color={colors.textLight} />
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          initialNumToRender={20}
          maxToRenderPerBatch={30}
        />
      )}

      {mainTab === 'juz' && (
        <FlatList
          data={juzList}
          keyExtractor={(item) => `juz_${item.juz}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.pageCard, { backgroundColor: colors.surface, borderColor: colors.borderLight }, Shadows.sm]}
              onPress={() => router.push(`/surah/${item.firstSurahId}`)}
            >
              <View style={[styles.pageNumberBadge, { backgroundColor: colors.secondaryLight }]}>
                <Text style={[styles.pageNumberText, { color: colors.secondary }]}>
                  {toArabicDigits(item.juz)}
                </Text>
              </View>

              <View style={styles.pageCardInfo}>
                <Text style={[styles.pageSurahsText, { color: colors.text }]}>الجزء {toArabicDigits(item.juz)}</Text>
                <Text style={[styles.pageJuzText, { color: colors.textSecondary }]}>
                  يبدأ من صفحة {toArabicDigits(item.startPage)} • {item.surahNames}
                </Text>
              </View>

              <Ionicons name="chevron-back" size={18} color={colors.textLight} />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
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
    paddingHorizontal: Spacing.xxl,
    alignItems: 'center',
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: Fonts.sizes.title,
    fontWeight: '800',
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: Fonts.sizes.sm,
    marginTop: Spacing.xs,
  },
  mainTabsContainer: {
    flexDirection: 'row',
    marginTop: Spacing.md,
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: BorderRadius.full,
    padding: 3,
  },
  mainTabBtn: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
  },
  mainTabBtnActive: {
    backgroundColor: '#FFF',
  },
  mainTabBtnText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: Fonts.sizes.xs,
    fontWeight: '700',
  },
  mainTabBtnTextActive: {
    color: '#0D7C5F',
    fontWeight: '800',
  },
  pageCard: {
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    alignItems: 'center',
    padding: Spacing.md,
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.xs,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
  },
  pageNumberBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageNumberText: {
    fontSize: Fonts.sizes.md,
    fontWeight: '800',
  },
  pageCardInfo: {
    flex: 1,
    marginHorizontal: Spacing.md,
    alignItems: I18nManager.isRTL ? 'flex-start' : 'flex-end',
  },
  pageSurahsText: {
    fontSize: Fonts.sizes.md,
    fontWeight: '800',
    fontFamily: Fonts.arabic.bold,
    textAlign: 'right',
    writingDirection: 'rtl',
    alignSelf: 'stretch',
  },
  pageJuzText: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '700',
    marginTop: 2,
    color: '#4B5563',
    textAlign: 'right',
    writingDirection: 'rtl',
    alignSelf: 'stretch',
  },
  filterContainer: {
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
    marginVertical: Spacing.sm,
  },
  filterTab: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  filterText: {
    fontSize: Fonts.sizes.sm,
    fontWeight: '700',
  },
  listContent: {
    paddingVertical: Spacing.sm,
    paddingBottom: 100,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    gap: Spacing.md,
  },
  emptyText: {
    fontSize: Fonts.sizes.lg,
  },
});
