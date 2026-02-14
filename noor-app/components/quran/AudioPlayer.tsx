import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { BorderRadius, Fonts, Spacing } from '../../constants/theme';

interface AudioPlayerProps {
  isPlaying: boolean;
  currentAyah: number;
  totalAyahs: number;
  surahName: string;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onStop: () => void;
  repeatCount: number;
  onRepeatChange: (count: number) => void;
}

export default function AudioPlayer({
  isPlaying, currentAyah, totalAyahs, surahName,
  onPlay, onPause, onNext, onPrevious, onStop,
  repeatCount, onRepeatChange,
}: AudioPlayerProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <View style={styles.info}>
        <Text style={styles.surahName}>{surahName}</Text>
        <Text style={styles.ayahInfo}>الآية {currentAyah} من {totalAyahs}</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity onPress={onPrevious} style={styles.controlBtn}>
          <Ionicons name="play-forward" size={22} color="#FFF" />
        </TouchableOpacity>

        <TouchableOpacity onPress={isPlaying ? onPause : onPlay} style={styles.playBtn}>
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={28} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity onPress={onNext} style={styles.controlBtn}>
          <Ionicons name="play-back" size={22} color="#FFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.extras}>
        <TouchableOpacity
          onPress={() => onRepeatChange(repeatCount === 0 ? 1 : repeatCount >= 10 ? 0 : repeatCount + 1)}
          style={styles.repeatBtn}
        >
          <Ionicons name="repeat" size={20} color={repeatCount > 0 ? colors.gold : 'rgba(255,255,255,0.6)'} />
          {repeatCount > 0 && <Text style={styles.repeatCount}>{repeatCount}</Text>}
        </TouchableOpacity>

        <TouchableOpacity onPress={onStop} style={styles.controlBtn}>
          <Ionicons name="stop" size={20} color="rgba(255,255,255,0.8)" />
        </TouchableOpacity>
      </View>

      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${(currentAyah / totalAyahs) * 100}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xs,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
  },
  info: {
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  surahName: {
    color: '#FFF',
    fontSize: Fonts.sizes.md,
    fontWeight: '600',
  },
  ayahInfo: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: Fonts.sizes.sm,
    marginTop: 2,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.xl,
    marginBottom: Spacing.sm,
  },
  controlBtn: {
    padding: Spacing.sm,
  },
  playBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  extras: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.xl,
    marginBottom: Spacing.sm,
  },
  repeatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  repeatCount: {
    color: '#FFF',
    fontSize: Fonts.sizes.sm,
    fontWeight: '600',
  },
  progressContainer: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFF',
    borderRadius: 2,
  },
});
