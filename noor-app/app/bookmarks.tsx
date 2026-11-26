import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, I18nManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { useApp } from '../context/AppContext';
import { Fonts, Spacing, BorderRadius, Shadows } from '../constants/theme';
import Header from '../components/ui/Header';
import { quranData } from '../data/quran';
import { audioService } from '../services/audioService';

const toArabicDigits = (num: number): string => {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(num).replace(/[0-9]/g, (d) => arabicDigits[parseInt(d, 10)]);
};

const getAyahObj = (surahId: number, ayahNumber: number) => {
  const surah = quranData.find((s) => s.id === surahId);
  return surah?.ayahs.find((a) => a.ayahNumber === ayahNumber);
};

export default function BookmarksScreen() {
  const { colors } = useTheme();
  const { bookmarks, removeBookmark } = useApp();
  const router = useRouter();

  const sortedBookmarks = [...bookmarks].sort((a, b) => b.timestamp - a.timestamp);

  const handleOpenBookmark = (surahId: number, ayahNumber: number) => {
    router.push({
      pathname: `/surah/${surahId}`,
      params: { initialAyah: ayahNumber.toString() },
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="المفضلة" subtitle={`${bookmarks.length} آية محفوظة`} showBack />

      {bookmarks.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="bookmark-outline" size={64} color={colors.textLight} />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>لا توجد مفضلات</Text>
          <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
            اضغط على أيقونة الحفظ بجوار أي آية لإضافتها إلى المفضلة هنا
          </Text>
        </View>
      ) : (
        <FlatList
          data={sortedBookmarks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const ayahObj = getAyahObj(item.surahId, item.ayahNumber);
            const ayahText = ayahObj?.text || '';

            return (
              <TouchableOpacity
                activeOpacity={0.85}
                style={[styles.bookmarkCard, { backgroundColor: colors.surface, borderColor: colors.borderLight }, Shadows.sm]}
                onPress={() => handleOpenBookmark(item.id ? item.surahId : 1, item.ayahNumber)}
              >
                {/* Header row with surah name, ayah number, audio button, and delete */}
                <View style={styles.headerRow}>
                  <View style={styles.metaInfo}>
                    <View style={[styles.iconBadge, { backgroundColor: colors.primaryLight }]}>
                      <Ionicons name="bookmark" size={18} color={colors.primary} />
                    </View>
                    <View>
                      <Text style={[styles.surahName, { color: colors.text }]}>{item.surahName}</Text>
                      <Text style={[styles.ayahRef, { color: colors.textSecondary }]}>
                        الآية {toArabicDigits(item.ayahNumber)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.actionsRow}>
                    {ayahObj && (
                      <TouchableOpacity
                        style={[styles.actionBtn, { backgroundColor: colors.primaryLight }]}
                        activeOpacity={0.7}
                        onPress={() => audioService.playAyah(ayahObj.id)}
                      >
                        <Ionicons name="volume-high" size={17} color={colors.primary} />
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      style={[styles.actionBtn, { backgroundColor: 'rgba(231, 76, 60, 0.12)' }]}
                      activeOpacity={0.7}
                      onPress={() => removeBookmark(item.id)}
                    >
                      <Ionicons name="trash-outline" size={17} color={colors.error} />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Quranic Ayah Text in Authentic Mushaf Font */}
                {ayahText ? (
                  <View style={styles.textContainer}>
                    <Text
                      numberOfLines={3}
                      style={[styles.ayahText, { color: colors.text }]}
                    >
                      {ayahText} ﴿{toArabicDigits(item.ayahNumber)}﴾
                    </Text>
                  </View>
                ) : null}

                {/* Date footer */}
                <View style={styles.footerRow}>
                  <Text style={[styles.dateText, { color: colors.textLight }]}>
                    {new Date(item.timestamp).toLocaleDateString('ar-EG', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Text>
                  <View style={styles.viewAyahHint}>
                    <Text style={[styles.hintText, { color: colors.primary }]}>انتقل إلى الآية</Text>
                    <Ionicons name="arrow-back" size={14} color={colors.primary} />
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.xxl,
  },
  emptyTitle: { fontSize: Fonts.sizes.xl, fontWeight: '700' },
  emptySubtitle: { fontSize: Fonts.sizes.md, textAlign: 'center' },
  listContent: { padding: Spacing.lg, paddingBottom: 100 },
  bookmarkCard: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  headerRow: {
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaInfo: {
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  surahName: {
    fontSize: Fonts.sizes.md,
    fontWeight: '800',
    textAlign: 'right',
  },
  ayahRef: {
    fontSize: Fonts.sizes.xs,
    marginTop: 2,
    textAlign: 'right',
    fontWeight: '600',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  actionBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    paddingVertical: Spacing.xs,
  },
  ayahText: {
    fontFamily: Fonts.arabic.quran,
    fontSize: 20,
    lineHeight: 38,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  footerRow: {
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    paddingTop: Spacing.xs,
    marginTop: Spacing.xs,
  },
  dateText: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '600',
  },
  viewAyahHint: {
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    alignItems: 'center',
    gap: 4,
  },
  hintText: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '700',
  },
});
