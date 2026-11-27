import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Platform, Dimensions, Image, I18nManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Polygon, Line, Circle, G } from 'react-native-svg';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';
import { useHifz } from '../../context/HifzContext';
import {  Fonts, Spacing, BorderRadius, Shadows, rtlRow, rtlAlign, rtlText } from '../../constants/theme';

// Authentic Islamic 8-Pointed Star Arabesque Lattice Vector Component
const ArabesquePattern = () => {
  const R = 17;
  const r = 8.5;
  const stars: { cx: number; cy: number }[] = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 8; col++) {
      stars.push({ cx: col * 55 + 20, cy: row * 55 + 25 });
    }
  }

  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 420 160"
      preserveAspectRatio="none"
      style={StyleSheet.absoluteFill}
    >
      {/* Background interconnecting geometric lines */}
      <G stroke="#E5C158" strokeWidth="0.8" strokeOpacity="0.18">
        {stars.map((s, idx) => (
          <React.Fragment key={`line-${idx}`}>
            <Line x1={s.cx - 27} y1={s.cy} x2={s.cx + 27} y2={s.cy} />
            <Line x1={s.cx} y1={s.cy - 27} x2={s.cx} y2={s.cy + 27} />
            <Line x1={s.cx - 20} y1={s.cy - 20} x2={s.cx + 20} y2={s.cy + 20} />
            <Line x1={s.cx - 20} y1={s.cy + 20} x2={s.cx + 20} y2={s.cy - 20} />
          </React.Fragment>
        ))}
      </G>

      {/* 8-pointed Islamic stars (نجمة ثمانية إسلامية) */}
      {stars.map((s, idx) => {
        let pts = [];
        for (let i = 0; i < 16; i++) {
          const rad = (i * Math.PI) / 8;
          const radius = i % 2 === 0 ? R : r;
          const x = (s.cx + radius * Math.cos(rad)).toFixed(1);
          const y = (s.cy + radius * Math.sin(rad)).toFixed(1);
          pts.push(`${x},${y}`);
        }
        return (
          <G key={`star-${idx}`}>
            <Polygon
              points={pts.join(' ')}
              fill="#E5C158"
              fillOpacity="0.08"
              stroke="#E5C158"
              strokeWidth="0.9"
              strokeOpacity="0.28"
            />
            <Circle cx={s.cx} cy={s.cy} r={2.2} fill="#E5C158" fillOpacity="0.35" />
          </G>
        );
      })}
    </Svg>
  );
};

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

  const featureRows = [
    // Row 1
    [
      {
        id: 'mushaf_pages',
        title: 'المصحف الورقي',
        icon: 'book' as const,
        color: '#0E5A38',
        cardBg: '#F2F9F4',
        borderColor: 'rgba(14, 90, 56, 0.22)',
      },
      {
        id: 'mushaf_ayah',
        title: 'المصحف آية آية',
        icon: 'list-circle' as const,
        color: '#1B7F5A',
        cardBg: '#F0F8F5',
        borderColor: 'rgba(27, 127, 90, 0.22)',
        route: '/quran' as const,
      },
      {
        id: 'hifz',
        title: 'الحفظ',
        icon: 'school' as const,
        color: '#E67E22',
        cardBg: '#FFF8ED',
        borderColor: 'rgba(230, 126, 34, 0.22)',
        route: '/hifz' as const,
      },
    ],
    // Row 2
    [
      {
        id: 'mawdui',
        title: 'الموضوعي',
        icon: 'grid' as const,
        color: '#2980B9',
        cardBg: '#F0F6FB',
        borderColor: 'rgba(41, 128, 185, 0.22)',
        route: '/mawdui' as const,
      },
      {
        id: 'mutashabihat',
        title: 'المتشابهات',
        icon: 'git-compare' as const,
        color: '#16A085',
        cardBg: '#EBF8F5',
        borderColor: 'rgba(22, 160, 133, 0.22)',
        route: '/mutashabihat' as const,
      },
      {
        id: 'asbab',
        title: 'أسباب التنزيل',
        icon: 'time' as const,
        color: '#8E44AD',
        cardBg: '#F8F3FB',
        borderColor: 'rgba(142, 68, 173, 0.22)',
        route: '/asbab/0' as const,
      },
    ],
    // Row 3
    [
      {
        id: 'duas',
        title: 'الأدعية',
        icon: 'hand-left' as const,
        color: '#1B7F5A',
        cardBg: '#EBF6F0',
        borderColor: 'rgba(27, 127, 90, 0.22)',
        route: '/duas' as const,
      },
      {
        id: 'adhkar',
        title: 'الأذكار',
        icon: 'moon' as const,
        color: '#B8860B',
        cardBg: '#FFF9E6',
        borderColor: 'rgba(184, 134, 11, 0.22)',
        route: '/adhkar' as const,
      },
      {
        id: 'bookmarks',
        title: 'المفضلة',
        icon: 'bookmark' as const,
        color: '#D97706',
        cardBg: '#FEF4E8',
        borderColor: 'rgba(217, 119, 6, 0.22)',
        route: '/bookmarks' as const,
      },
    ],
  ];

  const handleFeaturePress = (feature: any) => {
    if (feature.id === 'mushaf_pages') {
      if (lastRead) {
        router.push(`/surah/${lastRead.surahId}?initialMode=mushaf`);
      } else {
        router.push('/surah/1?initialMode=mushaf');
      }
    } else if (feature.route) {
      router.push(feature.route);
    }
  };

  const dueReviews = getDueReviews();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Top Status Bar Spacer - Clean White Background */}
      <View style={{ height: Platform.OS === 'android' ? Math.max(StatusBar.currentHeight || 0, 20) : 34, backgroundColor: '#FFFFFF' }} />
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Islamic Decorated Header Banner */}
      <View style={styles.islamicHeaderContainer}>
        <View style={styles.islamicHeaderCard}>
          {/* Deep Royal Emerald Gradient Background */}
          <LinearGradient
            colors={['#041E11', '#08381F', '#0E522E', '#08381F', '#041E11']}
            locations={[0, 0.25, 0.5, 0.75, 1]}
            style={StyleSheet.absoluteFill}
          />

          {/* Authentic Islamic 8-Pointed Star Arabesque Vector Lattice */}
          <ArabesquePattern />

          {/* Inner Golden Islamic Frame */}
          <View style={styles.islamicInnerFrame}>
            {/* Top Star Ornaments */}
            <View style={styles.ornamentRow}>
              <Text style={styles.cornerStar}>۞</Text>
              <Text style={styles.dividerOrnament}>────── ✵ ──────</Text>
              <Text style={styles.cornerStar}>۞</Text>
            </View>

            {/* Header Main Row: Feature Badge (Right) + Title & Font Switcher (Center) + Mushaf Icon (Left) */}
            <View style={styles.headerMainRow}>
              {/* Right in RTL: Feature Badge Image 3 */}
              <View style={styles.headerBadgeWrapper}>
                <Image
                  source={require('../../assets/images/header-badge.png')}
                  style={styles.headerBadgeImage}
                  resizeMode="cover"
                />
              </View>

              {/* Center: Title + Subtitle in authentic Amiri Quran font */}
              <View style={styles.headerCenterColumn}>
                <Text
                  style={styles.mainAppTitle}
                >
                  {Platform.OS === 'web' ? 'نور القرآن الكريم' : 'زاد القرآن الكريم'}
                </Text>
                <Text style={styles.subAppTitle}>
                  المصحف الشريف • تلاوة وتفسير وتدبر
                </Text>
              </View>

              {/* Left in RTL: Golden Mushaf Icon Button */}
              <TouchableOpacity
                style={styles.mushafIconButton}
                onPress={() => router.push('/quran')}
                activeOpacity={0.8}
              >
                <View style={styles.mushafIconCircle}>
                  <Ionicons name="book" size={26} color="#FFD700" style={styles.bookIconGlow} />
                </View>
              </TouchableOpacity>
            </View>

            {/* Bottom Star Ornaments */}
            <View style={styles.ornamentRow}>
              <Text style={styles.cornerStar}>۞</Text>
              <Text style={styles.dividerOrnament}>────── ✵ ──────</Text>
              <Text style={styles.cornerStar}>۞</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Daily Verse Card - Warm Calm Pearl Tone */}
        <View style={[styles.dailyVerseCard, Shadows.sm]}>
          <View style={styles.dailyVerseHeader}>
            <Ionicons name="sparkles" size={17} color="#B8860B" />
            <Text style={styles.dailyVerseTitle}>آية اليوم</Text>
          </View>
          <Text style={styles.dailyVerseArabic}>
            {dailyVerse.arabic}
          </Text>
          <Text style={styles.dailyVerseTranslation}>
            {dailyVerse.translation}
          </Text>
          <View style={styles.dailyVerseBadge}>
            <Text style={styles.dailyVerseSurah}>
              سورة {dailyVerse.surah} - آية {dailyVerse.ayah}
            </Text>
          </View>
        </View>

        {/* Last Read - Distinct Refreshing Mint Tone */}
        {lastRead && (
          <TouchableOpacity
            style={[styles.lastReadCard, Shadows.sm]}
            onPress={() => router.push(`/surah/${lastRead.surahId}`)}
          >
            <View style={styles.lastReadContent}>
              <View style={styles.lastReadIconBox}>
                <Ionicons name="bookmark" size={18} color="#117A65" />
              </View>
              <View style={styles.lastReadInfo}>
                <Text style={styles.lastReadLabel}>متابعة القراءة</Text>
                <Text style={styles.lastReadSurah}>
                  {lastRead.surahName} - الآية {lastRead.ayahNumber}
                </Text>
              </View>
            </View>
            <Ionicons name="arrow-back-circle" size={24} color="#117A65" />
          </TouchableOpacity>
        )}

        {/* Due Reviews Alert */}
        {dueReviews.length > 0 && (
          <TouchableOpacity
            style={[styles.reviewAlert, { backgroundColor: colors.warningLight, borderColor: colors.warning }]}
            onPress={() => router.push('/hifz')}
          >
            <Ionicons name="notifications" size={18} color={colors.warning} />
            <Text style={[styles.reviewAlertText, { color: colors.text }]}>
              لديك {dueReviews.length} مراجعة مستحقة اليوم
            </Text>
            <Ionicons name="chevron-back" size={16} color={colors.warning} />
          </TouchableOpacity>
        )}

        {/* Features Grid - 3x3 Symmetrical Rows with Calm Soft Color Palettes */}
        <View style={styles.sectionHeaderWrapper}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>الأقسام</Text>
        </View>
        <View style={styles.featuresContainer}>
          {featureRows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.featureRow}>
              {row.map((feature) => (
                <TouchableOpacity
                  key={feature.id}
                  style={[
                    styles.featureCard,
                    {
                      backgroundColor: feature.cardBg || colors.surface,
                      borderColor: feature.borderColor || colors.borderLight,
                    },
                    Shadows.sm,
                  ]}
                  onPress={() => handleFeaturePress(feature)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.featureIcon, { backgroundColor: feature.color + '15' }]}>
                    <Ionicons name={feature.icon} size={28} color={feature.color} />
                  </View>
                  <Text style={[styles.featureTitle, { color: colors.text }]}>{feature.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        {/* Full-width Search Bar across page */}
        <TouchableOpacity
          style={[
            styles.fullWidthSearchCard,
            { backgroundColor: colors.surface, borderColor: colors.borderLight },
            Shadows.sm,
          ]}
          onPress={() => router.push('/search')}
          activeOpacity={0.7}
        >
          <View style={styles.searchInnerRow}>
            <Ionicons name="search" size={22} color={colors.primary} />
            <Text style={[styles.fullWidthSearchPlaceholder, { color: colors.textSecondary }]}>
              ابحث في آيات القرآن الكريم والتفاسير والموضوعات...
            </Text>
          </View>
        </TouchableOpacity>

        {/* Stats */}
        <View style={styles.sectionHeaderWrapper}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>إحصائياتك</Text>
        </View>
        <View style={[styles.statsCard, { backgroundColor: colors.surface }, Shadows.sm]}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.primary }]}>{stats.totalVerses}</Text>
            <Text style={styles.statLabel}>آية محفوظة</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.secondary }]}>{stats.totalSurahs}</Text>
            <Text style={styles.statLabel}>سورة</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.success }]}>{stats.streakDays}</Text>
            <Text style={styles.statLabel}>يوم متتالي</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.info }]}>{Math.round(stats.averageAccuracy)}%</Text>
            <Text style={styles.statLabel}>نسبة الدقة</Text>
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
  islamicHeaderContainer: {
    paddingHorizontal: Spacing.md,
    paddingTop: 2,
    paddingBottom: 4,
    backgroundColor: '#FFFFFF',
  },
  islamicHeaderCard: {
    backgroundColor: '#0E5A38',
    borderRadius: BorderRadius.xl,
    borderWidth: 2,
    borderColor: '#D4AF37',
    padding: 6,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  starPatternOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-around',
    alignItems: 'center',
    overflow: 'hidden',
    opacity: 0.14,
    zIndex: 0,
  },
  patternRow: {
    color: '#FFD700',
    fontSize: 16,
    letterSpacing: 8,
    fontWeight: '700',
  },
  islamicInnerFrame: {
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.45)',
    borderRadius: BorderRadius.lg,
    paddingVertical: 14,
    paddingHorizontal: Spacing.md,
    alignItems: 'center',
    backgroundColor: 'rgba(11, 77, 47, 0.92)',
    zIndex: 1,
  },
  ornamentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: Spacing.sm,
  },
  cornerStar: {
    color: '#D4AF37',
    fontSize: 15,
    fontWeight: '700',
  },
  dividerOrnament: {
    color: 'rgba(212, 175, 55, 0.55)',
    fontSize: 11,
    letterSpacing: 2,
  },
  headerMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 2,
    marginVertical: 4,
    ...(Platform.OS === 'web' ? { direction: 'rtl' as any } : {}),
  },
  headerBadgeWrapper: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 1.8,
    borderColor: '#FFE066',
    overflow: 'hidden',
    backgroundColor: '#073320',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 5,
  },
  headerBadgeImage: {
    width: 54,
    height: 54,
  },
  headerCenterColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
    minWidth: 0,
    overflow: 'visible',
    gap: 8,
  },
  mushafIconButton: {
    padding: 2,
  },
  mushafIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: '#FFD700',
    backgroundColor: 'rgba(212, 175, 55, 0.22)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.95,
    shadowRadius: 14,
    elevation: 12,
  },
  bookIconGlow: {
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 16,
  },
  mainAppTitle: {
    fontFamily: 'AmiriQuran',
    fontSize: 44,
    color: '#FFD966',
    textAlign: 'center',
    textShadowColor: '#FFC300',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 24,
    fontWeight: '700',
    lineHeight: 84,
    paddingTop: 6,
    marginBottom: 10,
    overflow: 'visible',
  },
  subAppTitle: {
    fontFamily: Fonts.arabic.regular,
    fontSize: 13.5,
    color: '#FFF0B8',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 22,
  },
  scrollContent: {
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xl,
  },
  dailyVerseCard: {
    marginHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    marginBottom: Spacing.sm,
    backgroundColor: '#FFFDF7',
    borderColor: '#EADBBA',
    borderWidth: 1.5,
  },
  dailyVerseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingBottom: Spacing.xs,
    marginBottom: Spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: '#F5EACF',
  },
  dailyVerseTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#9A6B00',
  },
  dailyVerseArabic: {
    fontSize: 25,
    fontFamily: Fonts.arabic.quran,
    textAlign: 'center',
    lineHeight: 46,
    marginVertical: Spacing.xs,
    fontWeight: '700',
    color: '#0F172A',
    textShadowColor: 'rgba(0, 0, 0, 0.08)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  dailyVerseTranslation: {
    fontSize: 14.5,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.xs,
    color: '#334155',
  },
  dailyVerseBadge: {
    alignSelf: 'center',
    backgroundColor: '#FBF3DC',
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  dailyVerseSurah: {
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '800',
    color: '#874D0E',
  },
  lastReadCard: {
    marginHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    flexDirection: rtlRow,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    marginBottom: Spacing.sm,
    backgroundColor: '#F0F9F5',
    borderColor: '#A3E4D7',
  },
  lastReadContent: {
    flexDirection: rtlRow,
    alignItems: 'center',
    gap: Spacing.md,
  },
  lastReadIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D1F2EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lastReadInfo: {
    gap: 2,
    alignItems: rtlAlign,
  },
  lastReadLabel: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '800',
    color: '#117A65',
    textAlign: rtlText,
    writingDirection: 'rtl',
  },
  lastReadSurah: {
    fontSize: Fonts.sizes.md,
    fontWeight: '800',
    color: '#164E3D',
    textAlign: rtlText,
    writingDirection: 'rtl',
  },
  reviewAlert: {
    marginHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    flexDirection: rtlRow,
    alignItems: 'center',
    gap: Spacing.sm,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  reviewAlertText: {
    flex: 1,
    fontSize: Fonts.sizes.sm,
    fontWeight: '700',
    textAlign: rtlText,
    writingDirection: 'rtl',
  },
  sectionHeaderWrapper: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  sectionTitle: {
    fontSize: Fonts.sizes.lg,
    fontWeight: '800',
  },
  featuresContainer: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  featureRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
    ...(Platform.OS === 'web' ? { direction: 'rtl' as any } : {}),
  },
  featureCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 2,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.2,
    minHeight: 96,
    gap: Spacing.xs,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: 14.5,
    fontWeight: '800',
    textAlign: 'center',
    color: '#111827',
  },
  fullWidthSearchCard: {
    marginHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    paddingVertical: 12,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  searchInnerRow: {
    flexDirection: rtlRow,
    alignItems: 'center',
    gap: Spacing.sm,
    ...(Platform.OS === 'web' ? { direction: 'rtl' as any } : {}),
  },
  fullWidthSearchPlaceholder: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: rtlText,
    writingDirection: 'rtl',
  },
  statsCard: {
    marginHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.md,
    ...(Platform.OS === 'web' ? { direction: 'rtl' as any } : {}),
  },
  statItem: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '900',
  },
  statLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2937',
  },
  statDivider: {
    width: 1,
    height: '80%',
    alignSelf: 'center',
  },
});
