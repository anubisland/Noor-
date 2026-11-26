import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform, View, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Fonts } from '../../constants/theme';

const TAB_COLORS = {
  index: '#0D7C5F',
  quran: '#8E44AD',
  hifz: '#E67E22',
  mawdui: '#2980B9',
  more: '#636E72',
};

function TabIcon({ name, tabKey, focused }: { name: keyof typeof Ionicons.glyphMap; tabKey: keyof typeof TAB_COLORS; focused: boolean }) {
  const iconColor = TAB_COLORS[tabKey];
  return (
    <View style={[styles.iconWrap, focused && { backgroundColor: iconColor + '18' }]}>
      <Ionicons name={name} size={22} color={iconColor} />
      {focused && <View style={[styles.dot, { backgroundColor: iconColor }]} />}
    </View>
  );
}

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: 'below-icon',
        tabBarItemStyle: {
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 2,
        },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 88 : 78,
          paddingBottom: Platform.OS === 'ios' ? 28 : 10,
          paddingTop: 5,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
          ...(Platform.OS === 'web' ? { direction: 'rtl' as any } : {}),
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#475569',
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: '800',
          marginTop: 2,
          paddingBottom: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'الرئيسية',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="home" tabKey="index" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="quran"
        options={{
          title: 'المصحف',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="book" tabKey="quran" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="hifz"
        options={{
          title: 'الحفظ',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="school" tabKey="hifz" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="mawdui"
        options={{
          title: 'الموضوعي',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="grid" tabKey="mawdui" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'الإعدادات',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="settings" tabKey="more" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    minWidth: 44,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginTop: 3,
  },
});
