import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import React, { Component, ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Here you could log to crash reporting service
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <View style={styles.container}>
          <LinearGradient
            colors={['#EF4444', '#DC2626']}
            style={styles.errorContainer}
          >
            <MotiView
              from={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: 'spring',
                damping: 15,
                stiffness: 100,
              }}
              style={styles.content}
            >
              <View style={styles.iconContainer}>
                <Ionicons name="warning" size={64} color="#fff" />
              </View>
              
              <Text style={styles.title}>Something went wrong</Text>
              <Text style={styles.message}>
                We're sorry, but something unexpected happened. Please try again.
              </Text>
              
              <TouchableOpacity
                style={styles.retryButton}
                onPress={() => this.setState({ hasError: false, error: undefined })}
              >
                <Ionicons name="refresh" size={20} color="#EF4444" />
                <Text style={styles.retryText}>Try Again</Text>
              </TouchableOpacity>
            </MotiView>
          </LinearGradient>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing['4xl'],
  },
  content: {
    alignItems: 'center',
    maxWidth: 300,
  },
  iconContainer: {
    marginBottom: Spacing['2xl'],
  },
  title: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: '#fff',
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  message: {
    fontSize: Typography.fontSize.base,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: Typography.lineHeight.base,
    marginBottom: Spacing['3xl'],
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: Spacing['2xl'],
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  retryText: {
    color: '#EF4444',
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    marginLeft: Spacing.sm,
  },
});
