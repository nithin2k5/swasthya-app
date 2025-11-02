import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function AccessibilitySettingsScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const [fontSize, setFontSize] = useState('medium');
  const [voiceControl, setVoiceControl] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const fontSizes = [
    { value: 'small', label: 'Small', size: 14 },
    { value: 'medium', label: 'Medium', size: 16 },
    { value: 'large', label: 'Large', size: 18 },
    { value: 'xlarge', label: 'Extra Large', size: 20 },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      {/* Header */}
      <LinearGradient
        colors={colors.gradientPrimary as any}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Accessibility</Text>
          
          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Font Size */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 20,
            stiffness: 100,
            delay: 200,
          }}
        >
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Text Size</Text>
            <View style={styles.fontSizeOptions}>
              {fontSizes.map((size) => (
                <TouchableOpacity
                  key={size.value}
                  style={[
                    styles.fontSizeOption,
                    {
                      backgroundColor: fontSize === size.value 
                        ? `${colors.primary}20` 
                        : colors.background,
                      borderColor: fontSize === size.value 
                        ? colors.primary 
                        : colors.border,
                    }
                  ]}
                  onPress={() => setFontSize(size.value)}
                >
                  <Text style={[
                    styles.fontSizeLabel,
                    { 
                      color: fontSize === size.value ? colors.primary : colors.text,
                      fontSize: size.size,
                      fontFamily: Typography.fontFamily.medium
                    }
                  ]}>
                    Aa
                  </Text>
                  <Text style={[
                    styles.fontSizeName,
                    { 
                      color: fontSize === size.value ? colors.primary : colors.textSecondary,
                      fontFamily: Typography.fontFamily.regular
                    }
                  ]}>
                    {size.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </MotiView>

        {/* Accessibility Options */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 20,
            stiffness: 100,
            delay: 400,
          }}
        >
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Options</Text>

            <View style={styles.optionRow}>
              <View style={styles.optionInfo}>
                <Ionicons name="mic" size={24} color={colors.primary} />
                <Text style={[styles.optionText, { color: colors.text }]}>Voice Control</Text>
              </View>
              <Switch
                value={voiceControl}
                onValueChange={setVoiceControl}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <View style={styles.optionRow}>
              <View style={styles.optionInfo}>
                <Ionicons name="contrast" size={24} color={colors.primary} />
                <Text style={[styles.optionText, { color: colors.text }]}>High Contrast</Text>
              </View>
              <Switch
                value={highContrast}
                onValueChange={setHighContrast}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <View style={styles.optionRow}>
              <View style={styles.optionInfo}>
                <Ionicons name="pause-circle" size={24} color={colors.primary} />
                <Text style={[styles.optionText, { color: colors.text }]}>Reduce Motion</Text>
              </View>
              <Switch
                value={reduceMotion}
                onValueChange={setReduceMotion}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </MotiView>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  card: {
    borderRadius: BorderRadius.xl,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily.bold,
    marginBottom: 24,
  },
  fontSizeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fontSizeOption: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: BorderRadius.xl,
    marginHorizontal: 4,
    borderWidth: 2,
  },
  fontSizeLabel: {
    marginBottom: 8,
  },
  fontSizeName: {
    fontSize: Typography.fontSize.xs,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  optionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.semiBold,
    marginLeft: 16,
  },
  divider: {
    height: 1,
    marginLeft: 40,
  },
  bottomSpacing: {
    height: 32,
  },
});
