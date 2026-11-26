import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, I18nManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { BorderRadius, Fonts, Spacing } from '../../constants/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
  autoFocus?: boolean;
}

export default function SearchBar({ value, onChangeText, placeholder = 'ابحث...', onClear, autoFocus }: SearchBarProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}>
      <Ionicons name="search" size={20} color={colors.textLight} style={styles.icon} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textLight}
        style={[styles.input, { color: colors.text }]}
        autoFocus={autoFocus}
        textAlign="right"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => { onChangeText(''); onClear?.(); }}>
          <Ionicons name="close-circle" size={20} color={colors.textLight} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderWidth: 1,
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.sm,
  },
  icon: {
    marginHorizontal: Spacing.xs,
  },
  input: {
    flex: 1,
    fontSize: Fonts.sizes.md,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    writingDirection: 'rtl',
    textAlign: 'right',
  },
});
