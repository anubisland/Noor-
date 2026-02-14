import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { Fonts, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import Header from '../../components/ui/Header';
import { mutashabihatData } from '../../data/mutashabihat';

type Level = 'all' | 'surah' | 'juz' | 'quran';

// Extract unique surahs from surah-level groups
const getAvailableSurahs = () => {
  const map = new Map<number, { name: string; count: number }>();
  mutashabihatData
    .filter((g) => g.level === 'surah')
    .forEach((g) => {
      if (g.verses.length > 0) {
        const { surahId, surahName } = g.verses[0];
        if (map.has(surahId)) {
          map.get(surahId)!.count++;
        } else {
          map.set(surahId, { name: surahName, count: 1 });
        }
      }
    });
  return Array.from(map.entries())
    .map(([id, { name, count }]) => ({ id, name, count }))
    .sort((a, b) => a.id - b.id);
};

// Get juz-level groups for picker
const getJuzGroups = () => {
  return mutashabihatData
    .filter((g) => g.level === 'juz')
    .map((g) => ({ id: g.id, title: g.title, versesCount: g.verses.length }));
};

const availableSurahs = getAvailableSurahs();
const juzGroups = getJuzGroups();

export default function MutashabihatScreen() {
  const { colors } = useTheme();
  const [selectedLevel, setSelectedLevel] = useState<Level>('all');
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [showSurahPicker, setShowSurahPicker] = useState(false);
  const [showJuzPicker, setShowJuzPicker] = useState(false);
  const [selectedSurahId, setSelectedSurahId] = useState<number | null>(null);
  const [selectedJuzGroupId, setSelectedJuzGroupId] = useState<string | null>(null);
  const [selectedSurahName, setSelectedSurahName] = useState<string>('');
  const [selectedJuzTitle, setSelectedJuzTitle] = useState<string>('');

  const filteredData = useMemo(() => {
    if (selectedLevel === 'all') return mutashabihatData;
    if (selectedLevel === 'quran') return mutashabihatData.filter((g) => g.level === 'quran');
    if (selectedLevel === 'surah' && selectedSurahId !== null) {
      return mutashabihatData.filter(
        (g) => g.level === 'surah' && g.verses.some((v) => v.surahId === selectedSurahId)
      );
    }
    if (selectedLevel === 'juz' && selectedJuzGroupId !== null) {
      return mutashabihatData.filter((g) => g.id === selectedJuzGroupId);
    }
    return mutashabihatData.filter((g) => g.level === selectedLevel);
  }, [selectedLevel, selectedSurahId, selectedJuzGroupId]);

  const handleLevelPress = (key: Level) => {
    if (key === 'surah') {
      setShowSurahPicker(true);
    } else if (key === 'juz') {
      setShowJuzPicker(true);
    } else {
      setSelectedLevel(key);
      setSelectedSurahId(null);
      setSelectedJuzGroupId(null);
      setSelectedSurahName('');
      setSelectedJuzTitle('');
      setExpandedGroup(null);
    }
  };

  const handleSurahSelect = (surahId: number, surahName: string) => {
    setSelectedLevel('surah');
    setSelectedSurahId(surahId);
    setSelectedSurahName(surahName);
    setSelectedJuzGroupId(null);
    setSelectedJuzTitle('');
    setShowSurahPicker(false);
    setExpandedGroup(null);
  };

  const handleJuzSelect = (groupId: string, title: string) => {
    setSelectedLevel('juz');
    setSelectedJuzGroupId(groupId);
    setSelectedJuzTitle(title);
    setSelectedSurahId(null);
    setSelectedSurahName('');
    setShowJuzPicker(false);
    setExpandedGroup(null);
  };

  const levels: { key: Level; label: string; icon: string; color: string }[] = [
    { key: 'all', label: 'الكل', icon: 'layers', color: colors.primary },
    { key: 'surah', label: 'السورة', icon: 'document-text', color: '#E67E22' },
    { key: 'juz', label: 'الجزء', icon: 'library', color: '#8E44AD' },
    { key: 'quran', label: 'القرآن', icon: 'book', color: '#16A085' },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'surah': return '#E67E22';
      case 'juz': return '#8E44AD';
      case 'quran': return '#16A085';
      default: return colors.primary;
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'surah': return 'مستوى السورة';
      case 'juz': return 'مستوى الجزء';
      case 'quran': return 'مستوى القرآن';
      default: return '';
    }
  };

  const getSubtitle = () => {
    if (selectedLevel === 'surah' && selectedSurahName) {
      return `متشابهات سورة ${selectedSurahName}`;
    }
    if (selectedLevel === 'juz' && selectedJuzTitle) {
      return selectedJuzTitle;
    }
    return 'آيات متشابهة في القرآن';
  };

  const renderHighlightedText = (text: string, highlights: string[]) => {
    if (!highlights || highlights.length === 0) {
      return <Text style={[styles.verseText, { color: colors.text }]}>{text}</Text>;
    }

    const parts: { text: string; highlighted: boolean }[] = [];
    let remaining = text;

    highlights.forEach((word) => {
      const idx = remaining.indexOf(word);
      if (idx >= 0) {
        if (idx > 0) parts.push({ text: remaining.substring(0, idx), highlighted: false });
        parts.push({ text: word, highlighted: true });
        remaining = remaining.substring(idx + word.length);
      }
    });
    if (remaining) parts.push({ text: remaining, highlighted: false });

    if (parts.length === 0) {
      return <Text style={[styles.verseText, { color: colors.text }]}>{text}</Text>;
    }

    return (
      <Text style={[styles.verseText, { color: colors.text }]}>
        {parts.map((part, i) =>
          part.highlighted ? (
            <Text key={i} style={[styles.highlight, { backgroundColor: colors.warningLight, color: colors.warning }]}>
              {part.text}
            </Text>
          ) : (
            <Text key={i}>{part.text}</Text>
          )
        )}
      </Text>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="المتشابهات" subtitle={getSubtitle()} showBack />

      {/* Level Filter */}
      <View style={styles.levelFilter}>
        {levels.map((level) => {
          const isActive =
            selectedLevel === level.key ||
            (level.key === 'surah' && selectedLevel === 'surah') ||
            (level.key === 'juz' && selectedLevel === 'juz');

          return (
            <TouchableOpacity
              key={level.key}
              style={[
                styles.levelBtn,
                {
                  backgroundColor: isActive ? level.color : colors.surfaceVariant,
                  borderColor: isActive ? level.color : colors.border,
                },
              ]}
              onPress={() => handleLevelPress(level.key)}
            >
              <Ionicons
                name={level.icon as any}
                size={16}
                color={isActive ? '#FFF' : colors.textSecondary}
              />
              <Text
                style={[
                  styles.levelBtnText,
                  { color: isActive ? '#FFF' : colors.textSecondary },
                ]}
              >
                {level.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Stats */}
      <View style={[styles.statsRow, { borderColor: colors.border }]}>
        <Text style={[styles.statsText, { color: colors.textSecondary }]}>
          {filteredData.length} مجموعة متشابهة
        </Text>
      </View>

      {/* Groups List */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const isExpanded = expandedGroup === item.id;
          const levelColor = getLevelColor(item.level);

          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setExpandedGroup(isExpanded ? null : item.id)}
              style={[styles.groupCard, { backgroundColor: colors.surface, borderColor: colors.borderLight }, Shadows.sm]}
            >
              {/* Group Header */}
              <View style={styles.groupHeader}>
                <View style={[styles.levelBadge, { backgroundColor: levelColor + '15' }]}>
                  <Text style={[styles.levelBadgeText, { color: levelColor }]}>
                    {getLevelLabel(item.level)}
                  </Text>
                </View>
                <Text style={[styles.groupTitle, { color: colors.text }]}>{item.title}</Text>
                <View style={styles.groupHeaderRight}>
                  <Text style={[styles.versesCount, { color: colors.textLight }]}>
                    {item.verses.length} آيات
                  </Text>
                  <Ionicons
                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color={colors.textLight}
                  />
                </View>
              </View>

              {/* Expanded Content */}
              {isExpanded && (
                <View style={[styles.groupContent, { borderTopColor: colors.borderLight }]}>
                  {/* Description */}
                  <Text style={[styles.groupDesc, { color: colors.textSecondary }]}>
                    {item.description}
                  </Text>

                  {/* Verses Comparison */}
                  {item.verses.map((verse, vIndex) => (
                    <View
                      key={vIndex}
                      style={[styles.verseItem, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}
                    >
                      <View style={styles.verseHeader}>
                        <Text style={[styles.verseSurah, { color: levelColor }]}>
                          {verse.surahName} ({verse.ayahNumber})
                        </Text>
                      </View>
                      {renderHighlightedText(verse.text, verse.highlightWords)}
                    </View>
                  ))}

                  {/* Memorization Tip */}
                  <View style={[styles.tipCard, { backgroundColor: colors.goldLight, borderColor: colors.gold }]}>
                    <Ionicons name="bulb" size={20} color={colors.gold} />
                    <View style={styles.tipContent}>
                      <Text style={[styles.tipLabel, { color: colors.gold }]}>نصيحة للتمييز:</Text>
                      <Text style={[styles.tipText, { color: colors.text }]}>{item.tip}</Text>
                    </View>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          );
        }}
      />

      {/* Surah Picker Modal */}
      <Modal visible={showSurahPicker} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
              <TouchableOpacity onPress={() => setShowSurahPicker(false)}>
                <Ionicons name="close-circle" size={28} color={colors.textSecondary} />
              </TouchableOpacity>
              <Text style={[styles.modalTitle, { color: colors.text }]}>اختر السورة</Text>
              <View style={{ width: 28 }} />
            </View>
            <FlatList
              data={availableSurahs}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.pickerList}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.pickerItem,
                    {
                      backgroundColor: selectedSurahId === item.id ? '#E67E22' + '15' : colors.surfaceVariant,
                      borderColor: selectedSurahId === item.id ? '#E67E22' : colors.border,
                    },
                  ]}
                  onPress={() => handleSurahSelect(item.id, item.name)}
                >
                  <View style={[styles.pickerNumBadge, { backgroundColor: '#E67E22' }]}>
                    <Text style={styles.pickerNumText}>{item.id}</Text>
                  </View>
                  <Text style={[styles.pickerItemText, { color: colors.text }]}>{item.name}</Text>
                  <View style={styles.pickerItemRight}>
                    <Text style={[styles.pickerItemCount, { color: colors.textLight }]}>
                      {item.count} مجموعة
                    </Text>
                    <Ionicons name="chevron-forward" size={18} color={colors.textLight} />
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Juz Picker Modal */}
      <Modal visible={showJuzPicker} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
              <TouchableOpacity onPress={() => setShowJuzPicker(false)}>
                <Ionicons name="close-circle" size={28} color={colors.textSecondary} />
              </TouchableOpacity>
              <Text style={[styles.modalTitle, { color: colors.text }]}>اختر المجموعة</Text>
              <View style={{ width: 28 }} />
            </View>
            <FlatList
              data={juzGroups}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.pickerList}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={[
                    styles.pickerItem,
                    {
                      backgroundColor: selectedJuzGroupId === item.id ? '#8E44AD' + '15' : colors.surfaceVariant,
                      borderColor: selectedJuzGroupId === item.id ? '#8E44AD' : colors.border,
                    },
                  ]}
                  onPress={() => handleJuzSelect(item.id, item.title)}
                >
                  <View style={[styles.pickerNumBadge, { backgroundColor: '#8E44AD' }]}>
                    <Text style={styles.pickerNumText}>{index + 1}</Text>
                  </View>
                  <View style={styles.pickerItemTextWrap}>
                    <Text style={[styles.pickerItemText, { color: colors.text }]} numberOfLines={2}>
                      {item.title}
                    </Text>
                  </View>
                  <View style={styles.pickerItemRight}>
                    <Text style={[styles.pickerItemCount, { color: colors.textLight }]}>
                      {item.versesCount} آيات
                    </Text>
                    <Ionicons name="chevron-forward" size={18} color={colors.textLight} />
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  levelFilter: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.xs,
  },
  levelBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    gap: 4,
  },
  levelBtnText: { fontSize: Fonts.sizes.xs, fontWeight: '600' },
  statsRow: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
  },
  statsText: { fontSize: Fonts.sizes.sm, textAlign: 'center' },
  listContent: { padding: Spacing.md, paddingBottom: 100 },
  groupCard: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
  },
  groupHeader: {
    padding: Spacing.md,
    gap: Spacing.xs,
  },
  levelBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  levelBadgeText: { fontSize: Fonts.sizes.xs, fontWeight: '600' },
  groupTitle: { fontSize: Fonts.sizes.md, fontWeight: '700', writingDirection: 'rtl' },
  groupHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  versesCount: { fontSize: Fonts.sizes.xs },
  groupContent: {
    padding: Spacing.md,
    borderTopWidth: 1,
    gap: Spacing.md,
  },
  groupDesc: { fontSize: Fonts.sizes.sm, lineHeight: 22, writingDirection: 'rtl' },
  verseItem: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
  },
  verseHeader: {
    marginBottom: Spacing.xs,
  },
  verseSurah: { fontSize: Fonts.sizes.sm, fontWeight: '600' },
  verseText: {
    fontSize: Fonts.sizes.lg,
    lineHeight: 34,
    textAlign: 'center',
  },
  highlight: {
    fontWeight: '700',
    paddingHorizontal: 2,
    borderRadius: 4,
  },
  tipCard: {
    flexDirection: 'row',
    gap: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
  },
  tipContent: { flex: 1 },
  tipLabel: { fontSize: Fonts.sizes.sm, fontWeight: '700', marginBottom: 4 },
  tipText: { fontSize: Fonts.sizes.sm, lineHeight: 22, writingDirection: 'rtl' },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    maxHeight: '80%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 30,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: Fonts.sizes.lg,
    fontWeight: '700',
  },
  pickerList: {
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  pickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    gap: Spacing.md,
    marginBottom: Spacing.xs,
  },
  pickerNumBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerNumText: {
    color: '#FFF',
    fontSize: Fonts.sizes.sm,
    fontWeight: '700',
  },
  pickerItemTextWrap: {
    flex: 1,
  },
  pickerItemText: {
    fontSize: Fonts.sizes.md,
    fontWeight: '600',
    writingDirection: 'rtl',
    flex: 1,
  },
  pickerItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  pickerItemCount: {
    fontSize: Fonts.sizes.xs,
  },
});
