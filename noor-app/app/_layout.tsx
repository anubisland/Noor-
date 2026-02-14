import React from 'react';
import { Stack } from 'expo-router';
import { ThemeProvider } from '../context/ThemeContext';
import { AppProvider } from '../context/AppContext';
import { HifzProvider } from '../context/HifzContext';

export default function RootLayout() {
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
            <Stack.Screen name="search" options={{ presentation: 'modal' }} />
            <Stack.Screen name="bookmarks" />
          </Stack>
        </HifzProvider>
      </AppProvider>
    </ThemeProvider>
  );
}
