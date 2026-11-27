import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar, Platform, I18nManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import {  Fonts, Spacing, BorderRadius, Shadows, rtlRow, rtlText, stripeBg } from '../constants/theme';
import SearchBar from '../components/ui/SearchBar';
import { quranData } from '../data/quran';
import { surahsMetadata } from '../data/metadata';

interface SearchResult {
  surahId: number;
  surahName: string;
  ayahNumber: number;
  text: string;
  matchType: 'ayah' | 'surah';
}

// Strip Arabic diacritics (tashkeel) for search matching
function stripTashkeel(text: string): string {
  return text
    .replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED]/g, '')
    .replace(/\u0671/g, '\u0627') // Replace alef wasla with regular alef
    .replace(/\s+/g, ' ')
    .trim();
}

export default function SearchScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [query, setQuery] = useState('');

  const results = useMemo((): SearchResult[] => {
    if (!query.trim() || query.trim().length < 2) return [];

    const q = stripTashkeel(query.trim());
    const qLower = q.toLowerCase();
    const found: SearchResult[] = [];

    // Search in surah names
    surahsMetadata.forEach((surah) => {
      const nameNorm = stripTashkeel(surah.name);
      if (nameNorm.includes(q) || surah.nameEn.toLowerCase().includes(qLower)) {
        found.push({
          surahId: surah.id,
          surahName: surah.name,
          ayahNumber: 0,
          text: `${surah.name} - ${surah.nameEn} (${surah.nameTranslation})`,
          matchType: 'surah',
        });
      }
    });

    // Search in ayahs
    quranData.forEach((surah) => {
      const surahMeta = surahsMetadata.find((s) => s.id === surah.id);
      surah.ayahs.forEach((ayah) => {
        const textNorm = stripTashkeel(ayah.text);
        if (textNorm.includes(q)) {
          found.push({
            surahId: surah.id,
            surahName: surahMeta?.name || '',
            ayahNumber: ayah.ayahNumber,
            text: ayah.text,
            matchType: 'ayah',
          });
        }
      });
    });

    return found.slice(0, 50);
  }, [query]);

  const highlightMatch = (text: string, q: string) => {
    if (!q.trim()) return <Text>{text}</Text>;

    const parts = text.split(new RegExp(`(${q})`, 'g'));
    return (
      <Text>
        {parts.map((part, i) =>
          part === q ? (
            <Text key={i} style={[styles.highlight, { backgroundColor: colors.warningLight, color: colors.warning }]}>
              {part}
            </Text>
          ) : (
            <Text key={i}>{part}</Text>
          )
        )}
      </Text>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
            <Ionicons name="close" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>البحث في القرآن</Text>
        </View>
      </View>

      <SearchBar
        value={query}
        onChangeText={setQuery}
        placeholder="ابحث عن آية أو سورة..."
        autoFocus
      />

      {query.trim().length < 2 ? (
        <View style={styles.emptyState}>
          <Ionicons name="search-outline" size={64} color={colors.textLight} />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>ابحث في القرآن الكريم</Text>
          <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
            اكتب كلمة أو عبارة للبحث في الآيات والسور
          </Text>
        </View>
      ) : results.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="search-outline" size={48} color={colors.textLight} />
          <Text style={[styles.emptyTitle, { color: colors.textSecondary }]}>
            لا توجد نتائج لـ "{query}"
          </Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item, index) => `${item.surahId}_${item.ayahNumber}_${index}`}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <Text style={[styles.resultCount, { color: colors.textSecondary }]}>
              {results.length} نتيجة
            </Text>
          }
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[styles.resultItem, { backgroundColor: stripeBg(index, colors), borderColor: colors.borderLight }, Shadows.sm]}
              onPress={() => {
                if (item.matchType === 'surah') {
                  router.push(`/surah/${item.surahId}`);
                } else {
                  router.push(`/surah/${item.surahId}`);
                }
              }}
            >
              <View style={styles.resultHeader}>
                <View style={[styles.resultType, {
                  backgroundColor: item.matchType === 'surah' ? colors.primaryLight : colors.secondaryLight,
                }]}>
                  <Ionicons
                    name={item.matchType === 'surah' ? 'book' : 'document-text'}
                    size={16}
                    color={item.matchType === 'surah' ? colors.primary : colors.secondary}
                  />
                </View>
                <Text style={[styles.resultRef, { color: colors.primary }]}>
                  {item.surahName}
                  {item.ayahNumber > 0 && ` - آية ${item.ayahNumber}`}
                </Text>
              </View>
              <Text style={[styles.resultText, { color: colors.text }]} numberOfLines={2}>
                {highlightMatch(item.text, query.trim())}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : (StatusBar.currentHeight || 0) + 10,
    paddingBottom: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  headerRow: {
    flexDirection: rtlRow,
    alignItems: 'center',
    gap: Spacing.md,
  },
  closeBtn: { padding: Spacing.xs },
  headerTitle: { color: '#FFF', fontSize: Fonts.sizes.xl, fontWeight: '700' },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.xxl,
  },
  emptyTitle: { fontSize: Fonts.sizes.xl, fontWeight: '700', textAlign: 'center' },
  emptySubtitle: { fontSize: Fonts.sizes.md, textAlign: 'center' },
  listContent: { padding: Spacing.md, paddingBottom: 100 },
  resultCount: {
    fontSize: Fonts.sizes.sm,
    fontWeight: '700',
    textAlign: rtlText,
    marginBottom: Spacing.sm,
    marginHorizontal: Spacing.sm,
  },
  resultItem: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  resultHeader: {
    flexDirection: rtlRow,
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  resultType: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultRef: { fontSize: Fonts.sizes.sm, fontWeight: '700', textAlign: rtlText },
  resultText: {
    fontSize: Fonts.sizes.lg,
    lineHeight: 32,
    textAlign: rtlText,
    writingDirection: 'rtl',
  },
  highlight: { fontWeight: '700' },
});
