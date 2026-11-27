import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Dimensions,
  I18nManager,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import {  Fonts, Spacing, BorderRadius, Shadows, rtlRow, rtlAlign, rtlText } from '../../constants/theme';
import Header from '../../components/ui/Header';
import { mutashabihatData, MutashabihatGroup } from '../../data/mutashabihat';
import { mutashabihatByAyah } from '../../data/mutashabihat-from-waqar';
import { srmdnPairs, srmdnCategories, SrmdnPair } from '../../data/mutashabihat-from-srmdn';
import { quranData } from '../../data/quran';
import { surahsMetadata } from '../../data/metadata';
import { audioService } from '../../services/audioService';

const { width } = Dimensions.get('window');

type MainTab = 'comprehensive' | 'rules' | 'thematic';
type ThematicLevel = 'all' | 'surah' | 'juz' | 'quran';

const toArabicDigits = (num: number | string): string => {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(num).replace(/[0-9]/g, (d) => arabicDigits[parseInt(d, 10)]);
};

const getAyahObj = (surahId: number, ayahNumber: number) => {
  const surah = quranData.find((s) => s.id === surahId);
  return surah?.ayahs.find((a) => a.ayahNumber === ayahNumber);
};

const getAyahText = (surahId: number, ayahNumber: number): string => {
  return getAyahObj(surahId, ayahNumber)?.text || '';
};

const formatSurahName = (name: string): string => {
  if (!name) return '';
  if (name.startsWith('سورة') || name.startsWith('سُورَة')) return name;
  return `سورة ${name}`;
};

