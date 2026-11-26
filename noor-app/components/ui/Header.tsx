import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Platform, I18nManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { Fonts, Spacing } from '../../constants/theme';

interface HeaderProps {
  title: string;
  subtitle?: string;
  source?: string;
  showBack?: boolean;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightPress?: () => void;
  onBackPress?: () => void;
  onTitlePress?: () => void;
  transparent?: boolean;
}

export default function Header({
  title,
  subtitle,
  source,
  showBack = false,
  rightIcon,
  onRightPress,
  onBackPress,
  onTitlePress,
  transparent = false,
}: HeaderProps) {
  const { colors, isDark } = useTheme();
  const router = useRouter();

  return (
    <View style={[
      styles.container,
      {
        backgroundColor: transparent ? 'transparent' : colors.primary,
        paddingTop: Platform.OS === 'ios' ? 50 : (StatusBar.currentHeight || 0) + 10,
      },
    ]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View style={styles.content}>
        <View style={styles.left}>
          {showBack && (
            <TouchableOpacity onPress={onBackPress || (() => router.back())} style={styles.backButton}>
              <Ionicons name="arrow-forward" size={24} color="#FFF" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={styles.center}
          activeOpacity={onTitlePress ? 0.7 : 1}
          disabled={!onTitlePress}
          onPress={onTitlePress}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            {onTitlePress && (
              <Ionicons name="chevron-down" size={16} color="#FFF" style={{ opacity: 0.85 }} />
            )}
          </View>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          {source && <Text style={styles.source}>{source}</Text>}
        </TouchableOpacity>
        <View style={styles.right}>
          {rightIcon && onRightPress && (
            <TouchableOpacity onPress={onRightPress} style={styles.rightButton}>
              <Ionicons name={rightIcon} size={24} color="#FFF" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: Spacing.md,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    minHeight: 44,
  },
  left: {
    width: 44,
    alignItems: 'flex-start',
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  right: {
    width: 44,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: Fonts.sizes.xl,
    fontWeight: '700',
    color: '#FFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Fonts.sizes.sm,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  source: {
    fontSize: Fonts.sizes.xs,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
    textAlign: 'center',
  },
  backButton: {
    padding: Spacing.xs,
  },
  rightButton: {
    padding: Spacing.xs,
  },
});
