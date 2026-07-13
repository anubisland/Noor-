import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { I18nManager } from 'react-native';
import { ThemeProvider } from '../context/ThemeContext';
import { AppProvider } from '../context/AppContext';
import { HifzProvider } from '../context/HifzContext';

export default function RootLayout() {
  useEffect(() => {
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
  }, []);

  return (
    <ThemeProvider>
      <AppProvider>
        <HifzProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="surah/[id]" />
            <Stack.Screen name="tafsir/[surahId]/[ayahId]" />
            <Stack.Screen name="memorize/[id]" />
            <Stack.Screen name="asbab/[id]" />
            <Stack.Screen name="mutashabihat/index" />
            <Stack.Screen name="mutashabihat/srmdn" />
            <Stack.Screen name="duas/index" />
            <Stack.Screen name="adhkar/index" />
            <Stack.Screen name="search" options={{ presentation: 'modal' }} />
            <Stack.Screen name="bookmarks" />
          </Stack>
        </HifzProvider>
      </AppProvider>
    </ThemeProvider>
  );
}
