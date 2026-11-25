import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { I18nManager, View, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from '../context/ThemeContext';
import { AppProvider } from '../context/AppContext';
import { HifzProvider } from '../context/HifzContext';

// Keep splash screen visible while loading resources
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    AmiriQuran: require('../assets/fonts/AmiriQuran.ttf'),
    Cairo: require('../assets/fonts/Cairo-Bold.ttf'),
    NotoNaskh: require('../assets/fonts/NotoNaskhArabic.ttf'),
    KFGQPC: require('../assets/fonts/KFGQPC-Hafs.otf'),
  });

  useEffect(() => {
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
  }, []);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0D7C5F' }}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }

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
