import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ActivityIndicator } from 'react-native';
import { Ayah } from '../../data/quran';
import { surahsMetadata, SurahMeta } from '../../data/metadata';
import { Fonts, Spacing, BorderRadius } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

interface MushafPageViewProps {
  pageNumber: number;
  ayahs: Ayah[];
  selectedAyahId?: number;
  onSelectAyah?: (ayah: Ayah) => void;
  fontSize?: number;
}

const toArabicDigits = (num: number): string => {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(num).split('').map((d) => arabicDigits[parseInt(d)] || d).join('');
};

export const PAGE_ASPECT_RATIO = 1024 / 1656;
const { width } = Dimensions.get('window');

export const getPageItemDimensions = () => {
  const { width: currentWidth } = Dimensions.get('window');
  const pageWidth = currentWidth > 600 ? Math.min(currentWidth - 24, 680) : currentWidth - 12;
  const pageHeight = Math.round(pageWidth / PAGE_ASPECT_RATIO);
  const itemHeight = pageHeight + 50; // wrapper height (pageHeight + 34) + marginVertical (16)
  return { pageWidth, pageHeight, itemHeight };
};

export default function MushafPageView({
  pageNumber,
  ayahs,
  selectedAyahId,
  onSelectAyah,
  fontSize = 21,
}: MushafPageViewProps) {
  const { colors } = useTheme();
  const { pageWidth, pageHeight } = getPageItemDimensions();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!ayahs || ayahs.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.textSecondary }}>الصفحة غير متوفرة</Text>
      </View>
    );
  }

  // Determine top header info from the first ayah on this page
  const firstAyah = ayahs[0];
  const lastAyah = ayahs[ayahs.length - 1];
  const firstSurahMeta = surahsMetadata.find((s) => s.id === firstAyah.surahId);
  const lastSurahMeta = surahsMetadata.find((s) => s.id === lastAyah.surahId);
  const currentJuz = firstAyah.juz;

  const paddedPage = String(pageNumber).padStart(3, '0');
  const pageImageUri = `https://android.quran.com/data/width_1024/page${paddedPage}.png`;

  // If paper image loads cleanly, render authentic Madinah Mushaf paper page
  if (!imageError) {
    return (
      <View style={[styles.paperPageWrapper, { width: pageWidth, height: pageHeight + 34 }]}>
        {!imageLoaded && (
          <View style={[styles.loadingBox, { height: pageHeight }]}>
            <ActivityIndicator size="large" color="#1B7F5A" />
            <Text style={styles.loadingText}>
              صفحة {toArabicDigits(pageNumber)} - مصحف المدينة
            </Text>
          </View>
        )}
        <Image
          source={{ uri: pageImageUri }}
          style={[styles.mushafImage, { width: pageWidth, height: pageHeight }]}
          resizeMode="contain"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
        {imageLoaded && (
          <View style={styles.paperPageFooter}>
            <Text style={styles.paperFooterText}>
              {firstSurahMeta ? firstSurahMeta.name : ''}
            </Text>
            <View style={styles.paperPageNumberCircle}>
              <Text style={styles.paperPageNumberText}>
                {toArabicDigits(pageNumber)}
              </Text>
            </View>
            <Text style={styles.paperFooterText}>
              الجزء {toArabicDigits(currentJuz)}
            </Text>
          </View>
        )}
      </View>
    );
  }

  // Fallback digital rendering if offline or image failed
  const surahBlocks: { surahMeta: SurahMeta; ayahs: Ayah[]; isStartOfSurah: boolean }[] = [];
  let currentSurahId = -1;
  let currentGroup: Ayah[] = [];

  for (const a of ayahs) {
    if (a.surahId !== currentSurahId) {
      if (currentGroup.length > 0) {
        const meta = surahsMetadata.find((s) => s.id === currentSurahId)!;
        surahBlocks.push({
          surahMeta: meta,
          ayahs: currentGroup,
          isStartOfSurah: currentGroup[0].ayahNumber === 1,
        });
      }
      currentSurahId = a.surahId;
      currentGroup = [a];
    } else {
      currentGroup.push(a);
    }
  }
  if (currentGroup.length > 0) {
    const meta = surahsMetadata.find((s) => s.id === currentSurahId)!;
    surahBlocks.push({
      surahMeta: meta,
      ayahs: currentGroup,
      isStartOfSurah: currentGroup[0].ayahNumber === 1,
    });
  }

  const hizbAyah = ayahs.find((a) => a.hizbQuarter && a.hizbQuarter > 0);

  return (
    <View style={[styles.pageWrapper, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={[styles.innerFrame, { borderColor: colors.primary + '35' }]}>
        <View style={[styles.pageHeader, { borderBottomColor: colors.primary + '25' }]}>
          <Text style={[styles.headerSurah, { color: colors.primary }]}>
            {firstSurahMeta ? firstSurahMeta.name : ''}
            {firstSurahMeta?.id !== lastSurahMeta?.id && lastSurahMeta ? ` - ${lastSurahMeta.name}` : ''}
          </Text>
          <Text style={[styles.headerJuz, { color: colors.secondary }]}>
            الجزء {toArabicDigits(currentJuz)}
          </Text>
        </View>

        <View style={styles.contentContainer}>
          {surahBlocks.map((block, bIdx) => (
            <View key={`block_${block.surahMeta.id}_${bIdx}`} style={styles.surahSection}>
              {block.isStartOfSurah && (
                <View style={styles.surahHeaderBanner}>
                  <View style={[styles.surahBannerFrame, { borderColor: colors.secondary, backgroundColor: colors.secondaryLight + '40' }]}>
                    <Text style={[styles.surahTitle, { color: colors.primary }]}>
                      {block.surahMeta.name}
                    </Text>
                    <Text style={[styles.surahMetaInfo, { color: colors.secondary }]}>
                      {block.surahMeta.revelationType === 'meccan' ? 'مكية' : 'مدنية'} • {toArabicDigits(block.surahMeta.versesCount)} آية
                    </Text>
                  </View>
                  {block.surahMeta.id !== 1 && block.surahMeta.id !== 9 && (
                    <View style={styles.bismillahContainer}>
                      <Text style={[styles.bismillahText, { color: colors.primary }]}>
                        بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                      </Text>
                    </View>
                  )}
                </View>
              )}
              <View style={styles.versesFlow}>
                <Text style={[styles.quranText, { fontSize, lineHeight: fontSize * 2.2, color: colors.text }]}>
                  {block.ayahs.map((ayah) => {
                    const isSelected = selectedAyahId === ayah.id;
                    return (
                      <React.Fragment key={`ayah_${ayah.id}`}>
                        <Text
                          onPress={() => onSelectAyah?.(ayah)}
                          style={[
                            styles.ayahWord,
                            isSelected && { backgroundColor: colors.goldLight, color: colors.primaryDark },
                          ]}
                        >
                          {ayah.text}
                        </Text>
                        <Text
                          onPress={() => onSelectAyah?.(ayah)}
                          style={[
                            styles.ayahOrnament,
                            { color: isSelected ? colors.primary : colors.secondary },
                          ]}
                        >
                          {` ﴿${toArabicDigits(ayah.ayahNumber)}﴾ `}
                        </Text>
                      </React.Fragment>
                    );
                  })}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={[styles.pageFooter, { borderTopColor: colors.primary + '25' }]}>
          <Text style={[styles.hizbInfo, { color: colors.textLight }]}>
            {hizbAyah && hizbAyah.hizbQuarter ? `۞ الحزب ${toArabicDigits(Math.ceil(hizbAyah.hizbQuarter / 4))}` : ''}
          </Text>
          <View style={[styles.pageNumberBadge, { backgroundColor: colors.primaryLight }]}>
            <Text style={[styles.pageNumber, { color: colors.primary }]}>
              {toArabicDigits(pageNumber)}
            </Text>
          </View>
          <View style={{ width: 40 }} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  paperPageWrapper: {
    alignSelf: 'center',
    marginVertical: Spacing.sm,
    backgroundColor: '#FFFDF7',
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E6DCBF',
  },
  mushafImage: {
    alignSelf: 'center',
  },
  loadingBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBF9F2',
    gap: Spacing.md,
  },
  loadingText: {
    fontFamily: Fonts.arabic.bold,
    fontSize: Fonts.sizes.sm,
    color: '#1B7F5A',
  },
  paperPageFooter: {
    height: 34,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    backgroundColor: '#F5EFE0',
    borderTopWidth: 1,
    borderTopColor: '#E6DCBF',
  },
  paperFooterText: {
    fontSize: Fonts.sizes.xs,
    fontFamily: Fonts.arabic.bold,
    color: '#5C4033',
    fontWeight: '700',
  },
  paperPageNumberCircle: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 2,
    backgroundColor: '#EAE0C8',
    borderRadius: BorderRadius.full,
  },
  paperPageNumberText: {
    fontSize: Fonts.sizes.sm,
    fontFamily: Fonts.arabic.bold,
    color: '#2C1810',
    fontWeight: '700',
  },
  pageWrapper: {
    width: width - Spacing.md * 2,
    alignSelf: 'center',
    marginVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  innerFrame: {
    margin: 4,
    borderWidth: 1.5,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  emptyContainer: {
    padding: Spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: Spacing.xs,
    borderBottomWidth: 1,
    marginBottom: Spacing.sm,
  },
  headerSurah: {
    fontSize: Fonts.sizes.sm,
    fontFamily: Fonts.arabic.bold,
    fontWeight: '700',
  },
  headerJuz: {
    fontSize: Fonts.sizes.sm,
    fontFamily: Fonts.arabic.bold,
    fontWeight: '700',
  },
  contentContainer: {
    paddingVertical: Spacing.xs,
  },
  surahSection: {
    marginBottom: Spacing.xs,
  },
  surahHeaderBanner: {
    alignItems: 'center',
    marginVertical: Spacing.sm,
  },
  surahBannerFrame: {
    width: '100%',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderWidth: 1.5,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  surahTitle: {
    fontSize: Fonts.sizes.xl,
    fontFamily: Fonts.arabic.quran,
    fontWeight: '700',
    textAlign: 'center',
  },
  surahMetaInfo: {
    fontSize: Fonts.sizes.xs,
    fontFamily: Fonts.arabic.regular,
    marginTop: 2,
    fontWeight: '600',
  },
  bismillahContainer: {
    paddingVertical: Spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bismillahText: {
    fontSize: Fonts.sizes.lg,
    fontFamily: Fonts.arabic.quran,
    textAlign: 'center',
  },
  versesFlow: {
    width: '100%',
  },
  quranText: {
    fontFamily: Fonts.arabic.quran,
    textAlign: 'justify',
    writingDirection: 'rtl',
  },
  ayahWord: {
    fontFamily: Fonts.arabic.quran,
    writingDirection: 'rtl',
  },
  ayahOrnament: {
    fontFamily: Fonts.arabic.quran,
    fontSize: Fonts.sizes.sm,
    fontWeight: '700',
    writingDirection: 'rtl',
  },
  pageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.xs,
    borderTopWidth: 1,
    marginTop: Spacing.sm,
  },
  hizbInfo: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '600',
    width: 60,
  },
  pageNumberBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  pageNumber: {
    fontSize: Fonts.sizes.sm,
    fontWeight: '700',
    fontFamily: Fonts.arabic.bold,
  },
});
