import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Platform, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';
import { useHifz } from '../../context/HifzContext';
import { Fonts, Spacing, BorderRadius, Shadows } from '../../constants/theme';

const { width } = Dimensions.get('window');

const DAILY_VERSES = [
  { arabic: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا', translation: 'Indeed, with hardship comes ease.', surah: 'الشرح', ayah: 6 },
  { arabic: 'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ', translation: 'And whoever relies upon Allah - then He is sufficient for him.', surah: 'الطلاق', ayah: 3 },
  { arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ', translation: 'Our Lord, give us good in this world and good in the Hereafter and protect us from the punishment of the Fire.', surah: 'البقرة', ayah: 201 },
  { arabic: 'فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ', translation: 'So remember Me; I will remember you. And be grateful to Me and do not deny Me.', surah: 'البقرة', ayah: 152 },
  { arabic: 'وَقُل رَّبِّ زِدْنِي عِلْمًا', translation: 'And say: My Lord, increase me in knowledge.', surah: 'طه', ayah: 114 },
  { arabic: 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا', translation: 'Allah does not burden a soul beyond that it can bear.', surah: 'البقرة', ayah: 286 },
  { arabic: 'وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ', translation: 'And your Lord is going to give you, and you will be satisfied.', surah: 'الضحى', ayah: 5 },
];

export default function HomeScreen() {
  const { colors } = useTheme();
  const { lastRead, dailyProgress } = useApp();
  const { stats, getDueReviews } = useHifz();
  const router = useRouter();
  const [dailyVerse, setDailyVerse] = useState(DAILY_VERSES[0]);

  useEffect(() => {
    const dayIndex = new Date().getDate() % DAILY_VERSES.length;
    setDailyVerse(DAILY_VERSES[dayIndex]);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'صباح الخير';
    if (hour < 17) return 'مساء النور';
    return 'مساء الخير';
  };

  const features = [
    // Row 1
    { id: 'quran', title: 'المصحف', icon: 'book' as const, color: colors.primary, route: '/quran' as const },
    { id: 'tafsir', title: 'التفسير', icon: 'library' as const, color: '#8E44AD', route: '/quran' as const },
    { id: 'hifz', title: 'الحفظ', icon: 'school' as const, color: '#E67E22', route: '/hifz' as const },
    // Row 2
    { id: 'mawdui', title: 'الموضوعي', icon: 'grid' as const, color: '#2980B9', route: '/mawdui' as const },
    { id: 'mutashabihat', title: 'المتشابهات', icon: 'git-compare' as const, color: '#16A085', route: '/mutashabihat' as const },
    { id: 'asbab', title: 'أسباب التنزيل', icon: 'time' as const, color: '#8E44AD', route: '/asbab/0' as const },
    { id: 'duas', title: 'الأدعية', icon: 'hand-left' as const, color: '#1B7F5A', route: '/duas' as const },
    { id: 'adhkar', title: 'الأذكار', icon: 'moon' as const, color: '#B8860B', route: '/adhkar' as const },
    // Row 3
    { id: 'bookmarks', title: 'المفضلة', icon: 'bookmark' as const, color: '#E67E22', route: '/bookmarks' as const },
    { id: 'search', title: 'البحث', icon: 'search' as const, color: '#C0392B', route: '/search' as const },
  ];

  const dueReviews = getDueReviews();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.appName}>
              <Text style={styles.noorGlow}>نـــور</Text>
              <Text style={styles.appRest}>  القرآن الكريم</Text>
            </Text>
            <Text style={styles.bismillah}>﷽</Text>
          </View>
        </View>
        <View style={styles.searchRow}>
          <TouchableOpacity
            style={styles.searchBtn}
            onPress={() => router.push('/search')}
          >
            <Ionicons name="search" size={22} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Daily Verse Card */}
        <View style={[styles.dailyVerseCard, { backgroundColor: colors.surface }, Shadows.md]}>
          <View style={[styles.dailyVerseHeader, { borderBottomColor: colors.borderLight }]}>
            <Ionicons name="sparkles" size={18} color={colors.secondary} />
            <Text style={[styles.dailyVerseTitle, { color: colors.secondary }]}>آية اليوم</Text>
          </View>
          <Text style={[styles.dailyVerseArabic, { color: colors.text }]}>
            {dailyVerse.arabic}
          </Text>
          <Text style={[styles.dailyVerseTranslation, { color: colors.textSecondary }]}>
            {dailyVerse.translation}
          </Text>
          <Text style={[styles.dailyVerseSurah, { color: colors.primary }]}>
            سورة {dailyVerse.surah} - آية {dailyVerse.ayah}
          </Text>
        </View>

        {/* Last Read */}
        {lastRead && (
          <TouchableOpacity
            style={[styles.lastReadCard, { backgroundColor: colors.primaryLight, borderColor: colors.primary }, Shadows.sm]}
            onPress={() => router.push(`/surah/${lastRead.surahId}`)}
          >
            <View style={styles.lastReadContent}>
              <Ionicons name="bookmark" size={24} color={colors.primary} />
              <View style={styles.lastReadInfo}>
                <Text style={[styles.lastReadLabel, { color: colors.primary }]}>متابعة القراءة</Text>
                <Text style={[styles.lastReadSurah, { color: colors.text }]}>
                  {lastRead.surahName} - الآية {lastRead.ayahNumber}
                </Text>
              </View>
            </View>
            <Ionicons name="arrow-back-circle" size={30} color={colors.primary} />
          </TouchableOpacity>
        )}

        {/* Due Reviews Alert */}
        {dueReviews.length > 0 && (
          <TouchableOpacity
            style={[styles.reviewAlert, { backgroundColor: colors.warningLight, borderColor: colors.warning }]}
            onPress={() => router.push('/hifz')}
          >
            <Ionicons name="notifications" size={22} color={colors.warning} />
            <Text style={[styles.reviewAlertText, { color: colors.text }]}>
              لديك {dueReviews.length} مراجعة مستحقة اليوم
            </Text>
            <Ionicons name="chevron-back" size={18} color={colors.warning} />
          </TouchableOpacity>
        )}

        {/* Features Grid */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>الأقسام</Text>
        <View style={styles.featuresGrid}>
          {features.map((feature) => (
            <TouchableOpacity
              key={feature.id}
              style={[
                styles.featureCard,
                feature.id === 'search' && styles.featureCardFull,
                { backgroundColor: colors.surface }, Shadows.sm,
              ]}
              onPress={() => router.push(feature.route)}
              activeOpacity={0.7}
            >
              <View style={[styles.featureIcon, { backgroundColor: feature.color + '15' }]}>
                <Ionicons name={feature.icon} size={feature.id === 'search' ? 22 : 28} color={feature.color} />
              </View>
              <Text style={[styles.featureTitle, { color: colors.text }]}>{feature.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>إحصائياتك</Text>
        <View style={[styles.statsCard, { backgroundColor: colors.surface }, Shadows.sm]}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.primary }]}>{stats.totalVerses}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>آية محفوظة</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.secondary }]}>{stats.totalSurahs}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>سورة</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.success }]}>{stats.streakDays}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>يوم متتالي</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.info }]}>{Math.round(stats.averageAccuracy)}%</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>نسبة الدقة</Text>
          </View>
        </View>

        <View style={{ height: 30 }} />
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
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xxl,
    paddingTop: Spacing.sm,
  },
  headerTitleWrap: {
    alignItems: 'center',
  },
  appName: {
    fontSize: 38,
    fontWeight: '800',
    letterSpacing: 2,
  },
  noorGlow: {
    color: '#FFD700',
    textShadowColor: '#FFAA00',
    textShadowRadius: 18,
    textShadowOffset: { width: 0, height: 0 },
  },
  appRest: {
    color: '#FFD700',
    textShadowColor: '#FFAA00',
    textShadowRadius: 14,
    textShadowOffset: { width: 0, height: 0 },
  },
  bismillah: {
    color: '#FFFFFF',
    fontSize: 52,
    fontWeight: '700',
    marginTop: Spacing.md,
    textShadowColor: 'rgba(255,255,255,0.5)',
    textShadowRadius: 10,
    textShadowOffset: { width: 0, height: 0 },
    opacity: 1,
  },
  searchBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing.xxl,
    marginTop: Spacing.md,
  },
  scrollContent: {
    paddingTop: Spacing.lg,
  },
  dailyVerseCard: {
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  dailyVerseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingBottom: Spacing.sm,
    marginBottom: Spacing.md,
    borderBottomWidth: 1,
  },
  dailyVerseTitle: {
    fontSize: Fonts.sizes.md,
    fontWeight: '700',
  },
  dailyVerseArabic: {
    fontSize: Fonts.sizes.quran,
    textAlign: 'center',
    lineHeight: 50,
    marginVertical: Spacing.md,
    fontWeight: '400',
  },
  dailyVerseTranslation: {
    fontSize: Fonts.sizes.sm,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.sm,
  },
  dailyVerseSurah: {
    fontSize: Fonts.sizes.sm,
    textAlign: 'center',
    fontWeight: '600',
  },
  lastReadCard: {
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    marginBottom: Spacing.lg,
  },
  lastReadContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  lastReadInfo: {
    gap: 2,
  },
  lastReadLabel: {
    fontSize: Fonts.sizes.sm,
    fontWeight: '600',
  },
  lastReadSurah: {
    fontSize: Fonts.sizes.md,
    fontWeight: '700',
  },
  reviewAlert: {
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    borderWidth: 1,
    marginBottom: Spacing.lg,
  },
  reviewAlertText: {
    flex: 1,
    fontSize: Fonts.sizes.sm,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: Fonts.sizes.xl,
    fontWeight: '700',
    marginHorizontal: Spacing.xxl,
    marginBottom: Spacing.md,
    marginTop: Spacing.sm,
    writingDirection: 'rtl',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  featureCard: {
    width: (width - Spacing.md * 2 - Spacing.sm * 2) / 3,
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
  },
  featureIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: Fonts.sizes.sm,
    fontWeight: '600',
    textAlign: 'center',
  },
  featureCardFull: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  statsCard: {
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  statNumber: {
    fontSize: Fonts.sizes.xxl,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: Fonts.sizes.xs,
  },
  statDivider: {
    width: 1,
    height: '80%',
    alignSelf: 'center',
  },
});
