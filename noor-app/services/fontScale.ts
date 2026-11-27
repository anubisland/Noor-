import { useEffect, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// App-wide text size preference. Must be imported before any module that calls
// StyleSheet.create (first import in app/_layout.tsx), because it wraps create().

export const FONT_SCALES = [
  { id: 'small', label: 'صغير', value: 0.9 },
  { id: 'medium', label: 'متوسط', value: 1 },
  { id: 'large', label: 'كبير', value: 1.15 },
  { id: 'xlarge', label: 'كبير جداً', value: 1.3 },
] as const;

const STORAGE_KEY = 'app_font_scale';
const SCALED_PROPS = ['fontSize', 'lineHeight'];
const isWeb = Platform.OS === 'web';

let currentScale = 1;
const listeners = new Set<(scale: number) => void>();

const isValidScale = (v: number) => FONT_SCALES.some((s) => s.value === v);

// Web compiles styles to CSS inside create(), so the scale has to be known
// synchronously at startup; localStorage gives us that.
if (isWeb) {
  try {
    const saved = parseFloat(globalThis.localStorage?.getItem(STORAGE_KEY) ?? '');
    if (isValidScale(saved)) currentScale = saved;
  } catch {
    // Storage blocked (private mode): fall back to the default size.
  }
}

export const getFontScale = () => currentScale;

function scaleStyle(style: Record<string, unknown>) {
  const out: Record<string, unknown> = {};
  for (const key of Object.keys(style)) {
    const value = style[key];
    if (!SCALED_PROPS.includes(key) || typeof value !== 'number') {
      out[key] = value;
    } else if (isWeb) {
      out[key] = Math.round(value * currentScale);
    } else {
      // Native reads style values at render time, so a getter follows scale changes.
      Object.defineProperty(out, key, {
        enumerable: true,
        get: () => Math.round(value * currentScale),
      });
    }
  }
  return out;
}

const originalCreate = StyleSheet.create;
StyleSheet.create = ((styles: Record<string, Record<string, unknown>>) => {
  const scaled: Record<string, unknown> = {};
  for (const name of Object.keys(styles)) {
    const style = styles[name];
    scaled[name] = style && typeof style === 'object' ? scaleStyle(style) : style;
  }
  return originalCreate(scaled as never);
}) as typeof StyleSheet.create;

/** Loads the saved preference (native). Resolves once the scale is applied. */
export async function loadFontScale(): Promise<void> {
  if (isWeb) return;
  try {
    const saved = parseFloat((await AsyncStorage.getItem(STORAGE_KEY)) ?? '');
    if (isValidScale(saved) && saved !== currentScale) {
      currentScale = saved;
      listeners.forEach((fn) => fn(currentScale));
    }
  } catch (e) {
    console.warn('Could not load font scale preference', e);
  }
}

export async function setFontScale(scale: number): Promise<void> {
  if (!isValidScale(scale) || scale === currentScale) return;
  if (isWeb) {
    try {
      globalThis.localStorage?.setItem(STORAGE_KEY, String(scale));
    } catch (e) {
      console.warn('Could not save font scale preference', e);
      return;
    }
    // CSS was generated with the old scale; reload regenerates it.
    globalThis.location?.reload();
    return;
  }
  currentScale = scale;
  listeners.forEach((fn) => fn(currentScale));
  try {
    await AsyncStorage.setItem(STORAGE_KEY, String(scale));
  } catch (e) {
    console.warn('Could not save font scale preference', e);
  }
}

/** Current scale; re-renders the caller when it changes. */
export function useFontScale(): number {
  const [scale, setScale] = useState(currentScale);
  useEffect(() => {
    listeners.add(setScale);
    setScale(currentScale);
    return () => {
      listeners.delete(setScale);
    };
  }, []);
  return scale;
}
