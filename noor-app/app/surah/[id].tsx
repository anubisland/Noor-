import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';
import { Fonts, Spacing, BorderRadius } from '../../constants/theme';
import Header from '../../components/ui/Header';
import AyahView from '../../components/quran/AyahView';
import AudioPlayer from '../../components/quran/AudioPlayer';
import { quranData } from '../../data/quran';
import { surahsMetadata } from '../../data/metadata';
import { englishTranslation } from '../../data/translations/en';
import { audioService } from '../../services/audioService';

export default function SurahScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const surahId = parseInt(id || '1');
  const { colors } = useTheme();
  const { setLastRead, fontSize, setFontSize, showTranslation, setShowTranslation } = useApp();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentPlayingAyah, setCurrentPlayingAyah] = useState(0);
  const [repeatCount, setRepeatCount] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const repeatRef = useRef(0);
  const currentRepeatRef = useRef(0);
  const currentPlayingRef = useRef(0);

  const surahMeta = surahsMetadata.find((s) => s.id === surahId);
  const surahAyahs = quranData.find((s) => s.id === surahId)?.ayahs || [];

  const getTranslation = useCallback((ayahNumber: number): string | undefined => {
    const entry = englishTranslation.find(
      (t) => t.surahId === surahId && t.ayahNumber === ayahNumber
    );
    return entry?.text;
  }, [surahId]);

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
        subtitle={`${surahMeta.nameEn} • ${surahMeta.versesCount} آية`}
        showBack
        rightIcon="options-outline"
        onRightPress={() => setShowSettings(true)}
      />

      {/* Bismillah */}
      {surahId !== 1 && surahId !== 9 && (
        <View style={[styles.bismillah, { backgroundColor: colors.primaryLight }]}>
          <Text style={[styles.bismillahText, { color: colors.primary }]}>
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </Text>
        </View>
      )}

      {/* Surah Info Banner */}
      <View style={[styles.surahBanner, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}>
        <Text style={[styles.bannerText, { color: colors.textSecondary }]}>
          {surahMeta.revelationType === 'meccan' ? 'مكية' : 'مدنية'} •{' '}
          الجزء {surahMeta.juz[0]} • الترتيب {surahMeta.order}
        </Text>
      </View>

      {/* Ayahs List */}
      <FlatList
        ref={flatListRef}
        data={surahAyahs}
        keyExtractor={(item) => `${item.surahId}_${item.ayahNumber}`}
        onScrollToIndexFailed={(info) => {
          setTimeout(() => {
            flatListRef.current?.scrollToIndex({ index: info.index, animated: true, viewPosition: 0.3 });
          }, 300);
        }}
        renderItem={({ item }) => (
          <AyahView
            surahId={surahId}
            surahName={surahMeta.name}
            ayahNumber={item.ayahNumber}
            arabicText={item.text}
            translation={showTranslation ? getTranslation(item.ayahNumber) : undefined}
            showTranslation={showTranslation}
            fontSize={fontSize}
            onPlayAudio={() => handlePlayAyah(item.ayahNumber)}
            isPlaying={isPlaying && currentPlayingAyah === item.ayahNumber}
            highlighted={currentPlayingAyah === item.ayahNumber}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

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
            <TouchableOpacity style={[styles.settingRow, { borderTopWidth: 1, borderTopColor: colors.borderLight }]} onPress={() => { setShowSettings(false); handlePlayAyah(1); }}>
              <Text style={[styles.settingLabel, { color: colors.primary }]}>تشغيل من البداية</Text>
              <Ionicons name="play-circle" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  bismillah: {
    paddingVertical: Spacing.lg,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.sm,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
  },
  bismillahText: { fontSize: Fonts.sizes.quran, fontWeight: '400' },
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
  fontControls: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  fontBtn: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  fontBtnText: { fontSize: Fonts.sizes.xl, fontWeight: '700' },
  fontValue: { fontSize: Fonts.sizes.lg, fontWeight: '600', minWidth: 30, textAlign: 'center' },
});
