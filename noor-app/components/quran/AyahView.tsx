import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';
import { BorderRadius, Fonts, Spacing, rtlRow } from '../../constants/theme';
import { fetchEnglishTafsir } from '../../services/englishTafsirService';

interface TafsirEntry {
  sourceName: string;
  text: string;
}

interface AyahViewProps {
  surahId: number;
  surahName: string;
  ayahNumber: number;
  arabicText: string;
  translation?: string;
  showTranslation?: boolean;
  tafsirs?: TafsirEntry[];
  showTafsir?: boolean;
  fontSize?: number;
  onPlayAudio?: () => void;
  isPlaying?: boolean;
  highlighted?: boolean;
  showActions?: boolean;
  onToggleActions?: () => void;
}

export default function AyahView({
  surahId,
  surahName,
  ayahNumber,
  arabicText,
  translation,
  showTranslation = true,
  tafsirs,
  showTafsir = false,
  fontSize = 26,
  onPlayAudio,
  isPlaying,
  highlighted,
  showActions,
  onToggleActions,
}: AyahViewProps) {
  const { colors } = useTheme();
  const { addBookmark, removeBookmark, isBookmarked, bookmarks, selectedEnglishTafsir } = useApp();
  const router = useRouter();

  const [internalShowActions, setInternalShowActions] = useState(false);
  const [localShowTranslation, setLocalShowTranslation] = useState<boolean | null>(null);
  const [englishTafsirText, setEnglishTafsirText] = useState<string | null>(null);

  const bookmarked = isBookmarked(surahId, ayahNumber);
  const isActionsVisible = showActions !== undefined ? showActions : internalShowActions;
  const isTranslationVisible = localShowTranslation !== null ? localShowTranslation : showTranslation;

  // Auto-dismiss single-ayah translation when the action bar is dismissed
  useEffect(() => {
    if (!isActionsVisible) {
      setLocalShowTranslation(null);
    }
  }, [isActionsVisible]);

  useEffect(() => {
    if (showTafsir && isTranslationVisible) {
      let isMounted = true;
      fetchEnglishTafsir(surahId, ayahNumber, selectedEnglishTafsir).then((txt) => {
        if (isMounted) {
          setEnglishTafsirText(txt);
        }
      });
      return () => {
        isMounted = false;
      };
    }
  }, [showTafsir, isTranslationVisible, surahId, ayahNumber, selectedEnglishTafsir]);

  const handleToggle = () => {
    if (onToggleActions) {
      onToggleActions();
    } else {
      setInternalShowActions(!internalShowActions);
    }
  };

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
      onPress={handleToggle}
      onLongPress={handleToggle}
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
      {isTranslationVisible && !!translation && (
        <View style={[styles.translationContainer, { borderTopColor: colors.borderLight }]}>
          <Text style={styles.translation}>
            {translation}
          </Text>
        </View>
      )}

      {/* Tafsir (Arabic and English) */}
      {showTafsir && (
        <View style={[styles.tafsirContainer, { borderTopColor: colors.borderLight }]}>
          {tafsirs && tafsirs.map((tafsir, idx) => (
            <View key={idx} style={[styles.tafsirBlock, idx > 0 && { borderTopWidth: 1, borderTopColor: colors.borderLight }]}>
              <Text style={styles.tafsirSource}>
                تفسير {tafsir.sourceName}
              </Text>
              <Text style={styles.tafsirText}>
                {tafsir.text}
              </Text>
            </View>
          ))}

          {/* English Tafsir when translation is also active */}
          {isTranslationVisible && !!englishTafsirText && (
            <View style={[styles.tafsirBlock, { borderTopWidth: 1, borderTopColor: colors.borderLight }]}>
              <Text style={[styles.tafsirSource, { color: '#2563EB', textAlign: 'center' }]}>
                {selectedEnglishTafsir === 'jalalayn' ? 'Tafsir Al-Jalalayn (English)' : 'Al-Mukhtasar in Tafsir (English)'}
              </Text>
              <Text style={[styles.tafsirText, { textAlign: 'center', writingDirection: 'ltr', color: '#1E293B' }]}>
                {englishTafsirText}
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Action Buttons: تشغيل، تفسير، ترجمة، حفظ */}
      {isActionsVisible && (
        <View style={[styles.actions, { borderTopColor: colors.borderLight, backgroundColor: colors.surfaceVariant }]}>
          {/* 1. تشغيل */}
          <TouchableOpacity style={styles.actionBtn} onPress={onPlayAudio}>
            <Ionicons name={isPlaying ? 'pause-circle' : 'play-circle'} size={26} color={colors.primary} />
            <Text style={[styles.actionText, { color: colors.textSecondary }]}>
              {isPlaying ? 'إيقاف' : 'تشغيل'}
            </Text>
          </TouchableOpacity>

          {/* 2. تفسير */}
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => router.push(`/tafsir/${surahId}/${ayahNumber}`)}
          >
            <Ionicons name="book-outline" size={24} color={colors.secondary} />
            <Text style={[styles.actionText, { color: colors.textSecondary }]}>تفسير</Text>
          </TouchableOpacity>

          {/* 3. ترجمة */}
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => setLocalShowTranslation(!isTranslationVisible)}
          >
            <Ionicons
              name={isTranslationVisible ? 'language' : 'language-outline'}
              size={24}
              color="#2980B9"
            />
            <Text style={[styles.actionText, { color: isTranslationVisible ? '#2980B9' : colors.textSecondary }]}>
              ترجمة
            </Text>
          </TouchableOpacity>

          {/* 4. حفظ */}
          <TouchableOpacity style={styles.actionBtn} onPress={handleBookmark}>
            <Ionicons
              name={bookmarked ? 'bookmark' : 'bookmark-outline'}
              size={24}
              color={bookmarked ? colors.secondary : colors.textSecondary}
            />
            <Text style={[styles.actionText, { color: colors.textSecondary }]}>حفظ</Text>
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
    fontFamily: Fonts.arabic.quran,
    textAlign: 'center',
    fontWeight: '400',
    writingDirection: 'rtl',
  },
  ayahNumber: {
    fontFamily: Fonts.arabic.quran,
    fontWeight: '700',
    writingDirection: 'rtl',
  },
  translationContainer: {
    padding: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
  },
  translation: {
    fontSize: Fonts.sizes.md,
    lineHeight: 25,
    textAlign: 'center',
    color: '#111827',
    fontWeight: '500',
    writingDirection: 'ltr',
  },
  tafsirContainer: {
    padding: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
  },
  tafsirBlock: {
    paddingVertical: Spacing.sm,
  },
  tafsirSource: {
    fontSize: Fonts.sizes.sm,
    fontWeight: '700',
    marginBottom: 4,
    color: '#1B7F5A',
  },
  tafsirText: {
    fontSize: Fonts.sizes.md,
    lineHeight: 26,
    writingDirection: 'rtl',
    color: '#111827',
    fontWeight: '400',
  },
  actions: {
    flexDirection: rtlRow,
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
