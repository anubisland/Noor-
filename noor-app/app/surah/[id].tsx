import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';
import { Fonts, Spacing, BorderRadius } from '../../constants/theme';
import Header from '../../components/ui/Header';
import AyahView from '../../components/quran/AyahView';
import MushafPageView, { getPageItemDimensions } from '../../components/quran/MushafPageView';
import AudioPlayer from '../../components/quran/AudioPlayer';
import { quranData, getAyahsByPage, Ayah } from '../../data/quran';
import { surahsMetadata } from '../../data/metadata';
import { englishTranslation } from '../../data/translations/en';
import { englishBatch1 } from '../../data/translations/en-batch1';
import { englishBatch2 } from '../../data/translations/en-batch2';
import { englishBatch3 } from '../../data/translations/en-batch3';
import { getTafsirForAyah } from '../../data/tafsir';
import { ALL_TAFSIR_SOURCES } from '../../constants/config';
import { audioService } from '../../services/audioService';

const allTranslations = [...englishTranslation, ...englishBatch1, ...englishBatch2, ...englishBatch3];

export default function SurahScreen() {
  const { id, initialMode, initialAyah } = useLocalSearchParams<{ id: string; initialMode?: 'list' | 'mushaf'; initialAyah?: string }>();
  const surahId = parseInt(id || '1');
  const router = useRouter();
  const { colors } = useTheme();
  const {
    setLastRead,
    fontSize,
    setFontSize,
    showTranslation,
    setShowTranslation,
    showTafsir,
    setShowTafsir,
    selectedTafsirs,
    selectedEnglishTafsir,
    setSelectedEnglishTafsir,
  } = useApp();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentPlayingAyah, setCurrentPlayingAyah] = useState(0);
  const [activeActionAyah, setActiveActionAyah] = useState<number | null>(null);
  const [repeatCount, setRepeatCount] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [showSurahPicker, setShowSurahPicker] = useState(false);
  const [surahSearchQuery, setSurahSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'mushaf'>(initialMode === 'mushaf' ? 'mushaf' : 'list');

  const filteredSurahs = useMemo(() => {
    if (!surahSearchQuery.trim()) return surahsMetadata;
    const q = surahSearchQuery.trim().toLowerCase();
    return surahsMetadata.filter((s) =>
      s.name.includes(q) ||
      s.nameEn.toLowerCase().includes(q) ||
      String(s.id).includes(q) ||
      String(s.page).includes(q)
    );
  }, [surahSearchQuery]);

  const handleSelectSurah = (targetSurahId: number) => {
    setShowSurahPicker(false);
    setSurahSearchQuery('');
    if (targetSurahId !== surahId) {
      router.replace({
        pathname: `/surah/${targetSurahId}`,
        params: { initialMode: viewMode },
      });
    }
  };

  const handleNextSurah = () => {
    if (surahId < 114) {
      handleSelectSurah(surahId + 1);
    }
  };

  const handlePreviousSurah = () => {
    if (surahId > 1) {
      handleSelectSurah(surahId - 1);
    }
  };

  const surahMeta = surahsMetadata.find((s) => s.id === surahId);
  const surahAyahs = quranData.find((s) => s.id === surahId)?.ayahs || [];

  const surahPages = useMemo(() => {
    const pagesSet = new Set<number>();
    surahAyahs.forEach((a) => pagesSet.add(a.page));
    return Array.from(pagesSet).sort((a, b) => a - b);
  }, [surahAyahs]);

  const { itemHeight: PAGE_ITEM_HEIGHT } = getPageItemDimensions();

  const [currentVisibleAyah, setCurrentVisibleAyah] = useState<number>(1);
  const [currentVisiblePage, setCurrentVisiblePage] = useState<number>(surahPages[0] || 1);

  const currentVisibleAyahRef = useRef<number>(1);
  const currentVisiblePageRef = useRef<number>(surahPages[0] || 1);

  const flatListRef = useRef<FlatList>(null);
  const mushafFlatListRef = useRef<FlatList>(null);
  const repeatRef = useRef(0);
  const currentRepeatRef = useRef(0);
  const currentPlayingRef = useRef(0);

  const onViewableAyahsChanged = useRef(({ viewableItems }: { viewableItems: any[] }) => {
    if (viewableItems && viewableItems.length > 0) {
      // Pick the top visible item so we sync with the verse the user is actually looking at
      const topItem = viewableItems[0];
      if (topItem && topItem.item && typeof topItem.item.ayahNumber === 'number') {
        currentVisibleAyahRef.current = topItem.item.ayahNumber;
        setCurrentVisibleAyah(topItem.item.ayahNumber);
        if (topItem.item.page) {
          currentVisiblePageRef.current = topItem.item.page;
          setCurrentVisiblePage(topItem.item.page);
        }
      }
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 20,
  }).current;

  const onViewablePagesChanged = useRef(({ viewableItems }: { viewableItems: any[] }) => {
    if (viewableItems && viewableItems.length > 0) {
      const pageItem = viewableItems[0];
      if (typeof pageItem?.item === 'number') {
        const page = pageItem.item;
        currentVisiblePageRef.current = page;
        setCurrentVisiblePage(page);
      }
    }
  }).current;

  const pageViewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const handleMushafScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = e.nativeEvent.contentOffset.y;
      const pageIndex = Math.max(
        0,
        Math.min(Math.round(offsetY / PAGE_ITEM_HEIGHT), surahPages.length - 1)
      );
      const page = surahPages[pageIndex];
      if (page && page !== currentVisiblePageRef.current) {
        currentVisiblePageRef.current = page;
        setCurrentVisiblePage(page);
      }
    },
    [surahPages, PAGE_ITEM_HEIGHT]
  );

  const ayahOffsets = useMemo(() => {
    const offsets: number[] = [];
    let currentY = 160; // Banner + Bismillah in ListHeaderComponent
    for (let i = 0; i < surahAyahs.length; i++) {
      offsets.push(currentY);
      const a = surahAyahs[i];
      const textLen = a.text.length;
      const lines = Math.max(1, Math.ceil(textLen / 60));
      let h = 48 + lines * (fontSize * 1.8);
      if (showTranslation) h += 55;
      if (showTafsir) h += 180;
      currentY += h + 8;
    }
    return offsets;
  }, [surahAyahs, fontSize, showTranslation, showTafsir]);

  const translationsMap = useMemo(() => {
    const map = new Map<number, string>();
    for (const t of allTranslations) {
      if (t.surahId === surahId) {
        map.set(t.ayahNumber, t.text);
      }
    }
    return map;
  }, [surahId]);

  const getTranslation = useCallback((ayahNumber: number): string | undefined => {
    return translationsMap.get(ayahNumber);
  }, [translationsMap]);

  const getTafsirs = useCallback((ayahNumber: number): { sourceName: string; text: string }[] => {
    return selectedTafsirs
      .map((id) => {
        const source = ALL_TAFSIR_SOURCES.find((s) => s.id === id);
        const text = getTafsirForAyah(surahId, ayahNumber, id);
        return text && source ? { sourceName: source.name, text } : null;
      })
      .filter(Boolean) as { sourceName: string; text: string }[];
  }, [surahId, selectedTafsirs]);

  useEffect(() => {
    if (surahMeta && surahAyahs.length > 0) {
      setLastRead({
        surahId,
        surahName: surahMeta.name,
        ayahNumber: 1,
        timestamp: Date.now(),
      });
    }
  }, [surahId]);

  useEffect(() => {
    currentPlayingRef.current = currentPlayingAyah;
    // Auto-scroll to the currently playing ayah
    if (currentPlayingAyah > 0 && flatListRef.current) {
      const index = surahAyahs.findIndex((a) => a.ayahNumber === currentPlayingAyah);
      if (index >= 0) {
        try {
          flatListRef.current.scrollToIndex({
            index,
            animated: true,
            viewPosition: 0.3,
          });
        } catch (e) {
          flatListRef.current.scrollToOffset({ offset: index * 150, animated: true });
        }
      }
    }
  }, [currentPlayingAyah, surahAyahs]);

  // Auto-scroll to initialAyah if provided from Bookmarks or navigation
  useEffect(() => {
    if (initialAyah && surahAyahs.length > 0) {
      const targetNum = parseInt(initialAyah, 10);
      const targetIndex = surahAyahs.findIndex((a) => a.ayahNumber === targetNum);
      if (targetIndex >= 0) {
        setTimeout(() => {
          try {
            flatListRef.current?.scrollToIndex({
              index: targetIndex,
              animated: true,
              viewPosition: 0.2,
            });
          } catch (e) {
            flatListRef.current?.scrollToOffset({ offset: targetIndex * 160, animated: true });
          }
        }, 300);
      }
    }
  }, [initialAyah, surahAyahs]);

  useEffect(() => { repeatRef.current = repeatCount; }, [repeatCount]);

  // Audio status callback
  useEffect(() => {
    audioService.setStatusCallback((status) => {
      if (status.didJustFinish) {
        const ayahNum = currentPlayingRef.current;
        if (repeatRef.current > 0 && currentRepeatRef.current < repeatRef.current) {
          currentRepeatRef.current++;
          const ayah = surahAyahs.find((a) => a.ayahNumber === ayahNum);
          if (ayah) audioService.playAyah(ayah.id);
        } else {
          currentRepeatRef.current = 0;
          if (ayahNum < surahAyahs.length) {
            const nextNum = ayahNum + 1;
            const nextAyah = surahAyahs.find((a) => a.ayahNumber === nextNum);
            if (nextAyah) {
              setCurrentPlayingAyah(nextNum);
              audioService.playAyah(nextAyah.id);
            }
          } else {
            setIsPlaying(false);
            setIsPaused(false);
            setCurrentPlayingAyah(0);
            audioService.stop();
          }
        }
      }
    });
    return () => { audioService.stop(); };
  }, [surahAyahs]);

  const handlePlayAyah = async (ayahNumber: number) => {
    if (currentPlayingAyah === ayahNumber && isPlaying) {
      await audioService.pause();
      setIsPlaying(false);
      setIsPaused(true);
    } else if (currentPlayingAyah === ayahNumber && isPaused) {
      await audioService.resume();
      setIsPlaying(true);
      setIsPaused(false);
    } else {
      const ayah = surahAyahs.find((a) => a.ayahNumber === ayahNumber);
      if (ayah) {
        setCurrentPlayingAyah(ayahNumber);
        setIsPlaying(true);
        setIsPaused(false);
        currentRepeatRef.current = 0;
        await audioService.playAyah(ayah.id);
      }
    }
  };

  const handlePlay = async () => {
    if (isPaused) {
      await audioService.resume();
      setIsPlaying(true);
      setIsPaused(false);
    } else if (currentPlayingAyah > 0) {
      const ayah = surahAyahs.find((a) => a.ayahNumber === currentPlayingAyah);
      if (ayah) {
        await audioService.playAyah(ayah.id);
        setIsPlaying(true);
        setIsPaused(false);
      }
    }
  };

  const handlePause = async () => {
    await audioService.pause();
    setIsPlaying(false);
    setIsPaused(true);
  };

  const handleNext = async () => {
    if (currentPlayingAyah < surahAyahs.length) {
      const nextNum = currentPlayingAyah + 1;
      const nextAyah = surahAyahs.find((a) => a.ayahNumber === nextNum);
      if (nextAyah) {
        setCurrentPlayingAyah(nextNum);
        currentRepeatRef.current = 0;
        await audioService.playAyah(nextAyah.id);
        setIsPlaying(true);
        setIsPaused(false);
      }
    }
  };

  const handlePrevious = async () => {
    if (currentPlayingAyah > 1) {
      const prevNum = currentPlayingAyah - 1;
      const prevAyah = surahAyahs.find((a) => a.ayahNumber === prevNum);
      if (prevAyah) {
        setCurrentPlayingAyah(prevNum);
        currentRepeatRef.current = 0;
        await audioService.playAyah(prevAyah.id);
        setIsPlaying(true);
        setIsPaused(false);
      }
    }
  };

  const handleStop = async () => {
    await audioService.stop();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentPlayingAyah(0);
  };

  const handleToggleViewMode = () => {
    if (viewMode === 'list') {
      // Transition from List (آية آية) to Mushaf
      const targetAyahNum = activeActionAyah || (currentPlayingAyah > 0 ? currentPlayingAyah : currentVisibleAyahRef.current);
      const targetAyahObj = surahAyahs.find((a) => a.ayahNumber === targetAyahNum) || surahAyahs[0];
      const targetPage = targetAyahObj ? targetAyahObj.page : (surahPages[0] || 1);
      const targetPageIndex = surahPages.indexOf(targetPage);

      currentVisiblePageRef.current = targetPage;
      setCurrentVisiblePage(targetPage);
      setViewMode('mushaf');

      if (targetPageIndex >= 0 && mushafFlatListRef.current) {
        mushafFlatListRef.current.scrollToOffset({
          offset: targetPageIndex * PAGE_ITEM_HEIGHT,
          animated: false,
        });
      }
    } else {
      // Transition from Mushaf to List (آية آية)
      const targetPage = currentVisiblePageRef.current;
      const ayahsOnPage = surahAyahs.filter((a) => a.page === targetPage);
      // Prioritize currently playing ayah if it is on this page, otherwise first ayah on page
      const playingOnPage = currentPlayingAyah > 0 && surahAyahs.find((a) => a.ayahNumber === currentPlayingAyah && a.page === targetPage);
      const targetAyahNum = playingOnPage ? currentPlayingAyah : (ayahsOnPage[0]?.ayahNumber || 1);
      const targetAyahIndex = surahAyahs.findIndex((a) => a.ayahNumber === targetAyahNum);

      currentVisibleAyahRef.current = targetAyahNum;
      setCurrentVisibleAyah(targetAyahNum);
      setViewMode('list');

      if (targetAyahIndex >= 0 && flatListRef.current) {
        const estOffset = ayahOffsets[targetAyahIndex] || 0;
        flatListRef.current.scrollToOffset({
          offset: estOffset,
          animated: false,
        });
        setTimeout(() => {
          try {
            flatListRef.current?.scrollToIndex({
              index: targetAyahIndex,
              animated: false,
              viewPosition: 0,
            });
          } catch (e) {
            // Handled safely by onScrollToIndexFailed
          }
        }, 50);
      }
    }
  };

  if (!surahMeta) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header title="خطأ" showBack />
        <View style={styles.center}>
          <Text style={{ color: colors.text }}>السورة غير موجودة</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title={surahMeta.name}
        subtitle={`${surahMeta.nameEn} • ${surahMeta.versesCount} آية • ص ${surahMeta.page}`}
        showBack
        onTitlePress={() => setShowSurahPicker(true)}
        rightIcon="options-outline"
        onRightPress={() => setShowSettings(true)}
      />

      {/* Quick Reading Toolbar */}
      <View style={[styles.toolbarContainer, { backgroundColor: '#EAF6EE', borderBottomColor: '#C6E7D0' }]}>
        {viewMode === 'mushaf' ? (
          <View style={styles.mushafToolbarRow}>
            {/* Next Surah (RTL reading order) */}
            <TouchableOpacity
              style={[
                styles.toolbarPill,
                surahId >= 114 ? styles.toolbarPillDisabled : styles.toolbarPillInactive,
              ]}
              disabled={surahId >= 114}
              onPress={handleNextSurah}
            >
              <Text style={[styles.toolbarPillText, { color: surahId >= 114 ? '#9CA3AF' : '#1B7F5A' }]}>
                التالية
              </Text>
              <Ionicons name="arrow-forward" size={16} color={surahId >= 114 ? '#9CA3AF' : '#1B7F5A'} />
            </TouchableOpacity>

            {/* Surah Index Selector */}
            <TouchableOpacity
              style={[styles.toolbarPill, styles.toolbarPillActive, { flex: 1, justifyContent: 'center' }]}
              onPress={() => setShowSurahPicker(true)}
            >
              <Ionicons name="albums-outline" size={16} color="#1B7F5A" />
              <Text style={[styles.toolbarPillText, { color: '#1B7F5A', fontWeight: '700' }]} numberOfLines={1}>
                فهرس السور ({surahMeta.name})
              </Text>
            </TouchableOpacity>

            {/* Previous Surah (RTL reading order) */}
            <TouchableOpacity
              style={[
                styles.toolbarPill,
                surahId <= 1 ? styles.toolbarPillDisabled : styles.toolbarPillInactive,
              ]}
              disabled={surahId <= 1}
              onPress={handlePreviousSurah}
            >
              <Ionicons name="arrow-back" size={16} color={surahId <= 1 ? '#9CA3AF' : '#1B7F5A'} />
              <Text style={[styles.toolbarPillText, { color: surahId <= 1 ? '#9CA3AF' : '#1B7F5A' }]}>
                السابقة
              </Text>
            </TouchableOpacity>

            {/* Toggle to List View */}
            <TouchableOpacity
              style={[styles.toolbarPill, styles.toolbarPillInactive]}
              onPress={handleToggleViewMode}
            >
              <Ionicons name="list-outline" size={16} color="#374151" />
              <Text style={[styles.toolbarPillText, { color: '#374151' }]}>
                آية آية
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.listToolbarRow}>
            {/* Surah Selector in List View */}
            <TouchableOpacity
              style={[styles.toolbarPill, styles.toolbarPillInactive]}
              onPress={() => setShowSurahPicker(true)}
            >
              <Ionicons name="albums-outline" size={16} color="#1B7F5A" />
              <Text style={[styles.toolbarPillText, { color: '#1B7F5A' }]}>
                السور
              </Text>
            </TouchableOpacity>

            {/* Translation Toggle */}
            <TouchableOpacity
              style={[
                styles.toolbarPill,
                showTranslation ? styles.toolbarPillActive : styles.toolbarPillInactive,
              ]}
              onPress={() => setShowTranslation(!showTranslation)}
            >
              <Ionicons
                name={showTranslation ? "checkmark-circle" : "language-outline"}
                size={16}
                color={showTranslation ? '#1B7F5A' : '#374151'}
              />
              <Text style={[styles.toolbarPillText, { color: showTranslation ? '#1B7F5A' : '#374151' }]}>
                الترجمة
              </Text>
            </TouchableOpacity>

            {/* Tafsir Toggle */}
            <TouchableOpacity
              style={[
                styles.toolbarPill,
                showTafsir ? styles.toolbarPillActive : styles.toolbarPillInactive,
              ]}
              onPress={() => setShowTafsir(!showTafsir)}
            >
              <Ionicons
                name={showTafsir ? "checkmark-circle" : "book-outline"}
                size={16}
                color={showTafsir ? '#1B7F5A' : '#374151'}
              />
              <Text style={[styles.toolbarPillText, { color: showTafsir ? '#1B7F5A' : '#374151' }]}>
                التفسير
              </Text>
            </TouchableOpacity>

            {/* Font Size controls */}
            <View style={styles.fontControlsInline}>
              <TouchableOpacity
                style={[styles.fontInlineBtn, { backgroundColor: '#FFFFFF', borderColor: '#C6E7D0', borderWidth: 1 }]}
                onPress={() => setFontSize(Math.max(18, fontSize - 2))}
              >
                <Text style={[styles.fontInlineText, { color: '#1B7F5A' }]}>أ-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.fontInlineBtn, { backgroundColor: '#FFFFFF', borderColor: '#C6E7D0', borderWidth: 1 }]}
                onPress={() => setFontSize(Math.min(42, fontSize + 2))}
              >
                <Text style={[styles.fontInlineText, { color: '#1B7F5A' }]}>أ+</Text>
              </TouchableOpacity>
            </View>

            {/* View Mode Toggle Button */}
            <TouchableOpacity
              style={[styles.toolbarPill, styles.toolbarPillInactive]}
              onPress={handleToggleViewMode}
            >
              <Ionicons name="book-outline" size={16} color="#374151" />
              <Text style={[styles.toolbarPillText, { color: '#374151' }]}>
                المصحف
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Main Content Area: Dual persistent views */}
      <View style={styles.mainContent}>
        {/* Mushaf (المصحف الورقي) View */}
        <View
          style={[
            styles.viewContainer,
            viewMode === 'mushaf' ? styles.visibleView : styles.invisibleView,
          ]}
        >
          <FlatList
            ref={mushafFlatListRef}
            data={surahPages}
            keyExtractor={(item) => `mushaf_page_${item}`}
            onScroll={handleMushafScroll}
            scrollEventThrottle={16}
            snapToInterval={PAGE_ITEM_HEIGHT}
            decelerationRate="fast"
            snapToAlignment="start"
            onViewableItemsChanged={onViewablePagesChanged}
            viewabilityConfig={pageViewabilityConfig}
            getItemLayout={(data, index) => ({
              length: PAGE_ITEM_HEIGHT,
              offset: PAGE_ITEM_HEIGHT * index,
              index,
            })}
            renderItem={({ item: pageNum }) => (
              <MushafPageView
                pageNumber={pageNum}
                ayahs={getAyahsByPage(pageNum)}
                selectedAyahId={currentPlayingAyah > 0 ? surahAyahs.find(a => a.ayahNumber === currentPlayingAyah)?.id : undefined}
                onSelectAyah={(ayah) => handlePlayAyah(ayah.ayahNumber)}
                fontSize={fontSize}
              />
            )}
            contentContainerStyle={styles.mushafContent}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* List (آية آية) View */}
        <View
          style={[
            styles.viewContainer,
            viewMode === 'list' ? styles.visibleView : styles.invisibleView,
          ]}
        >
          <FlatList
            ref={flatListRef}
            data={surahAyahs}
            keyExtractor={(item) => `${item.surahId}_${item.ayahNumber}`}
            onViewableItemsChanged={onViewableAyahsChanged}
            viewabilityConfig={viewabilityConfig}
            ListHeaderComponent={
              <View style={styles.listHeaderWrap}>
                {/* Surah Info Banner */}
                <View style={[styles.surahBanner, { backgroundColor: colors.surfaceVariant, borderColor: colors.borderLight }]}>
                  <Text style={[styles.bannerText, { color: colors.textSecondary }]}>
                    {surahMeta.revelationType === 'meccan' ? 'مكية' : 'مدنية'} •{' '}
                    الجزء {surahMeta.juz[0]} • الترتيب {surahMeta.order}
                  </Text>
                </View>

                {/* Bismillah: only for surahs other than Al-Fatiha (1) and At-Tawbah (9) */}
                {surahId !== 1 && surahId !== 9 && (
                  <View style={[styles.bismillah, { backgroundColor: '#EAF6EE', borderColor: '#C6E7D0', borderWidth: 1 }]}>
                    <Text style={[styles.bismillahText, { color: colors.primary }]}>
                      بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                    </Text>
                  </View>
                )}
              </View>
            }
            onScrollToIndexFailed={(info) => {
              const targetOffset = ayahOffsets[info.index] || (info.index * 160);
              flatListRef.current?.scrollToOffset({
                offset: targetOffset,
                animated: false,
              });
              setTimeout(() => {
                flatListRef.current?.scrollToIndex({ index: info.index, animated: false, viewPosition: 0 });
              }, 80);
            }}
          renderItem={({ item }) => (
            <AyahView
              surahId={surahId}
              surahName={surahMeta.name}
              ayahNumber={item.ayahNumber}
              arabicText={item.text}
              translation={getTranslation(item.ayahNumber)}
              showTranslation={showTranslation}
              tafsirs={showTafsir ? getTafsirs(item.ayahNumber) : undefined}
              showTafsir={showTafsir}
              fontSize={fontSize}
              onPlayAudio={() => handlePlayAyah(item.ayahNumber)}
              isPlaying={isPlaying && currentPlayingAyah === item.ayahNumber}
              highlighted={currentPlayingAyah === item.ayahNumber}
              showActions={activeActionAyah === item.ayahNumber}
              onToggleActions={() =>
                setActiveActionAyah((prev) => (prev === item.ayahNumber ? null : item.ayahNumber))
              }
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
      </View>

      {/* Audio Player */}
      {(isPlaying || isPaused) && currentPlayingAyah > 0 && (
        <AudioPlayer
          isPlaying={isPlaying}
          currentAyah={currentPlayingAyah}
          totalAyahs={surahAyahs.length}
          surahName={surahMeta.name}
          onPlay={handlePlay}
          onPause={handlePause}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onStop={handleStop}
          repeatCount={repeatCount}
          onRepeatChange={setRepeatCount}
        />
      )}

      {/* Settings Modal */}
      <Modal visible={showSettings} transparent animationType="fade" onRequestClose={() => setShowSettings(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowSettings(false)}>
          <View style={[styles.settingsPanel, { backgroundColor: colors.surface }]}>
            <Text style={[styles.settingsTitle, { color: colors.text }]}>إعدادات القراءة</Text>
            <View style={styles.settingRow}>
              <Text style={[styles.settingLabel, { color: colors.textSecondary }]}>حجم الخط</Text>
              <View style={styles.fontControls}>
                <TouchableOpacity style={[styles.fontBtn, { backgroundColor: colors.primaryLight }]} onPress={() => setFontSize(Math.max(18, fontSize - 2))}>
                  <Text style={[styles.fontBtnText, { color: colors.primary }]}>-</Text>
                </TouchableOpacity>
                <Text style={[styles.fontValue, { color: colors.text }]}>{fontSize}</Text>
                <TouchableOpacity style={[styles.fontBtn, { backgroundColor: colors.primaryLight }]} onPress={() => setFontSize(Math.min(40, fontSize + 2))}>
                  <Text style={[styles.fontBtnText, { color: colors.primary }]}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={[styles.settingRow, { borderTopWidth: 1, borderTopColor: colors.borderLight }]} onPress={() => setShowTranslation(!showTranslation)}>
              <Text style={[styles.settingLabel, { color: colors.textSecondary }]}>الترجمة الإنجليزية</Text>
              <Ionicons name={showTranslation ? 'checkmark-circle' : 'ellipse-outline'} size={24} color={showTranslation ? colors.primary : colors.textLight} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.settingRow, { borderTopWidth: 1, borderTopColor: colors.borderLight }]} onPress={() => setShowTafsir(!showTafsir)}>
              <View style={styles.settingColumn}>
                <Text style={[styles.settingLabel, { color: colors.textSecondary }]}>التفاسير المختارة</Text>
                {showTafsir && (
                  <Text style={[styles.tafsirSummary, { color: colors.primary }]}>
                    {selectedTafsirs.map((id) => ALL_TAFSIR_SOURCES.find((s) => s.id === id)?.name).join('، ')}
                  </Text>
                )}
              </View>
              <Ionicons name={showTafsir ? 'checkmark-circle' : 'ellipse-outline'} size={24} color={showTafsir ? colors.primary : colors.textLight} />
            </TouchableOpacity>

            {/* English Tafsir Selection */}
            <View style={[styles.settingRow, { borderTopWidth: 1, borderTopColor: colors.borderLight, flexDirection: 'column', alignItems: 'stretch', gap: 6 }]}>
              <Text style={[styles.settingLabel, { color: colors.textSecondary }]}>مصدر التفسير بالإنجليزية</Text>
              <View style={{ flexDirection: 'row', gap: 8, marginTop: 4 }}>
                <TouchableOpacity
                  style={[
                    styles.toolbarPill,
                    selectedEnglishTafsir === 'mukhtasar' ? styles.toolbarPillActive : styles.toolbarPillInactive,
                    { flex: 1, justifyContent: 'center' },
                  ]}
                  onPress={() => setSelectedEnglishTafsir('mukhtasar')}
                >
                  <Text
                    style={[
                      styles.toolbarPillText,
                      { color: selectedEnglishTafsir === 'mukhtasar' ? '#1B7F5A' : '#374151', textAlign: 'center' },
                    ]}
                  >
                    المختصر (افتراضي)
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.toolbarPill,
                    selectedEnglishTafsir === 'jalalayn' ? styles.toolbarPillActive : styles.toolbarPillInactive,
                    { flex: 1, justifyContent: 'center' },
                  ]}
                  onPress={() => setSelectedEnglishTafsir('jalalayn')}
                >
                  <Text
                    style={[
                      styles.toolbarPillText,
                      { color: selectedEnglishTafsir === 'jalalayn' ? '#1B7F5A' : '#374151', textAlign: 'center' },
                    ]}
                  >
                    الجلالين
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={[styles.settingRow, { borderTopWidth: 1, borderTopColor: colors.borderLight }]} onPress={() => { setShowSettings(false); handlePlayAyah(1); }}>
              <Text style={[styles.settingLabel, { color: colors.primary }]}>تشغيل من البداية</Text>
              <Ionicons name="play-circle" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Surah Picker Modal */}
      <Modal
        visible={showSurahPicker}
        transparent
        animationType="slide"
        onRequestClose={() => {
          setShowSurahPicker(false);
          setSurahSearchQuery('');
        }}
      >
        <View style={styles.surahModalOverlay}>
          <View style={[styles.surahModalContainer, { backgroundColor: colors.surface }]}>
            {/* Modal Header */}
            <View style={[styles.surahModalHeader, { borderBottomColor: colors.borderLight }]}>
              <TouchableOpacity
                onPress={() => {
                  setShowSurahPicker(false);
                  setSurahSearchQuery('');
                }}
                style={styles.surahModalCloseBtn}
              >
                <Ionicons name="close" size={24} color={colors.textSecondary} />
              </TouchableOpacity>
              <View style={{ alignItems: 'center' }}>
                <Text style={[styles.surahModalTitle, { color: colors.primary }]}>فهرس سور القرآن الكريم</Text>
                <Text style={[styles.surahModalSubtitle, { color: colors.textLight }]}>
                  {viewMode === 'mushaf' ? 'اختر سورة لفتحها في المصحف مباشرة' : 'اختر سورة للقراءة'}
                </Text>
              </View>
              <View style={{ width: 36 }} />
            </View>

            {/* Search Input */}
            <View style={[styles.surahSearchBox, { backgroundColor: colors.surfaceVariant, borderColor: colors.borderLight }]}>
              <Ionicons name="search-outline" size={20} color={colors.textLight} />
              <TextInput
                style={[styles.surahSearchInput, { color: colors.text }]}
                placeholder="ابحث عن اسم السورة أو رقمها أو رقم الصفحة..."
                placeholderTextColor={colors.textLight}
                value={surahSearchQuery}
                onChangeText={setSurahSearchQuery}
                textAlign="right"
              />
              {surahSearchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSurahSearchQuery('')}>
                  <Ionicons name="close-circle" size={18} color={colors.textLight} />
                </TouchableOpacity>
              )}
            </View>

            {/* Surah List */}
            <FlatList
              data={filteredSurahs}
              keyExtractor={(item) => `picker_surah_${item.id}`}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 16 }}
              renderItem={({ item }) => {
                const isCurrent = item.id === surahId;
                return (
                  <TouchableOpacity
                    style={[
                      styles.surahPickerCard,
                      {
                        backgroundColor: isCurrent ? '#EAF6EE' : colors.surface,
                        borderColor: isCurrent ? '#1B7F5A' : colors.borderLight,
                      },
                    ]}
                    onPress={() => handleSelectSurah(item.id)}
                  >
                    <View style={styles.surahPickerPageBadge}>
                      <Text style={[styles.surahPickerPageText, { color: isCurrent ? '#1B7F5A' : colors.textSecondary }]}>
                        ص {item.page}
                      </Text>
                    </View>

                    <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 12 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        {isCurrent && (
                          <View style={styles.currentBadge}>
                            <Text style={styles.currentBadgeText}>الحالية</Text>
                          </View>
                        )}
                        <Text style={[styles.surahPickerNameText, { color: isCurrent ? '#1B7F5A' : colors.text }]}>
                          {item.name}
                        </Text>
                      </View>
                      <Text style={[styles.surahPickerMetaText, { color: colors.textLight }]}>
                        {item.nameEn} • {item.revelationType === 'meccan' ? 'مكية' : 'مدنية'} • {item.versesCount} آية • الجزء {item.juz[0]}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.surahPickerNumberCircle,
                        { backgroundColor: isCurrent ? '#1B7F5A' : colors.surfaceVariant },
                      ]}
                    >
                      <Text
                        style={[
                          styles.surahPickerNumberText,
                          { color: isCurrent ? '#FFF' : colors.primary },
                        ]}
                      >
                        {item.id}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  mainContent: {
    flex: 1,
    position: 'relative',
  },
  viewContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  visibleView: {
    opacity: 1,
    zIndex: 1,
  },
  invisibleView: {
    opacity: 0,
    zIndex: 0,
    pointerEvents: 'none',
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  bismillah: {
    paddingVertical: Spacing.lg,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.sm,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
  },
  bismillahText: { fontSize: Fonts.sizes.quran, fontFamily: Fonts.arabic.quran },
  listHeaderWrap: {
    paddingBottom: Spacing.sm,
  },
  toolbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: 7,
    borderBottomWidth: 1,
  },
  toolbarPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  toolbarPillActive: {
    backgroundColor: '#D1E7DD',
    borderColor: '#1B7F5A',
  },
  toolbarPillInactive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#C6E7D0',
  },
  toolbarPillText: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '700',
  },
  fontControlsInline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  fontInlineBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontInlineText: {
    fontSize: Fonts.sizes.sm,
    fontWeight: '700',
  },
  mushafContent: {
    paddingVertical: 0,
    paddingBottom: 80,
  },
  surahBanner: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.sm,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    alignItems: 'center',
  },
  bannerText: { fontSize: Fonts.sizes.sm },
  listContent: { paddingVertical: Spacing.md, paddingBottom: 120 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  settingsPanel: { width: '85%', borderRadius: BorderRadius.xl, padding: Spacing.xl, gap: Spacing.md },
  settingsTitle: { fontSize: Fonts.sizes.xl, fontWeight: '700', textAlign: 'center', marginBottom: Spacing.sm },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: Spacing.md },
  settingLabel: { fontSize: Fonts.sizes.md, fontWeight: '500' },
  settingColumn: { flex: 1, gap: 2 },
  tafsirSummary: { fontSize: Fonts.sizes.sm, fontWeight: '600' },
  fontControls: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  fontBtn: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  fontBtnText: { fontSize: Fonts.sizes.xl, fontWeight: '700' },
  fontValue: { fontSize: Fonts.sizes.lg, fontWeight: '600', minWidth: 30, textAlign: 'center' },
  mushafToolbarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: '100%',
  },
  listToolbarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  toolbarPillDisabled: {
    backgroundColor: '#F3F4F6',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    opacity: 0.5,
  },
  surahModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  surahModalContainer: {
    height: '82%',
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    paddingTop: Spacing.md,
    overflow: 'hidden',
  },
  surahModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
  },
  surahModalCloseBtn: {
    padding: 6,
    borderRadius: BorderRadius.full,
  },
  surahModalTitle: {
    fontSize: Fonts.sizes.lg,
    fontWeight: '700',
    fontFamily: Fonts.arabic.bold,
  },
  surahModalSubtitle: {
    fontSize: Fonts.sizes.xs,
    marginTop: 2,
  },
  surahSearchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    height: 44,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    gap: 8,
  },
  surahSearchInput: {
    flex: 1,
    fontSize: Fonts.sizes.sm,
    fontFamily: Fonts.arabic.regular,
  },
  surahPickerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 4,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
  },
  surahPickerNumberCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  surahPickerNumberText: {
    fontSize: Fonts.sizes.sm,
    fontWeight: '700',
  },
  surahPickerNameText: {
    fontSize: Fonts.sizes.md,
    fontFamily: Fonts.arabic.bold,
    fontWeight: '700',
  },
  surahPickerMetaText: {
    fontSize: Fonts.sizes.xs,
    marginTop: 2,
  },
  surahPickerPageBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    backgroundColor: '#F3F4F6',
  },
  surahPickerPageText: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '600',
  },
  currentBadge: {
    backgroundColor: '#1B7F5A',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: BorderRadius.sm,
  },
  currentBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
  },
});
