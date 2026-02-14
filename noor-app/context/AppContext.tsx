import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_SELECTED_TAFSIRS } from '../constants/config';

interface LastRead {
  surahId: number;
  surahName: string;
  ayahNumber: number;
  timestamp: number;
}

interface Bookmark {
  id: string;
  surahId: number;
  surahName: string;
  ayahNumber: number;
  timestamp: number;
  note?: string;
}

interface DailyProgress {
  date: string;
  pagesRead: number;
  versesMemorized: number;
  minutesSpent: number;
}

interface AppContextType {
  lastRead: LastRead | null;
  bookmarks: Bookmark[];
  dailyProgress: DailyProgress | null;
  fontSize: number;
  showTranslation: boolean;
  selectedTafsirs: string[];
  setLastRead: (data: LastRead) => void;
  addBookmark: (bookmark: Omit<Bookmark, 'id' | 'timestamp'>) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (surahId: number, ayahNumber: number) => boolean;
  setFontSize: (size: number) => void;
  setShowTranslation: (show: boolean) => void;
  setSelectedTafsirs: (tafsirs: string[]) => void;
  updateDailyProgress: (update: Partial<DailyProgress>) => void;
}

const AppContext = createContext<AppContextType>({} as AppContextType);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lastRead, setLastReadState] = useState<LastRead | null>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [dailyProgress, setDailyProgress] = useState<DailyProgress | null>(null);
  const [fontSize, setFontSizeState] = useState(26);
  const [showTranslation, setShowTranslationState] = useState(true);
  const [selectedTafsirs, setSelectedTafsirsState] = useState<string[]>(DEFAULT_SELECTED_TAFSIRS);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [savedLastRead, savedBookmarks, savedFontSize, savedShowTrans, savedTafsirs] = await Promise.all([
        AsyncStorage.getItem('last_read'),
        AsyncStorage.getItem('bookmarks'),
        AsyncStorage.getItem('font_size'),
        AsyncStorage.getItem('show_translation'),
        AsyncStorage.getItem('selected_tafsirs'),
      ]);
      if (savedLastRead) setLastReadState(JSON.parse(savedLastRead));
      if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
      if (savedFontSize) setFontSizeState(Number(savedFontSize));
      if (savedShowTrans !== null) setShowTranslationState(savedShowTrans === 'true');
      if (savedTafsirs) setSelectedTafsirsState(JSON.parse(savedTafsirs));
    } catch (e) {
      console.error('Error loading app data:', e);
    }
  };

  const setLastRead = (data: LastRead) => {
    setLastReadState(data);
    AsyncStorage.setItem('last_read', JSON.stringify(data));
  };

  const addBookmark = (bookmark: Omit<Bookmark, 'id' | 'timestamp'>) => {
    const newBookmark: Bookmark = {
      ...bookmark,
      id: `${bookmark.surahId}_${bookmark.ayahNumber}_${Date.now()}`,
      timestamp: Date.now(),
    };
    const updated = [...bookmarks, newBookmark];
    setBookmarks(updated);
    AsyncStorage.setItem('bookmarks', JSON.stringify(updated));
  };

  const removeBookmark = (id: string) => {
    const updated = bookmarks.filter((b) => b.id !== id);
    setBookmarks(updated);
    AsyncStorage.setItem('bookmarks', JSON.stringify(updated));
  };

  const isBookmarked = (surahId: number, ayahNumber: number) => {
    return bookmarks.some((b) => b.surahId === surahId && b.ayahNumber === ayahNumber);
  };

  const setFontSize = (size: number) => {
    setFontSizeState(size);
    AsyncStorage.setItem('font_size', String(size));
  };

  const setShowTranslation = (show: boolean) => {
    setShowTranslationState(show);
    AsyncStorage.setItem('show_translation', String(show));
  };

  const setSelectedTafsirs = (tafsirs: string[]) => {
    setSelectedTafsirsState(tafsirs);
    AsyncStorage.setItem('selected_tafsirs', JSON.stringify(tafsirs));
  };

  const updateDailyProgress = (update: Partial<DailyProgress>) => {
    const today = new Date().toISOString().split('T')[0];
    const current = dailyProgress?.date === today ? dailyProgress : { date: today, pagesRead: 0, versesMemorized: 0, minutesSpent: 0 };
    const updated = { ...current, ...update };
    setDailyProgress(updated);
    AsyncStorage.setItem('daily_progress', JSON.stringify(updated));
  };

  return (
    <AppContext.Provider value={{
      lastRead, bookmarks, dailyProgress, fontSize, showTranslation, selectedTafsirs,
      setLastRead, addBookmark, removeBookmark, isBookmarked,
      setFontSize, setShowTranslation, setSelectedTafsirs, updateDailyProgress,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
