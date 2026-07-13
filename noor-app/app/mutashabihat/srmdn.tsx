import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { Fonts, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { srmdnPairs, srmdnCategories } from '../../data/mutashabihat-from-srmdn';

const MUTASHABIHAT_COLOR = '#16A085';

export default function SrmnMutashabihatScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedPair, setExpandedPair] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (!selectedCategory) return srmdnPairs;
    return srmdnPairs.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  const togglePair = (index: number) => {
    setExpandedPair(prev => prev === index ? null : index);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={MUTASHABIHAT_COLOR} />
      <View style={[styles.header, { backgroundColor: MUTASHABIHAT_COLOR }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-forward" size={26} color="#FFF" />
        </TouchableOpacity>
        <Ionicons name="git-compare" size={32} color="#FFF" />
        <Text style={styles.headerTitle}>تمييز المتشابهات</Text>
        <Text style={styles.headerSubtitle}>{srmdnPairs.length} زوجاً مع شرح الفرق</Text>
        <Text style={styles.headerSource}>من كتاب إغاثة اللهفان في ضبط متشابهات القرآن • عبدالله الوراقي</Text>
      </View>

      <View style={styles.chipsWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsContainer}>
          <TouchableOpacity
            style={[styles.chip, { backgroundColor: selectedCategory === null ? MUTASHABIHAT_COLOR : colors.surface, borderColor: MUTASHABIHAT_COLOR }]}
            onPress={() => setSelectedCategory(null)}
            activeOpacity={0.7}
          >
            <Text style={[styles.chipText, { color: selectedCategory === null ? '#FFF' : MUTASHABIHAT_COLOR }]}>الكل ({srmdnPairs.length})</Text>
          </TouchableOpacity>
          {srmdnCategories.map(cat => {
            const count = srmdnPairs.filter(p => p.category === cat.id).length;
            if (count === 0) return null;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.chip, { backgroundColor: selectedCategory === cat.id ? cat.color : colors.surface, borderColor: cat.color }]}
                onPress={() => setSelectedCategory(cat.id)}
                activeOpacity={0.7}
              >
                <Text style={[styles.chipText, { color: selectedCategory === cat.id ? '#FFF' : cat.color }]}>{cat.name} ({count})</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
        {filtered.map((pair, index) => {
          const isExpanded = expandedPair === index;
          const cat = srmdnCategories.find(c => c.id === pair.category);
          const catColor = cat?.color || MUTASHABIHAT_COLOR;
          const [s1, a1] = pair.ayah1.split(':');
          const [s2, a2] = pair.ayah2.split(':');

          return (
            <TouchableOpacity
              key={index}
              style={[styles.pairCard, { backgroundColor: colors.surface, borderColor: catColor + '30' }, Shadows.sm]}
              onPress={() => togglePair(index)}
              activeOpacity={0.7}
            >
              <View style={styles.pairAyahs}>
                <View style={[styles.ayahBadge, { backgroundColor: catColor + '15' }]}>
                  <Text style={styles.ayahLabel}>الأولى</Text>
                  <Text style={[styles.ayahRef, { color: catColor }]}>سورة {s1} - {a1}</Text>
                </View>
                <Ionicons name="swap-horizontal" size={20} color={catColor} style={styles.swapIcon} />
                <View style={[styles.ayahBadge, { backgroundColor: catColor + '15' }]}>
                  <Text style={styles.ayahLabel}>الثانية</Text>
                  <Text style={[styles.ayahRef, { color: catColor }]}>سورة {s2} - {a2}</Text>
                </View>
              </View>

              <View style={[styles.categoryTag, { backgroundColor: catColor + '20' }]}>
                <Text style={[styles.categoryTagText, { color: catColor }]}>{cat?.name || pair.category}</Text>
              </View>

              {isExpanded && (
                <View style={[styles.noteContainer, { backgroundColor: colors.surfaceVariant }]}>
                  <Text style={[styles.noteLabel]}>الفرق بينهما:</Text>
                  <Text style={[styles.noteText, { color: colors.text }]}>{pair.noteAr}</Text>
                </View>
              )}

              <View style={styles.expandHint}>
                <Ionicons name={isExpanded ? 'chevron-up' : 'chevron-down'} size={16} color={colors.textLight} />
                <Text style={[styles.expandHintText, { color: colors.textLight }]}>
                  {isExpanded ? 'إخفاء الشرح' : 'اضغط لمعرفة الفرق'}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
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
  headerTitle: { color: '#FFF', fontSize: Fonts.sizes.title, fontWeight: '800', marginTop: Spacing.sm },
  headerSubtitle: { color: 'rgba(255,255,255,0.75)', fontSize: Fonts.sizes.sm, textAlign: 'center' },
  chipsWrapper: { paddingVertical: Spacing.md },
  chipsContainer: { paddingHorizontal: Spacing.lg, gap: Spacing.sm, flexDirection: 'row', alignItems: 'center' },
  chip: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.round,
    borderWidth: 1.5,
  },
  chipText: { fontSize: Fonts.sizes.sm, fontWeight: '700' },
  listContent: { padding: Spacing.lg, paddingBottom: 100 },
  pairCard: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
  },
  pairAyahs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: Spacing.md,
  },
  ayahBadge: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  ayahLabel: {
    fontSize: Fonts.sizes.xs,
    color: '#666',
    marginBottom: 4,
    fontWeight: '600',
  },
  ayahRef: {
    fontSize: Fonts.sizes.md,
    fontWeight: '700',
    writingDirection: 'rtl',
  },
  swapIcon: {
    marginHorizontal: Spacing.sm,
  },
  categoryTag: {
    alignSelf: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: BorderRadius.round,
    marginBottom: Spacing.sm,
  },
  categoryTagText: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '700',
  },
  noteContainer: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
  },
  noteLabel: {
    fontSize: Fonts.sizes.sm,
    fontWeight: '700',
    color: '#16A085',
    marginBottom: Spacing.xs,
    writingDirection: 'rtl',
  },
  noteText: {
    fontSize: Fonts.sizes.md,
    lineHeight: 26,
    writingDirection: 'rtl',
  },
  expandHint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
  },
  expandHintText: {
    fontSize: Fonts.sizes.xs,
  },
  headerSource: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: Fonts.sizes.xs,
    textAlign: 'center',
    marginTop: 4,
  },
});
