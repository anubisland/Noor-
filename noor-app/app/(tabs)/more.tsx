import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Platform, Switch, I18nManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';
import { Fonts, Spacing, BorderRadius } from '../../constants/theme';
import { ALL_TAFSIR_SOURCES, RECITERS, APP_CONFIG } from '../../constants/config';

const toArabicDigits = (str: string) => str.replace(/[0-9]/g, (d) => ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'][parseInt(d, 10)]);

export default function MoreScreen() {
  const { colors, toggleTheme, isDark } = useTheme();
  const {
    fontSize,
    setFontSize,
    showTranslation,
    setShowTranslation,
    showTafsir,
    setShowTafsir,
    selectedTafsirs,
    setSelectedTafsirs,
    selectedReciter,
    setSelectedReciter,
  } = useApp();

  const toggleTafsir = (id: string) => {
    if (selectedTafsirs.includes(id)) {
      if (selectedTafsirs.length <= 1) return; // Must have at least 1
      setSelectedTafsirs(selectedTafsirs.filter((t) => t !== id));
    } else {
      if (selectedTafsirs.length >= 3) return; // Max 3
      setSelectedTafsirs([...selectedTafsirs, id]);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Text style={styles.headerTitle}>الإعدادات</Text>
        <Text style={styles.headerSubtitle}>تخصيص التطبيق</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Settings */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>الإعدادات</Text>

        {/* Dark Mode */}
        <View style={[styles.settingItem, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
          <View style={styles.settingLeft}>
            <Ionicons name={isDark ? 'moon' : 'sunny'} size={22} color={colors.primary} />
            <Text style={[styles.settingText, { color: colors.text }]}>الوضع الليلي</Text>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor="#FFF"
          />
        </View>

        {/* Show Translation */}
        <View style={[styles.settingItem, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
          <View style={styles.settingLeft}>
            <Ionicons name="language" size={22} color={colors.primary} />
            <Text style={[styles.settingText, { color: colors.text }]}>إظهار الترجمة</Text>
          </View>
          <Switch
            value={showTranslation}
            onValueChange={setShowTranslation}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor="#FFF"
          />
        </View>

        {/* Show Tafsir */}
        <View style={[styles.settingItem, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
          <View style={styles.settingLeft}>
            <Ionicons name="book" size={22} color={colors.secondary} />
            <Text style={[styles.settingText, { color: colors.text }]}>إظهار التفسير</Text>
          </View>
          <Switch
            value={showTafsir}
            onValueChange={setShowTafsir}
            trackColor={{ false: colors.border, true: colors.secondary }}
            thumbColor="#FFF"
          />
        </View>

        {/* Font Size */}
        <View style={[styles.settingItem, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
          <View style={styles.settingLeft}>
            <Ionicons name="text" size={22} color={colors.primary} />
            <Text style={[styles.settingText, { color: colors.text }]}>حجم الخط: {fontSize}</Text>
          </View>
          <View style={styles.fontControls}>
            <TouchableOpacity
              style={[styles.fontBtn, { backgroundColor: colors.primaryLight }]}
              onPress={() => setFontSize(Math.max(18, fontSize - 2))}
            >
              <Text style={[styles.fontBtnText, { color: colors.primary }]}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.fontBtn, { backgroundColor: colors.primaryLight }]}
              onPress={() => setFontSize(Math.min(40, fontSize + 2))}
            >
              <Text style={[styles.fontBtnText, { color: colors.primary }]}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Reciter Selection (اختيار القارئ) */}
        <Text style={[styles.sectionTitle, { color: colors.text, marginTop: Spacing.xl }]}>القارئ</Text>
        <Text style={[styles.tafsirHint, { color: colors.textSecondary }]}>
          اختر القارئ المعتمد لتلاوة القرآن في جميع شاشات التطبيق
        </Text>
        {RECITERS.map((reciter) => {
          const isSelected = selectedReciter === reciter.id;
          return (
            <TouchableOpacity
              key={reciter.id}
              style={[
                styles.tafsirItem,
                {
                  backgroundColor: isSelected ? colors.primaryLight : colors.surface,
                  borderColor: isSelected ? colors.primary : colors.borderLight,
                },
              ]}
              onPress={() => setSelectedReciter(reciter.id)}
            >
              <View style={styles.tafsirInfo}>
                <Text style={[styles.tafsirName, { color: isSelected ? colors.primary : colors.text }]}>
                  {reciter.name}
                </Text>
                <Text style={[styles.tafsirDesc, { color: colors.textSecondary }]} numberOfLines={1}>
                  {reciter.description}
                </Text>
              </View>
              <Ionicons
                name={isSelected ? 'checkmark-circle' : 'ellipse-outline'}
                size={24}
                color={isSelected ? colors.primary : colors.textLight}
              />
            </TouchableOpacity>
          );
        })}

        {/* Tafsir Selection */}
        <Text style={[styles.sectionTitle, { color: colors.text, marginTop: Spacing.xl }]}>التفاسير</Text>
        <Text style={[styles.tafsirHint, { color: colors.textSecondary }]}>
          اختر 3 تفاسير لعرضها ({selectedTafsirs.length}/3)
        </Text>
        {ALL_TAFSIR_SOURCES.map((source) => {
          const isSelected = selectedTafsirs.includes(source.id);
          const canSelect = selectedTafsirs.length < 3 || isSelected;
          return (
            <TouchableOpacity
              key={source.id}
              style={[
                styles.tafsirItem,
                {
                  backgroundColor: isSelected ? colors.primaryLight : colors.surface,
                  borderColor: isSelected ? colors.primary : colors.borderLight,
                  opacity: canSelect ? 1 : 0.5,
                },
              ]}
              onPress={() => toggleTafsir(source.id)}
              disabled={!canSelect && !isSelected}
            >
              <View style={styles.tafsirInfo}>
                <Text style={[styles.tafsirName, { color: isSelected ? colors.primary : colors.text }]}>
                  {source.name}
                </Text>
                <Text style={[styles.tafsirDesc, { color: colors.textSecondary }]} numberOfLines={1}>
                  {source.description}
                </Text>
              </View>
              <Ionicons
                name={isSelected ? 'checkmark-circle' : 'ellipse-outline'}
                size={24}
                color={isSelected ? colors.primary : colors.textLight}
              />
            </TouchableOpacity>
          );
        })}

        {/* About App */}
        <Text style={[styles.sectionTitle, { color: colors.text, marginTop: Spacing.xl }]}>حول التطبيق</Text>
        <View style={[styles.settingItem, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
          <View style={styles.settingLeft}>
            <Ionicons name="information-circle-outline" size={22} color={colors.primary} />
            <Text style={[styles.settingText, { color: colors.text }]}>الإصدار</Text>
          </View>
          <Text style={{ fontSize: Fonts.sizes.md, fontWeight: '700', color: colors.primary }}>
            {APP_CONFIG.version} ({toArabicDigits(APP_CONFIG.version)})
          </Text>
        </View>

        {/* App Info */}
        <View style={[styles.appInfo, { borderTopColor: colors.border }]}>
          <Text style={[styles.appName, { color: colors.primary }]}>{APP_CONFIG.name}</Text>
          <Text style={[styles.appVersion, { color: colors.textLight }]}>
            الإصدار {APP_CONFIG.version} ({toArabicDigits(APP_CONFIG.version)})
          </Text>
          <Text style={[styles.appDesc, { color: colors.textSecondary }]}>
            {APP_CONFIG.description}
          </Text>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : (StatusBar.currentHeight || 0) + 10,
    paddingBottom: Spacing.xxl,
    alignItems: 'center',
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
  },
  headerTitle: { color: '#FFF', fontSize: Fonts.sizes.title, fontWeight: '800' },
  headerSubtitle: { color: 'rgba(255,255,255,0.7)', fontSize: Fonts.sizes.sm },
  scrollContent: { paddingTop: Spacing.lg },
  sectionTitle: {
    fontSize: Fonts.sizes.xl,
    fontWeight: '800',
    marginHorizontal: Spacing.xxl,
    marginBottom: Spacing.md,
    writingDirection: 'rtl',
    textAlign: 'right',
    alignSelf: 'stretch',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  settingText: { fontSize: Fonts.sizes.md, fontWeight: '800' },
  fontControls: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  fontBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontBtnText: { fontSize: Fonts.sizes.xl, fontWeight: '800' },
  tafsirHint: {
    fontSize: Fonts.sizes.sm,
    fontWeight: '700',
    marginHorizontal: Spacing.xxl,
    marginBottom: Spacing.md,
    writingDirection: 'rtl',
    textAlign: 'right',
  },
  tafsirItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
  },
  tafsirInfo: {
    flex: 1,
    gap: 2,
    alignItems: 'stretch',
  },
  tafsirName: {
    fontSize: Fonts.sizes.md,
    fontWeight: '800',
    textAlign: 'right',
    writingDirection: 'rtl',
    alignSelf: 'stretch',
    width: '100%',
  },
  tafsirDesc: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'right',
    writingDirection: 'rtl',
    alignSelf: 'stretch',
    width: '100%',
  },
  appInfo: {
    alignItems: 'center',
    paddingTop: Spacing.xxl,
    marginTop: Spacing.xl,
    marginHorizontal: Spacing.lg,
    borderTopWidth: 1,
    gap: Spacing.xs,
  },
  appName: { fontSize: 30, fontWeight: '900' },
  appVersion: { fontSize: 14, fontWeight: '800' },
  appDesc: { fontSize: Fonts.sizes.sm, textAlign: 'center' },
});
