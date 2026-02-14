import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { Fonts, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import SearchBar from '../../components/ui/SearchBar';
import SurahCard from '../../components/quran/SurahCard';
import { surahsMetadata } from '../../data/metadata';

type FilterType = 'all' | 'meccan' | 'medinan';

export default function QuranScreen() {
  const { colors } = useTheme();
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
        <Text style={styles.headerSubtitle}>114 سورة • 30 جزء</Text>
      </View>

      {/* Search */}
      <View style={{ marginTop: -Spacing.md }}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="ابحث عن سورة..."
        />
      </View>

      {/* Filter Tabs */}
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

      {/* Surah List */}
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
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              لا توجد نتائج
            </Text>
          </View>
        }
      />
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
  filterContainer: {
    flexDirection: 'row',
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
    fontWeight: '600',
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
