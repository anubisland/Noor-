import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { Fonts, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { adhkarData } from '../../data/adhkar';

const ADHKAR_COLOR = '#0D7C5F';

export default function AdhkarScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [expandedCategory, setExpandedCategory] = useState<number | null>(1);
  const [counts, setCounts] = useState<{ [entryId: number]: number }>({});

  const toggleCategory = (id: number) => {
    setExpandedCategory(prev => prev === id ? null : id);
  };

  const handleTapDhikr = (id: number, targetCount: number) => {
    setCounts(prev => {
      const current = prev[id] || 0;
      if (current < targetCount) {
        return { ...prev, [id]: current + 1 };
      }
      return prev;
    });
  };

  const handleResetDhikr = (id: number) => {
    setCounts(prev => ({ ...prev, [id]: 0 }));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={ADHKAR_COLOR} />

      <View style={[styles.header, { backgroundColor: ADHKAR_COLOR }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-forward" size={26} color="#FFF" />
        </TouchableOpacity>
        <Ionicons name="moon" size={32} color="#FFF" />
        <Text style={styles.headerTitle}>الأذكار</Text>
        <Text style={styles.headerSubtitle}>
          {adhkarData.length} قسم • {adhkarData.reduce((s, c) => s + c.entries.length, 0)} ذكراً
        </Text>
        <Text style={styles.headerSource}>من كتاب حصن المسلم • إعداد سعيد بن علي بن وهف القحطاني</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {adhkarData.map(category => {
          const isExpanded = expandedCategory === category.id;
          const entryCount = category.entries.length;

          return (
            <View key={category.id} style={styles.categoryGroup}>
              <TouchableOpacity
                style={[styles.categoryHeader, { backgroundColor: colors.surface }, Shadows.sm]}
                onPress={() => toggleCategory(category.id)}
                activeOpacity={0.7}
              >
                <View style={styles.categoryHeaderLeft}>
                  <View style={[styles.categoryIcon, { backgroundColor: ADHKAR_COLOR + '15' }]}>
                    <Ionicons
                      name={isExpanded ? 'chevron-up' : 'chevron-down'}
                      size={20}
                      color={ADHKAR_COLOR}
                    />
                  </View>
                  <View style={styles.categoryInfo}>
                    <Text style={[styles.categoryName, { color: colors.text }]}>
                      {category.name}
                    </Text>
                    <Text style={[styles.categoryCount, { color: colors.textSecondary }]}>
                      {entryCount} ذكر
                    </Text>
                  </View>
                </View>
                <Ionicons
                  name={isExpanded ? 'remove-circle' : 'add-circle'}
                  size={24}
                  color={ADHKAR_COLOR}
                />
              </TouchableOpacity>

              {isExpanded && (
                <View style={styles.entriesContainer}>
                  {category.entries.map((entry, idx) => {
                    const currentCount = counts[entry.id] || 0;
                    const isCompleted = currentCount >= entry.count;

                    return (
                      <TouchableOpacity
                        key={entry.id}
                        activeOpacity={0.8}
                        onPress={() => handleTapDhikr(entry.id, entry.count)}
                        style={[
                          styles.entryCard,
                          {
                            backgroundColor: isCompleted ? 'rgba(13, 124, 95, 0.08)' : colors.surfaceVariant,
                            borderColor: isCompleted ? ADHKAR_COLOR : 'transparent',
                            borderWidth: 1,
                          },
                        ]}
                      >
                        <View style={[styles.entryNumber, { backgroundColor: isCompleted ? ADHKAR_COLOR : ADHKAR_COLOR + '20' }]}>
                          <Text style={[styles.entryNumberText, { color: isCompleted ? '#FFF' : ADHKAR_COLOR }]}>
                            {idx + 1}
                          </Text>
                        </View>
                        <View style={styles.entryContent}>
                          <Text style={[styles.entryText, { color: colors.text }]}>
                            {entry.text}
                          </Text>
                          <View style={styles.counterRow}>
                            <View
                              style={[
                                styles.countBadge,
                                { backgroundColor: isCompleted ? '#27AE60' : ADHKAR_COLOR },
                              ]}
                            >
                              <Text style={styles.countText}>
                                {isCompleted ? '✓ اكتمل' : `${currentCount} / ${entry.count}`}
                              </Text>
                            </View>
                            {currentCount > 0 && (
                              <TouchableOpacity
                                style={styles.resetBtn}
                                onPress={() => handleResetDhikr(entry.id)}
                              >
                                <Ionicons name="refresh-outline" size={16} color={colors.textLight} />
                              </TouchableOpacity>
                            )}
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : (StatusBar.currentHeight || 0) + 10,
    paddingBottom: Spacing.xxl,
    paddingHorizontal: Spacing.xxl,
    alignItems: 'center',
    gap: Spacing.xs,
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
  },
  backBtn: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : (StatusBar.currentHeight || 0) + 10,
    right: Spacing.lg,
    padding: Spacing.sm,
    zIndex: 10,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: Fonts.sizes.title,
    fontWeight: '800',
    marginTop: Spacing.sm,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: Fonts.sizes.sm,
    textAlign: 'center',
  },
  headerSource: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: Fonts.sizes.xs,
    textAlign: 'center',
    marginTop: 2,
  },
  listContent: {
    padding: Spacing.lg,
    paddingBottom: 100,
  },
  categoryGroup: {
    marginBottom: Spacing.md,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  categoryHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: Fonts.sizes.lg,
    fontWeight: '700',
    writingDirection: 'rtl',
    textAlign: 'right',
  },
  categoryCount: {
    fontSize: Fonts.sizes.xs,
    marginTop: 2,
    textAlign: 'right',
  },
  entriesContainer: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    gap: Spacing.sm,
  },
  entryCard: {
    flexDirection: 'row',
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    gap: Spacing.md,
  },
  entryNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  entryNumberText: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '800',
  },
  entryContent: {
    flex: 1,
  },
  entryText: {
    fontSize: Fonts.sizes.lg,
    lineHeight: Fonts.lineHeights.relaxed * Fonts.sizes.lg,
    writingDirection: 'rtl',
    textAlign: 'justify',
    fontWeight: '400',
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  countBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: BorderRadius.round,
  },
  resetBtn: {
    padding: 4,
  },
  countText: {
    color: '#FFF',
    fontSize: Fonts.sizes.xs,
    fontWeight: '700',
  },
});
