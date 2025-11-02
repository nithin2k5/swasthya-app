import { Spacing, Typography } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

interface LoadingScreenProps {
  message?: string;
  showBackground?: boolean;
  colors?: any;
}

export function LoadingScreen({ message = 'Loading...', showBackground = true, colors }: LoadingScreenProps) {
  const themeColors = colors || {
    gradientPrimary: ['#0A2342', '#00B4D8'],
    background: '#F8F9FA',
    text: '#0A2342',
    secondary: '#00B4D8'
  };

  const content = (
    <View style={[styles.container, !showBackground && { backgroundColor: 'transparent' }]}>
      <MotiView
        from={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'spring',
          damping: 15,
          stiffness: 100,
        }}
        style={styles.content}
      >
        <MotiView
          from={{ rotate: '0deg' }}
          animate={{ rotate: '360deg' }}
          transition={{
            type: 'timing',
            duration: 2000,
            loop: true,
          }}
          style={styles.spinnerContainer}
        >
          <LinearGradient
            colors={themeColors.gradientPrimary as any}
            style={styles.spinner}
          >
            <View style={[styles.innerSpinner, { backgroundColor: themeColors.background }]} />
          </LinearGradient>
        </MotiView>
        
        <Text style={[styles.message, { color: themeColors.text }]}>{message}</Text>
      </MotiView>
    </View>
  );

  if (showBackground) {
    return (
      <LinearGradient colors={themeColors.gradientPrimary as any} style={StyleSheet.absoluteFill}>
        {content}
      </LinearGradient>
    );
  }

  return content;
}

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export function LoadingSpinner({ size = 'medium', color }: LoadingSpinnerProps) {
  // Use fallback color if no color provided
  const fallbackColor = color || '#00B4D8';
  
  const spinnerSize = {
    small: 20,
    medium: 32,
    large: 48,
  }[size];

  return (
    <MotiView
      from={{ rotate: '0deg' }}
      animate={{ rotate: '360deg' }}
      transition={{
        type: 'timing',
        duration: 1000,
        loop: true,
      }}
    >
      <ActivityIndicator 
        size={spinnerSize} 
        color={fallbackColor} 
      />
    </MotiView>
  );
}

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
}

export function LoadingOverlay({ visible, message = 'Loading...' }: LoadingOverlayProps) {
  // Use fallback colors for overlay
  const colors = {
    surface: '#FFFFFF',
    text: '#0A2342'
  };

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={[styles.overlayContent, { backgroundColor: colors.surface }]}>
        <LoadingSpinner size="large" />
        <Text style={[styles.overlayMessage, { color: colors.text }]}>{message}</Text>
      </View>
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
  },
  spinnerContainer: {
    marginBottom: Spacing.xl,
  },
  spinner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerSpinner: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  message: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.medium,
    textAlign: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  overlayContent: {
    padding: Spacing['2xl'],
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  overlayMessage: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    marginTop: Spacing.lg,
    textAlign: 'center',
  },
});
