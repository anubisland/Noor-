import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, I18nManager } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { useApp } from '../../../context/AppContext';
import { Fonts, Spacing, BorderRadius, Shadows } from '../../../constants/theme';
import Header from '../../../components/ui/Header';
import { quranData } from '../../../data/quran';
import { surahsMetadata } from '../../../data/metadata';
import { getTafsirForAyah } from '../../../data/tafsir';
import { ALL_TAFSIR_SOURCES } from '../../../constants/config';
import { fetchEnglishTafsir } from '../../../services/englishTafsirService';

const toArabicDigits = (num: number): string => {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(num).split('').map((d) => arabicDigits[parseInt(d)] || d).join('');
};

export default function TafsirScreen() {
  const { surahId: sId, ayahId: aId } = useLocalSearchParams<{ surahId: string; ayahId: string }>();
  const surahId = parseInt(sId || '1');
  const ayahId = parseInt(aId || '1');
  const { colors } = useTheme();
  const { selectedTafsirs, selectedEnglishTafsir } = useApp();
  const router = useRouter();
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'tabs' | 'compare'>('tabs');
  const [enTafsir, setEnTafsir] = useState<string | null>(null);

  useEffect(() => {
    fetchEnglishTafsir(surahId, ayahId, selectedEnglishTafsir).then(setEnTafsir);
  }, [surahId, ayahId, selectedEnglishTafsir]);

  const surahMeta = surahsMetadata.find((s) => s.id === surahId);
  const surahAyahs = quranData.find((s) => s.id === surahId)?.ayahs || [];
  const ayah = surahAyahs.find((a) => a.ayahNumber === ayahId);

  // Only show user-selected tafsirs that have data for this ayah
  const activeSources = ALL_TAFSIR_SOURCES.filter((s) => selectedTafsirs.includes(s.id));
  const arabicTafsirs = activeSources
    .map((source) => ({
      ...source,
      text: getTafsirForAyah(surahId, ayahId, source.id) || '',
      isEnglish: false,
    }))
    .filter((t) => t.text);

  const tafsirs = [
    ...arabicTafsirs,
    ...(enTafsir ? [{
      id: `en-${selectedEnglishTafsir}`,
      name: selectedEnglishTafsir === 'jalalayn' ? 'الجلالين (إنجليزي)' : 'المختصر في التفسير (إنجليزي)',
      nameEn: selectedEnglishTafsir === 'jalalayn' ? 'Tafsir Al-Jalalayn (English)' : 'Al-Mukhtasar in Tafsir (English)',
      description: selectedEnglishTafsir === 'jalalayn' ? 'Tafsir Al-Jalalayn English translation' : 'Al-Mukhtasar fi Tafsir al-Qur\'an (English)',
      text: enTafsir,
      isEnglish: true,
    }] : [])
  ];

  const activeSource = selectedSource || (tafsirs[0]?.id ?? '');
  const activeTafsir = tafsirs.find((t) => t.id === activeSource);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title="التفسير المقارن"
        subtitle={surahMeta ? `${surahMeta.name} - الآية ${toArabicDigits(ayahId)}` : ''}
        showBack
        rightIcon={viewMode === 'tabs' ? 'git-compare-outline' : 'layers-outline'}
        onRightPress={() => setViewMode(viewMode === 'tabs' ? 'compare' : 'tabs')}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Ayah Text */}
        {ayah && (
          <View style={[styles.ayahCard, { backgroundColor: colors.primaryLight, borderColor: colors.primary }]}>
            <Text style={[styles.ayahText, { color: colors.text }]}>{ayah.text}</Text>
            <Text style={[styles.ayahRef, { color: colors.primary }]}>
              {surahMeta?.name} - الآية {toArabicDigits(ayahId)}
            </Text>
          </View>
        )}

        {/* View Mode Toggle */}
        <View style={[styles.viewToggle, { borderColor: colors.border }]}>
          <TouchableOpacity
            style={[styles.toggleBtn, viewMode === 'tabs' && { backgroundColor: colors.primary }]}
            onPress={() => setViewMode('tabs')}
          >
            <Text style={[styles.toggleText, { color: viewMode === 'tabs' ? '#FFF' : colors.textSecondary }]}>
              تبويب
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, viewMode === 'compare' && { backgroundColor: colors.primary }]}
            onPress={() => setViewMode('compare')}
          >
            <Text style={[styles.toggleText, { color: viewMode === 'compare' ? '#FFF' : colors.textSecondary }]}>
              مقارنة
            </Text>
          </TouchableOpacity>
        </View>

        {tafsirs.length === 0 ? (
          <View style={[styles.tafsirCard, { backgroundColor: colors.surface }, Shadows.sm]}>
            <View style={[styles.tafsirHeader, { borderBottomColor: colors.borderLight }]}>
              <Ionicons name="book" size={20} color={colors.textLight} />
              <Text style={[styles.tafsirName, { color: colors.textLight }]}>التفسير</Text>
            </View>
            <Text style={[styles.tafsirText, { color: colors.textSecondary }]}>
              التفسير غير متوفر لهذه الآية في المصادر المختارة
            </Text>
          </View>
        ) : viewMode === 'tabs' ? (
          <>
            {/* Source Tabs */}
            <View style={styles.tabs}>
              {tafsirs.map((t) => (
                <TouchableOpacity
                  key={t.id}
                  style={[
                    styles.tab,
                    {
                      backgroundColor: activeSource === t.id ? colors.secondary : colors.surfaceVariant,
                      borderColor: activeSource === t.id ? colors.secondary : colors.border,
                    },
                  ]}
                  onPress={() => setSelectedSource(t.id)}
                >
                  <Text
                    style={[
                      styles.tabText,
                      { color: activeSource === t.id ? '#FFF' : colors.textSecondary },
                    ]}
                  >
                    {t.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Active Tafsir */}
            {activeTafsir && (
              <View style={[styles.tafsirCard, { backgroundColor: colors.surface }, Shadows.sm]}>
                <View style={[styles.tafsirHeader, { borderBottomColor: colors.borderLight }]}>
                  <Ionicons name="book" size={20} color={colors.secondary} />
                  <Text style={[styles.tafsirName, { color: colors.secondary }]}>
                    تفسير {activeTafsir.name}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.tafsirText,
                    { color: colors.text },
                    (activeTafsir as any)?.isEnglish && { textAlign: 'left', writingDirection: 'ltr' }
                  ]}
                >
                  {activeTafsir.text}
                </Text>
              </View>
            )}
          </>
        ) : (
          /* Compare Mode */
          tafsirs.map((tafsir) => (
            <View
              key={tafsir.id}
              style={[styles.tafsirCard, { backgroundColor: colors.surface }, Shadows.sm]}
            >
              <View style={[styles.tafsirHeader, { borderBottomColor: colors.borderLight }]}>
                <Ionicons name="book" size={20} color={colors.secondary} />
                <Text style={[styles.tafsirName, { color: colors.secondary }]}>
                  تفسير {tafsir.name}
                </Text>
              </View>
              <Text
                style={[
                  styles.tafsirText,
                  { color: colors.text },
                  (tafsir as any)?.isEnglish && { textAlign: 'left', writingDirection: 'ltr' }
                ]}
              >
                {tafsir.text}
              </Text>
            </View>
          ))
        )}

        {/* Navigation */}
        <View style={styles.navigation}>
          {ayahId > 1 && (
            <TouchableOpacity
              style={[styles.navBtn, { backgroundColor: colors.primaryLight }]}
              onPress={() => router.push(`/tafsir/${surahId}/${ayahId - 1}`)}
            >
              <Ionicons name="arrow-forward" size={20} color={colors.primary} />
              <Text style={[styles.navText, { color: colors.primary }]}>الآية السابقة</Text>
            </TouchableOpacity>
          )}
          {surahAyahs.length > ayahId && (
            <TouchableOpacity
              style={[styles.navBtn, { backgroundColor: colors.primaryLight }]}
              onPress={() => router.push(`/tafsir/${surahId}/${ayahId + 1}`)}
            >
              <Text style={[styles.navText, { color: colors.primary }]}>الآية التالية</Text>
              <Ionicons name="arrow-back" size={20} color={colors.primary} />
            </TouchableOpacity>
          )}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: Spacing.lg },
  ayahCard: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.lg,
    width: '100%',
  },
  ayahText: {
    fontFamily: Fonts.arabic.quran,
    fontSize: Fonts.sizes.quran,
    textAlign: 'center',
    writingDirection: 'rtl',
    lineHeight: 48,
    marginBottom: Spacing.md,
    alignSelf: 'stretch',
  },
  ayahRef: {
    fontSize: Fonts.sizes.sm,
    fontWeight: '600',
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  viewToggle: {
    flexDirection: 'row',
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
  },
  toggleText: {
    fontSize: Fonts.sizes.md,
    fontWeight: '600',
  },
  tabs: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    alignItems: 'center',
  },
  tabText: {
    fontSize: Fonts.sizes.sm,
    fontWeight: '600',
  },
  tafsirCard: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
  },
  tafsirHeader: {
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.md,
    borderBottomWidth: 1,
  },
  tafsirName: {
    fontSize: Fonts.sizes.md,
    fontWeight: '800',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  tafsirText: {
    fontSize: Fonts.sizes.md,
    lineHeight: 30,
    padding: Spacing.lg,
    writingDirection: 'rtl',
    textAlign: 'right',
    fontWeight: '600',
    color: '#111827',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  navBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.full,
  },
  navText: {
    fontSize: Fonts.sizes.sm,
    fontWeight: '600',
  },
});
