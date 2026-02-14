import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { useApp } from '../context/AppContext';
import { Fonts, Spacing, BorderRadius, Shadows } from '../constants/theme';
import Header from '../components/ui/Header';

export default function BookmarksScreen() {
  const { colors } = useTheme();
  const { bookmarks, removeBookmark } = useApp();
  const router = useRouter();

  const sortedBookmarks = [...bookmarks].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="المفضلة" subtitle={`${bookmarks.length} عنصر محفوظ`} showBack />

      {bookmarks.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="bookmark-outline" size={64} color={colors.textLight} />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>لا توجد مفضلات</Text>
          <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
            اضغط على أيقونة الحفظ في أي آية لإضافتها هنا
          </Text>
        </View>
      ) : (
        <FlatList
          data={sortedBookmarks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.bookmarkItem, { backgroundColor: colors.surface, borderColor: colors.borderLight }, Shadows.sm]}
              onPress={() => router.push(`/surah/${item.surahId}`)}
            >
              <View style={[styles.bookmarkIcon, { backgroundColor: colors.secondaryLight }]}>
                <Ionicons name="bookmark" size={22} color={colors.secondary} />
              </View>
              <View style={styles.bookmarkInfo}>
                <Text style={[styles.bookmarkSurah, { color: colors.text }]}>{item.surahName}</Text>
                <Text style={[styles.bookmarkAyah, { color: colors.textSecondary }]}>
                  الآية {item.ayahNumber}
                </Text>
                <Text style={[styles.bookmarkDate, { color: colors.textLight }]}>
                  {new Date(item.timestamp).toLocaleDateString('ar-EG')}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => removeBookmark(item.id)}
              >
                <Ionicons name="trash-outline" size={20} color={colors.error} />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
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
  bookmarkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  bookmarkIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Spacing.md,
  },
  bookmarkInfo: {
    flex: 1,
    gap: 2,
  },
  bookmarkSurah: { fontSize: Fonts.sizes.md, fontWeight: '700' },
  bookmarkAyah: { fontSize: Fonts.sizes.sm },
  bookmarkDate: { fontSize: Fonts.sizes.xs },
  deleteBtn: {
    padding: Spacing.sm,
  },
});
