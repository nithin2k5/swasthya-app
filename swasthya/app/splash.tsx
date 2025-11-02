import { Spacing, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
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
      router.replace('/onboarding');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <View style={styles.content}>
        {/* Logo Animation */}
        <MotiView
          from={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 100,
            delay: 300,
          }}
          style={styles.logoContainer}
        >
          <View style={[styles.logoBackground, { backgroundColor: colors.primary }]}>
            <Ionicons name="medical" size={48} color="#FFFFFF" />
          </View>
        </MotiView>

        {/* App Name */}
        <MotiText
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 100,
            delay: 800,
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
            damping: 15,
            stiffness: 100,
            delay: 1200,
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
            delay: 1800,
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
                delay: 2000,
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
          delay: 2200,
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
    paddingHorizontal: Spacing['4xl'],
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing['4xl'],
  },
  logoBackground: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  appName: {
    fontSize: Typography.fontSize['4xl'],
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily.bold,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  tagline: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.medium,
    fontFamily: Typography.fontFamily.medium,
    textAlign: 'center',
    lineHeight: Typography.lineHeight.lg,
    marginBottom: Spacing['6xl'],
    paddingHorizontal: Spacing.xl,
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
  },
  loadingProgress: {
    height: '100%',
    borderRadius: 2,
  },
  loadingText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
  },
  bottomBranding: {
    position: 'absolute',
    bottom: Spacing['6xl'],
    alignItems: 'center',
  },
  brandingText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    fontFamily: Typography.fontFamily.medium,
    textAlign: 'center',
  },
});