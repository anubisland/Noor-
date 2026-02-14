import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { BorderRadius, Shadows, Spacing } from '../../constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: number;
}

export default function Card({ children, style, onPress, variant = 'default', padding = Spacing.lg }: CardProps) {
  const { colors } = useTheme();

  const cardStyle = [
    styles.card,
    { backgroundColor: colors.surface, padding },
    variant === 'elevated' && [Shadows.md, { backgroundColor: colors.surface }],
    variant === 'outlined' && { borderWidth: 1, borderColor: colors.border },
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={cardStyle}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
});
