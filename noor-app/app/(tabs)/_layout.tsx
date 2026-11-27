import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform, View, Text, StyleSheet, TouchableOpacity, I18nManager } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Fonts, rtlRow } from '../../constants/theme';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const TAB_CONFIG: { [key: string]: { title: string; icon: keyof typeof Ionicons.glyphMap; activeColor: string } } = {
  index: { title: 'الرئيسية', icon: 'home', activeColor: '#0D7C5F' },
  quran: { title: 'المصحف', icon: 'book', activeColor: '#8E44AD' },
  hifz: { title: 'الحفظ', icon: 'school', activeColor: '#E67E22' },
  mawdui: { title: 'الموضوعي', icon: 'grid', activeColor: '#2980B9' },
  more: { title: 'الإعدادات', icon: 'settings', activeColor: '#16A085' },
};

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.tabBarContainer,
        {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          flexDirection: rtlRow,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const conf = TAB_CONFIG[route.name] || {
          title: route.name,
          icon: 'ellipse' as const,
          activeColor: colors.primary,
        };

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const activeColor = conf.activeColor;
        const inactiveColor = '#94A3B8';

        return (
          <TouchableOpacity
            key={route.key}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={conf.title}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItem}
          >
            <View
              style={[
                styles.iconContainer,
                isFocused && { backgroundColor: activeColor + '18' },
              ]}
            >
              <Ionicons
                name={conf.icon}
                size={23}
                color={isFocused ? activeColor : inactiveColor}
              />
            </View>
            <Text
              numberOfLines={1}
              style={[
                styles.tabLabel,
                {
                  color: isFocused ? activeColor : inactiveColor,
                  fontWeight: isFocused ? '900' : '600',
                  fontSize: isFocused ? 13 : 12,
                },
              ]}
            >
              {conf.title}
            </Text>
            {isFocused && (
              <View style={[styles.activeIndicator, { backgroundColor: activeColor }]} />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'الرئيسية',
        }}
      />
      <Tabs.Screen
        name="quran"
        options={{
          title: 'المصحف',
        }}
      />
      <Tabs.Screen
        name="hifz"
        options={{
          title: 'الحفظ',
        }}
      />
      <Tabs.Screen
        name="mawdui"
        options={{
          title: 'الموضوعي',
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'الإعدادات',
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    height: Platform.OS === 'ios' ? 88 : 74,
    paddingBottom: Platform.OS === 'ios' ? 26 : 8,
    paddingTop: 6,
    borderTopWidth: 1,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    height: '100%',
    position: 'relative',
  },
  iconContainer: {
    width: 44,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    marginTop: 2,
    textAlign: 'center',
  },
  activeIndicator: {
    width: 20,
    height: 3,
    borderRadius: 2,
    marginTop: 2,
  },
});
