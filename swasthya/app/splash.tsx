import { Spacing, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MotiText, MotiView } from 'moti';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/auth/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <View style={styles.content}>
        {/* App Name */}
        <MotiText
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 20,
            stiffness: 100,
            delay: 300,
          }}
          style={[styles.appName, { color: colors.text }]}
        >
          Swasthya
        </MotiText>

        {/* Tagline */}
        <MotiText
          from={{ opacity: 0, translateY: 15 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 20,
            stiffness: 100,
            delay: 600,
          }}
          style={[styles.tagline, { color: colors.textSecondary }]}
        >
          Professional Healthcare Platform
        </MotiText>

        {/* Loading Indicator */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            type: 'timing',
            duration: 500,
            delay: 900,
          }}
          style={styles.loadingContainer}
        >
          <View style={[styles.loadingBar, { backgroundColor: colors.border }]}>
            <MotiView
              from={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{
                type: 'timing',
                duration: 1500,
                delay: 1100,
              }}
              style={[styles.loadingProgress, { backgroundColor: colors.primary }]}
            />
          </View>
          <Text style={[styles.loadingText, { color: colors.textMuted }]}>
            Loading...
          </Text>
        </MotiView>
      </View>

      {/* Bottom Branding */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: 'timing',
          duration: 800,
          delay: 1400,
        }}
        style={styles.bottomBranding}
      >
        <Text style={[styles.brandingText, { color: colors.textMuted }]}>
          Secure • AI-Powered • Professional
        </Text>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing['4xl'],
    paddingTop: Spacing['6xl'],
    paddingBottom: Spacing['6xl'],
    width: '100%',
    flex: 1,
  },
  appName: {
    fontSize: Typography.fontSize['4xl'],
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily.bold,
    textAlign: 'center',
    marginBottom: Spacing.md,
    letterSpacing: -1,
  },
  tagline: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.normal,
    fontFamily: Typography.fontFamily.regular,
    textAlign: 'center',
    lineHeight: Typography.lineHeight.lg,
    marginBottom: Spacing['4xl'],
    paddingHorizontal: Spacing['2xl'],
  },
  loadingContainer: {
    alignItems: 'center',
    width: 200,
  },
  loadingBar: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: Spacing.md,
    backgroundColor: 'transparent',
  },
  loadingProgress: {
    height: '100%',
    borderRadius: 2,
  },
  loadingText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
    textAlign: 'center',
  },
  bottomBranding: {
    position: 'absolute',
    bottom: Spacing['5xl'],
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: Spacing['4xl'],
  },
  brandingText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
    fontFamily: Typography.fontFamily.medium,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
});