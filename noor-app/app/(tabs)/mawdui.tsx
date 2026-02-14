import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Platform, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { Fonts, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { quranTopics } from '../../data/topics';

export default function MawduiScreen() {
  const { colors } = useTheme();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const topic = quranTopics.find((t) => t.id === selectedTopic);

  if (topic) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar barStyle="light-content" backgroundColor={topic.color} />

        {/* Topic Header */}
        <View style={[styles.topicHeader, { backgroundColor: topic.color }]}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => setSelectedTopic(null)}
          >
            <Ionicons name="arrow-forward" size={24} color="#FFF" />
          </TouchableOpacity>
          <Ionicons name={topic.icon as any} size={36} color="#FFF" />
          <Text style={styles.topicTitle}>{topic.title}</Text>
          <Text style={styles.topicTitleEn}>{topic.titleEn}</Text>
          <Text style={styles.topicDescription}>{topic.description}</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.topicContent}>
          {/* Verses */}
          <Text style={[styles.sectionHeading, { color: colors.text }]}>
            <Ionicons name="book-outline" size={18} /> الآيات القرآنية
          </Text>
          {topic.verses.map((verse, index) => (
            <View
              key={index}
              style={[styles.verseCard, { backgroundColor: colors.surface, borderColor: colors.borderLight }, Shadows.sm]}
            >
              <Text style={[styles.verseArabic, { color: colors.text }]}>{verse.text}</Text>
              <Text style={[styles.verseRef, { color: topic.color }]}>
                سورة {verse.surahId} - آية {verse.ayahNumber}
              </Text>
            </View>
          ))}

          {/* Hadiths */}
          <Text style={[styles.sectionHeading, { color: colors.text, marginTop: Spacing.xl }]}>
            <Ionicons name="chatbox-ellipses-outline" size={18} /> الأحاديث ذات الصلة
          </Text>
          {topic.hadiths.map((hadith, index) => (
            <View
              key={index}
              style={[styles.hadithCard, { backgroundColor: colors.secondaryLight, borderColor: colors.secondary + '30' }]}
            >
              <View style={styles.hadithQuote}>
                <Ionicons name="chatbox-ellipses" size={16} color={colors.secondary} />
              </View>
              <Text style={[styles.hadithText, { color: colors.text }]}>{hadith.text}</Text>
              <Text style={[styles.hadithSource, { color: colors.secondary }]}>{hadith.source}</Text>
            </View>
          ))}

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Ionicons name="grid" size={30} color="#FFF" />
        <Text style={styles.headerTitle}>القرآن الموضوعي</Text>
        <Text style={styles.headerSubtitle}>تصفح القرآن حسب الموضوع مع أحاديث ذات صلة</Text>
      </View>

      <FlatList
        data={quranTopics}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.gridRow}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.topicCard, { backgroundColor: colors.surface }, Shadows.md]}
            onPress={() => setSelectedTopic(item.id)}
            activeOpacity={0.7}
          >
            <View style={[styles.topicIcon, { backgroundColor: item.color + '15' }]}>
              <Ionicons name={item.icon as any} size={32} color={item.color} />
            </View>
            <Text style={[styles.cardTitle, { color: colors.text }]}>{item.title}</Text>
            <Text style={[styles.cardTitleEn, { color: colors.textSecondary }]}>{item.titleEn}</Text>
            <Text style={[styles.cardCount, { color: item.color }]}>
              {item.verses.length} آيات • {item.hadiths.length} أحاديث
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : (StatusBar.currentHeight || 0) + 10,
    paddingBottom: Spacing.xxl,
    alignItems: 'center',
    gap: Spacing.xs,
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
  },
  headerTitle: { color: '#FFF', fontSize: Fonts.sizes.title, fontWeight: '800' },
  headerSubtitle: { color: 'rgba(255,255,255,0.7)', fontSize: Fonts.sizes.sm, textAlign: 'center', paddingHorizontal: Spacing.xxl },
  grid: { padding: Spacing.md, paddingBottom: 100 },
  gridRow: { gap: Spacing.sm },
  topicCard: {
    flex: 1,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  topicIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: { fontSize: Fonts.sizes.lg, fontWeight: '700' },
  cardTitleEn: { fontSize: Fonts.sizes.sm },
  cardCount: { fontSize: Fonts.sizes.xs, fontWeight: '600' },
  topicHeader: {
    paddingTop: Platform.OS === 'ios' ? 50 : (StatusBar.currentHeight || 0) + 10,
    paddingBottom: Spacing.xxl,
    paddingHorizontal: Spacing.xxl,
    alignItems: 'center',
    gap: Spacing.sm,
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
  },
  backBtn: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : (StatusBar.currentHeight || 0) + 10,
    right: Spacing.lg,
    padding: Spacing.sm,
  },
  topicTitle: { color: '#FFF', fontSize: Fonts.sizes.title, fontWeight: '800', marginTop: Spacing.sm },
  topicTitleEn: { color: 'rgba(255,255,255,0.8)', fontSize: Fonts.sizes.md },
  topicDescription: { color: 'rgba(255,255,255,0.7)', fontSize: Fonts.sizes.sm, textAlign: 'center' },
  topicContent: { padding: Spacing.lg },
  sectionHeading: { fontSize: Fonts.sizes.xl, fontWeight: '700', marginBottom: Spacing.md, writingDirection: 'rtl' },
  verseCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
    borderWidth: 1,
  },
  verseArabic: {
    fontSize: Fonts.sizes.quran,
    textAlign: 'center',
    lineHeight: 48,
    marginBottom: Spacing.sm,
  },
  verseRef: { fontSize: Fonts.sizes.sm, textAlign: 'center', fontWeight: '600' },
  hadithCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
    borderWidth: 1,
  },
  hadithQuote: { marginBottom: Spacing.sm },
  hadithText: {
    fontSize: Fonts.sizes.md,
    lineHeight: 28,
    writingDirection: 'rtl',
  },
  hadithSource: {
    fontSize: Fonts.sizes.sm,
    marginTop: Spacing.sm,
    fontWeight: '600',
    textAlign: 'left',
  },
});
