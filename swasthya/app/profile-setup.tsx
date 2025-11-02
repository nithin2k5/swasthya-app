import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import {
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;
const isSmallDevice = width < 375;

export default function ProfileSetupScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState({
    dateOfBirth: '',
    gender: '',
    height: '',
    weight: '',
    bloodType: '',
    allergies: '',
    medications: '',
    emergencyContact: '',
    emergencyPhone: '',
  });

  const steps = [
    {
      title: 'Basic Information',
      subtitle: 'Tell us about yourself',
      fields: ['dateOfBirth', 'gender', 'height', 'weight']
    },
    {
      title: 'Medical Information',
      subtitle: 'Your health details',
      fields: ['bloodType', 'allergies', 'medications']
    },
    {
      title: 'Emergency Contact',
      subtitle: 'Someone we can reach',
      fields: ['emergencyContact', 'emergencyPhone']
    }
  ];

  const fieldLabels = {
    dateOfBirth: 'Date of Birth',
    gender: 'Gender',
    height: 'Height (cm)',
    weight: 'Weight (kg)',
    bloodType: 'Blood Type',
    allergies: 'Allergies',
    medications: 'Current Medications',
    emergencyContact: 'Emergency Contact Name',
    emergencyPhone: 'Emergency Contact Phone',
  };

  const fieldPlaceholders = {
    dateOfBirth: 'DD/MM/YYYY',
    gender: 'Select gender',
    height: 'Enter height in cm',
    weight: 'Enter weight in kg',
    bloodType: 'e.g., A+, B-, O+',
    allergies: 'List any allergies',
    medications: 'List current medications',
    emergencyContact: 'Full name',
    emergencyPhone: 'Phone number',
  };

  const updateProfileData = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete profile setup and navigate to dashboard
      router.replace('/(tabs)');
    }
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  const renderField = (fieldName: string) => {
    if (fieldName === 'gender') {
      return (
        <View key={fieldName} style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.text }]}>
            {fieldLabels[fieldName as keyof typeof fieldLabels]}
          </Text>
          <View style={styles.genderContainer}>
            {['Male', 'Female', 'Other'].map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.genderOption,
                  {
                    backgroundColor: profileData.gender === option ? colors.primary : colors.surface,
                    borderColor: profileData.gender === option ? colors.primary : colors.border,
                  }
                ]}
                onPress={() => updateProfileData('gender', option)}
              >
                <Text style={[
                  styles.genderText,
                  { color: profileData.gender === option ? '#FFFFFF' : colors.text }
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    }

    return (
      <View key={fieldName} style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: colors.text }]}>
          {fieldLabels[fieldName as keyof typeof fieldLabels]}
        </Text>
        <View style={[styles.inputContainer, { 
          backgroundColor: colors.surface, 
          borderColor: colors.border 
        }]}>
          <TextInput
            style={[styles.textInput, { color: colors.text }]}
            placeholder={fieldPlaceholders[fieldName as keyof typeof fieldPlaceholders]}
            placeholderTextColor={colors.textMuted}
            value={profileData[fieldName as keyof typeof profileData]}
            onChangeText={(value) => updateProfileData(fieldName, value)}
            keyboardType={fieldName.includes('Phone') || fieldName.includes('height') || fieldName.includes('weight') ? 'numeric' : 'default'}
            multiline={fieldName === 'allergies' || fieldName === 'medications'}
            numberOfLines={fieldName === 'allergies' || fieldName === 'medications' ? 3 : 1}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.surface }]}>
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={styles.skipButton} 
              onPress={handleSkip}
            >
              <Text style={[styles.skipText, { color: colors.textMuted }]}>Skip</Text>
            </TouchableOpacity>
            
            <View style={styles.progressContainer}>
              {steps.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.progressDot,
                    {
                      backgroundColor: index <= currentStep ? colors.primary : colors.border,
                    }
                  ]}
                />
              ))}
            </View>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Step Content */}
          <MotiView
            key={currentStep}
            from={{ opacity: 0, translateX: 50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{
              type: 'spring',
              damping: 15,
              stiffness: 100,
            }}
            style={styles.stepContent}
          >
            {/* Step Header */}
            <View style={styles.stepHeader}>
              <View style={[styles.stepIcon, { backgroundColor: colors.primary }]}>
                <Ionicons 
                  name={currentStep === 0 ? 'person' : currentStep === 1 ? 'medical' : 'call'} 
                  size={32} 
                  color="#FFFFFF" 
                />
              </View>
              
              <Text style={[styles.stepTitle, { color: colors.text }]}>
                {steps[currentStep].title}
              </Text>
              <Text style={[styles.stepSubtitle, { color: colors.textSecondary }]}>
                {steps[currentStep].subtitle}
              </Text>
            </View>

            {/* Form Fields */}
            <View style={[styles.formContainer, { backgroundColor: colors.surface }]}>
              {steps[currentStep].fields.map(renderField)}
            </View>
          </MotiView>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={[styles.bottomContainer, { backgroundColor: colors.surface }]}>
          <View style={styles.navigationContainer}>
            {currentStep > 0 && (
              <TouchableOpacity
                style={[styles.backButton, { backgroundColor: colors.background }]}
                onPress={() => setCurrentStep(currentStep - 1)}
              >
                <Ionicons name="chevron-back" size={24} color={colors.text} />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.nextButton, { backgroundColor: colors.primary }]}
              onPress={handleNext}
            >
              <Text style={styles.nextButtonText}>
                {currentStep === steps.length - 1 ? 'Complete Setup' : 'Next'}
              </Text>
              {currentStep < steps.length - 1 && (
                <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    paddingTop: Spacing['6xl'],
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing['2xl'],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  skipText: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.medium,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: isTablet ? width * 0.2 : Spacing['2xl'],
    paddingVertical: Spacing['2xl'],
  },
  stepContent: {
    flex: 1,
  },
  stepHeader: {
    alignItems: 'center',
    marginBottom: Spacing['4xl'],
  },
  stepIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing['2xl'],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  stepTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily.bold,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  stepSubtitle: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    textAlign: 'center',
  },
  formContainer: {
    borderRadius: BorderRadius['2xl'],
    padding: Spacing['3xl'],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  inputGroup: {
    marginBottom: Spacing['2xl'],
  },
  inputLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.semiBold,
    marginBottom: Spacing.sm,
  },
  inputContainer: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    paddingHorizontal: Spacing.lg,
    minHeight: 56,
    justifyContent: 'center',
  },
  textInput: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    textAlignVertical: 'top',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderOption: {
    flex: 1,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  genderText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.semiBold,
  },
  bottomContainer: {
    paddingHorizontal: Spacing['2xl'],
    paddingVertical: Spacing['2xl'],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
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
