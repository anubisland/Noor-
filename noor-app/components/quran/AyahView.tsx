import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';
import { BorderRadius, Fonts, Spacing } from '../../constants/theme';

interface AyahViewProps {
  surahId: number;
  surahName: string;
  ayahNumber: number;
  arabicText: string;
  translation?: string;
  showTranslation?: boolean;
  fontSize?: number;
  onPlayAudio?: () => void;
  isPlaying?: boolean;
  highlighted?: boolean;
}

export default function AyahView({
  surahId, surahName, ayahNumber, arabicText, translation,
  showTranslation = true, fontSize = 26, onPlayAudio, isPlaying, highlighted,
}: AyahViewProps) {
  const { colors } = useTheme();
  const { addBookmark, removeBookmark, isBookmarked, bookmarks } = useApp();
  const router = useRouter();
  const [showActions, setShowActions] = useState(false);
  const bookmarked = isBookmarked(surahId, ayahNumber);

  const handleBookmark = () => {
    if (bookmarked) {
      const bm = bookmarks.find((b) => b.surahId === surahId && b.ayahNumber === ayahNumber);
      if (bm) removeBookmark(bm.id);
    } else {
      addBookmark({ surahId, surahName, ayahNumber });
    }
  };

  const numberToArabic = (num: number): string => {
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return String(num).split('').map((d) => arabicDigits[parseInt(d)]).join('');
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => setShowActions(!showActions)}
      style={[
        styles.container,
        {
          backgroundColor: highlighted ? colors.goldLight : colors.surface,
          borderColor: highlighted ? colors.secondary : colors.borderLight,
          borderWidth: highlighted ? 2 : 1,
        },
      ]}
    >
      {/* Playing indicator */}
      {highlighted && (
        <View style={[styles.playingBadge, { backgroundColor: colors.secondary }]}>
          <Ionicons name={isPlaying ? 'volume-high' : 'pause'} size={14} color="#FFF" />
          <Text style={styles.playingBadgeText}>{isPlaying ? 'يتلو الآن' : 'متوقف مؤقتاً'}</Text>
        </View>
      )}

      {/* Arabic Text */}
      <View style={styles.arabicContainer}>
        <Text style={[styles.arabicText, { color: colors.text, fontSize, lineHeight: fontSize * 2.2 }]}>
          {arabicText}
          <Text style={[styles.ayahNumber, { color: colors.primary }]}>
            {' ﴿' + numberToArabic(ayahNumber) + '﴾ '}
          </Text>
        </Text>
      </View>

      {/* Translation */}
      {showTranslation && translation && (
        <View style={[styles.translationContainer, { borderTopColor: colors.borderLight }]}>
          <Text style={[styles.translation, { color: colors.textSecondary }]}>
            {translation}
          </Text>
        </View>
      )}

      {/* Action Buttons */}
      {showActions && (
        <View style={[styles.actions, { borderTopColor: colors.borderLight, backgroundColor: colors.surfaceVariant }]}>
          <TouchableOpacity style={styles.actionBtn} onPress={onPlayAudio}>
            <Ionicons name={isPlaying ? 'pause-circle' : 'play-circle'} size={26} color={colors.primary} />
            <Text style={[styles.actionText, { color: colors.textSecondary }]}>
              {isPlaying ? 'إيقاف' : 'تشغيل'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => router.push(`/tafsir/${surahId}/${ayahNumber}`)}
          >
            <Ionicons name="book-outline" size={24} color={colors.secondary} />
            <Text style={[styles.actionText, { color: colors.textSecondary }]}>تفسير</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn} onPress={handleBookmark}>
            <Ionicons
              name={bookmarked ? 'bookmark' : 'bookmark-outline'}
              size={24}
              color={bookmarked ? colors.secondary : colors.textSecondary}
            />
            <Text style={[styles.actionText, { color: colors.textSecondary }]}>حفظ</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => router.push(`/memorize/${surahId}?ayah=${ayahNumber}`)}
          >
            <Ionicons name="school-outline" size={24} color={colors.success} />
            <Text style={[styles.actionText, { color: colors.textSecondary }]}>تحفيظ</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.xs,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  playingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 4,
    paddingHorizontal: Spacing.md,
    paddingVertical: 3,
    borderBottomLeftRadius: BorderRadius.md,
    borderBottomRightRadius: BorderRadius.md,
  },
  playingBadgeText: {
    color: '#FFF',
    fontSize: Fonts.sizes.xs,
    fontWeight: '600',
  },
  arabicContainer: {
    padding: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  arabicText: {
    textAlign: 'center',
    fontWeight: '400',
    writingDirection: 'rtl',
  },
  ayahNumber: {
    fontWeight: '700',
  },
  translationContainer: {
    padding: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
  },
  translation: {
    fontSize: Fonts.sizes.md,
    lineHeight: 24,
    textAlign: 'left',
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
  },
  actionBtn: {
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.sm,
    gap: 4,
    minWidth: 55,
  },
  actionText: {
    fontSize: Fonts.sizes.sm,
    fontWeight: '500',
  },
});
