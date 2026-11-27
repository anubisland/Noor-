// Must stay first: wraps StyleSheet.create before any screen styles are created.
import { loadFontScale, useFontScale } from '../services/fontScale';
import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';
import { I18nManager, View, ActivityIndicator, Platform } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from '../context/ThemeContext';
import { AppProvider } from '../context/AppContext';
import { HifzProvider } from '../context/HifzContext';

// Force RTL immediately at bundle evaluation time
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);
// Native-only: react-native-web's I18nManager has no swapLeftAndRightInRTL (crashes web with a blank page)
if (Platform.OS !== 'web') {
  I18nManager.swapLeftAndRightInRTL(true);
}

// Keep splash screen visible while loading resources
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    ...Ionicons.font,
    Ionicons: require('../assets/fonts/Ionicons.ttf'),
    ionicons: require('../assets/fonts/Ionicons.ttf'),
    AmiriQuran: require('../assets/fonts/AmiriQuran.ttf'),
    Cairo: require('../assets/fonts/Cairo-Bold.ttf'),
    NotoNaskh: require('../assets/fonts/NotoNaskhArabic.ttf'),
    KFGQPC: require('../assets/fonts/KFGQPC-Hafs.otf'),
  });

  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
      document.documentElement.style.direction = 'rtl';
      if (document.body) {
        document.body.setAttribute('dir', 'rtl');
        document.body.style.direction = 'rtl';
      }
      const root = document.getElementById('root');
      if (root) {
        root.setAttribute('dir', 'rtl');
        root.style.direction = 'rtl';
      }
    }
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
  }, []);

  // Register PWA Service Worker on Web
  useEffect(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        const swPath = window.location.pathname.startsWith('/Noor-') ? '/Noor-/sw.js' : './sw.js';
        const swScope = window.location.pathname.startsWith('/Noor-') ? '/Noor-/' : './';
        navigator.serviceWorker.register(swPath, { scope: swScope }).then(
          (reg) => {
            reg.update();
            console.log('Zad Al-Quran PWA ServiceWorker active with scope:', reg.scope);
          },
          (err) => console.warn('Zad Al-Quran ServiceWorker registration failed:', err)
        );
      });
    }
  }, []);

  const fontScale = useFontScale();
  const [fontScaleReady, setFontScaleReady] = useState(Platform.OS === 'web');
  useEffect(() => {
    loadFontScale().finally(() => setFontScaleReady(true));
  }, []);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, fontError]);

  if ((!fontsLoaded && !fontError) || !fontScaleReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0D7C5F' }}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }

  return (
    <>
      {Platform.OS === 'web' && (
        <Head>
          <title>نور القرآن الكريم - المصحف الشريف</title>
          <meta name="description" content="تطبيق نور القرآن الكريم - المصحف الشريف، المتشابهات، التفاسير، وأسباب النزول" />
          <meta name="theme-color" content="#0D7C5F" />
          <link rel="manifest" href="/Noor-/manifest.json" />
          <link rel="icon" type="image/png" href="/Noor-/favicon.png" />
          <link rel="apple-touch-icon" href="/Noor-/icons/icon-192.png" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="نور القرآن" />
          <meta name="application-name" content="نور القرآن الكريم" />
          <meta name="msapplication-TileColor" content="#0D7C5F" />
          <style>{`
            html, body, #root {
              direction: rtl !important;
              text-align: right !important;
            }
          `}</style>
        </Head>
      )}
      {/* key: remount screens so styles re-read the new text size (native) */}
      <ThemeProvider key={`font-scale-${fontScale}`}>
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
    </>
  );
}
