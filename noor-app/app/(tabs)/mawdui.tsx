import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  FlatList,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { Fonts, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { quranTopics, QuranTopic } from '../../data/topics';
import { quranpediaTopics, QPTopic } from '../../data/topics-from-quranpedia';
import { quranData } from '../../data/quran';
import { surahsMetadata } from '../../data/metadata';
import { audioService } from '../../services/audioService';
import Header from '../../components/ui/Header';

const toArabicDigits = (num: number): string => {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(num).split('').map((d) => arabicDigits[parseInt(d)] || d).join('');
};

function normalizeArabic(text: string): string {
  return text
    .replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED]/g, '')
    .replace(/[ٱإأآ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

interface ParsedAyah {
  surahId: number;
  surahName: string;
  ayahNumber: number;
  globalId: number;
  text: string;
}

const getTopicColors = (topicId: string, defaultColor: string) => {
  switch (topicId) {
    case 'tawheed':
      return { bg: '#F0F5FD', border: 'rgba(30, 58, 138, 0.25)', icon: '#1E3A8A' };
    case 'prophets':
      return { bg: '#FEF9EE', border: 'rgba(180, 83, 9, 0.25)', icon: '#B45309' };
    case 'akhlaq':
      return { bg: '#F7F4FD', border: 'rgba(109, 40, 217, 0.25)', icon: '#6D28D9' };
    case 'sabr':
      return { bg: '#FEF5EE', border: 'rgba(194, 65, 12, 0.25)', icon: '#C2410C' };
    case 'duaa':
      return { bg: '#F0FAFC', border: 'rgba(14, 116, 144, 0.25)', icon: '#0E7490' };
    case 'tawbah':
      return { bg: '#F2FAF5', border: 'rgba(21, 128, 61, 0.25)', icon: '#15803D' };
    case 'ilm':
      return { bg: '#F2F1FD', border: 'rgba(67, 56, 202, 0.25)', icon: '#4338CA' };
    case 'family':
      return { bg: '#FDF2F7', border: 'rgba(190, 24, 93, 0.25)', icon: '#BE185D' };
    case 'jannah_nar':
      return { bg: '#EEF9F5', border: 'rgba(4, 120, 87, 0.25)', icon: '#047857' };
    case 'sadaqah':
      return { bg: '#FFFBEB', border: 'rgba(180, 83, 9, 0.25)', icon: '#B45309' };
    case 'dhikr':
      return { bg: '#F0FDFA', border: 'rgba(15, 118, 110, 0.25)', icon: '#0F766E' };
    case 'taqwa':
      return { bg: '#F1F8F1', border: 'rgba(30, 58, 30, 0.25)', icon: '#1E3A1E' };
    case 'shukr':
      return { bg: '#FFFBEB', border: 'rgba(217, 119, 6, 0.25)', icon: '#D97706' };
    case 'amanah':
      return { bg: '#EFF6FF', border: 'rgba(30, 64, 175, 0.25)', icon: '#1E40AF' };
    case 'rizq':
      return { bg: '#F0FDFA', border: 'rgba(13, 148, 136, 0.25)', icon: '#0D9488' };
    case 'women':
      return { bg: '#FDF2F8', border: 'rgba(157, 23, 77, 0.25)', icon: '#9D174D' };
    case 'qadr':
      return { bg: '#F1F5F9', border: 'rgba(51, 65, 85, 0.25)', icon: '#334155' };
    case 'qiyamah':
      return { bg: '#FAF5FF', border: 'rgba(88, 28, 135, 0.25)', icon: '#581C87' };
    case 'jihad':
      return { bg: '#FEFCE8', border: 'rgba(133, 77, 14, 0.25)', icon: '#854D0E' };
    case 'adab':
      return { bg: '#F0F7F2', border: 'rgba(22, 91, 51, 0.25)', icon: '#165B33' };
    default:
      return { bg: defaultColor + '10', border: defaultColor + '30', icon: defaultColor };
  }
};

export default function MawduiScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'curated' | 'encyclopedia'>('curated');
  const [selectedCuratedTopic, setSelectedCuratedTopic] = useState<string | null>(null);
  const [selectedQPTopic, setSelectedQPTopic] = useState<QPTopic | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [playingAyahId, setPlayingAyahId] = useState<number | null>(null);

  // Stop audio on unmount
  useEffect(() => {
    audioService.setStatusCallback((status) => {
      if (status.didJustFinish) {
        setPlayingAyahId(null);
      }
    });
    return () => {
      audioService.stop();
    };
  }, []);

  const handlePlayVerse = async (globalId: number) => {
    if (playingAyahId === globalId) {
      await audioService.pause();
      setPlayingAyahId(null);
    } else {
      setPlayingAyahId(globalId);
      await audioService.playAyah(globalId);
    }
  };

  // Filter Quranpedia topics
  const filteredQPTopics = useMemo(() => {
    if (!searchQuery.trim()) {
      // Prioritize topics that have verses directly attached or major categories
      return quranpediaTopics.filter((t) => t.ayahs && t.ayahs.length > 0).slice(0, 150);
    }
    const q = normalizeArabic(searchQuery);
    return quranpediaTopics.filter((t) => {
      const norm = normalizeArabic(t.name);
      return norm.includes(q);
    });
  }, [searchQuery]);

  // Parse ayahs for the selected Quranpedia topic
  const qpVerses: ParsedAyah[] = useMemo(() => {
    if (!selectedQPTopic || !selectedQPTopic.ayahs) return [];
    const pairs = selectedQPTopic.ayahs.split(',').filter(Boolean);
    return pairs
      .map((pair) => {
        const [sStr, aStr] = pair.split(':');
        const sId = parseInt(sStr);
        const aNum = parseInt(aStr);
        const surah = quranData.find((s) => s.id === sId);
        const ayah = surah?.ayahs.find((a) => a.ayahNumber === aNum);
        const meta = surahsMetadata.find((m) => m.id === sId);
        if (!ayah) return null;
        return {
          surahId: sId,
          surahName: meta?.name || `سورة ${sId}`,
          ayahNumber: aNum,
          globalId: ayah.id,
          text: ayah.text,
        };
      })
      .filter(Boolean) as ParsedAyah[];
  }, [selectedQPTopic]);

  // ========================================================
  // DETAIL VIEW 1: CURATED TOPIC DETAIL
  // ========================================================
  const curatedTopic = quranTopics.find((t) => t.id === selectedCuratedTopic);
  if (curatedTopic) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header
          title={curatedTopic.title}
          subtitle={curatedTopic.description}
          showBack
          onBackPress={() => {
            audioService.stop();
            setPlayingAyahId(null);
            setSelectedCuratedTopic(null);
          }}
        />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.topicContent}>
          {/* Verses Section */}
          <Text style={[styles.sectionHeading, { color: colors.text }]}>
            <Ionicons name="book-outline" size={18} /> الآيات القرآنية ({toArabicDigits(curatedTopic.verses.length)})
          </Text>
          {curatedTopic.verses.map((verse, index) => {
            const surah = quranData.find((s) => s.id === verse.surahId);
            const ayah = surah?.ayahs.find((a) => a.ayahNumber === verse.ayahNumber);
            const meta = surahsMetadata.find((m) => m.id === verse.surahId);
            const globalId = ayah?.id || 0;
            const isPlayingThis = playingAyahId === globalId;

            return (
              <View
                key={index}
                style={[styles.verseCard, { backgroundColor: colors.surface, borderColor: colors.borderLight }, Shadows.sm]}
              >
                <Text style={[styles.verseArabic, { color: colors.text }]}>{ayah?.text || verse.text}</Text>

                <View style={styles.verseFooter}>
                  <View style={styles.verseRefBox}>
                    <Ionicons name="bookmark-outline" size={14} color={curatedTopic.color} />
                    <Text style={[styles.verseRef, { color: curatedTopic.color }]}>
                      {meta?.name || `سورة ${verse.surahId}`} - آية {toArabicDigits(verse.ayahNumber)}
                    </Text>
                  </View>

                  <View style={styles.verseActions}>
                    {/* Audio Play button */}
                    {globalId > 0 && (
                      <TouchableOpacity
                        style={[
                          styles.actionPill,
                          { backgroundColor: isPlayingThis ? colors.primary : colors.primaryLight },
                        ]}
                        onPress={() => handlePlayVerse(globalId)}
                      >
                        <Ionicons
                          name={isPlayingThis ? 'pause' : 'volume-high'}
                          size={15}
                          color={isPlayingThis ? '#FFF' : colors.primary}
                        />
                        <Text
                          style={[
                            styles.actionPillText,
                            { color: isPlayingThis ? '#FFF' : colors.primary },
                          ]}
                        >
                          {isPlayingThis ? 'إيقاف' : 'استماع'}
                        </Text>
                      </TouchableOpacity>
                    )}

                    {/* Open in Mushaf button */}
                    <TouchableOpacity
                      style={[styles.actionPill, { backgroundColor: colors.surfaceVariant }]}
                      onPress={() => router.push(`/surah/${verse.surahId}?ayah=${verse.ayahNumber}`)}
                    >
                      <Ionicons name="open-outline" size={14} color={colors.textSecondary} />
                      <Text style={[styles.actionPillText, { color: colors.textSecondary }]}>المصحف</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}

          {/* Hadiths Section */}
          <Text style={[styles.sectionHeading, { color: colors.text, marginTop: Spacing.xl }]}>
            <Ionicons name="book-outline" size={18} color={colors.primary} /> الأحاديث النبوية الشريفة المخرجة ({toArabicDigits(curatedTopic.hadiths.length)})
          </Text>
          {curatedTopic.hadiths.map((hadith, index) => (
            <View
              key={index}
              style={[
                styles.hadithCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: 'rgba(212, 175, 55, 0.35)',
                },
                Shadows.sm,
              ]}
            >
              {/* Narrator and Hadith Number Header */}
              <View style={styles.hadithHeaderRow}>
                {hadith.narrator ? (
                  <View style={[styles.narratorBadge, { backgroundColor: colors.primaryLight, borderColor: colors.primary + '30' }]}>
                    <Ionicons name="person-circle-outline" size={15} color={colors.primary} />
                    <Text style={[styles.narratorText, { color: colors.primary }]}>{hadith.narrator}</Text>
                  </View>
                ) : (
                  <View />
                )}
                <View style={styles.hadithNumberBadge}>
                  <Text style={styles.hadithNumberText}>حديث {toArabicDigits(index + 1)}</Text>
                </View>
              </View>

              {/* Complete Hadith Matn */}
              <Text style={[styles.hadithText, { color: colors.text }]}>{hadith.text}</Text>

              {/* Sanad / Takhrij / Source */}
              <View style={styles.hadithSourceRow}>
                <Ionicons name="checkmark-circle" size={14} color="#B8860B" />
                <Text style={styles.hadithSourceText}>{hadith.source}</Text>
              </View>
            </View>
          ))}

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    );
  }

  // ========================================================
  // DETAIL VIEW 2: QURANPEDIA TOPIC DETAIL
  // ========================================================
  if (selectedQPTopic) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header
          title={selectedQPTopic.name}
          subtitle={`موسوعة القرآن الموضوعية • ${toArabicDigits(qpVerses.length)} آيات`}
          showBack
          onBackPress={() => {
            audioService.stop();
            setPlayingAyahId(null);
            setSelectedQPTopic(null);
          }}
        />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.topicContent}>
          {qpVerses.length === 0 ? (
            <View style={styles.emptyDetail}>
              <Ionicons name="information-circle-outline" size={40} color={colors.textLight} />
              <Text style={[styles.emptyDetailText, { color: colors.textSecondary }]}>
                هذا الموضوع مصنف كعنوان رئيسي، اختر أحد الموضوعات الفرعية التابعة له للاطلاع على الآيات.
              </Text>
            </View>
          ) : (
            qpVerses.map((verse, index) => {
              const isPlayingThis = playingAyahId === verse.globalId;
              return (
                <View
                  key={index}
                  style={[styles.verseCard, { backgroundColor: colors.surface, borderColor: colors.borderLight }, Shadows.sm]}
                >
                  <Text style={[styles.verseArabic, { color: colors.text }]}>{verse.text}</Text>

                  <View style={styles.verseFooter}>
                    <View style={styles.verseRefBox}>
                      <Ionicons name="bookmark-outline" size={14} color="#16A085" />
                      <Text style={[styles.verseRef, { color: '#16A085' }]}>
                        {verse.surahName} - آية {toArabicDigits(verse.ayahNumber)}
                      </Text>
                    </View>

                    <View style={styles.verseActions}>
                      <TouchableOpacity
                        style={[
                          styles.actionPill,
                          { backgroundColor: isPlayingThis ? colors.primary : colors.primaryLight },
                        ]}
                        onPress={() => handlePlayVerse(verse.globalId)}
                      >
                        <Ionicons
                          name={isPlayingThis ? 'pause' : 'volume-high'}
                          size={15}
                          color={isPlayingThis ? '#FFF' : colors.primary}
                        />
                        <Text
                          style={[
                            styles.actionPillText,
                            { color: isPlayingThis ? '#FFF' : colors.primary },
                          ]}
                        >
                          {isPlayingThis ? 'إيقاف' : 'استماع'}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[styles.actionPill, { backgroundColor: colors.surfaceVariant }]}
                        onPress={() => router.push(`/surah/${verse.surahId}?ayah=${verse.ayahNumber}`)}
                      >
                        <Ionicons name="open-outline" size={14} color={colors.textSecondary} />
                        <Text style={[styles.actionPillText, { color: colors.textSecondary }]}>المصحف</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    );
  }

  // ========================================================
  // MAIN TOPICS LIST (TABS: CURATED vs ENCYCLOPEDIA)
  // ========================================================
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      {/* Main Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Ionicons name="grid" size={28} color="#FFF" />
        <Text style={styles.headerTitle}>القرآن الموضوعي</Text>
        <Text style={styles.headerSubtitle}>
          تصفح آيات القرآن الكريم وفق تصنيف موضوعي دقيق وموثق
        </Text>

        {/* Tab Switcher */}
        <View style={styles.tabsRow}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'curated' && styles.tabBtnActive]}
            onPress={() => setActiveTab('curated')}
          >
            <Ionicons
              name="sparkles"
              size={15}
              color={activeTab === 'curated' ? colors.primary : '#FFF'}
            />
            <Text style={[styles.tabBtnText, activeTab === 'curated' && { color: colors.primary, fontWeight: '700' }]}>
              الموضوعات الكبرى ({toArabicDigits(quranTopics.length)})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'encyclopedia' && styles.tabBtnActive]}
            onPress={() => setActiveTab('encyclopedia')}
          >
            <Ionicons
              name="search"
              size={15}
              color={activeTab === 'encyclopedia' ? colors.primary : '#FFF'}
            />
            <Text style={[styles.tabBtnText, activeTab === 'encyclopedia' && { color: colors.primary, fontWeight: '700' }]}>
              الموسوعة الشاملة (٦٠٠٠ موضوع)
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ======================================================== */}
      {/* TAB 1: CURATED TOPICS                                    */}
      {/* ======================================================== */}
      {activeTab === 'curated' && (
        <FlatList
          data={quranTopics}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.gridRow}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const cardTheme = getTopicColors(item.id, item.color);
            return (
              <TouchableOpacity
                style={[
                  styles.topicCard,
                  { backgroundColor: cardTheme.bg, borderColor: cardTheme.border },
                  Shadows.sm,
                ]}
                onPress={() => setSelectedCuratedTopic(item.id)}
                activeOpacity={0.7}
              >
                <View style={[styles.topicIcon, { backgroundColor: cardTheme.icon + '18' }]}>
                  <Ionicons name={item.icon as any} size={28} color={cardTheme.icon} />
                </View>
                <Text style={[styles.cardTitle, { color: colors.text }]}>{item.title}</Text>
                <Text style={[styles.cardTitleEn, { color: colors.textSecondary }]}>{item.titleEn}</Text>
                <View style={[styles.cardCountBadge, { backgroundColor: cardTheme.icon + '14' }]}>
                  <Text style={[styles.cardCount, { color: cardTheme.icon }]}>
                    {toArabicDigits(item.verses.length)} آية • {toArabicDigits(item.hadiths.length)} أحاديث
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}

      {/* ======================================================== */}
      {/* TAB 2: ENCYCLOPEDIA (6,100 Quranpedia Topics with Search) */}
      {/* ======================================================== */}
      {activeTab === 'encyclopedia' && (
        <View style={{ flex: 1 }}>
          {/* Instant Search Bar */}
          <View style={[styles.searchBarBox, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
            <Ionicons name="search" size={20} color={colors.primary} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="ابحث في أكثر من ٦٠٠٠ موضوع قرآني (مثل: الصبر، الصلاة، التوبة...)"
              placeholderTextColor={colors.textLight}
              value={searchQuery}
              onChangeText={setSearchQuery}
              textAlign="right"
              clearButtonMode="while-editing"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={18} color={colors.textLight} />
              </TouchableOpacity>
            )}
          </View>

          <FlatList
            data={filteredQPTopics}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={styles.qpListContent}
            showsVerticalScrollIndicator={false}
            initialNumToRender={25}
            maxToRenderPerBatch={30}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Ionicons name="search-outline" size={44} color={colors.textLight} />
                <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                  لا توجد موضوعات مطابقة لبحثك
                </Text>
              </View>
            }
            renderItem={({ item }) => {
              const ayahCount = item.ayahs ? item.ayahs.split(',').filter(Boolean).length : 0;
              return (
                <TouchableOpacity
                  style={[styles.qpItem, { backgroundColor: colors.surface, borderColor: colors.borderLight }, Shadows.sm]}
                  onPress={() => setSelectedQPTopic(item)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.qpIconBox, { backgroundColor: '#16A085' + '15' }]}>
                    <Ionicons name="layers-outline" size={20} color="#16A085" />
                  </View>

                  <View style={styles.qpInfo}>
                    <Text style={[styles.qpName, { color: colors.text }]}>{item.name}</Text>
                    {ayahCount > 0 ? (
                      <Text style={[styles.qpMeta, { color: '#16A085' }]}>
                        {toArabicDigits(ayahCount)} {ayahCount === 1 ? 'آية' : 'آيات'}
                      </Text>
                    ) : (
                      <Text style={[styles.qpMeta, { color: colors.textLight }]}>تصنيف رئيسي</Text>
                    )}
                  </View>

                  <Ionicons name="chevron-back" size={18} color={colors.textLight} />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : (StatusBar.currentHeight || 0) + 10,
    paddingBottom: Spacing.md,
    alignItems: 'center',
    gap: 4,
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
  },
  headerTitle: { color: '#FFF', fontSize: Fonts.sizes.xl, fontWeight: '800' },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: Fonts.sizes.xs,
    textAlign: 'center',
    paddingHorizontal: Spacing.xl,
  },
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.18)',
    borderRadius: BorderRadius.full,
    padding: 3,
    marginTop: Spacing.sm,
    marginHorizontal: Spacing.md,
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.full,
    gap: 5,
  },
  tabBtnActive: {
    backgroundColor: '#FFFFFF',
  },
  tabBtnText: {
    fontSize: Fonts.sizes.xs,
    color: '#FFF',
    fontWeight: '600',
  },
  grid: { padding: Spacing.md, paddingBottom: 60 },
  gridRow: { gap: Spacing.sm },
  topicCard: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.2,
    alignItems: 'center',
    gap: 6,
    marginBottom: Spacing.sm,
  },
  topicIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: { fontSize: Fonts.sizes.md, fontWeight: '700', textAlign: 'center' },
  cardTitleEn: { fontSize: Fonts.sizes.xs },
  cardCountBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
    marginTop: 2,
  },
  cardCount: { fontSize: 11, fontWeight: '700' },

  // Search Bar
  searchBarBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.md,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  searchInput: { flex: 1, fontSize: Fonts.sizes.sm },
  qpListContent: { paddingHorizontal: Spacing.md, paddingBottom: 60 },
  qpItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  qpIconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qpInfo: { flex: 1 },
  qpName: { fontSize: Fonts.sizes.sm, fontWeight: '700', lineHeight: 22, textAlign: 'right' },
  qpMeta: { fontSize: Fonts.sizes.xs, fontWeight: '600', marginTop: 2, textAlign: 'right' },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60, gap: Spacing.sm },
  emptyText: { fontSize: Fonts.sizes.sm, fontWeight: '600' },

  // Topic Details
  topicHeader: {
    paddingTop: Platform.OS === 'ios' ? 50 : (StatusBar.currentHeight || 0) + 10,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    gap: 6,
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
  },
  backBtn: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : (StatusBar.currentHeight || 0) + 10,
    right: Spacing.md,
    padding: Spacing.xs,
  },
  topicTitle: { color: '#FFF', fontSize: Fonts.sizes.title, fontWeight: '800', marginTop: 4, textAlign: 'center' },
  topicTitleEn: { color: 'rgba(255,255,255,0.85)', fontSize: Fonts.sizes.sm },
  topicDescription: { color: 'rgba(255,255,255,0.8)', fontSize: Fonts.sizes.xs, textAlign: 'center', lineHeight: 18 },
  topicContent: { padding: Spacing.md },
  sectionHeading: { fontSize: Fonts.sizes.lg, fontWeight: '700', marginBottom: Spacing.sm, writingDirection: 'rtl' },
  verseCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  verseArabic: {
    fontFamily: Fonts.arabic.quran,
    fontSize: 26,
    textAlign: 'center',
    lineHeight: 52,
    writingDirection: 'rtl',
  },
  verseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.06)',
    paddingTop: Spacing.sm,
  },
  verseRefBox: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  verseRef: { fontSize: Fonts.sizes.xs, fontWeight: '700' },
  verseActions: { flexDirection: 'row', gap: Spacing.xs },
  actionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 5,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  actionPillText: { fontSize: Fonts.sizes.xs, fontWeight: '600' },
  hadithCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
  },
  hadithHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  narratorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 3.5,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  narratorText: {
    fontSize: 12.5,
    fontWeight: '700',
  },
  hadithNumberBadge: {
    backgroundColor: 'rgba(0,0,0,0.04)',
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: BorderRadius.sm,
  },
  hadithNumberText: {
    fontSize: 11,
    color: '#888',
    fontWeight: '600',
  },
  hadithText: {
    fontSize: Fonts.sizes.md,
    lineHeight: 28,
    writingDirection: 'rtl',
    textAlign: 'right',
    color: '#2C3E50',
    marginBottom: Spacing.sm,
  },
  hadithSourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: BorderRadius.md,
    backgroundColor: 'rgba(191, 149, 63, 0.08)',
    alignSelf: 'flex-start',
  },
  hadithSourceText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#996515',
    writingDirection: 'rtl',
    textAlign: 'right',
  },
  emptyDetail: { alignItems: 'center', paddingVertical: 40, gap: Spacing.md, paddingHorizontal: Spacing.lg },
  emptyDetailText: { fontSize: Fonts.sizes.sm, textAlign: 'center', lineHeight: 22 },
});
