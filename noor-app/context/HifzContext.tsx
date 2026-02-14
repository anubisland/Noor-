import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface HifzRecord {
  surahId: number;
  ayahStart: number;
  ayahEnd: number;
  level: number;        // 1-5 mastery level
  lastReview: number;   // timestamp
  nextReview: number;   // timestamp (spaced repetition)
  totalReviews: number;
  mistakes: number;
}

interface HifzStats {
  totalVerses: number;
  totalSurahs: number;
  streakDays: number;
  lastPractice: number;
  averageAccuracy: number;
}

interface HifzContextType {
  records: HifzRecord[];
  stats: HifzStats;
  addRecord: (record: Omit<HifzRecord, 'lastReview' | 'nextReview' | 'totalReviews' | 'mistakes'>) => void;
  updateRecord: (surahId: number, ayahStart: number, update: Partial<HifzRecord>) => void;
  getRecordsForSurah: (surahId: number) => HifzRecord[];
  getDueReviews: () => HifzRecord[];
  recordPractice: (surahId: number, ayahStart: number, accuracy: number) => void;
  getMemorizationProgress: (surahId: number) => number;
}

const HifzContext = createContext<HifzContextType>({} as HifzContextType);

const SPACED_INTERVALS = [1, 3, 7, 14, 30]; // days for each level

export function HifzProvider({ children }: { children: React.ReactNode }) {
  const [records, setRecords] = useState<HifzRecord[]>([]);
  const [stats, setStats] = useState<HifzStats>({
    totalVerses: 0,
    totalSurahs: 0,
    streakDays: 0,
    lastPractice: 0,
    averageAccuracy: 100,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [savedRecords, savedStats] = await Promise.all([
        AsyncStorage.getItem('hifz_records'),
        AsyncStorage.getItem('hifz_stats'),
      ]);
      if (savedRecords) setRecords(JSON.parse(savedRecords));
      if (savedStats) setStats(JSON.parse(savedStats));
    } catch (e) {
      console.error('Error loading hifz data:', e);
    }
  };

  const saveRecords = (updated: HifzRecord[]) => {
    setRecords(updated);
    AsyncStorage.setItem('hifz_records', JSON.stringify(updated));
  };

  const addRecord = (record: Omit<HifzRecord, 'lastReview' | 'nextReview' | 'totalReviews' | 'mistakes'>) => {
    const now = Date.now();
    const newRecord: HifzRecord = {
      ...record,
      lastReview: now,
      nextReview: now + SPACED_INTERVALS[0] * 86400000,
      totalReviews: 0,
      mistakes: 0,
    };
    const exists = records.find((r) => r.surahId === record.surahId && r.ayahStart === record.ayahStart);
    if (!exists) {
      const updated = [...records, newRecord];
      saveRecords(updated);
      updateStats(updated);
    }
  };

  const updateRecord = (surahId: number, ayahStart: number, update: Partial<HifzRecord>) => {
    const updated = records.map((r) =>
      r.surahId === surahId && r.ayahStart === ayahStart ? { ...r, ...update } : r
    );
    saveRecords(updated);
  };

  const getRecordsForSurah = (surahId: number) => {
    return records.filter((r) => r.surahId === surahId);
  };

  const getDueReviews = () => {
    const now = Date.now();
    return records.filter((r) => r.nextReview <= now);
  };

  const recordPractice = (surahId: number, ayahStart: number, accuracy: number) => {
    const now = Date.now();
    const updated = records.map((r) => {
      if (r.surahId === surahId && r.ayahStart === ayahStart) {
        const newLevel = accuracy >= 90 ? Math.min(r.level + 1, 5) : Math.max(r.level - 1, 1);
        const intervalDays = SPACED_INTERVALS[newLevel - 1];
        return {
          ...r,
          level: newLevel,
          lastReview: now,
          nextReview: now + intervalDays * 86400000,
          totalReviews: r.totalReviews + 1,
          mistakes: accuracy < 100 ? r.mistakes + 1 : r.mistakes,
        };
      }
      return r;
    });
    saveRecords(updated);
    updateStats(updated);
  };

  const getMemorizationProgress = (surahId: number) => {
    const surahRecords = records.filter((r) => r.surahId === surahId);
    if (surahRecords.length === 0) return 0;
    const avgLevel = surahRecords.reduce((sum, r) => sum + r.level, 0) / surahRecords.length;
    return (avgLevel / 5) * 100;
  };

  const updateStats = (currentRecords: HifzRecord[]) => {
    const uniqueSurahs = new Set(currentRecords.map((r) => r.surahId));
    const totalVerses = currentRecords.reduce((sum, r) => sum + (r.ayahEnd - r.ayahStart + 1), 0);
    const newStats: HifzStats = {
      totalVerses,
      totalSurahs: uniqueSurahs.size,
      streakDays: stats.streakDays,
      lastPractice: Date.now(),
      averageAccuracy: currentRecords.length > 0
        ? currentRecords.reduce((sum, r) => sum + (r.level / 5) * 100, 0) / currentRecords.length
        : 100,
    };
    setStats(newStats);
    AsyncStorage.setItem('hifz_stats', JSON.stringify(newStats));
  };

  return (
    <HifzContext.Provider value={{
      records, stats, addRecord, updateRecord,
      getRecordsForSurah, getDueReviews, recordPractice, getMemorizationProgress,
    }}>
      {children}
    </HifzContext.Provider>
  );
}

export const useHifz = () => useContext(HifzContext);
