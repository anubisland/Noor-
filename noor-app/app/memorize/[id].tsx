import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Platform, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from 'expo-speech-recognition';
import { useTheme } from '../../context/ThemeContext';
import { useHifz } from '../../context/HifzContext';
import { Fonts, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import Header from '../../components/ui/Header';
import { quranData } from '../../data/quran';
import { surahsMetadata } from '../../data/metadata';
import { audioService } from '../../services/audioService';

type Mode = 'repetition' | 'fill_blank' | 'ordering' | 'voice_test' | 'tasmi';

export default function MemorizeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const surahId = parseInt(id || '1');
  const { colors } = useTheme();
  const { addRecord, recordPractice } = useHifz();

  const [mode, setMode] = useState<Mode>('repetition');
  const [currentAyah, setCurrentAyah] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [blankedWords, setBlankedWords] = useState<number[]>([]);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [shuffledAyahs, setShuffledAyahs] = useState<number[]>([]);
  const [orderedAyahs, setOrderedAyahs] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [repeatMode, setRepeatMode] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordedUri, setRecordedUri] = useState<string | null>(null);
  const [playingBack, setPlayingBack] = useState(false);
  const playbackSound = useRef<Audio.Sound | null>(null);
  // Tasmi mode state
  const [tasmiRevealed, setTasmiRevealed] = useState<number[]>([]);
  const [tasmiCurrent, setTasmiCurrent] = useState(1);
  const [tasmiError, setTasmiError] = useState(false);
  const [tasmiCompleted, setTasmiCompleted] = useState(false);
  const [tasmiListening, setTasmiListening] = useState(false);
  const [tasmiTranscript, setTasmiTranscript] = useState('');
  const errorSound = useRef<Audio.Sound | null>(null);
  const tasmiCurrentRef = useRef(1);
  const tasmiRevealedRef = useRef<number[]>([]);

  const surahMeta = surahsMetadata.find((s) => s.id === surahId);
  const surahAyahs = quranData.find((s) => s.id === surahId)?.ayahs || [];
  const currentAyahData = surahAyahs.find((a) => a.ayahNumber === currentAyah);

  // Setup audio status callback
  useEffect(() => {
    audioService.setStatusCallback((status) => {
      setIsPlaying(status.isPlaying);
      if (status.didJustFinish && repeatMode && currentAyahData) {
        // Repeat same ayah
        audioService.playAyah(currentAyahData.id);
      }
    });
    return () => {
      audioService.stop();
      if (playbackSound.current) {
        playbackSound.current.unloadAsync();
      }
    };
  }, [repeatMode, currentAyahData]);

  const handlePlay = async () => {
    if (!currentAyahData) return;
    if (isPlaying) {
      await audioService.pause();
    } else {
      if (audioService.getCurrentId() === currentAyahData.id) {
        await audioService.resume();
      } else {
        await audioService.playAyah(currentAyahData.id);
      }
    }
  };

  const toggleRepeat = () => {
    setRepeatMode(!repeatMode);
  };

  const words = useMemo(() => {
    if (!currentAyahData) return [];
    return currentAyahData.text.split(' ');
  }, [currentAyahData]);

  const startFillBlank = useCallback(() => {
    const indices: number[] = [];
    const totalBlanks = Math.max(1, Math.floor(words.length * 0.3));
    while (indices.length < totalBlanks) {
      const idx = Math.floor(Math.random() * words.length);
      if (!indices.includes(idx)) indices.push(idx);
    }
    setBlankedWords(indices.sort());
    setUserAnswers({});
    setShowResult(false);
    setMode('fill_blank');
  }, [words]);

  const startOrdering = useCallback(() => {
    const ayahNumbers = surahAyahs.slice(0, Math.min(5, surahAyahs.length)).map((a) => a.ayahNumber);
    const shuffled = [...ayahNumbers].sort(() => Math.random() - 0.5);
    setShuffledAyahs(shuffled);
    setOrderedAyahs([]);
    setShowResult(false);
    setMode('ordering');
  }, [surahAyahs]);

  const handleSelectAyah = (ayahNum: number) => {
    if (orderedAyahs.includes(ayahNum)) return;
    const newOrdered = [...orderedAyahs, ayahNum];
    setOrderedAyahs(newOrdered);

    if (newOrdered.length === shuffledAyahs.length) {
      const correct = newOrdered.every((num, idx) => num === idx + 1);
      setScore(correct ? 100 : Math.round((newOrdered.filter((num, idx) => num === idx + 1).length / newOrdered.length) * 100));
      setShowResult(true);
    }
  };

  const checkFillBlank = () => {
    let correct = 0;
    blankedWords.forEach((idx) => {
      if (userAnswers[idx]?.trim() === words[idx]) correct++;
    });
    const accuracy = Math.round((correct / blankedWords.length) * 100);
    setScore(accuracy);
    setShowResult(true);
    recordPractice(surahId, currentAyah, accuracy);
  };

  const handleVoiceTest = async () => {
    if (isRecording && recording) {
      // Stop recording
      try {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setRecording(null);
        setIsRecording(false);
        if (uri) {
          setRecordedUri(uri);
        }
      } catch (e) {
        console.error('Error stopping recording:', e);
        setIsRecording(false);
        setRecording(null);
      }
    } else {
      // Start recording
      try {
        setShowResult(false);
        setRecordedUri(null);
        const permission = await Audio.requestPermissionsAsync();
        if (!permission.granted) {
          Alert.alert('إذن مطلوب', 'يرجى السماح بالوصول إلى الميكروفون للتسجيل');
          return;
        }
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording: newRecording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setRecording(newRecording);
        setIsRecording(true);
      } catch (e) {
        console.error('Error starting recording:', e);
        Alert.alert('خطأ', 'لم يتم تشغيل التسجيل. تأكد من إذن الميكروفون.');
      }
    }
  };

  const playRecording = async () => {
    if (!recordedUri) return;
    try {
      if (playbackSound.current) {
        await playbackSound.current.unloadAsync();
      }
      setPlayingBack(true);
      const { sound } = await Audio.Sound.createAsync(
        { uri: recordedUri },
        { shouldPlay: true },
        (status) => {
          if (status.isLoaded && (status as any).didJustFinish) {
            setPlayingBack(false);
          }
        }
      );
      playbackSound.current = sound;
    } catch (e) {
      console.error('Error playing recording:', e);
      setPlayingBack(false);
    }
  };

  const submitVoiceScore = (userScore: number) => {
    setScore(userScore);
    setShowResult(true);
    recordPractice(surahId, currentAyah, userScore);
  };

  // Tasmi mode functions
  const stripDiacritics = (text: string) => {
    return text
      .replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED]/g, '')
      .replace(/[ٱإأآ]/g, 'ا')
      .replace(/ى/g, 'ي')
      .replace(/ة/g, 'ه')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const compareTexts = (recognized: string, original: string): number => {
    const normRec = stripDiacritics(recognized).split(/\s+/).filter(Boolean);
    const normOrig = stripDiacritics(original).split(/\s+/).filter(Boolean);
    if (normOrig.length === 0) return 0;
    let matches = 0;
    for (const word of normRec) {
      if (normOrig.includes(word)) matches++;
    }
    return matches / normOrig.length;
  };

  const startTasmi = useCallback(() => {
    setTasmiRevealed([]);
    tasmiRevealedRef.current = [];
    setTasmiCurrent(1);
    tasmiCurrentRef.current = 1;
    setTasmiError(false);
    setTasmiCompleted(false);
    setTasmiListening(false);
    setTasmiTranscript('');
    setShowResult(false);
    setMode('tasmi');
  }, []);

  const playErrorBeep = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: 'https://cdn.freesound.org/previews/536/536420_4921277-lq.mp3' },
        { shouldPlay: true, volume: 0.5 }
      );
      errorSound.current = sound;
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && (status as any).didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (e) {
      console.log('Error playing beep:', e);
    }
  };

  const handleTasmiCorrectAuto = useCallback(() => {
    const cur = tasmiCurrentRef.current;
    const prev = tasmiRevealedRef.current;
    const newRevealed = [...prev, cur];
    setTasmiRevealed(newRevealed);
    tasmiRevealedRef.current = newRevealed;
    setTasmiError(false);
    setTasmiTranscript('');
    if (cur >= surahAyahs.length) {
      setTasmiCompleted(true);
      const accuracy = Math.round((newRevealed.length / surahAyahs.length) * 100);
      setScore(accuracy);
      setShowResult(true);
      recordPractice(surahId, 1, accuracy);
    } else {
      setTasmiCurrent(cur + 1);
      tasmiCurrentRef.current = cur + 1;
    }
    setTasmiListening(false);
  }, [surahAyahs.length, surahId, recordPractice]);

  const handleTasmiWrongAuto = useCallback(async () => {
    setTasmiError(true);
    setTasmiListening(false);
    setTasmiTranscript('');
    await playErrorBeep();
  }, []);

  // Speech recognition event handlers
  useSpeechRecognitionEvent('result', (event) => {
    const transcript = event.results[0]?.transcript || '';
    setTasmiTranscript(transcript);
    if (event.isFinal) {
      const cur = tasmiCurrentRef.current;
      const currentAyahText = surahAyahs.find((a) => a.ayahNumber === cur)?.text || '';
      const similarity = compareTexts(transcript, currentAyahText);
      if (similarity >= 0.4) {
        handleTasmiCorrectAuto();
      } else {
        handleTasmiWrongAuto();
      }
    }
  });

  useSpeechRecognitionEvent('error', (event) => {
    setTasmiListening(false);
    if (event.error !== 'no-speech') {
      console.log('Speech recognition error:', event.error, event.message);
    }
  });

  useSpeechRecognitionEvent('end', () => {
    setTasmiListening(false);
  });

  const startTasmiListening = async () => {
    try {
      const { granted } = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!granted) {
        Alert.alert('إذن مطلوب', 'يرجى السماح بالوصول إلى الميكروفون والتعرف على الكلام');
        return;
      }
      // Stop any playing audio first
      await audioService.stop();
      setTasmiTranscript('');
      setTasmiError(false);
      setTasmiListening(true);

      // Get current ayah words for contextual hints
      const cur = tasmiCurrentRef.current;
      const ayahText = surahAyahs.find((a) => a.ayahNumber === cur)?.text || '';
      const hints = stripDiacritics(ayahText).split(/\s+/).filter(Boolean);

      ExpoSpeechRecognitionModule.start({
        lang: 'ar-SA',
        interimResults: true,
        continuous: false,
        contextualStrings: hints.slice(0, 10),
      });
    } catch (e) {
      console.error('Error starting speech recognition:', e);
      setTasmiListening(false);
      Alert.alert('خطأ', 'لم يتم تشغيل التعرف على الكلام');
    }
  };

  const stopTasmiListening = () => {
    try {
      ExpoSpeechRecognitionModule.stop();
    } catch (e) {
      console.log('Error stopping:', e);
    }
    setTasmiListening(false);
  };

  const handleTasmiListenCorrect = async () => {
    const ayah = surahAyahs.find((a) => a.ayahNumber === tasmiCurrent);
    if (ayah) {
      await audioService.playAyah(ayah.id);
    }
  };

  const numberToArabic = (num: number): string => {
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return String(num).split('').map((d) => arabicDigits[parseInt(d)]).join('');
  };

  const modes = [
    { id: 'repetition' as Mode, title: 'التكرار', icon: 'repeat' as const, color: '#3498DB' },
    { id: 'fill_blank' as Mode, title: 'إكمال', icon: 'text' as const, color: '#E67E22' },
    { id: 'ordering' as Mode, title: 'ترتيب', icon: 'swap-vertical' as const, color: '#9B59B6' },
    { id: 'voice_test' as Mode, title: 'صوتي', icon: 'mic' as const, color: '#E74C3C' },
    { id: 'tasmi' as Mode, title: 'تسميع', icon: 'eye-off' as const, color: '#16A085' },
  ];

  if (!surahMeta) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header title="خطأ" showBack />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title={`حفظ ${surahMeta.name}`}
        subtitle={`الآية ${currentAyah} من ${surahAyahs.length}`}
        showBack
      />

      {/* Mode Selector */}
      <View style={styles.modeSelector}>
        {modes.map((m) => (
          <TouchableOpacity
            key={m.id}
            style={[
              styles.modeBtn,
              {
                backgroundColor: mode === m.id ? m.color : colors.surfaceVariant,
                borderColor: mode === m.id ? m.color : colors.border,
              },
            ]}
            onPress={() => {
              setShowResult(false);
              if (m.id === 'fill_blank') startFillBlank();
              else if (m.id === 'ordering') startOrdering();
              else if (m.id === 'tasmi') startTasmi();
              else setMode(m.id);
            }}
          >
            <Ionicons name={m.icon} size={18} color={mode === m.id ? '#FFF' : colors.textSecondary} />
            <Text style={[styles.modeBtnText, { color: mode === m.id ? '#FFF' : colors.textSecondary }]}>
              {m.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Repetition Mode */}
        {mode === 'repetition' && currentAyahData && (
          <View>
            <View style={[styles.ayahDisplay, { backgroundColor: colors.surface }, Shadows.md]}>
              <Text style={[styles.ayahText, { color: colors.text }]}>{currentAyahData.text}</Text>
              <View style={styles.ayahControls}>
                <TouchableOpacity
                  style={[styles.controlBtn, { backgroundColor: isPlaying ? colors.primary : colors.primaryLight }]}
                  onPress={handlePlay}
                >
                  <Ionicons name={isPlaying ? 'pause' : 'play'} size={28} color={isPlaying ? '#FFF' : colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.controlBtn, { backgroundColor: repeatMode ? colors.secondary : colors.primaryLight }]}
                  onPress={toggleRepeat}
                >
                  <Ionicons name="repeat" size={24} color={repeatMode ? '#FFF' : colors.primary} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.ayahNav}>
              <TouchableOpacity
                style={[styles.navBtn, { backgroundColor: colors.primary }]}
                onPress={() => setCurrentAyah(Math.max(1, currentAyah - 1))}
                disabled={currentAyah <= 1}
              >
                <Ionicons name="arrow-forward" size={20} color="#FFF" />
                <Text style={styles.navBtnText}>السابقة</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.navBtn, { backgroundColor: colors.primary }]}
                onPress={() => {
                  setCurrentAyah(Math.min(surahAyahs.length, currentAyah + 1));
                  addRecord({ surahId, ayahStart: currentAyah, ayahEnd: currentAyah, level: 1 });
                }}
                disabled={currentAyah >= surahAyahs.length}
              >
                <Text style={styles.navBtnText}>التالية</Text>
                <Ionicons name="arrow-back" size={20} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Fill in the Blank Mode */}
        {mode === 'fill_blank' && currentAyahData && (
          <View style={[styles.fillBlankContainer, { backgroundColor: colors.surface }, Shadows.md]}>
            <Text style={[styles.fillTitle, { color: colors.secondary }]}>أكمل الكلمات الناقصة:</Text>
            <View style={styles.wordsContainer}>
              {words.map((word, index) => (
                <View key={index} style={styles.wordWrapper}>
                  {blankedWords.includes(index) ? (
                    <TouchableOpacity
                      style={[styles.blankWord, {
                        borderColor: showResult
                          ? (userAnswers[index] === word ? colors.success : colors.error)
                          : colors.secondary,
                        backgroundColor: showResult
                          ? (userAnswers[index] === word ? colors.successLight : colors.errorLight)
                          : colors.secondaryLight,
                      }]}
                      onPress={() => {
                        if (!showResult) {
                          setUserAnswers((prev) => ({ ...prev, [index]: word }));
                        }
                      }}
                    >
                      <Text style={[styles.blankText, { color: showResult ? colors.text : colors.secondary }]}>
                        {showResult ? word : (userAnswers[index] || '___')}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <Text style={[styles.visibleWord, { color: colors.text }]}>{word}</Text>
                  )}
                </View>
              ))}
            </View>
            {!showResult && (
              <TouchableOpacity
                style={[styles.checkBtn, { backgroundColor: colors.secondary }]}
                onPress={checkFillBlank}
              >
                <Text style={styles.checkBtnText}>تحقق</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Ordering Mode */}
        {mode === 'ordering' && (
          <View>
            <Text style={[styles.orderTitle, { color: colors.text }]}>رتب الآيات بالترتيب الصحيح:</Text>
            <View style={styles.orderedList}>
              {orderedAyahs.map((num, idx) => {
                const ayah = surahAyahs.find((a) => a.ayahNumber === num);
                const isCorrect = num === idx + 1;
                return (
                  <View
                    key={idx}
                    style={[styles.orderedItem, {
                      backgroundColor: showResult ? (isCorrect ? colors.successLight : colors.errorLight) : colors.primaryLight,
                      borderColor: showResult ? (isCorrect ? colors.success : colors.error) : colors.primary,
                    }]}
                  >
                    <Text style={[styles.orderedNumber, { color: showResult ? (isCorrect ? colors.success : colors.error) : colors.primary }]}>
                      {idx + 1}
                    </Text>
                    <Text style={[styles.orderedText, { color: colors.text }]} numberOfLines={1}>
                      {ayah?.text || ''}
                    </Text>
                  </View>
                );
              })}
            </View>
            <Text style={[styles.orderInstruction, { color: colors.textSecondary }]}>اضغط على الآية لإضافتها:</Text>
            {shuffledAyahs.filter((n) => !orderedAyahs.includes(n)).map((num) => {
              const ayah = surahAyahs.find((a) => a.ayahNumber === num);
              return (
                <TouchableOpacity
                  key={num}
                  style={[styles.shuffledItem, { backgroundColor: colors.surface, borderColor: colors.border }, Shadows.sm]}
                  onPress={() => handleSelectAyah(num)}
                >
                  <Text style={[styles.shuffledText, { color: colors.text }]} numberOfLines={2}>
                    {ayah?.text || ''}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Voice Test Mode */}
        {mode === 'voice_test' && currentAyahData && (
          <View style={styles.voiceContainer}>
            {!isRecording && !showResult && (
              <View style={[styles.ayahDisplay, { backgroundColor: colors.surface }, Shadows.md]}>
                <Text style={[styles.voiceInstruction, { color: colors.textSecondary }]}>
                  اقرأ الآية التالية ثم اضغط على زر التسجيل:
                </Text>
                <Text style={[styles.ayahText, { color: colors.text }]}>{currentAyahData.text}</Text>
              </View>
            )}

            <TouchableOpacity
              style={[styles.recordBtn, { backgroundColor: isRecording ? colors.error : colors.primary }]}
              onPress={handleVoiceTest}
            >
              <Ionicons name={isRecording ? 'stop' : 'mic'} size={40} color="#FFF" />
              <Text style={styles.recordBtnText}>
                {isRecording ? 'إيقاف التسجيل' : 'ابدأ التسجيل'}
              </Text>
            </TouchableOpacity>

            {isRecording && (
              <View style={styles.recordingIndicator}>
                <View style={[styles.recordingDot, { backgroundColor: colors.error }]} />
                <Text style={[styles.recordingText, { color: colors.error }]}>جاري التسجيل...</Text>
              </View>
            )}

            {/* Playback & Self-Assessment after recording */}
            {recordedUri && !isRecording && !showResult && (
              <View style={[styles.playbackCard, { backgroundColor: colors.surface }, Shadows.md]}>
                <Text style={[styles.playbackTitle, { color: colors.text }]}>تم التسجيل بنجاح!</Text>

                <View style={styles.playbackBtns}>
                  <TouchableOpacity
                    style={[styles.playbackBtn, { backgroundColor: colors.primaryLight }]}
                    onPress={playRecording}
                  >
                    <Ionicons name={playingBack ? 'pause' : 'play'} size={24} color={colors.primary} />
                    <Text style={[styles.playbackBtnText, { color: colors.primary }]}>
                      {playingBack ? 'جاري التشغيل...' : 'استمع لتلاوتك'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.playbackBtn, { backgroundColor: colors.secondaryLight }]}
                    onPress={() => currentAyahData && audioService.playAyah(currentAyahData.id)}
                  >
                    <Ionicons name="volume-high" size={24} color={colors.secondary} />
                    <Text style={[styles.playbackBtnText, { color: colors.secondary }]}>استمع للقارئ</Text>
                  </TouchableOpacity>
                </View>

                <Text style={[styles.assessTitle, { color: colors.text }]}>قيّم تلاوتك:</Text>
                <View style={styles.assessBtns}>
                  {[
                    { label: 'ممتاز', score: 95, color: colors.success },
                    { label: 'جيد جداً', score: 80, color: colors.primary },
                    { label: 'جيد', score: 65, color: colors.warning },
                    { label: 'يحتاج تحسين', score: 40, color: colors.error },
                  ].map((item) => (
                    <TouchableOpacity
                      key={item.score}
                      style={[styles.assessBtn, { backgroundColor: item.color + '20', borderColor: item.color }]}
                      onPress={() => submitVoiceScore(item.score)}
                    >
                      <Text style={[styles.assessBtnText, { color: item.color }]}>{item.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}

        {/* Tasmi Mode */}
        {mode === 'tasmi' && !showResult && (
          <View style={styles.tasmiContainer}>
            {/* Instructions */}
            <View style={[styles.tasmiInstructions, { backgroundColor: colors.primaryLight, borderColor: colors.primary }]}>
              <Ionicons name="mic" size={24} color={colors.primary} />
              <Text style={[styles.tasmiInstructionText, { color: colors.text }]}>
                اضغط على زر الميكروفون ثم اقرأ الآية. إذا كانت صحيحة تظهر تلقائياً، وإذا أخطأت يصدر صوت تنبيه.
              </Text>
            </View>

            {/* Progress */}
            <View style={styles.tasmiProgress}>
              <View style={[styles.tasmiProgressBg, { backgroundColor: colors.borderLight }]}>
                <View style={[styles.tasmiProgressFill, {
                  width: `${(tasmiRevealed.length / surahAyahs.length) * 100}%`,
                  backgroundColor: colors.primary
                }]} />
              </View>
              <Text style={[styles.tasmiProgressText, { color: colors.textSecondary }]}>
                {tasmiRevealed.length} / {surahAyahs.length} آية
              </Text>
            </View>

            {/* Ayahs list */}
            {surahAyahs.map((ayah) => {
              const isRevealed = tasmiRevealed.includes(ayah.ayahNumber);
              const isCurrent = ayah.ayahNumber === tasmiCurrent;

              return (
                <View
                  key={ayah.ayahNumber}
                  style={[
                    styles.tasmiAyah,
                    {
                      backgroundColor: isRevealed
                        ? colors.successLight
                        : isCurrent
                          ? (tasmiError ? colors.errorLight : (tasmiListening ? '#FFF8E1' : colors.secondaryLight))
                          : colors.surface,
                      borderColor: isRevealed
                        ? colors.success
                        : isCurrent
                          ? (tasmiError ? colors.error : (tasmiListening ? colors.secondary : colors.secondary))
                          : colors.borderLight,
                    },
                    Shadows.sm,
                  ]}
                >
                  {/* Ayah number */}
                  <View style={[styles.tasmiAyahNumber, {
                    backgroundColor: isRevealed ? colors.success
                      : isCurrent ? (tasmiListening ? colors.error : colors.secondary)
                      : colors.primaryLight
                  }]}>
                    <Text style={[styles.tasmiAyahNumberText, {
                      color: isRevealed || isCurrent ? '#FFF' : colors.primary
                    }]}>
                      {numberToArabic(ayah.ayahNumber)}
                    </Text>
                  </View>

                  {/* Content area */}
                  <View style={styles.tasmiAyahContent}>
                    {isRevealed ? (
                      <Text style={[styles.tasmiAyahText, { color: colors.text }]}>
                        {ayah.text}
                      </Text>
                    ) : isCurrent ? (
                      <View style={styles.tasmiCurrentArea}>
                        {tasmiError && (
                          <View style={[styles.tasmiErrorBanner, { backgroundColor: colors.error }]}>
                            <Ionicons name="close-circle" size={18} color="#FFF" />
                            <Text style={styles.tasmiErrorText}>خطأ! حاول مرة أخرى أو استمع للصواب</Text>
                          </View>
                        )}

                        {/* Live transcript while listening */}
                        {tasmiListening && tasmiTranscript ? (
                          <Text style={[styles.tasmiLiveText, { color: colors.textSecondary }]}>
                            {tasmiTranscript}...
                          </Text>
                        ) : !tasmiListening && (
                          <Text style={[styles.tasmiHiddenText, { color: colors.textLight }]}>
                            ﴿ اقرأ هذه الآية ﴾
                          </Text>
                        )}

                        {/* Controls */}
                        <View style={styles.tasmiActionRow}>
                          {/* Mic button - main action */}
                          {!tasmiListening ? (
                            <TouchableOpacity
                              style={[styles.tasmiMicBtn, { backgroundColor: colors.secondary }]}
                              onPress={startTasmiListening}
                            >
                              <Ionicons name="mic" size={28} color="#FFF" />
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              style={[styles.tasmiMicBtn, styles.tasmiMicBtnActive, { backgroundColor: colors.error }]}
                              onPress={stopTasmiListening}
                            >
                              <Ionicons name="stop" size={28} color="#FFF" />
                            </TouchableOpacity>
                          )}

                          {/* Listen to correct recitation */}
                          {tasmiError && (
                            <TouchableOpacity
                              style={[styles.tasmiBtn, { backgroundColor: colors.primaryLight, borderColor: colors.primary }]}
                              onPress={handleTasmiListenCorrect}
                            >
                              <Ionicons name="volume-high" size={22} color={colors.primary} />
                              <Text style={[styles.tasmiBtnText, { color: colors.primary }]}>استمع للصواب</Text>
                            </TouchableOpacity>
                          )}
                        </View>

                        {tasmiListening && (
                          <View style={styles.tasmiListeningRow}>
                            <View style={[styles.recordingDot, { backgroundColor: colors.error }]} />
                            <Text style={[styles.tasmiListeningText, { color: colors.error }]}>جاري الاستماع...</Text>
                          </View>
                        )}
                      </View>
                    ) : (
                      <View style={styles.tasmiHidden}>
                        <Ionicons name="eye-off-outline" size={20} color={colors.textLight} />
                        <Text style={[styles.tasmiHiddenLabel, { color: colors.textLight }]}>مخفي</Text>
                      </View>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {/* Score Display */}
        {showResult && (
          <View style={[styles.scoreCard, {
            backgroundColor: score >= 80 ? colors.successLight : score >= 50 ? colors.warningLight : colors.errorLight,
            borderColor: score >= 80 ? colors.success : score >= 50 ? colors.warning : colors.error,
          }]}>
            <Ionicons
              name={score >= 80 ? 'checkmark-circle' : score >= 50 ? 'alert-circle' : 'close-circle'}
              size={48}
              color={score >= 80 ? colors.success : score >= 50 ? colors.warning : colors.error}
            />
            <Text style={[styles.scoreNumber, {
              color: score >= 80 ? colors.success : score >= 50 ? colors.warning : colors.error,
            }]}>{score}%</Text>
            <Text style={[styles.scoreLabel, { color: colors.text }]}>
              {score >= 90 ? 'ممتاز! أحسنت' : score >= 70 ? 'جيد جداً' : score >= 50 ? 'جيد، واصل المحاولة' : 'حاول مرة أخرى'}
            </Text>
            <TouchableOpacity
              style={[styles.retryBtn, { backgroundColor: colors.primary }]}
              onPress={() => {
                setShowResult(false);
                if (mode === 'fill_blank') startFillBlank();
                else if (mode === 'ordering') startOrdering();
                else if (mode === 'tasmi') startTasmi();
              }}
            >
              <Text style={styles.retryBtnText}>حاول مرة أخرى</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  modeSelector: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.xs,
  },
  modeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    gap: 4,
  },
  modeBtnText: { fontSize: Fonts.sizes.xs, fontWeight: '600' },
  scrollContent: { padding: Spacing.lg },
  ayahDisplay: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  ayahText: {
    fontSize: Fonts.sizes.quran,
    textAlign: 'center',
    lineHeight: 52,
  },
  ayahControls: {
    flexDirection: 'row',
    gap: Spacing.lg,
    marginTop: Spacing.lg,
  },
  controlBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ayahNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  navBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
  },
  navBtnText: { color: '#FFF', fontSize: Fonts.sizes.md, fontWeight: '600' },
  fillBlankContainer: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
  },
  fillTitle: { fontSize: Fonts.sizes.lg, fontWeight: '700', marginBottom: Spacing.lg, textAlign: 'center' },
  wordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  wordWrapper: { marginVertical: 4 },
  blankWord: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    borderStyle: 'dashed',
    minWidth: 60,
    alignItems: 'center',
  },
  blankText: { fontSize: Fonts.sizes.lg, fontWeight: '600' },
  visibleWord: { fontSize: Fonts.sizes.quran, lineHeight: 44 },
  checkBtn: {
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
  },
  checkBtnText: { color: '#FFF', fontSize: Fonts.sizes.lg, fontWeight: '700' },
  orderTitle: { fontSize: Fonts.sizes.lg, fontWeight: '700', marginBottom: Spacing.md, textAlign: 'center' },
  orderInstruction: { fontSize: Fonts.sizes.md, marginVertical: Spacing.md, textAlign: 'center' },
  orderedList: { gap: Spacing.sm, marginBottom: Spacing.md },
  orderedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  orderedNumber: { fontSize: Fonts.sizes.lg, fontWeight: '700', width: 30, textAlign: 'center' },
  orderedText: { flex: 1, fontSize: Fonts.sizes.md },
  shuffledItem: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  shuffledText: { fontSize: Fonts.sizes.md, textAlign: 'center', lineHeight: 28 },
  voiceContainer: { alignItems: 'center', gap: Spacing.xl },
  voiceInstruction: { fontSize: Fonts.sizes.md, textAlign: 'center', marginBottom: Spacing.md },
  recordBtn: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  recordBtnText: { color: '#FFF', fontSize: Fonts.sizes.sm, fontWeight: '600' },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  recordingDot: { width: 12, height: 12, borderRadius: 6 },
  recordingText: { fontSize: Fonts.sizes.md, fontWeight: '600' },
  playbackCard: {
    width: '100%',
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    gap: Spacing.lg,
  },
  playbackTitle: { fontSize: Fonts.sizes.lg, fontWeight: '700' },
  playbackBtns: { flexDirection: 'row', gap: Spacing.md, width: '100%' },
  playbackBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
  },
  playbackBtnText: { fontSize: Fonts.sizes.sm, fontWeight: '600' },
  assessTitle: { fontSize: Fonts.sizes.md, fontWeight: '700' },
  assessBtns: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, justifyContent: 'center' },
  assessBtn: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  assessBtnText: { fontSize: Fonts.sizes.sm, fontWeight: '600' },
  scoreCard: {
    padding: Spacing.xxl,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
    borderWidth: 1,
    gap: Spacing.sm,
    marginTop: Spacing.lg,
  },
  scoreNumber: { fontSize: 48, fontWeight: '800' },
  scoreLabel: { fontSize: Fonts.sizes.lg, fontWeight: '600' },
  retryBtn: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xxl,
    borderRadius: BorderRadius.full,
    marginTop: Spacing.md,
  },
  retryBtnText: { color: '#FFF', fontSize: Fonts.sizes.md, fontWeight: '700' },
  // Tasmi mode styles
  tasmiContainer: { gap: Spacing.md },
  tasmiInstructions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
  },
  tasmiInstructionText: { flex: 1, fontSize: Fonts.sizes.sm, lineHeight: 22 },
  tasmiProgress: { gap: Spacing.xs },
  tasmiProgressBg: { height: 8, borderRadius: 4 },
  tasmiProgressFill: { height: '100%', borderRadius: 4 },
  tasmiProgressText: { fontSize: Fonts.sizes.sm, textAlign: 'center' },
  tasmiAyah: {
    flexDirection: 'row',
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  tasmiAyahNumber: {
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  tasmiAyahNumberText: { fontSize: Fonts.sizes.lg, fontWeight: '700' },
  tasmiAyahContent: {
    flex: 1,
    padding: Spacing.md,
    justifyContent: 'center',
  },
  tasmiAyahText: {
    fontSize: Fonts.sizes.lg,
    lineHeight: 32,
    writingDirection: 'rtl',
    textAlign: 'right',
  },
  tasmiCurrentArea: { gap: Spacing.md },
  tasmiErrorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  tasmiErrorText: { color: '#FFF', fontSize: Fonts.sizes.sm, fontWeight: '600' },
  tasmiHiddenText: { fontSize: Fonts.sizes.lg, textAlign: 'center', fontWeight: '500' },
  tasmiLiveText: { fontSize: Fonts.sizes.md, textAlign: 'center', lineHeight: 28, fontStyle: 'italic' },
  tasmiActionRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tasmiMicBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tasmiMicBtnActive: {
    // animated pulsing effect placeholder
  },
  tasmiBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    gap: 4,
  },
  tasmiBtnText: { fontSize: Fonts.sizes.sm, fontWeight: '600' },
  tasmiListeningRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  tasmiListeningText: { fontSize: Fonts.sizes.sm, fontWeight: '600' },
  tasmiHidden: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
  },
  tasmiHiddenLabel: { fontSize: Fonts.sizes.sm },
});
