import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Fonts, Spacing, BorderRadius, rtlRow } from '../../constants/theme';
import { FONT_SCALES, setFontScale, useFontScale } from '../../services/fontScale';

export default function FontScalePicker() {
  const { colors } = useTheme();
  const scale = useFontScale();

  return (
    <View style={styles.row}>
      {FONT_SCALES.map((option) => {
        const isSelected = option.value === scale;
        return (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.option,
              {
                backgroundColor: isSelected ? colors.primary : colors.surface,
                borderColor: isSelected ? colors.primary : colors.borderLight,
              },
            ]}
            onPress={() => setFontScale(option.value)}
          >
            <Text style={[styles.sample, { color: isSelected ? '#FFF' : colors.text, fontSize: 18 * option.value }]}>
              أ
            </Text>
            <Text style={[styles.label, { color: isSelected ? '#FFF' : colors.textSecondary }]}>{option.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: rtlRow,
    gap: Spacing.sm,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  option: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1.2,
    gap: 2,
  },
  sample: { fontWeight: '800' },
  label: { fontSize: Fonts.sizes.xs, fontWeight: '700' },
});
