import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  Alert,
  Modal,
  TextInput,
  FlatList,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from 'expo-speech-recognition';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';
import { useHifz } from '../../context/HifzContext';
import {  Fonts, Spacing, BorderRadius, Shadows, rtlText } from '../../constants/theme';
import Header from '../../components/ui/Header';
import { quranData } from '../../data/quran';
import { surahsMetadata } from '../../data/metadata';
import { audioService } from '../../services/audioService';
import { srmdnLookup } from '../../data/mutashabihat-from-srmdn';
import { RECITERS } from '../../constants/config';

type Mode = 'repetition' | 'fill_blank' | 'ordering' | 'voice_test' | 'tasmi';

const toArabicDigits = (num: number): string => {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(num).split('').map((d) => arabicDigits[parseInt(d)] || d).join('');
};

export default function MemorizeScreen() {
  const { id, ayah, mode: initialModeParam } = useLocalSearchParams<{ id: string; ayah?: string; mode?: string }>();
  const surahId = parseInt(id || '1');
  const initialAyah = ayah ? parseInt(ayah) : 1;

  const { colors } = useTheme();
  const { addRecord, recordPractice } = useHifz();

  const surahMeta = surahsMetadata.find((s) => s.id === surahId);
  const surahAyahs = useMemo(() => quranData.find((s) => s.id === surahId)?.ayahs || [], [surahId]);

  // Mode state
  const [mode, setMode] = useState<Mode>(
    (initialModeParam as Mode) || 'repetition'
  );

  // Range State (من آية إلى آية)
  const [rangeStart, setRangeStart] = useState<number>(initialAyah);
  const [rangeEnd, setRangeEnd] = useState<number>(
    Math.min(initialAyah + 9, surahAyahs.length || 10)
  );
  const [showRangeModal, setShowRangeModal] = useState(false);
  const [modalStart, setModalStart] = useState<string>(String(initialAyah));
  const [modalEnd, setModalEnd] = useState<string>(
    String(Math.min(initialAyah + 9, surahAyahs.length || 10))
  );

  // Active Ayahs within range
  const activeAyahs = useMemo(() => {
    return surahAyahs.filter(
      (a) => a.ayahNumber >= rangeStart && a.ayahNumber <= rangeEnd
    );
  }, [surahAyahs, rangeStart, rangeEnd]);

  const [currentAyah, setCurrentAyah] = useState(initialAyah);
  const currentAyahData = useMemo(
    () => surahAyahs.find((a) => a.ayahNumber === currentAyah),
    [surahAyahs, currentAyah]
  );

  // Repetition & Audio Methodological Settings
  const [isPlaying, setIsPlaying] = useState(false);
  const [repeatTarget, setRepeatTarget] = useState<number>(3); // 1, 3, 5, 7, 10, -1 (continuous)
  const [currentRepeat, setCurrentRepeat] = useState<number>(1);
  const [autoAdvance, setAutoAdvance] = useState<boolean>(true); // Move to next verse after repeatTarget
  const [rangeLoop, setRangeLoop] = useState<boolean>(true); // Loop entire range when reaching end
  const [pauseDuration, setPauseDuration] = useState<number>(0); // 0s, 3s, 5s pause for student repetition
  const [isPauseWaiting, setIsPauseWaiting] = useState(false);
  const { selectedReciter, setSelectedReciter } = useApp();
  const [showReciterModal, setShowReciterModal] = useState(false);
  const [showRepeatSettingsModal, setShowRepeatSettingsModal] = useState(false);

  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Fill in the blanks state
  const [blankedWords, setBlankedWords] = useState<number[]>([]);
  const [optionsWords, setOptionsWords] = useState<string[]>([]);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});

  // Ordering state
  const [shuffledAyahs, setShuffledAyahs] = useState<number[]>([]);
  const [orderedAyahs, setOrderedAyahs] = useState<number[]>([]);

  // Voice Test state
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordedUri, setRecordedUri] = useState<string | null>(null);
  const [playingBack, setPlayingBack] = useState(false);
  const playbackSound = useRef<Audio.Sound | null>(null);

  // Results & Score
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  // Tasmi mode state
  const [tasmiRevealed, setTasmiRevealed] = useState<number[]>([]);
  const [tasmiCurrent, setTasmiCurrent] = useState(rangeStart);
  const [tasmiError, setTasmiError] = useState(false);
  const [tasmiCompleted, setTasmiCompleted] = useState(false);
  const [tasmiListening, setTasmiListening] = useState(false);
  const [tasmiTranscript, setTasmiTranscript] = useState('');
  const [tasmiPeekAyah, setTasmiPeekAyah] = useState<number | null>(null);
  const errorSound = useRef<Audio.Sound | null>(null);
  const tasmiCurrentRef = useRef(rangeStart);
  const tasmiRevealedRef = useRef<number[]>([]);

  // Play audio helper with selected reciter
  const playAyahAudio = useCallback(
    (ayahNum: number) => {
      const ayahObj = surahAyahs.find((a) => a.ayahNumber === ayahNum);
      if (!ayahObj) return;
      const reciterObj = RECITERS.find((r) => r.id === selectedReciter) || RECITERS[0];
      audioService.playAyah(ayahObj.id, reciterObj.baseUrl);
    },
    [surahAyahs, selectedReciter]
  );

  // Audio completion & repetition handler
  const handleAyahFinished = useCallback(() => {
    if (repeatTarget === -1 || currentRepeat < repeatTarget) {
      // Repeat same ayah
      const nextRep = currentRepeat + 1;
      setCurrentRepeat(nextRep);
      if (pauseDuration > 0) {
        setIsPauseWaiting(true);
        pauseTimerRef.current = setTimeout(() => {
          setIsPauseWaiting(false);
          playAyahAudio(currentAyah);
        }, pauseDuration * 1000);
      } else {
        playAyahAudio(currentAyah);
      }
    } else {
      // Completed target repetitions for this verse
      setCurrentRepeat(1);
      if (autoAdvance) {
        if (currentAyah < rangeEnd) {
          const nextAyah = currentAyah + 1;
          setCurrentAyah(nextAyah);
          if (pauseDuration > 0) {
            setIsPauseWaiting(true);
            pauseTimerRef.current = setTimeout(() => {
              setIsPauseWaiting(false);
              playAyahAudio(nextAyah);
            }, pauseDuration * 1000);
          } else {
            playAyahAudio(nextAyah);
          }
        } else if (rangeLoop) {
          // Loop back to rangeStart
          setCurrentAyah(rangeStart);
          if (pauseDuration > 0) {
            setIsPauseWaiting(true);
            pauseTimerRef.current = setTimeout(() => {
              setIsPauseWaiting(false);
              playAyahAudio(rangeStart);
            }, pauseDuration * 1000);
          } else {
            playAyahAudio(rangeStart);
          }
        } else {
          setIsPlaying(false);
        }
      } else {
        setIsPlaying(false);
      }
    }
  }, [
    repeatTarget,
    currentRepeat,
    pauseDuration,
    playAyahAudio,
    currentAyah,
    autoAdvance,
    rangeEnd,
    rangeLoop,
    rangeStart,
  ]);

  // Audio status callback
  useEffect(() => {
    audioService.setStatusCallback((status) => {
      setIsPlaying(status.isPlaying);
      if (status.didJustFinish) {
        if (mode === 'repetition') {
          handleAyahFinished();
        }
      }
    });

    return () => {
      audioService.stop();
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
      if (playbackSound.current) {
        playbackSound.current.unloadAsync();
      }
    };
  }, [mode, handleAyahFinished]);

  const handlePlay = async () => {
    if (!currentAyahData) return;
    if (isPlaying) {
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
      setIsPauseWaiting(false);
      await audioService.pause();
    } else {
      playAyahAudio(currentAyah);
    }
  };

  const WAQF_REGEX = /[\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06EDۛۚۖۗۘۙۜ۞۩]/g;

  // Intelligent Quran Word Parser:
  // Merges waqf / sajawand marks with preceding words so only real words are quizzed
  const parsedWords = useMemo(() => {
    if (!currentAyahData?.text) return [];
    const tokens = currentAyahData.text.split(/\s+/).filter(Boolean);
    const result: { raw: string; clean: string; isEligible: boolean }[] = [];

    for (const token of tokens) {
      // Check if this token is purely waqf mark(s)
      const letters = token.replace(WAQF_REGEX, '').trim();
      if (letters.length === 0) {
        // Pure waqf mark -> attach to the preceding word
        if (result.length > 0) {
          result[result.length - 1].raw += ' ' + token;
        }
      } else {
        const clean = letters;
        const arabicLetterCount = (clean.match(/[\u0621-\u064A]/g) || []).length;
        result.push({
          raw: token,
          clean,
          isEligible: arabicLetterCount >= 2,
        });
      }
    }
    return result;
  }, [currentAyahData]);

  const words = useMemo(() => {
    return parsedWords.map((p) => p.raw);
  }, [parsedWords]);

  const startFillBlank = useCallback(() => {
    if (!parsedWords || parsedWords.length === 0) return;
    const eligibleIndices = parsedWords
      .map((p, idx) => (p.isEligible ? idx : -1))
      .filter((idx) => idx !== -1);

    if (eligibleIndices.length === 0) return;

    // Pick between 1 and 3 blanks (around 20-25% of eligible words)
    const blanksCount = Math.min(
      Math.max(1, Math.floor(eligibleIndices.length * 0.25)),
      3,
      eligibleIndices.length
    );

    const shuffled = [...eligibleIndices].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, blanksCount).sort((a, b) => a - b);

    setBlankedWords(selected);
    const bank = selected.map((idx) => parsedWords[idx].clean).sort(() => Math.random() - 0.5);
    setOptionsWords(bank);
    setUserAnswers({});
    setShowResult(false);
    setMode('fill_blank');
  }, [parsedWords]);

  // Automatically refresh blanks and words bank whenever currentAyah changes in fill_blank mode
  useEffect(() => {
    if (mode === 'fill_blank') {
      startFillBlank();
    }
  }, [currentAyah, mode, startFillBlank]);

  const startOrdering = useCallback(() => {
    const pool = activeAyahs.length > 0 ? activeAyahs : surahAyahs;
    const targetAyahs = pool.slice(0, Math.min(5, pool.length)).map((a) => a.ayahNumber);
    const shuffled = [...targetAyahs].sort(() => Math.random() - 0.5);
    setShuffledAyahs(shuffled);
    setOrderedAyahs([]);
    setShowResult(false);
    setMode('ordering');
  }, [activeAyahs, surahAyahs]);

  const handleSelectAyah = (ayahNum: number) => {
    if (orderedAyahs.includes(ayahNum)) return;
    const newOrdered = [...orderedAyahs, ayahNum];
    setOrderedAyahs(newOrdered);

    if (newOrdered.length === shuffledAyahs.length) {
      const sortedTarget = [...shuffledAyahs].sort((a, b) => a - b);
      const isPerfect = newOrdered.every((num, idx) => num === sortedTarget[idx]);
      const matches = newOrdered.filter((num, idx) => num === sortedTarget[idx]).length;
      setScore(isPerfect ? 100 : Math.round((matches / newOrdered.length) * 100));
      setShowResult(true);
    }
  };

  const handleRemoveOrderedAyah = (indexToRemove: number) => {
    if (showResult) return;
    setOrderedAyahs((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const checkFillBlank = () => {
    const filledCount = Object.keys(userAnswers).filter((k) => !!userAnswers[Number(k)]).length;
    if (filledCount < blankedWords.length) {
      Alert.alert('تنبيه', 'يرجى ملء جميع الفراغات قبل التحقق من الإجابة');
      return;
    }

    const normalizeForComparison = (str: string) =>
      (str || '')
        .replace(/[\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06EDۛۚۖۗۘۙۜ۞۩]/g, '')
        .replace(/[إأآٱ]/g, 'ا')
        .replace(/ة/g, 'ه')
        .replace(/ى/g, 'ي')
        .trim();

    let correct = 0;
    blankedWords.forEach((idx) => {
      const userAns = userAnswers[idx] || '';
      const targetClean = parsedWords[idx]?.clean || '';
      if (
        userAns.trim() === targetClean.trim() ||
        normalizeForComparison(userAns) === normalizeForComparison(targetClean)
      ) {
        correct++;
      }
    });

    const accuracy = Math.round((correct / blankedWords.length) * 100);
    setScore(accuracy);
    setShowResult(true);
    recordPractice(surahId, currentAyah, accuracy);
  };

  const handleVoiceTest = async () => {
    if (isRecording && recording) {
      try {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setRecording(null);
        setIsRecording(false);
        if (uri) setRecordedUri(uri);
      } catch (e) {
        console.error('Error stopping recording:', e);
        setIsRecording(false);
        setRecording(null);
      }
    } else {
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

  // Muqatta'at phonetics lookup map
  const MUQATTAAT_MAP: Record<string, string[]> = {
    'الم': ['الف لام ميم', 'الم'],
    'المص': ['الف لام ميم صاد', 'المص'],
    'الر': ['الف لام را', 'الف لام ر', 'الر'],
    'المر': ['الف لام ميم را', 'الف لام ميم ر', 'المر'],
    'كهيعص': ['كاف ها يا عين صاد', 'كهيعص'],
    'طه': ['طا ها', 'طه'],
    'طسم': ['طا سين ميم', 'طسم'],
    'طس': ['طا سين', 'طس'],
    'يس': ['يا سين', 'يس'],
    'ص': ['صاد', 'ص'],
    'حم': ['حا ميم', 'حم'],
    'عسق': ['عين سين قاف', 'عسق'],
    'ق': ['قاف', 'ق'],
    'ن': ['نون', 'ن'],
  };

  // Tasmi Mode Handlers
  const stripDiacritics = (text: string) => {
    return text
      .replace(/[\u0610-\u061A\u064B-\u065F\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED]/g, '')
      .replace(/وٰ/g, 'ا')
      .replace(/ىٰ/g, 'ا')
      .replace(/\u0670/g, 'ا')
      .replace(/الرحمان/g, 'الرحمن')
      .replace(/[ٱإأآءئؤ]/g, 'ا')
      .replace(/[ىي]/g, 'ي')
      .replace(/[ةه]/g, 'ه')
      .replace(/[\u0640]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const compareTexts = (recognized: string, original: string): number => {
    const normRec = stripDiacritics(recognized);
    const normOrig = stripDiacritics(original);
    if (!normOrig) return 0;

    // Check Muqatta'at phonetics
    if (MUQATTAAT_MAP[normOrig]) {
      for (const phrase of MUQATTAAT_MAP[normOrig]) {
        const normPhrase = stripDiacritics(phrase);
        if (normRec.includes(normPhrase) || normPhrase.includes(normRec)) {
          return 1.0;
        }
      }
    }

    const recWords = normRec.split(/\s+/).filter(Boolean);
    const origWords = normOrig.split(/\s+/).filter(Boolean);
    if (origWords.length === 0) return 0;

    let matches = 0;
    for (const w of origWords) {
      const wNoWaw = w.startsWith('و') && w.length > 2 ? w.slice(1) : w;
      const found = recWords.some((rw) => {
        const rwNoWaw = rw.startsWith('و') && rw.length > 2 ? rw.slice(1) : rw;
        return (
          rw === w ||
          rwNoWaw === wNoWaw ||
          (w.length > 3 && rw.includes(w)) ||
          (rw.length > 3 && w.includes(rw))
        );
      });
      if (found) matches++;
    }
    return matches / origWords.length;
  };

  const startTasmi = useCallback(() => {
    setTasmiRevealed([]);
    tasmiRevealedRef.current = [];
    setTasmiCurrent(rangeStart);
    tasmiCurrentRef.current = rangeStart;
    setTasmiError(false);
    setTasmiCompleted(false);
    setTasmiListening(false);
    setTasmiTranscript('');
    setShowResult(false);
    setMode('tasmi');
  }, [rangeStart]);

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

    if (cur >= rangeEnd) {
      setTasmiCompleted(true);
      const totalInRange = activeAyahs.length || 1;
      const accuracy = Math.round((newRevealed.length / totalInRange) * 100);
      setScore(accuracy);
      setShowResult(true);
      recordPractice(surahId, rangeStart, accuracy);
    } else {
      setTasmiCurrent(cur + 1);
      tasmiCurrentRef.current = cur + 1;
    }
    setTasmiListening(false);
  }, [rangeEnd, activeAyahs.length, surahId, rangeStart, recordPractice]);

  const handleTasmiWrongAuto = useCallback(async () => {
    setTasmiError(true);
    setTasmiListening(false);
    setTasmiTranscript('');
    await playErrorBeep();
  }, []);

  useSpeechRecognitionEvent('result', (event) => {
    const transcript = event.results[0]?.transcript || '';
    setTasmiTranscript(transcript);
    const cur = tasmiCurrentRef.current;
    const currentAyahText = surahAyahs.find((a) => a.ayahNumber === cur)?.text || '';
    const similarity = compareTexts(transcript, currentAyahText);

    if (similarity >= 0.40) {
      handleTasmiCorrectAuto();
      return;
    }

    if (event.isFinal) {
      if (similarity >= 0.30) {
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
      await audioService.stop();
      setTasmiTranscript('');
      setTasmiError(false);
      setTasmiListening(true);

      const cur = tasmiCurrentRef.current;
      const ayahText = surahAyahs.find((a) => a.ayahNumber === cur)?.text || '';
      const hints = stripDiacritics(ayahText).split(/\s+/).filter(Boolean);

      ExpoSpeechRecognitionModule.start({
        lang: 'ar-SA',
        interimResults: true,
        continuous: true,
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
    playAyahAudio(tasmiCurrent);
  };

  // Range Modal Apply
  const applyRange = () => {
    const s = parseInt(modalStart) || 1;
    const e = parseInt(modalEnd) || surahAyahs.length;
    const validStart = Math.max(1, Math.min(s, surahAyahs.length));
    const validEnd = Math.max(validStart, Math.min(e, surahAyahs.length));

    setRangeStart(validStart);
    setRangeEnd(validEnd);
    if (currentAyah < validStart || currentAyah > validEnd) {
      setCurrentAyah(validStart);
    }
    setCurrentRepeat(1);
    setShowRangeModal(false);
  };

  const modes = [
    { id: 'repetition' as Mode, title: 'التكرار المنهجي', icon: 'repeat' as const, color: '#3498DB' },
    { id: 'tasmi' as Mode, title: 'التسميع الذكي', icon: 'eye-off' as const, color: '#16A085' },
    { id: 'fill_blank' as Mode, title: 'إكمال الفراغات', icon: 'text' as const, color: '#E67E22' },
    { id: 'ordering' as Mode, title: 'ترتيب الآيات', icon: 'swap-vertical' as const, color: '#9B59B6' },
    { id: 'voice_test' as Mode, title: 'تسجيل التلاوة', icon: 'mic' as const, color: '#E74C3C' },
  ];

  if (!surahMeta) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header title="خطأ" showBack />
      </View>
    );
  }

  const activeReciterObj = RECITERS.find((r) => r.id === selectedReciter) || RECITERS[0];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title={`تحفيظ ${surahMeta.name}`}
        subtitle={`الآيات ${toArabicDigits(rangeStart)} إلى ${toArabicDigits(rangeEnd)}`}
        showBack
      />

      {/* Top Range & Reciter Quick Selector Toolbar */}
      <View style={[styles.rangeBarContainer, { backgroundColor: colors.surface, borderBottomColor: colors.borderLight }]}>
        {/* Range Button */}
        <TouchableOpacity
          style={[styles.rangeBadge, { backgroundColor: colors.primaryLight, borderColor: colors.primary }]}
          onPress={() => {
            setModalStart(String(rangeStart));
            setModalEnd(String(rangeEnd));
            setShowRangeModal(true);
          }}
          activeOpacity={0.7}
        >
          <Ionicons name="git-branch-outline" size={16} color={colors.primary} />
          <Text style={[styles.rangeBadgeText, { color: colors.primary }]}>
            نطاق الحفظ: {toArabicDigits(rangeStart)} إلى {toArabicDigits(rangeEnd)}
          </Text>
          <Ionicons name="create-outline" size={15} color={colors.primary} />
        </TouchableOpacity>

        {/* Reciter Button */}
        <TouchableOpacity
          style={[styles.reciterBadge, { backgroundColor: colors.secondaryLight, borderColor: colors.secondary }]}
          onPress={() => setShowReciterModal(true)}
          activeOpacity={0.7}
        >
          <Ionicons name="mic-outline" size={15} color={colors.secondary} />
          <Text style={[styles.reciterBadgeText, { color: colors.secondary }]} numberOfLines={1}>
            {activeReciterObj.name.split(' ')[0]} {activeReciterObj.name.split(' ')[1] || ''}
          </Text>
          <Ionicons name="chevron-down" size={14} color={colors.secondary} />
        </TouchableOpacity>
      </View>

      {/* Mode Selector Tabs */}
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
            <Ionicons name={m.icon} size={16} color={mode === m.id ? '#FFF' : colors.textSecondary} />
            <Text
              style={[
                styles.modeBtnText,
                { color: mode === m.id ? '#FFF' : colors.textSecondary, fontWeight: mode === m.id ? '700' : '500' },
              ]}
              numberOfLines={1}
            >
              {m.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* ======================================================== */}
        {/* 1. REPETITION MODE (التكرار المنهجي)                      */}
        {/* ======================================================== */}
        {mode === 'repetition' && currentAyahData && (
          <View>
            {/* Repetition Settings Ribbon */}
            <View style={[styles.repeatSettingsCard, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
              {/* Repetition count picker */}
              <View style={styles.repeatSettingRow}>
                <Text style={[styles.settingLabel, { color: colors.textSecondary }]}>تكرار كل آية:</Text>
                <View style={styles.repeatCountChips}>
                  {[1, 3, 5, 7, 10, -1].map((count) => (
                    <TouchableOpacity
                      key={count}
                      style={[
                        styles.countChip,
                        repeatTarget === count
                          ? { backgroundColor: colors.primary, borderColor: colors.primary }
                          : { backgroundColor: colors.surfaceVariant, borderColor: colors.borderLight },
                      ]}
                      onPress={() => {
                        setRepeatTarget(count);
                        setCurrentRepeat(1);
                      }}
                    >
                      <Text
                        style={[
                          styles.countChipText,
                          { color: repeatTarget === count ? '#FFF' : colors.text },
                        ]}
                      >
                        {count === -1 ? 'مستمر' : `${toArabicDigits(count)}x`}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Pause delay for student repetition */}
              <View style={styles.repeatSettingRow}>
                <Text style={[styles.settingLabel, { color: colors.textSecondary }]}>فترة الترديد:</Text>
                <View style={styles.repeatCountChips}>
                  {[
                    { label: 'بدون توقف', val: 0 },
                    { label: '٣ ثوانٍ', val: 3 },
                    { label: '٥ ثوانٍ', val: 5 },
                  ].map((item) => (
                    <TouchableOpacity
                      key={item.val}
                      style={[
                        styles.pauseChip,
                        pauseDuration === item.val
                          ? { backgroundColor: colors.secondary, borderColor: colors.secondary }
                          : { backgroundColor: colors.surfaceVariant, borderColor: colors.borderLight },
                      ]}
                      onPress={() => setPauseDuration(item.val)}
                    >
                      <Text
                        style={[
                          styles.pauseChipText,
                          { color: pauseDuration === item.val ? '#FFF' : colors.text },
                        ]}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Toggles: Auto Advance & Range Loop */}
              <View style={styles.togglesRow}>
                <TouchableOpacity
                  style={[
                    styles.togglePill,
                    autoAdvance ? { backgroundColor: colors.primaryLight, borderColor: colors.primary } : { backgroundColor: colors.surfaceVariant, borderColor: colors.borderLight },
                  ]}
                  onPress={() => setAutoAdvance(!autoAdvance)}
                >
                  <Ionicons name={autoAdvance ? 'checkmark-circle' : 'ellipse-outline'} size={16} color={autoAdvance ? colors.primary : colors.textLight} />
                  <Text style={[styles.toggleText, { color: autoAdvance ? colors.primary : colors.textSecondary }]}>
                    انتقال تتابعي للآيات
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.togglePill,
                    rangeLoop ? { backgroundColor: colors.secondaryLight, borderColor: colors.secondary } : { backgroundColor: colors.surfaceVariant, borderColor: colors.borderLight },
                  ]}
                  onPress={() => setRangeLoop(!rangeLoop)}
                >
                  <Ionicons name={rangeLoop ? 'refresh-circle' : 'ellipse-outline'} size={16} color={rangeLoop ? colors.secondary : colors.textLight} />
                  <Text style={[styles.toggleText, { color: rangeLoop ? colors.secondary : colors.textSecondary }]}>
                    تكرار المقطع كاملاً
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Ayah Display Card */}
            <View style={[styles.ayahDisplay, { backgroundColor: colors.surface }, Shadows.md]}>
              {/* Progress counter badge */}
              <View style={styles.ayahHeaderRow}>
                <View style={[styles.ayahNumBadge, { backgroundColor: colors.primaryLight }]}>
                  <Text style={[styles.ayahNumBadgeText, { color: colors.primary }]}>
                    الآية {toArabicDigits(currentAyah)} من {toArabicDigits(surahAyahs.length)}
                  </Text>
                </View>

                {isPlaying && (
                  <View style={[styles.repeatProgressBadge, { backgroundColor: isPauseWaiting ? colors.warningLight : colors.successLight }]}>
                    <Ionicons
                      name={isPauseWaiting ? 'time-outline' : 'repeat'}
                      size={14}
                      color={isPauseWaiting ? colors.warning : colors.success}
                    />
                    <Text
                      style={[
                        styles.repeatProgressText,
                        { color: isPauseWaiting ? colors.warning : colors.success },
                      ]}
                    >
                      {isPauseWaiting ? 'ردد الآن...' : `التكرار ${toArabicDigits(currentRepeat)} من ${repeatTarget === -1 ? '∞' : toArabicDigits(repeatTarget)}`}
                    </Text>
                  </View>
                )}
              </View>

              <Text style={[styles.ayahText, { color: colors.text }]}>{currentAyahData.text}</Text>

              {/* Main Play Controls */}
              <View style={styles.ayahControls}>
                <TouchableOpacity
                  style={[styles.controlBtn, { backgroundColor: isPlaying ? colors.primary : colors.primaryLight }]}
                  onPress={handlePlay}
                >
                  <Ionicons name={isPlaying ? 'pause' : 'play'} size={32} color={isPlaying ? '#FFF' : colors.primary} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Mutashabihat (Similar Verses) */}
            {(() => {
              const ayahKey = `${surahId}:${currentAyah}`;
              const similar = srmdnLookup[ayahKey];
              if (!similar || similar.length === 0) return null;
              const [sSim, aSim] = similar[0].ayah.split(':');
              const surahSim = surahsMetadata.find((s) => s.id === parseInt(sSim));
              return (
                <TouchableOpacity
                  style={[styles.similarCard, { backgroundColor: '#16A085' + '12', borderColor: '#16A085' + '40' }]}
                  activeOpacity={0.7}
                  onPress={() => {
                    Alert.alert(
                      'آية متشابهة',
                      `سورة ${surahSim?.name || sSim} - الآية ${aSim}\n\n${(similar[0] as any).note || similar[0].noteAr || ''}`
                    );
                  }}
                >
                  <Ionicons name="git-compare" size={18} color="#16A085" />
                  <Text style={styles.similarText}>
                    آية متشابهة: سورة {surahSim?.name || sSim} - آية {toArabicDigits(parseInt(aSim))}
                  </Text>
                  <Ionicons name="information-circle" size={18} color="#16A085" />
                </TouchableOpacity>
              );
            })()}

            {/* Stepper Navigation across active range */}
            <View style={styles.ayahNav}>
              {/* Next Ayah (Right button in RTL) */}
              <TouchableOpacity
                style={[
                  styles.navBtn,
                  { backgroundColor: colors.primary, opacity: currentAyah >= rangeEnd ? 0.4 : 1 },
                ]}
                onPress={() => {
                  const next = Math.min(rangeEnd, currentAyah + 1);
                  setCurrentAyah(next);
                  setCurrentRepeat(1);
                  addRecord({ surahId, ayahStart: currentAyah, ayahEnd: currentAyah, level: 1 });
                  if (isPlaying) playAyahAudio(next);
                }}
                disabled={currentAyah >= rangeEnd}
              >
                <Ionicons name="arrow-forward" size={18} color="#FFF" />
                <Text style={styles.navBtnText}>التالية</Text>
              </TouchableOpacity>

              <Text style={[styles.rangeStepText, { color: colors.textSecondary }]}>
                {toArabicDigits(currentAyah)} / {toArabicDigits(rangeEnd)}
              </Text>

              {/* Previous Ayah (Left button in RTL) */}
              <TouchableOpacity
                style={[
                  styles.navBtn,
                  { backgroundColor: colors.primary, opacity: currentAyah <= rangeStart ? 0.4 : 1 },
                ]}
                onPress={() => {
                  const prev = Math.max(rangeStart, currentAyah - 1);
                  setCurrentAyah(prev);
                  setCurrentRepeat(1);
                  if (isPlaying) playAyahAudio(prev);
                }}
                disabled={currentAyah <= rangeStart}
              >
                <Text style={styles.navBtnText}>السابقة</Text>
                <Ionicons name="arrow-back" size={18} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* ======================================================== */}
        {/* 2. TASMI MODE (التسميع الذكي بالذكاء الاصطناعي)             */}
        {/* ======================================================== */}
        {mode === 'tasmi' && !showResult && (
          <View style={styles.tasmiContainer}>
            {/* Instructions */}
            <View style={[styles.tasmiInstructions, { backgroundColor: colors.primaryLight, borderColor: colors.primary }]}>
              <Ionicons name="mic" size={24} color={colors.primary} />
              <Text style={[styles.tasmiInstructionText, { color: colors.text }]}>
                اقرأ آيات النطاق المحدد ({toArabicDigits(rangeStart)} - {toArabicDigits(rangeEnd)}). الآية الصحيحة تنكشف تلقائياً، ويمكنك الاستماع للصواب أو الكشف المؤقت إذا تعسّر التذكر.
              </Text>
            </View>

            {/* Progress */}
            <View style={styles.tasmiProgress}>
              <View style={[styles.tasmiProgressBg, { backgroundColor: colors.borderLight }]}>
                <View
                  style={[
                    styles.tasmiProgressFill,
                    {
                      width: `${activeAyahs.length > 0 ? (tasmiRevealed.length / activeAyahs.length) * 100 : 0}%`,
                      backgroundColor: colors.primary,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.tasmiProgressText, { color: colors.textSecondary }]}>
                تم تسميع {toArabicDigits(tasmiRevealed.length)} من {toArabicDigits(activeAyahs.length)} آيات
              </Text>
            </View>

            {/* Ayahs list in active range */}
            {activeAyahs.map((ayah) => {
              const isRevealed = tasmiRevealed.includes(ayah.ayahNumber);
              const isCurrent = ayah.ayahNumber === tasmiCurrent;
              const isPeeking = tasmiPeekAyah === ayah.ayahNumber;

              return (
                <View
                  key={ayah.ayahNumber}
                  style={[
                    styles.tasmiAyah,
                    {
                      backgroundColor: isRevealed
                        ? colors.successLight
                        : isCurrent
                        ? tasmiError
                          ? colors.errorLight
                          : tasmiListening
                          ? '#FFF8E1'
                          : colors.secondaryLight
                        : colors.surface,
                      borderColor: isRevealed
                        ? colors.success
                        : isCurrent
                        ? tasmiError
                          ? colors.error
                          : colors.secondary
                        : colors.borderLight,
                    },
                    Shadows.sm,
                  ]}
                >
                  <View
                    style={[
                      styles.tasmiAyahNumber,
                      {
                        backgroundColor: isRevealed
                          ? colors.success
                          : isCurrent
                          ? tasmiListening
                            ? colors.error
                            : colors.secondary
                          : colors.primaryLight,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.tasmiAyahNumberText,
                        { color: isRevealed || isCurrent ? '#FFF' : colors.primary },
                      ]}
                    >
                      {toArabicDigits(ayah.ayahNumber)}
                    </Text>
                  </View>

                  <View style={styles.tasmiAyahContent}>
                    {isRevealed || isPeeking ? (
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

                        {tasmiListening && tasmiTranscript ? (
                          <Text style={[styles.tasmiLiveText, { color: colors.textSecondary }]}>
                            {tasmiTranscript}...
                          </Text>
                        ) : !tasmiListening && (
                          <Text style={[styles.tasmiHiddenText, { color: colors.textLight }]}>
                            ﴿ اقرأ الآية {toArabicDigits(ayah.ayahNumber)} بصوتك ﴾
                          </Text>
                        )}

                        <View style={styles.tasmiActionRow}>
                          {!tasmiListening ? (
                            <TouchableOpacity
                              style={[styles.tasmiMicBtn, { backgroundColor: colors.secondary }]}
                              onPress={startTasmiListening}
                            >
                              <Ionicons name="mic" size={28} color="#FFF" />
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              style={[styles.tasmiMicBtn, { backgroundColor: colors.error }]}
                              onPress={stopTasmiListening}
                            >
                              <Ionicons name="stop" size={28} color="#FFF" />
                            </TouchableOpacity>
                          )}

                          {/* Manual confirmation / override */}
                          <TouchableOpacity
                            style={[styles.tasmiBtn, { backgroundColor: colors.successLight, borderColor: colors.success }]}
                            onPress={() => handleTasmiCorrectAuto()}
                          >
                            <Ionicons name="checkmark-done" size={20} color={colors.success} />
                            <Text style={[styles.tasmiBtnText, { color: colors.success, fontWeight: 'bold' }]}>صحيحة (أجزت نفسي)</Text>
                          </TouchableOpacity>

                          {/* Listen to correct reciter */}
                          <TouchableOpacity
                            style={[styles.tasmiBtn, { backgroundColor: colors.primaryLight, borderColor: colors.primary }]}
                            onPress={handleTasmiListenCorrect}
                          >
                            <Ionicons name="volume-high" size={20} color={colors.primary} />
                            <Text style={[styles.tasmiBtnText, { color: colors.primary }]}>استمع للشيخ</Text>
                          </TouchableOpacity>

                          {/* Peek temporarily for 3 seconds */}
                          <TouchableOpacity
                            style={[styles.tasmiBtn, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}
                            onPress={() => {
                              setTasmiPeekAyah(ayah.ayahNumber);
                              setTimeout(() => setTasmiPeekAyah(null), 3000);
                            }}
                          >
                            <Ionicons name="eye-outline" size={18} color={colors.textSecondary} />
                            <Text style={[styles.tasmiBtnText, { color: colors.textSecondary }]}>كشف مؤقت</Text>
                          </TouchableOpacity>
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
                        <Ionicons name="eye-off-outline" size={18} color={colors.textLight} />
                        <Text style={[styles.tasmiHiddenLabel, { color: colors.textLight }]}>آية مخفية</Text>
                      </View>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {/* ======================================================== */}
        {/* 3. FILL IN THE BLANK MODE (إكمال الفراغات)                 */}
        {/* ======================================================== */}
        {mode === 'fill_blank' && currentAyahData && (
          <View style={[styles.fillBlankContainer, { backgroundColor: colors.surface }, Shadows.md]}>
            <View style={styles.fillBlankHeader}>
              <Text style={[styles.fillTitle, { color: colors.secondary }]}>
                أكمل الكلمات الناقصة في الآية {toArabicDigits(currentAyah)}:
              </Text>
              <View style={styles.miniStepper}>
                <TouchableOpacity
                  style={[styles.miniStepBtn, { opacity: currentAyah <= rangeStart ? 0.4 : 1 }]}
                  disabled={currentAyah <= rangeStart}
                  onPress={() => {
                    setCurrentAyah((prev) => Math.max(rangeStart, prev - 1));
                  }}
                >
                  <Ionicons name="chevron-forward" size={18} color={colors.primary} />
                </TouchableOpacity>
                <Text style={[styles.miniStepText, { color: colors.primary }]}>
                  {toArabicDigits(currentAyah)} / {toArabicDigits(rangeEnd)}
                </Text>
                <TouchableOpacity
                  style={[styles.miniStepBtn, { opacity: currentAyah >= rangeEnd ? 0.4 : 1 }]}
                  disabled={currentAyah >= rangeEnd}
                  onPress={() => {
                    setCurrentAyah((prev) => Math.min(rangeEnd, prev + 1));
                  }}
                >
                  <Ionicons name="chevron-back" size={18} color={colors.primary} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.wordsContainer}>
              {parsedWords.map((item, index) => {
                const isBlank = blankedWords.includes(index);
                const userAns = userAnswers[index];
                const isCorrect =
                  userAns &&
                  (userAns.trim() === item.clean.trim() ||
                    userAns.replace(/[\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06ED]/g, '') ===
                      item.clean.replace(/[\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06ED]/g, ''));

                return (
                  <View key={index} style={styles.wordWrapper}>
                    {isBlank ? (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={[
                          styles.blankWord,
                          {
                            borderColor: showResult
                              ? isCorrect
                                ? colors.success
                                : colors.error
                              : userAns
                              ? colors.primary
                              : colors.secondary,
                            backgroundColor: showResult
                              ? isCorrect
                                ? colors.successLight
                                : colors.errorLight
                              : userAns
                              ? colors.primaryLight
                              : colors.secondaryLight,
                          },
                        ]}
                        onPress={() => {
                          if (!showResult && userAns) {
                            setUserAnswers((prev) => {
                              const copy = { ...prev };
                              delete copy[index];
                              return copy;
                            });
                          }
                        }}
                      >
                        <Text
                          style={[
                            styles.blankText,
                            {
                              color: showResult
                                ? isCorrect
                                  ? colors.success
                                  : colors.error
                                : colors.primary,
                            },
                          ]}
                        >
                          {showResult
                            ? isCorrect
                              ? item.clean
                              : `${userAns || '؟'} ✘ (${item.clean})`
                            : userAns || ' ___ '}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <Text style={[styles.visibleWord, { color: colors.text }]}>{item.raw}</Text>
                    )}
                  </View>
                );
              })}
            </View>

            {/* Word Bank for filling blanks */}
            {!showResult && optionsWords.length > 0 && (
              <View style={[styles.wordBankCard, { backgroundColor: colors.surfaceVariant, borderColor: colors.borderLight }]}>
                <Text style={[styles.wordBankTitle, { color: colors.textSecondary }]}>
                  بنك الكلمات (اضغط على الكلمة لملء الفراغ):
                </Text>
                <View style={styles.wordBankChips}>
                  {optionsWords.map((optWord, optIdx) => {
                    const timesUsed = Object.values(userAnswers).filter((w) => w === optWord).length;
                    const timesInBlanks = blankedWords.filter(
                      (idx) => parsedWords[idx]?.clean === optWord
                    ).length;
                    const isAllUsed = timesUsed >= timesInBlanks;

                    return (
                      <TouchableOpacity
                        key={optIdx}
                        style={[
                          styles.wordBankChip,
                          {
                            backgroundColor: isAllUsed ? colors.surface : colors.primaryLight,
                            borderColor: isAllUsed ? colors.borderLight : colors.primary,
                            opacity: isAllUsed ? 0.35 : 1,
                          },
                        ]}
                        disabled={isAllUsed}
                        onPress={() => {
                          const nextBlank = blankedWords.find((idx) => !userAnswers[idx]);
                          if (nextBlank !== undefined) {
                            setUserAnswers((prev) => ({ ...prev, [nextBlank]: optWord }));
                          }
                        }}
                      >
                        <Text
                          style={[
                            styles.wordBankChipText,
                            { color: isAllUsed ? colors.textLight : colors.primary },
                          ]}
                        >
                          {optWord}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}

            {!showResult && (
              <TouchableOpacity
                style={[
                  styles.checkBtn,
                  {
                    backgroundColor:
                      blankedWords.length > 0 &&
                      Object.keys(userAnswers).filter((k) => !!userAnswers[Number(k)]).length ===
                        blankedWords.length
                        ? colors.secondary
                        : colors.surfaceVariant,
                    borderWidth: 1,
                    borderColor:
                      blankedWords.length > 0 &&
                      Object.keys(userAnswers).filter((k) => !!userAnswers[Number(k)]).length ===
                        blankedWords.length
                        ? colors.secondary
                        : colors.borderLight,
                  },
                ]}
                disabled={
                  !(
                    blankedWords.length > 0 &&
                    Object.keys(userAnswers).filter((k) => !!userAnswers[Number(k)]).length ===
                      blankedWords.length
                  )
                }
                onPress={checkFillBlank}
              >
                <Text
                  style={[
                    styles.checkBtnText,
                    {
                      color:
                        blankedWords.length > 0 &&
                        Object.keys(userAnswers).filter((k) => !!userAnswers[Number(k)]).length ===
                          blankedWords.length
                          ? '#FFF'
                          : colors.textLight,
                    },
                  ]}
                >
                  {blankedWords.length > 0 &&
                  Object.keys(userAnswers).filter((k) => !!userAnswers[Number(k)]).length ===
                    blankedWords.length
                    ? 'تحقق من الإجابة'
                    : `يرجى ملء جميع الفراغات (${
                        Object.keys(userAnswers).filter((k) => !!userAnswers[Number(k)]).length
                      } / ${blankedWords.length})`}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* ======================================================== */}
        {/* 4. ORDERING MODE (ترتيب الآيات)                            */}
        {/* ======================================================== */}
        {mode === 'ordering' && (
          <View>
            <Text style={[styles.orderTitle, { color: colors.text }]}>
              رتب آيات النطاق بالتسلسل القرآني الصحيح:
            </Text>

            <View style={styles.orderedList}>
              {orderedAyahs.map((num, idx) => {
                const ayah = surahAyahs.find((a) => a.ayahNumber === num);
                const sortedPool = [...shuffledAyahs].sort((a, b) => a - b);
                const isCorrect = num === sortedPool[idx];
                return (
                  <TouchableOpacity
                    key={idx}
                    activeOpacity={0.7}
                    disabled={showResult}
                    onPress={() => handleRemoveOrderedAyah(idx)}
                    style={[
                      styles.orderedItem,
                      {
                        backgroundColor: showResult
                          ? isCorrect
                            ? colors.successLight
                            : colors.errorLight
                          : colors.primaryLight,
                        borderColor: showResult
                          ? isCorrect
                            ? colors.success
                            : colors.error
                          : colors.primary,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.orderedNumber,
                        { color: showResult ? (isCorrect ? colors.success : colors.error) : colors.primary },
                      ]}
                    >
                      {toArabicDigits(idx + 1)}
                    </Text>
                    <Text style={[styles.orderedText, { color: colors.text }]} numberOfLines={3}>
                      {ayah?.text || ''}
                    </Text>
                    {!showResult && (
                      <Ionicons name="close-circle-outline" size={20} color={colors.textLight} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={[styles.orderInstruction, { color: colors.textSecondary }]}>
              اضغط على الآية لإضافتها إلى الترتيب:
            </Text>

            {shuffledAyahs
              .filter((n) => !orderedAyahs.includes(n))
              .map((num) => {
                const ayah = surahAyahs.find((a) => a.ayahNumber === num);
                return (
                  <TouchableOpacity
                    key={num}
                    style={[styles.shuffledItem, { backgroundColor: colors.surface, borderColor: colors.border }, Shadows.sm]}
                    onPress={() => handleSelectAyah(num)}
                  >
                    <Text style={[styles.shuffledText, { color: colors.text }]} numberOfLines={3}>
                      {ayah?.text || ''}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </View>
        )}

        {/* ======================================================== */}
        {/* 5. VOICE TEST (تسجيل التلاوة والمقارنة)                   */}
        {/* ======================================================== */}
        {mode === 'voice_test' && currentAyahData && (
          <View style={styles.voiceContainer}>
            <View style={[styles.ayahDisplay, { backgroundColor: colors.surface }, Shadows.md]}>
              <Text style={[styles.voiceInstruction, { color: colors.textSecondary }]}>
                اقرأ الآية {toArabicDigits(currentAyah)} بصوتك ثم استمع وقارنها بتلاوة الشيخ:
              </Text>
              <Text style={[styles.ayahText, { color: colors.text }]}>{currentAyahData.text}</Text>
            </View>

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
                      {playingBack ? 'جاري التشغيل...' : 'استمع لتسجيلك'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.playbackBtn, { backgroundColor: colors.secondaryLight }]}
                    onPress={() => playAyahAudio(currentAyah)}
                  >
                    <Ionicons name="volume-high" size={24} color={colors.secondary} />
                    <Text style={[styles.playbackBtnText, { color: colors.secondary }]}>استمع للشيخ</Text>
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

            {/* Stepper Navigation */}
            <View style={styles.ayahNav}>
              {/* Next Ayah (Right button in RTL) */}
              <TouchableOpacity
                style={[styles.navBtn, { backgroundColor: colors.primary, opacity: currentAyah >= rangeEnd ? 0.4 : 1 }]}
                disabled={currentAyah >= rangeEnd}
                onPress={() => {
                  setCurrentAyah(currentAyah + 1);
                  setRecordedUri(null);
                  setShowResult(false);
                }}
              >
                <Ionicons name="arrow-forward" size={18} color="#FFF" />
                <Text style={styles.navBtnText}>التالية</Text>
              </TouchableOpacity>

              <Text style={[styles.rangeStepText, { color: colors.textSecondary }]}>
                الآية {toArabicDigits(currentAyah)} من {toArabicDigits(rangeEnd)}
              </Text>

              {/* Previous Ayah (Left button in RTL) */}
              <TouchableOpacity
                style={[styles.navBtn, { backgroundColor: colors.primary, opacity: currentAyah <= rangeStart ? 0.4 : 1 }]}
                disabled={currentAyah <= rangeStart}
                onPress={() => {
                  setCurrentAyah(currentAyah - 1);
                  setRecordedUri(null);
                  setShowResult(false);
                }}
              >
                <Text style={styles.navBtnText}>السابقة</Text>
                <Ionicons name="arrow-back" size={18} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Score & Results Card */}
        {showResult && (
          <View
            style={[
              styles.scoreCard,
              {
                backgroundColor: score >= 80 ? colors.successLight : score >= 50 ? colors.warningLight : colors.errorLight,
                borderColor: score >= 80 ? colors.success : score >= 50 ? colors.warning : colors.error,
              },
            ]}
          >
            <Ionicons
              name={score >= 80 ? 'trophy' : score >= 50 ? 'thumbs-up' : 'alert-circle'}
              size={48}
              color={score >= 80 ? colors.success : score >= 50 ? colors.warning : colors.error}
            />
            <Text
              style={[
                styles.scoreNumber,
                { color: score >= 80 ? colors.success : score >= 50 ? colors.warning : colors.error },
              ]}
            >
              %{toArabicDigits(score)}
            </Text>
            <Text
              style={[
                styles.scoreLabel,
                { color: score >= 80 ? colors.success : score >= 50 ? colors.warning : colors.error },
              ]}
            >
              {score >= 80 ? 'أحسنت! حفظ متقن' : score >= 50 ? 'جيد، واصل التكرار' : 'تحتاج لمزيد من المراجعة'}
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
              <Text style={styles.retryBtnText}>إعادة التمرين</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* ======================================================== */}
      {/* RANGE SELECTOR MODAL (تحديد نطاق الآيات من / إلى)       */}
      {/* ======================================================== */}
      <Modal visible={showRangeModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: colors.background }]}>
            <View style={[styles.modalHeader, { borderBottomColor: colors.borderLight }]}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>تحديد نطاق الحفظ</Text>
              <TouchableOpacity onPress={() => setShowRangeModal(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <Text style={[styles.modalSubtitle, { color: colors.textSecondary }]}>
              اختر الآيات التي تريد التركيز على حفظها وتكرارها في سورة {surahMeta.name}:
            </Text>

            {/* Quick Presets */}
            <View style={styles.presetsContainer}>
              <TouchableOpacity
                style={[styles.presetChip, { backgroundColor: colors.primaryLight, borderColor: colors.primary }]}
                onPress={() => {
                  setModalStart('1');
                  setModalEnd(String(surahAyahs.length));
                }}
              >
                <Text style={[styles.presetChipText, { color: colors.primary }]}>
                  السورة كاملة (١ - {toArabicDigits(surahAyahs.length)})
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.presetChip, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}
                onPress={() => {
                  setModalStart('1');
                  setModalEnd(String(Math.min(5, surahAyahs.length)));
                }}
              >
                <Text style={[styles.presetChipText, { color: colors.text }]}>أول ٥ آيات</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.presetChip, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}
                onPress={() => {
                  setModalStart('1');
                  setModalEnd(String(Math.min(10, surahAyahs.length)));
                }}
              >
                <Text style={[styles.presetChipText, { color: colors.text }]}>أول ١٠ آيات</Text>
              </TouchableOpacity>

              {surahAyahs.length > 20 && (
                <TouchableOpacity
                  style={[styles.presetChip, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}
                  onPress={() => {
                    setModalStart('1');
                    setModalEnd('20');
                  }}
                >
                  <Text style={[styles.presetChipText, { color: colors.text }]}>الآيات ١ - ٢٠</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Stepper Inputs for Start and End */}
            <View style={styles.rangeInputsRow}>
              {/* Start Ayah */}
              <View style={[styles.rangeInputBox, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
                <Text style={[styles.rangeBoxLabel, { color: colors.textSecondary }]}>من الآية</Text>
                <View style={styles.stepperRow}>
                  <TouchableOpacity
                    style={styles.stepBtn}
                    onPress={() => {
                      const cur = parseInt(modalStart) || 1;
                      setModalStart(String(Math.max(1, cur - 1)));
                    }}
                  >
                    <Ionicons name="remove-circle-outline" size={26} color={colors.primary} />
                  </TouchableOpacity>
                  <TextInput
                    style={[styles.rangeTextInput, { color: colors.text, borderColor: colors.primary }]}
                    value={modalStart}
                    onChangeText={setModalStart}
                    keyboardType="number-pad"
                    textAlign="center"
                  />
                  <TouchableOpacity
                    style={styles.stepBtn}
                    onPress={() => {
                      const cur = parseInt(modalStart) || 1;
                      setModalStart(String(Math.min(surahAyahs.length, cur + 1)));
                    }}
                  >
                    <Ionicons name="add-circle-outline" size={26} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* End Ayah */}
              <View style={[styles.rangeInputBox, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
                <Text style={[styles.rangeBoxLabel, { color: colors.textSecondary }]}>إلى الآية</Text>
                <View style={styles.stepperRow}>
                  <TouchableOpacity
                    style={styles.stepBtn}
                    onPress={() => {
                      const cur = parseInt(modalEnd) || 1;
                      setModalEnd(String(Math.max(1, cur - 1)));
                    }}
                  >
                    <Ionicons name="remove-circle-outline" size={26} color={colors.primary} />
                  </TouchableOpacity>
                  <TextInput
                    style={[styles.rangeTextInput, { color: colors.text, borderColor: colors.primary }]}
                    value={modalEnd}
                    onChangeText={setModalEnd}
                    keyboardType="number-pad"
                    textAlign="center"
                  />
                  <TouchableOpacity
                    style={styles.stepBtn}
                    onPress={() => {
                      const cur = parseInt(modalEnd) || 1;
                      setModalEnd(String(Math.min(surahAyahs.length, cur + 1)));
                    }}
                  >
                    <Ionicons name="add-circle-outline" size={26} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Apply Button */}
            <TouchableOpacity style={[styles.applyBtn, { backgroundColor: colors.primary }]} onPress={applyRange}>
              <Ionicons name="checkmark-circle" size={20} color="#FFF" />
              <Text style={styles.applyBtnText}>تطبيق النطاق والبدء</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ======================================================== */}
      {/* RECITER SELECTOR MODAL (اختيار قارئ التحفيظ)              */}
      {/* ======================================================== */}
      <Modal visible={showReciterModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: colors.background }]}>
            <View style={[styles.modalHeader, { borderBottomColor: colors.borderLight }]}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>اختيار قارئ التحفيظ</Text>
              <TouchableOpacity onPress={() => setShowReciterModal(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={RECITERS}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const isSelected = selectedReciter === item.id;
                return (
                  <TouchableOpacity
                    style={[
                      styles.reciterItem,
                      {
                        backgroundColor: isSelected ? colors.primaryLight : colors.surface,
                        borderColor: isSelected ? colors.primary : colors.borderLight,
                      },
                    ]}
                    onPress={() => {
                      setSelectedReciter(item.id);
                      setShowReciterModal(false);
                      if (isPlaying) {
                        playAyahAudio(currentAyah);
                      }
                    }}
                  >
                    <View style={[styles.reciterIconWrap, { backgroundColor: isSelected ? colors.primary : colors.surfaceVariant }]}>
                      <Ionicons name="person" size={20} color={isSelected ? '#FFF' : colors.textSecondary} />
                    </View>
                    <Text style={[styles.reciterItemName, { color: isSelected ? colors.primary : colors.text }]}>
                      {item.name}
                    </Text>
                    {isSelected && <Ionicons name="checkmark-circle" size={22} color={colors.primary} />}
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
  rangeBarContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    gap: Spacing.sm,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rangeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    flex: 1,
  },
  rangeBadgeText: { fontSize: Fonts.sizes.xs, fontWeight: '700', flex: 1 },
  reciterBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  reciterBadgeText: { fontSize: Fonts.sizes.xs, fontWeight: '600' },
  modeSelector: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    gap: 4,
    justifyContent: 'space-between',
  },
  modeBtn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 2,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    gap: 3,
  },
  modeBtnText: { fontSize: 10, textAlign: 'center' },
  scrollContent: { paddingHorizontal: Spacing.md, paddingTop: Spacing.sm },

  // Repetition Settings Ribbon
  repeatSettingsCard: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.sm,
    marginBottom: Spacing.md,
    gap: Spacing.xs,
  },
  repeatSettingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLabel: { fontSize: Fonts.sizes.xs, fontWeight: '600' },
  repeatCountChips: { flexDirection: 'row', gap: 4 },
  countChip: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
  },
  countChipText: { fontSize: 11, fontWeight: '700' },
  pauseChip: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
  },
  pauseChipText: { fontSize: 11, fontWeight: '600' },
  togglesRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: 4,
  },
  togglePill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    justifyContent: 'center',
  },
  toggleText: { fontSize: 11, fontWeight: '600' },

  // Ayah Display
  ayahDisplay: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  ayahHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  ayahNumBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: BorderRadius.full,
  },
  ayahNumBadgeText: { fontSize: Fonts.sizes.xs, fontWeight: '700' },
  repeatProgressBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: BorderRadius.full,
  },
  repeatProgressText: { fontSize: Fonts.sizes.xs, fontWeight: '700' },
  ayahText: {
    fontFamily: Fonts.arabic.quran,
    fontSize: 30,
    textAlign: 'center',
    lineHeight: 58,
    writingDirection: 'rtl',
  },
  ayahControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.md,
  },
  controlBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Similar Verses
  similarCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  similarText: { flex: 1, fontSize: Fonts.sizes.xs, color: '#16A085', fontWeight: '600' },

  // Stepper Navigation
  ayahNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  navBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.full,
    gap: Spacing.xs,
  },
  navBtnText: { color: '#FFF', fontSize: Fonts.sizes.sm, fontWeight: '700' },
  rangeStepText: { fontSize: Fonts.sizes.sm, fontWeight: '700' },

  // Fill in blanks
  fillBlankContainer: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    gap: Spacing.md,
  },
  fillBlankHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fillTitle: { fontSize: Fonts.sizes.sm, fontWeight: '700', flex: 1 },
  miniStepper: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  miniStepBtn: { padding: 4 },
  miniStepText: { fontSize: Fonts.sizes.xs, fontWeight: '700' },
  wordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    direction: 'rtl',
    lineHeight: 40,
  },
  wordWrapper: { marginVertical: 4 },
  visibleWord: {
    fontFamily: Fonts.arabic.quran,
    fontSize: 26,
    lineHeight: 48,
  },
  blankWord: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  blankText: {
    fontFamily: Fonts.arabic.quran,
    fontSize: 24,
    fontWeight: '700',
  },
  checkBtn: {
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
  },
  checkBtnText: { color: '#FFF', fontSize: Fonts.sizes.md, fontWeight: '700' },

  // Word Bank
  wordBankCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginTop: Spacing.sm,
    gap: Spacing.sm,
  },
  wordBankTitle: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '600',
    textAlign: rtlText,
  },
  wordBankChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    justifyContent: 'center',
    direction: 'rtl',
  },
  wordBankChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  wordBankChipText: {
    fontFamily: Fonts.arabic.quran,
    fontSize: 20,
    fontWeight: '700',
  },

  // Ordering
  orderTitle: { fontSize: Fonts.sizes.md, fontWeight: '700', textAlign: 'center', marginBottom: Spacing.md },
  orderedList: { gap: Spacing.sm, marginBottom: Spacing.md },
  orderedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    gap: Spacing.md,
    direction: 'rtl',
  },
  orderedNumber: { fontSize: Fonts.sizes.lg, fontWeight: '800' },
  orderedText: {
    fontFamily: Fonts.arabic.quran,
    flex: 1,
    fontSize: 20,
    lineHeight: 38,
    textAlign: rtlText,
  },
  orderInstruction: { fontSize: Fonts.sizes.sm, textAlign: 'center', marginBottom: Spacing.sm },
  shuffledItem: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  shuffledText: {
    fontFamily: Fonts.arabic.quran,
    fontSize: 22,
    textAlign: 'center',
    lineHeight: 42,
  },

  // Voice Test
  voiceContainer: { alignItems: 'center', gap: Spacing.lg },
  voiceInstruction: { fontSize: Fonts.sizes.sm, textAlign: 'center', marginBottom: Spacing.sm },
  recordBtn: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  recordBtnText: { color: '#FFF', fontSize: Fonts.sizes.xs, fontWeight: '600' },
  recordingIndicator: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  recordingDot: { width: 10, height: 10, borderRadius: 5 },
  recordingText: { fontSize: Fonts.sizes.sm, fontWeight: '600' },
  playbackCard: {
    width: '100%',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    gap: Spacing.md,
  },
  playbackTitle: { fontSize: Fonts.sizes.md, fontWeight: '700' },
  playbackBtns: { flexDirection: 'row', gap: Spacing.md, width: '100%' },
  playbackBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  playbackBtnText: { fontSize: Fonts.sizes.xs, fontWeight: '600' },
  assessTitle: { fontSize: Fonts.sizes.sm, fontWeight: '700' },
  assessBtns: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs, justifyContent: 'center' },
  assessBtn: {
    paddingVertical: 6,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  assessBtnText: { fontSize: Fonts.sizes.xs, fontWeight: '600' },

  // Tasmi Mode
  tasmiContainer: { gap: Spacing.sm },
  tasmiInstructions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
  },
  tasmiInstructionText: { flex: 1, fontSize: Fonts.sizes.xs, lineHeight: 20 },
  tasmiProgress: { gap: 4 },
  tasmiProgressBg: { height: 6, borderRadius: 3 },
  tasmiProgressFill: { height: '100%', borderRadius: 3 },
  tasmiProgressText: { fontSize: Fonts.sizes.xs, textAlign: 'center' },
  tasmiAyah: {
    flexDirection: 'row',
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  tasmiAyahNumber: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  tasmiAyahNumberText: { fontSize: Fonts.sizes.md, fontWeight: '700' },
  tasmiAyahContent: { flex: 1, padding: Spacing.md, justifyContent: 'center' },
  tasmiAyahText: {
    fontFamily: Fonts.arabic.quran,
    fontSize: 24,
    lineHeight: 46,
    writingDirection: 'rtl',
    textAlign: rtlText,
  },
  tasmiCurrentArea: { gap: Spacing.sm },
  tasmiErrorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    padding: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  tasmiErrorText: { color: '#FFF', fontSize: Fonts.sizes.xs, fontWeight: '600' },
  tasmiHiddenText: { fontSize: Fonts.sizes.md, textAlign: 'center', fontWeight: '500' },
  tasmiLiveText: { fontSize: Fonts.sizes.sm, textAlign: 'center', lineHeight: 24, fontStyle: 'italic' },
  tasmiActionRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tasmiMicBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tasmiBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    gap: 4,
  },
  tasmiBtnText: { fontSize: Fonts.sizes.xs, fontWeight: '600' },
  tasmiListeningRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
  },
  tasmiListeningText: { fontSize: Fonts.sizes.xs, fontWeight: '600' },
  tasmiHidden: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.xs,
  },
  tasmiHiddenLabel: { fontSize: Fonts.sizes.xs },

  // Score Card
  scoreCard: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
    borderWidth: 1,
    gap: Spacing.xs,
    marginTop: Spacing.md,
  },
  scoreNumber: { fontSize: 40, fontWeight: '800' },
  scoreLabel: { fontSize: Fonts.sizes.md, fontWeight: '600' },
  retryBtn: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.full,
    marginTop: Spacing.sm,
  },
  retryBtnText: { color: '#FFF', fontSize: Fonts.sizes.sm, fontWeight: '700' },

  // Range Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  modalCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    gap: Spacing.md,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
  },
  modalTitle: { fontSize: Fonts.sizes.md, fontWeight: '700' },
  modalSubtitle: { fontSize: Fonts.sizes.xs, lineHeight: 18 },
  presetsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs },
  presetChip: {
    paddingVertical: 6,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  presetChipText: { fontSize: Fonts.sizes.xs, fontWeight: '600' },
  rangeInputsRow: { flexDirection: 'row', gap: Spacing.md },
  rangeInputBox: {
    flex: 1,
    padding: Spacing.sm,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  rangeBoxLabel: { fontSize: Fonts.sizes.xs, fontWeight: '600' },
  stepperRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs },
  stepBtn: { padding: 2 },
  rangeTextInput: {
    width: 50,
    height: 36,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    fontSize: Fonts.sizes.md,
    fontWeight: '700',
  },
  applyBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: Spacing.xs,
    marginTop: Spacing.xs,
  },
  applyBtnText: { color: '#FFF', fontSize: Fonts.sizes.sm, fontWeight: '700' },

  // Reciter Modal
  reciterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.sm,
    gap: Spacing.md,
  },
  reciterIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reciterItemName: { flex: 1, fontSize: Fonts.sizes.sm, fontWeight: '600' },
});