export default function MutashabihatScreen() {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<MainTab>('comprehensive');

  // --- COMPREHENSIVE TAB STATE ---
  const [selectedWaqarSurahId, setSelectedWaqarSurahId] = useState<number>(2); // Default to Al-Baqarah
  const [showSurahModal, setShowSurahModal] = useState<boolean>(false);
  const [surahFilterQuery, setSurahFilterQuery] = useState<string>('');
  const [expandedWaqarAyah, setExpandedWaqarAyah] = useState<number | null>(null);

  // --- RULES TAB STATE (srmdn) ---
  const [selectedRuleCategory, setSelectedRuleCategory] = useState<string | null>(null);
  const [expandedRuleIndex, setExpandedRuleIndex] = useState<number | null>(null);

  // --- THEMATIC TAB STATE (55 groups) ---
  const [selectedThematicLevel, setSelectedThematicLevel] = useState<ThematicLevel>('all');
  const [expandedThematicGroup, setExpandedThematicGroup] = useState<string | null>(null);

  // Audio Play helper
  const handlePlayAyah = useCallback((surahId: number, ayahNumber: number) => {
    const ayah = getAyahObj(surahId, ayahNumber);
    if (ayah) {
      audioService.playAyah(ayah.id);
    }
  }, []);

  // --- COMPREHENSIVE DATA PREPARATION ---
  // Precompute mutashabihat counts per surah
  const surahCountsMap = useMemo(() => {
    const map = new Map<number, number>();
    Object.keys(mutashabihatByAyah).forEach((key) => {
      const sId = parseInt(key.split(':')[0], 10);
      map.set(sId, (map.get(sId) || 0) + 1);
    });
    return map;
  }, []);

  const currentWaqarSurahMeta = useMemo(() => {
    return surahsMetadata.find((s) => s.id === selectedWaqarSurahId) || surahsMetadata[1];
  }, [selectedWaqarSurahId]);

  const filteredSurahsList = useMemo(() => {
    if (!surahFilterQuery.trim()) return surahsMetadata;
    const q = surahFilterQuery.trim().toLowerCase();
    return surahsMetadata.filter(
      (s) =>
        s.name.includes(q) ||
        s.nameEn.toLowerCase().includes(q) ||
        s.id.toString() === q
    );
  }, [surahFilterQuery]);

  const currentSurahWaqarItems = useMemo(() => {
    const prefix = `${selectedWaqarSurahId}:`;
    const items: {
      sourceSurahId: number;
      sourceAyahNum: number;
      sourceAyahText: string;
      sourceAyahId: number;
      muts: {
        surahId: number;
        surahName: string;
        ayahNumber: number;
        ayahText: string;
        globalAyahId: number;
      }[];
    }[] = [];

    Object.entries(mutashabihatByAyah).forEach(([key, groups]) => {
      if (key.startsWith(prefix)) {
        const aNum = parseInt(key.split(':')[1], 10);
        const sAyah = getAyahObj(selectedWaqarSurahId, aNum);
        const flatMuts: {
          surahId: number;
          surahName: string;
          ayahNumber: number;
          ayahText: string;
          globalAyahId: number;
        }[] = [];

        groups.forEach((subgroup) => {
          subgroup.forEach((m) => {
            const mObj = getAyahObj(m.surahId, m.ayahNumber);
            const meta = surahsMetadata.find((s) => s.id === m.surahId);
            flatMuts.push({
              surahId: m.surahId,
              surahName: meta?.name || `سورة ${m.surahId}`,
              ayahNumber: m.ayahNumber,
              ayahText: mObj?.text || '',
              globalAyahId: mObj?.id || 0,
            });
          });
        });

        items.push({
          sourceSurahId: selectedWaqarSurahId,
          sourceAyahNum: aNum,
          sourceAyahText: sAyah?.text || '',
          sourceAyahId: sAyah?.id || 0,
          muts: flatMuts,
        });
      }
    });

    return items.sort((a, b) => a.sourceAyahNum - b.sourceAyahNum);
  }, [selectedWaqarSurahId]);

  // --- RULES (SRMDN) DATA PREPARATION ---
  const filteredRulePairs = useMemo(() => {
    if (!selectedRuleCategory) return srmdnPairs;
    return srmdnPairs.filter((p) => p.category === selectedRuleCategory);
  }, [selectedRuleCategory]);

  // --- THEMATIC DATA PREPARATION ---
  const filteredThematicGroups = useMemo(() => {
    if (selectedThematicLevel === 'all') return mutashabihatData;
    return mutashabihatData.filter((g) => g.level === selectedThematicLevel);
  }, [selectedThematicLevel]);

  const renderHighlightedThematicText = (text: string, highlights: string[]) => {
    if (!highlights || highlights.length === 0) {
      return <Text style={[styles.thematicVerseText, { color: colors.text }]}>{text}</Text>;
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

    return (
      <Text style={[styles.thematicVerseText, { color: colors.text }]}>
        {parts.map((p, i) =>
          p.highlighted ? (
            <Text
              key={i}
              style={[
                styles.highlightWord,
                { backgroundColor: colors.warningLight, color: colors.warning },
              ]}
            >
              {p.text}
            </Text>
          ) : (
            <Text key={i}>{p.text}</Text>
          )
        )}
      </Text>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title="المتشابهات القرآنية"
        subtitle="الفهرس الشامل • الضوابط التفسيرية • المجموعات الموضوعية"
        source="من كتب التفسير وعلوم القرآن"
        showBack
      />

      {/* Top Main Mode Switcher */}
      <View style={[styles.tabsBar, { backgroundColor: colors.surfaceVariant }]}>
        <TouchableOpacity
          style={[
            styles.tabItem,
            activeTab === 'comprehensive' && [styles.activeTabItem, { backgroundColor: colors.primary }],
          ]}
          onPress={() => setActiveTab('comprehensive')}
        >
          <Ionicons
            name="book"
            size={16}
            color={activeTab === 'comprehensive' ? '#FFF' : colors.textSecondary}
          />
          <Text
            style={[
              styles.tabItemText,
              { color: activeTab === 'comprehensive' ? '#FFF' : colors.textSecondary },
            ]}
          >
            الشامل ({toArabicDigits(1307)})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabItem,
            activeTab === 'rules' && [styles.activeTabItem, { backgroundColor: colors.primary }],
          ]}
          onPress={() => setActiveTab('rules')}
        >
          <Ionicons
            name="git-compare"
            size={16}
            color={activeTab === 'rules' ? '#FFF' : colors.textSecondary}
          />
          <Text
            style={[
              styles.tabItemText,
              { color: activeTab === 'rules' ? '#FFF' : colors.textSecondary },
            ]}
          >
            الضوابط والعلل ({toArabicDigits(283)})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabItem,
            activeTab === 'thematic' && [styles.activeTabItem, { backgroundColor: colors.primary }],
          ]}
          onPress={() => setActiveTab('thematic')}
        >
          <Ionicons
            name="layers"
            size={16}
            color={activeTab === 'thematic' ? '#FFF' : colors.textSecondary}
          />
          <Text
            style={[
              styles.tabItemText,
              { color: activeTab === 'thematic' ? '#FFF' : colors.textSecondary },
            ]}
          >
            الموضوعية ({toArabicDigits(55)})
          </Text>
        </TouchableOpacity>
      </View>

      {/* ======================================================== */}
      {/* 1. COMPREHENSIVE TAB (فهرس المتشابهات الشامل)             */}
      {/* ======================================================== */}
      {activeTab === 'comprehensive' && (
        <View style={styles.tabContentContainer}>
          {/* Selected Surah Selector Button */}
          <View style={styles.surahSelectorRow}>
            <TouchableOpacity
              style={[styles.surahSelectBtn, { backgroundColor: colors.surface, borderColor: colors.primary }, Shadows.sm]}
              onPress={() => {
                setSurahFilterQuery('');
                setShowSurahModal(true);
              }}
            >
              <View style={[styles.surahNumBadge, { backgroundColor: colors.primaryLight }]}>
                <Text style={[styles.surahNumText, { color: colors.primary }]}>
                  {toArabicDigits(currentWaqarSurahMeta.id)}
                </Text>
              </View>
              <View style={styles.surahSelectDetails}>
                <Text style={[styles.surahSelectName, { color: colors.text }]}>
                  {formatSurahName(currentWaqarSurahMeta.name)}
                </Text>
                <Text style={[styles.surahSelectCount, { color: colors.textSecondary }]}>
                  {currentSurahWaqarItems.length > 0
                    ? `${toArabicDigits(currentSurahWaqarItems.length)} آية لها متشابهات في القرآن`
                    : 'لا توجد متشابهات مسجلة لهذه السورة'}
                </Text>
              </View>
              <Ionicons name="swap-horizontal" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>

          {/* List of Mutashabihat Ayahs */}
          <FlatList
            data={currentSurahWaqarItems}
            keyExtractor={(item) => `${item.sourceSurahId}_${item.sourceAyahNum}`}
            contentContainerStyle={styles.listPadding}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="information-circle-outline" size={48} color={colors.textLight} />
                <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                  لا توجد متشابهات مسجلة لسورة {currentWaqarSurahMeta.name}
                </Text>
                <TouchableOpacity
                  style={[styles.emptyChangeBtn, { backgroundColor: colors.primaryLight }]}
                  onPress={() => setShowSurahModal(true)}
                >
                  <Text style={[styles.emptyChangeBtnText, { color: colors.primary }]}>
                    اختر سورة أخرى من الـ 114 سورة
                  </Text>
                </TouchableOpacity>
              </View>
            }
            renderItem={({ item, index }) => {
              const isExpanded = expandedWaqarAyah === item.sourceAyahNum;

              return (
                <View
                  style={[
                    styles.waqarCard,
                    { backgroundColor: colors.surface, borderColor: colors.borderLight },
                    Shadows.sm,
                  ]}
                >
                  {/* Source Ayah Header */}
                  <View style={styles.waqarSourceHeader}>
                    <View style={styles.waqarAyahBadge}>
                      <Text style={[styles.waqarAyahBadgeText, { color: colors.primary }]}>
                        الآية {toArabicDigits(item.sourceAyahNum)}
                      </Text>
                    </View>
                    <View style={styles.waqarMutsCount}>
                      <Text style={[styles.waqarMutsCountText, { color: colors.secondary }]}>
                        {toArabicDigits(item.muts.length)} مواضع متشابهة
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={[styles.waqarAudioBtn, { backgroundColor: colors.primaryLight }]}
                      onPress={() => handlePlayAyah(item.sourceSurahId, item.sourceAyahNum)}
                    >
                      <Ionicons name="volume-high" size={16} color={colors.primary} />
                    </TouchableOpacity>
                  </View>

                  {/* Source Ayah Text */}
                  <Text style={[styles.waqarSourceText, { color: colors.text }]}>
                    {item.sourceAyahText} ﴿{toArabicDigits(item.sourceAyahNum)}﴾
                  </Text>

                  {/* Matching Similar Ayahs */}
                  <View style={styles.waqarMutsContainer}>
                    <Text style={[styles.waqarMutsHeader, { color: colors.secondary }]}>
                      تتشابه مع الآيات التالية في القرآن:
                    </Text>

                    {item.muts.map((mut, mIdx) => (
                      <View
                        key={mIdx}
                        style={[
                          styles.waqarMutItem,
                          { backgroundColor: colors.surfaceVariant, borderColor: colors.border },
                        ]}
                      >
                        <View style={styles.waqarMutMetaRow}>
                          <View style={styles.waqarMutRef}>
                            <Ionicons name="git-branch" size={14} color={colors.secondary} />
                            <Text style={[styles.waqarMutSurahName, { color: colors.secondary }]}>
                              {formatSurahName(mut.surahName)} • الآية {toArabicDigits(mut.ayahNumber)}
                            </Text>
                          </View>
                          <TouchableOpacity
                            style={[styles.waqarAudioBtnSmall, { backgroundColor: colors.primaryLight }]}
                            onPress={() => handlePlayAyah(mut.surahId, mut.ayahNumber)}
                          >
                            <Ionicons name="volume-high" size={14} color={colors.primary} />
                          </TouchableOpacity>
                        </View>
                        <Text style={[styles.waqarMutText, { color: colors.text }]}>
                          {mut.ayahText} ﴿{toArabicDigits(mut.ayahNumber)}﴾
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              );
            }}
          />
        </View>
      )}

      {/* ======================================================== */}
      {/* 2. RULES TAB (الضوابط والعلل التفسيرية - 283 زوجاً)       */}
      {/* ======================================================== */}
      {activeTab === 'rules' && (
        <View style={styles.tabContentContainer}>
          {/* Category Chips Scroll */}
          <View style={styles.chipsRowContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsScroll}>
              <TouchableOpacity
                style={[
                  styles.categoryChip,
                  {
                    backgroundColor: selectedRuleCategory === null ? colors.primary : colors.surface,
                    borderColor: colors.primary,
                  },
                ]}
                onPress={() => setSelectedRuleCategory(null)}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    { color: selectedRuleCategory === null ? '#FFF' : colors.primary },
                  ]}
                >
                  الكل ({toArabicDigits(srmdnPairs.length)})
                </Text>
              </TouchableOpacity>

              {srmdnCategories.map((cat) => {
                const count = srmdnPairs.filter((p) => p.category === cat.id).length;
                if (count === 0) return null;
                const isSelected = selectedRuleCategory === cat.id;

                return (
                  <TouchableOpacity
                    key={cat.id}
                    style={[
                      styles.categoryChip,
                      {
                        backgroundColor: isSelected ? cat.color : colors.surface,
                        borderColor: cat.color,
                      },
                    ]}
                    onPress={() => setSelectedRuleCategory(cat.id)}
                  >
                    <Text
                      style={[
                        styles.categoryChipText,
                        { color: isSelected ? '#FFF' : cat.color },
                      ]}
                    >
                      {cat.name} ({toArabicDigits(count)})
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Rules Pairs List */}
          <FlatList
            data={filteredRulePairs}
            extraData={expandedRuleIndex}
            keyExtractor={(_, idx) => idx.toString()}
            contentContainerStyle={styles.listPadding}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              const isExpanded = expandedRuleIndex === index;
              const cat = srmdnCategories.find((c) => c.id === item.category);
              const catColor = cat?.color || colors.primary;

              const [s1Str, a1Str] = item.ayah1.split(':');
              const [s2Str, a2Str] = item.ayah2.split(':');
              const s1 = parseInt(s1Str, 10);
              const a1 = parseInt(a1Str, 10);
              const s2 = parseInt(s2Str, 10);
              const a2 = parseInt(a2Str, 10);

              const s1Meta = surahsMetadata.find((s) => s.id === s1);
              const s2Meta = surahsMetadata.find((s) => s.id === s2);
              const t1 = getAyahText(s1, a1);
              const t2 = getAyahText(s2, a2);

              return (
                <View
                  style={[
                    styles.ruleCard,
                    { backgroundColor: colors.surface, borderColor: catColor + '40' },
                    Shadows.sm,
                  ]}
                >
                  {/* Category Tag */}
                  <View style={styles.ruleCardHeader}>
                    <View style={[styles.catBadge, { backgroundColor: catColor + '18' }]}>
                      <Text style={[styles.catBadgeText, { color: catColor }]}>{cat?.name || item.category}</Text>
                    </View>
                    <Text style={[styles.pairIndexText, { color: colors.textLight }]}>
                      موضع {toArabicDigits(index + 1)} من {toArabicDigits(filteredRulePairs.length)}
                    </Text>
                  </View>

                  {/* Ayah 1 Section */}
                  <View style={[styles.ruleAyahBox, { backgroundColor: colors.surfaceVariant }]}>
                    <View style={styles.ruleAyahMetaRow}>
                      <Text style={[styles.ruleAyahRef, { color: catColor }]}>
                        الموضع الأول: {formatSurahName(s1Meta?.name || `سورة ${s1}`)} • الآية {toArabicDigits(a1)}
                      </Text>
                      <TouchableOpacity
                        style={[styles.waqarAudioBtnSmall, { backgroundColor: colors.primaryLight }]}
                        onPress={() => handlePlayAyah(s1, a1)}
                      >
                        <Ionicons name="volume-high" size={14} color={colors.primary} />
                      </TouchableOpacity>
                    </View>
                    <Text style={[styles.ruleAyahText, { color: colors.text }]}>
                      {t1} ﴿{toArabicDigits(a1)}﴾
                    </Text>
                  </View>

                  {/* Comparison Divider */}
                  <View style={styles.swapDivider}>
                    <Ionicons name="swap-vertical" size={20} color={catColor} />
                  </View>

                  {/* Ayah 2 Section */}
                  <View style={[styles.ruleAyahBox, { backgroundColor: colors.surfaceVariant }]}>
                    <View style={styles.ruleAyahMetaRow}>
                      <Text style={[styles.ruleAyahRef, { color: catColor }]}>
                        الموضع الثاني: {formatSurahName(s2Meta?.name || `سورة ${s2}`)} • الآية {toArabicDigits(a2)}
                      </Text>
                      <TouchableOpacity
                        style={[styles.waqarAudioBtnSmall, { backgroundColor: colors.primaryLight }]}
                        onPress={() => handlePlayAyah(s2, a2)}
                      >
                        <Ionicons name="volume-high" size={14} color={colors.primary} />
                      </TouchableOpacity>
                    </View>
                    <Text style={[styles.ruleAyahText, { color: colors.text }]}>
                      {t2} ﴿{toArabicDigits(a2)}﴾
                    </Text>
                  </View>

                  {/* Toggle Note / Explanation */}
                  <TouchableOpacity
                    style={[styles.ruleNoteToggle, { backgroundColor: catColor + '12' }]}
                    onPress={() => setExpandedRuleIndex(isExpanded ? null : index)}
                  >
                    <Ionicons name={isExpanded ? 'chevron-up' : 'bulb-outline'} size={18} color={catColor} />
                    <Text style={[styles.ruleNoteToggleText, { color: catColor }]}>
                      {isExpanded ? 'إخفاء علة الفرق' : 'اضغط لمعرفة الفرق والعلة التفسيرية'}
                    </Text>
                  </TouchableOpacity>

                  {isExpanded && (
                    <View style={[styles.ruleNoteCard, { backgroundColor: colors.goldLight, borderColor: colors.gold }]}>
                      <View style={styles.ruleNoteHeader}>
                        <Ionicons name="bulb" size={18} color={colors.gold} />
                        <Text style={[styles.ruleNoteTitle, { color: colors.gold }]}>الضابط والعلة التفسيرية:</Text>
                      </View>
                      <Text style={[styles.ruleNoteBody, { color: colors.text }]}>{item.noteAr}</Text>
                    </View>
                  )}
                </View>
              );
            }}
          />
        </View>
      )}

      {/* ======================================================== */}
      {/* 3. THEMATIC TAB (المجموعات الموضوعية - 55 مجموعة)          */}
      {/* ======================================================== */}
      {activeTab === 'thematic' && (
        <View style={styles.tabContentContainer}>
          {/* Level Filter Buttons */}
          <View style={styles.levelFilterRow}>
            {[
              { key: 'all', label: 'الكل' },
              { key: 'surah', label: 'السورة' },
              { key: 'juz', label: 'الجزء' },
              { key: 'quran', label: 'القرآن' },
            ].map((lvl) => (
              <TouchableOpacity
                key={lvl.key}
                style={[
                  styles.thematicLevelBtn,
                  selectedThematicLevel === lvl.key && [
                    styles.activeThematicLevelBtn,
                    { backgroundColor: colors.primary },
                  ],
                ]}
                onPress={() => setSelectedThematicLevel(lvl.key as ThematicLevel)}
              >
                <Text
                  style={[
                    styles.thematicLevelText,
                    { color: selectedThematicLevel === lvl.key ? '#FFF' : colors.textSecondary },
                  ]}
                >
                  {lvl.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Groups List */}
          <FlatList
            data={filteredThematicGroups}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listPadding}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const isExpanded = expandedThematicGroup === item.id;

              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setExpandedThematicGroup(isExpanded ? null : item.id)}
                  style={[
                    styles.thematicCard,
                    { backgroundColor: colors.surface, borderColor: colors.borderLight },
                    Shadows.sm,
                  ]}
                >
                  {/* Thematic Header */}
                  <View style={styles.thematicHeader}>
                    <View style={[styles.thematicLevelBadge, { backgroundColor: colors.primaryLight }]}>
                      <Text style={[styles.thematicLevelBadgeText, { color: colors.primary }]}>
                        {item.level === 'surah' ? 'السورة' : item.level === 'juz' ? 'الجزء' : 'القرآن'}
                      </Text>
                    </View>
                    <Text style={[styles.thematicTitle, { color: colors.text }]}>{item.title}</Text>
                    <Ionicons
                      name={isExpanded ? 'chevron-up' : 'chevron-down'}
                      size={20}
                      color={colors.textLight}
                    />
                  </View>

                  {/* Expanded Thematic Verses */}
                  {isExpanded && (
                    <View style={[styles.thematicContent, { borderTopColor: colors.borderLight }]}>
                      <Text style={[styles.thematicDesc, { color: colors.textSecondary }]}>
                        {item.description}
                      </Text>

                      {item.verses.map((verse, vIdx) => (
                        <View
                          key={vIdx}
                          style={[
                            styles.thematicVerseCard,
                            { backgroundColor: colors.surfaceVariant, borderColor: colors.border },
                          ]}
                        >
                          <View style={styles.thematicVerseMetaRow}>
                            <Text style={[styles.thematicVerseSurah, { color: colors.primary }]}>
                              سورة {verse.surahName} • الآية {toArabicDigits(verse.ayahNumber)}
                            </Text>
                            <TouchableOpacity
                              style={[styles.waqarAudioBtnSmall, { backgroundColor: colors.primaryLight }]}
                              onPress={() => handlePlayAyah(verse.surahId, verse.ayahNumber)}
                            >
                              <Ionicons name="volume-high" size={14} color={colors.primary} />
                            </TouchableOpacity>
                          </View>
                          {renderHighlightedThematicText(verse.text, verse.highlightWords)}
                        </View>
                      ))}

                      {/* Memorization Tip */}
                      <View style={[styles.thematicTipCard, { backgroundColor: colors.goldLight, borderColor: colors.gold }]}>
                        <Ionicons name="bulb" size={20} color={colors.gold} />
                        <View style={styles.thematicTipBody}>
                          <Text style={[styles.thematicTipLabel, { color: colors.gold }]}>نصيحة للتمييز:</Text>
                          <Text style={[styles.thematicTipText, { color: colors.text }]}>{item.tip}</Text>
                        </View>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}

      {/* ======================================================== */}
      {/* SURAH PICKER MODAL (اختيار السورة من جميع سور القرآن)    */}
      {/* ======================================================== */}
      <Modal visible={showSurahModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: colors.background }]}>
            <View style={[styles.modalHeader, { borderBottomColor: colors.borderLight }]}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>اختر السورة</Text>
              <TouchableOpacity onPress={() => setShowSurahModal(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            {/* Search Input */}
            <View style={[styles.modalSearchBar, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Ionicons name="search" size={20} color={colors.textLight} />
              <TextInput
                style={[styles.modalSearchInput, { color: colors.text }]}
                placeholder="ابحث باسم السورة أو رقمها..."
                placeholderTextColor={colors.textLight}
                value={surahFilterQuery}
                onChangeText={setSurahFilterQuery}
              />
              {surahFilterQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSurahFilterQuery('')}>
                  <Ionicons name="close-circle" size={18} color={colors.textLight} />
                </TouchableOpacity>
              )}
            </View>

            {/* Surahs List */}
            <FlatList
              data={filteredSurahsList}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.modalListPadding}
              renderItem={({ item }) => {
                const count = surahCountsMap.get(item.id) || 0;
                const isSelected = selectedWaqarSurahId === item.id;

                return (
                  <TouchableOpacity
                    style={[
                      styles.modalSurahItem,
                      {
                        backgroundColor: isSelected ? colors.primaryLight : colors.surface,
                        borderColor: isSelected ? colors.primary : colors.borderLight,
                      },
                    ]}
                    onPress={() => {
                      setSelectedWaqarSurahId(item.id);
                      setShowSurahModal(false);
                    }}
                  >
                    <View
                      style={[
                        styles.modalSurahNum,
                        { backgroundColor: isSelected ? colors.primary : colors.surfaceVariant },
                      ]}
                    >
                      <Text
                        style={[
                          styles.modalSurahNumText,
                          { color: isSelected ? '#FFF' : colors.textSecondary },
                        ]}
                      >
                        {toArabicDigits(item.id)}
                      </Text>
                    </View>

                    <View style={styles.modalSurahInfo}>
                      <Text style={[styles.modalSurahName, { color: colors.text }]}>سورة {item.name}</Text>
                      <Text style={[styles.modalSurahMeta, { color: colors.textSecondary }]}>
                        {item.nameEn} • {toArabicDigits(item.versesCount)} آية
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.modalCountBadge,
                        { backgroundColor: count > 0 ? colors.secondaryLight : colors.surfaceVariant },
                      ]}
                    >
                      <Text
                        style={[
                          styles.modalCountBadgeText,
                          { color: count > 0 ? colors.secondary : colors.textLight },
                        ]}
                      >
                        {count > 0 ? `${toArabicDigits(count)} موضع` : 'لا يوجد'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabsBar: {
    flexDirection: 'row',
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    padding: 4,
    gap: 4,
  },
  tabItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    gap: 6,
  },
  activeTabItem: {},
  tabItemText: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '700',
  },
  tabContentContainer: {
    flex: 1,
  },
  listPadding: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 40,
    gap: Spacing.md,
  },
  // --- Comprehensive Styles ---
  surahSelectorRow: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  surahSelectBtn: {
    flexDirection: rtlRow,
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    gap: Spacing.md,
  },
  surahNumBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  surahNumText: {
    fontSize: Fonts.sizes.sm,
    fontWeight: '800',
  },
  surahSelectDetails: {
    flex: 1,
    alignItems: rtlAlign,
  },
  surahSelectName: {
    fontSize: Fonts.sizes.md,
    fontWeight: '800',
    textAlign: rtlText,
    writingDirection: 'rtl',
    width: '100%',
  },
  surahSelectCount: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '700',
    marginTop: 2,
    textAlign: rtlText,
    writingDirection: 'rtl',
    width: '100%',
  },
  waqarCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    gap: Spacing.md,
  },
  waqarSourceHeader: {
    flexDirection: rtlRow,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  waqarAyahBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(22, 160, 133, 0.1)',
  },
  waqarAyahBadgeText: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '800',
  },
  waqarMutsCount: {
    flex: 1,
    marginHorizontal: Spacing.sm,
  },
  waqarMutsCountText: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '700',
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  waqarAudioBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  waqarAudioBtnSmall: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  waqarSourceText: {
    fontSize: 20,
    fontFamily: Fonts.arabic.quran,
    lineHeight: 38,
    textAlign: rtlText,
    writingDirection: 'rtl',
    fontWeight: '700',
    color: '#0F172A',
  },
  waqarMutsContainer: {
    gap: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.06)',
    paddingTop: Spacing.sm,
  },
  waqarMutsHeader: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '800',
    textAlign: rtlText,
    writingDirection: 'rtl',
  },
  waqarMutItem: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    gap: Spacing.xs,
  },
  waqarMutMetaRow: {
    flexDirection: rtlRow,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  waqarMutRef: {
    flexDirection: rtlRow,
    alignItems: 'center',
    gap: 4,
  },
  waqarMutSurahName: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '800',
    textAlign: rtlText,
    writingDirection: 'rtl',
  },
  waqarMutText: {
    fontSize: 18,
    fontFamily: Fonts.arabic.quran,
    lineHeight: 34,
    textAlign: rtlText,
    writingDirection: 'rtl',
    fontWeight: '600',
    color: '#1E293B',
  },
  // --- Rules Styles ---
  chipsRowContainer: {
    paddingVertical: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  chipsScroll: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.xs,
  },
  categoryChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  categoryChipText: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '700',
  },
  ruleCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  ruleCardHeader: {
    flexDirection: rtlRow,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  catBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
  },
  catBadgeText: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '800',
  },
  pairIndexText: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '700',
    textAlign: rtlText,
    writingDirection: 'rtl',
  },
  ruleAyahBox: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    gap: 4,
  },
  ruleAyahMetaRow: {
    flexDirection: rtlRow,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ruleAyahRef: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '800',
    textAlign: rtlText,
    writingDirection: 'rtl',
  },
  ruleAyahText: {
    fontSize: 18,
    fontFamily: Fonts.arabic.quran,
    lineHeight: 34,
    textAlign: rtlText,
    writingDirection: 'rtl',
    fontWeight: '700',
    color: '#0F172A',
  },
  swapDivider: {
    alignItems: 'center',
    marginVertical: -2,
  },
  ruleNoteToggle: {
    flexDirection: rtlRow,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
    gap: 6,
  },
  ruleNoteToggleText: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '800',
  },
  ruleNoteCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    gap: Spacing.xs,
  },
  ruleNoteHeader: {
    flexDirection: rtlRow,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  ruleNoteTitle: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '800',
    textAlign: rtlText,
    writingDirection: 'rtl',
  },
  ruleNoteBody: {
    fontSize: Fonts.sizes.sm,
    lineHeight: 24,
    writingDirection: 'rtl',
    textAlign: rtlText,
    fontWeight: '600',
    color: '#1E293B',
  },
  // --- Thematic Styles ---
  levelFilterRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    gap: Spacing.xs,
  },
  thematicLevelBtn: {
    flex: 1,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    alignItems: 'center',
  },
  activeThematicLevelBtn: {},
  thematicLevelText: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '700',
  },
  thematicCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  thematicHeader: {
    flexDirection: rtlRow,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  thematicLevelBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  thematicLevelBadgeText: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '800',
  },
  thematicTitle: {
    flex: 1,
    fontSize: Fonts.sizes.md,
    fontWeight: '800',
    textAlign: rtlText,
    writingDirection: 'rtl',
  },
  thematicContent: {
    borderTopWidth: 1,
    paddingTop: Spacing.sm,
    gap: Spacing.sm,
  },
  thematicDesc: {
    fontSize: Fonts.sizes.sm,
    lineHeight: 22,
    writingDirection: 'rtl',
    textAlign: rtlText,
    fontWeight: '600',
    color: '#1E293B',
  },
  thematicVerseCard: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    gap: Spacing.xs,
  },
  thematicVerseMetaRow: {
    flexDirection: rtlRow,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  thematicVerseSurah: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '800',
    textAlign: rtlText,
    writingDirection: 'rtl',
  },
  thematicVerseText: {
    fontSize: 18,
    fontFamily: Fonts.arabic.quran,
    lineHeight: 34,
    textAlign: rtlText,
    writingDirection: 'rtl',
    fontWeight: '700',
    color: '#0F172A',
  },
  highlightWord: {
    fontWeight: 'bold',
  },
  thematicTipCard: {
    flexDirection: rtlRow,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  thematicTipBody: {
    flex: 1,
    alignItems: rtlAlign,
    gap: 2,
  },
  thematicTipLabel: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '800',
    textAlign: rtlText,
    writingDirection: 'rtl',
  },
  thematicTipText: {
    fontSize: Fonts.sizes.sm,
    lineHeight: 22,
    writingDirection: 'rtl',
    textAlign: rtlText,
    fontWeight: '600',
    color: '#1E293B',
  },
  // --- Empty & Modal Styles ---
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: Spacing.md,
  },
  emptyText: {
    fontSize: Fonts.sizes.md,
    textAlign: 'center',
  },
  emptyChangeBtn: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
  },
  emptyChangeBtnText: {
    fontSize: Fonts.sizes.sm,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    height: '80%',
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: Fonts.sizes.lg,
    fontWeight: '700',
  },
  modalSearchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    height: 44,
    gap: Spacing.xs,
  },
  modalSearchInput: {
    flex: 1,
    fontSize: Fonts.sizes.sm,
    writingDirection: 'rtl',
  },
  modalListPadding: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 30,
    gap: Spacing.xs,
  },
  modalSurahItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  modalSurahNum: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalSurahNumText: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '700',
  },
  modalSurahInfo: {
    flex: 1,
  },
  modalSurahName: {
    fontSize: Fonts.sizes.md,
    fontWeight: '700',
  },
  modalSurahMeta: {
    fontSize: Fonts.sizes.xs,
  },
  modalCountBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  modalCountBadgeText: {
    fontSize: Fonts.sizes.xs,
    fontWeight: '600',
  },
});
