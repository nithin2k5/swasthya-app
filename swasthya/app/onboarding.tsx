import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MotiText, MotiView } from 'moti';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface OnboardingStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  features: string[];
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 1,
    title: 'Secure Health Records',
    subtitle: 'Blockchain Protection',
    description: 'Your medical data is encrypted and stored securely on blockchain technology, ensuring complete privacy and immutable records.',
    icon: 'shield-checkmark',
    features: [
      'End-to-end encryption',
      'Blockchain verification',
      'Complete data ownership',
      'HIPAA compliant'
    ],
  },
  {
    id: 2,
    title: 'AI-Powered Insights',
    subtitle: 'Smart Health Analysis',
    description: 'Advanced machine learning algorithms analyze your health data to provide personalized insights and early health predictions.',
    icon: 'analytics',
    features: [
      'Symptom analysis',
      'Health predictions',
      'Personalized recommendations',
      'Medical image analysis'
    ],
  },
  {
    id: 3,
    title: 'Professional Network',
    subtitle: 'Connected Healthcare',
    description: 'Connect with healthcare providers, share records securely, and manage your health journey with professional support.',
    icon: 'people',
    features: [
      'Provider network',
      'Secure sharing',
      'Appointment management',
      'Telemedicine support'
    ],
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      scrollViewRef.current?.scrollTo({
        x: nextStep * width,
        animated: true,
      });
    } else {
      router.replace('/auth/login');
    }
  };

  const handleSkip = () => {
    router.replace('/auth/login');
  };

  const handleDotPress = (index: number) => {
    setCurrentStep(index);
    scrollViewRef.current?.scrollTo({
      x: index * width,
      animated: true,
    });
  };

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const step = Math.round(scrollPosition / width);
    setCurrentStep(step);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={[styles.skipText, { color: colors.textMuted }]}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {onboardingSteps.map((step, index) => (
          <View key={step.id} style={[styles.stepContainer, { backgroundColor: colors.background }]}>
            
            {/* Illustration */}
            <MotiView
              from={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: 'spring',
                damping: 15,
                stiffness: 100,
                delay: 300,
              }}
              style={styles.illustrationContainer}
            >
              <View style={[styles.iconContainer, { backgroundColor: colors.primary }]}>
                <Ionicons name={step.icon} size={64} color="#FFFFFF" />
              </View>
            </MotiView>

            {/* Content */}
            <View style={styles.contentContainer}>
              <MotiText
                from={{ opacity: 0, translateY: 30 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  damping: 15,
                  stiffness: 100,
                  delay: 500,
                }}
                style={[styles.stepTitle, { color: colors.text }]}
              >
                {step.title}
              </MotiText>

              <MotiText
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  damping: 15,
                  stiffness: 100,
                  delay: 600,
                }}
                style={[styles.stepSubtitle, { color: colors.primary }]}
              >
                {step.subtitle}
              </MotiText>

              <MotiText
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  damping: 15,
                  stiffness: 100,
                  delay: 700,
                }}
                style={[styles.stepDescription, { color: colors.textSecondary }]}
              >
                {step.description}
              </MotiText>

              {/* Features List */}
              <MotiView
                from={{ opacity: 0, translateY: 30 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  damping: 15,
                  stiffness: 100,
                  delay: 800,
                }}
                style={styles.featuresContainer}
              >
                {step.features.map((feature, featureIndex) => (
                  <MotiView
                    key={featureIndex}
                    from={{ opacity: 0, translateX: -20 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={{
                      type: 'spring',
                      damping: 15,
                      stiffness: 100,
                      delay: 900 + featureIndex * 100,
                    }}
                    style={styles.featureItem}
                  >
                    <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                    <Text style={[styles.featureText, { color: colors.text }]}>{feature}</Text>
                  </MotiView>
                ))}
              </MotiView>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={[styles.bottomContainer, { backgroundColor: colors.surface }]}>
        {/* Page Indicators */}
        <View style={styles.indicatorContainer}>
          {onboardingSteps.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.indicator,
                {
                  backgroundColor: index === currentStep ? colors.primary : colors.border,
                  width: index === currentStep ? 24 : 8,
                }
              ]}
              onPress={() => handleDotPress(index)}
            />
          ))}
        </View>

        {/* Navigation Buttons */}
        <View style={styles.navigationContainer}>
          {currentStep > 0 && (
            <TouchableOpacity
              style={[styles.backButton, { backgroundColor: colors.background }]}
              onPress={() => {
                const prevStep = currentStep - 1;
                setCurrentStep(prevStep);
                scrollViewRef.current?.scrollTo({
                  x: prevStep * width,
                  animated: true,
                });
              }}
            >
              <Ionicons name="chevron-back" size={24} color={colors.text} />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.nextButton, { backgroundColor: colors.primary }]}
            onPress={handleNext}
          >
            {currentStep === onboardingSteps.length - 1 ? (
              <Text style={styles.nextButtonText}>Get Started</Text>
            ) : (
              <>
                <Text style={styles.nextButtonText}>Next</Text>
                <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing['2xl'],
    paddingTop: Spacing['6xl'],
    paddingBottom: Spacing.lg,
  },
  skipButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  skipText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    fontFamily: Typography.fontFamily.medium,
  },
  scrollView: {
    flex: 1,
  },
  stepContainer: {
    width,
    flex: 1,
    paddingHorizontal: Spacing['4xl'],
    justifyContent: 'center',
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: Spacing['6xl'],
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 16,
  },
  contentContainer: {
    alignItems: 'center',
  },
  stepTitle: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily.bold,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  stepSubtitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.semiBold,
    textAlign: 'center',
    marginBottom: Spacing['2xl'],
  },
  stepDescription: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    textAlign: 'center',
    lineHeight: Typography.lineHeight.base,
    marginBottom: Spacing['3xl'],
    paddingHorizontal: Spacing.lg,
  },
  featuresContainer: {
    width: '100%',
    maxWidth: 300,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.md,
  },
  featureText: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.medium,
    marginLeft: Spacing.md,
    flex: 1,
  },
  bottomContainer: {
    paddingHorizontal: Spacing['4xl'],
    paddingVertical: Spacing['3xl'],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing['2xl'],
  },
  indicator: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing['3xl'],
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius['2xl'],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  nextButtonText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#FFFFFF',
    marginRight: Spacing.sm,
  },
});