import { BorderRadius, HealthColors, Spacing, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface RecordFormData {
  type: 'lab' | 'prescription' | 'visit' | 'imaging';
  title: string;
  provider: string;
  date: string;
  notes: string;
  attachments?: string[];
}

export default function AddRecordScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const [formData, setFormData] = useState<RecordFormData>({
    type: 'lab',
    title: '',
    provider: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    attachments: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const recordTypes = [
    { value: 'lab', label: 'Lab Test', icon: 'flask', color: '#3B82F6' },
    { value: 'prescription', label: 'Prescription', icon: 'medical', color: '#22C55E' },
    { value: 'visit', label: 'Visit Note', icon: 'person', color: '#F59E0B' },
    { value: 'imaging', label: 'Imaging', icon: 'scan', color: '#8B5CF6' },
  ];

  const updateField = (field: keyof RecordFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.provider.trim()) {
      Alert.alert('Validation Error', 'Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'Success',
        'Record added successfully and secured on blockchain',
        [
          { text: 'OK', onPress: () => router.back() }
        ]
      );
    }, 2000);
  };

  const renderField = (
    icon: string,
    label: string,
    field: keyof RecordFormData,
    placeholder: string,
    multiline: boolean = false,
    required: boolean = true
  ) => (
    <View style={styles.fieldContainer}>
      <View style={styles.fieldLabel}>
        <Ionicons name={icon as any} size={20} color={colors.primary} />
        <Text style={[styles.fieldLabelText, { color: colors.textSecondary }]}>
          {label} {required && <Text style={{ color: colors.error }}>*</Text>}
        </Text>
      </View>
      <View style={[styles.inputContainer, { 
        backgroundColor: colors.background, 
        borderColor: colors.border 
      }]}>
        <TextInput
          style={[styles.inputText, { 
            color: colors.text, 
            fontFamily: Typography.fontFamily.regular,
            minHeight: multiline ? 120 : 56,
            textAlignVertical: multiline ? 'top' : 'center',
            paddingTop: multiline ? 4 : 0,
          }]}
          value={formData[field] as string}
          onChangeText={(value) => updateField(field, value)}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          multiline={multiline}
          numberOfLines={multiline ? 4 : 1}
        />
      </View>
    </View>
  );

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
          
          <Text style={styles.headerTitle}>Add New Record</Text>
          
          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <MotiView
            from={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: 'spring',
              damping: 20,
              stiffness: 100,
              delay: 200,
            }}
            style={styles.formSection}
          >
            {/* Record Type Selection */}
            <View style={[styles.card, { backgroundColor: colors.surface }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Record Type</Text>
              <View style={styles.typeGrid}>
                {recordTypes.map((type) => (
                  <TouchableOpacity
                    key={type.value}
                    style={[
                      styles.typeOption,
                      {
                        backgroundColor: formData.type === type.value 
                          ? `${type.color}20` 
                          : colors.background,
                        borderColor: formData.type === type.value 
                          ? type.color 
                          : colors.border,
                      }
                    ]}
                    onPress={() => updateField('type', type.value)}
                  >
                    <View style={[
                      styles.typeIcon,
                      { backgroundColor: formData.type === type.value ? type.color : 'transparent' }
                    ]}>
                      <Ionicons 
                        name={type.icon as any} 
                        size={28} 
                        color={formData.type === type.value ? '#FFFFFF' : type.color} 
                      />
                    </View>
                    <Text style={[
                      styles.typeLabel,
                      { 
                        color: formData.type === type.value ? colors.text : colors.textSecondary,
                        fontFamily: Typography.fontFamily.medium
                      }
                    ]}>
                      {type.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Form Fields */}
            <View style={[styles.card, { backgroundColor: colors.surface }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Record Details</Text>
              
              {renderField('document-text-outline', 'Record Title', 'title', 'Enter record title')}
              {renderField('business-outline', 'Provider/Doctor', 'provider', 'Enter provider name')}
              {renderField('calendar-outline', 'Date', 'date', 'YYYY-MM-DD', false)}
              {renderField('document-text-outline', 'Notes', 'notes', 'Add any additional notes...', true, false)}
            </View>

            {/* Attach Files */}
            <View style={[styles.card, { backgroundColor: colors.surface }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Attachments</Text>
              <TouchableOpacity style={[styles.attachButton, { backgroundColor: colors.background, borderColor: colors.border }]}>
                <Ionicons name="attach-outline" size={24} color={colors.primary} />
                <Text style={[styles.attachText, { color: colors.text }]}>
                  Attach Document or Image
                </Text>
              </TouchableOpacity>
              {formData.attachments && formData.attachments.length > 0 && (
                <View style={styles.attachmentsList}>
                  {formData.attachments.map((file, index) => (
                    <View key={index} style={[styles.attachmentItem, { backgroundColor: colors.background }]}>
                      <Ionicons name="document" size={20} color={colors.primary} />
                      <Text style={[styles.attachmentName, { color: colors.text }]}>{file}</Text>
                      <TouchableOpacity onPress={() => {
                        const newAttachments = formData.attachments?.filter((_, i) => i !== index);
                        setFormData(prev => ({ ...prev, attachments: newAttachments }));
                      }}>
                        <Ionicons name="close-circle" size={20} color={colors.error} />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
            </View>

            {/* Blockchain Security Notice */}
            <View style={[styles.securityNotice, { backgroundColor: `${colors.primary}10`, borderColor: colors.primary }]}>
              <Ionicons name="shield-checkmark" size={24} color={colors.primary} />
              <Text style={[styles.securityText, { color: colors.text }]}>
                Your record will be encrypted and stored on the blockchain for maximum security
              </Text>
            </View>

            {/* Submit Button */}
            <TouchableOpacity 
              style={styles.submitButton} 
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <LinearGradient
                colors={colors.gradientPrimary as any}
                style={styles.submitButtonGradient}
              >
                {isSubmitting ? (
                  <MotiView
                    from={{ rotate: '0deg' }}
                    animate={{ rotate: '360deg' }}
                    transition={{
                      type: 'timing',
                      duration: 1000,
                      loop: true,
                    }}
                  >
                    <Ionicons name="refresh" size={20} color="#FFFFFF" />
                  </MotiView>
                ) : (
                  <>
                    <Ionicons name="lock-closed" size={20} color="#FFFFFF" />
                    <Text style={styles.submitButtonText}>Save & Encrypt Record</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.bottomSpacing} />
          </MotiView>
        </ScrollView>
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
  formSection: {
    paddingBottom: 24,
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
    marginBottom: 20,
    marginLeft: 4,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: -8,
  },
  typeOption: {
    width: '48%',
    padding: 20,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '1%',
    marginBottom: 16,
    borderWidth: 2,
    minHeight: 150,
  },
  typeIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  typeLabel: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.semiBold,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 4,
  },
  fieldLabelText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.semiBold,
    marginLeft: 8,
  },
  inputContainer: {
    borderRadius: BorderRadius.xl,
    borderWidth: 1.5,
    paddingHorizontal: 18,
    paddingVertical: 12,
    minHeight: 56,
    justifyContent: 'center',
  },
  inputText: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    lineHeight: 22,
  },
  attachButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: BorderRadius.xl,
    borderWidth: 2,
    borderStyle: 'dashed',
    marginTop: 4,
    marginBottom: 16,
    minHeight: 64,
  },
  attachText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.semiBold,
    marginLeft: 12,
  },
  attachmentsList: {
    marginTop: 12,
  },
  attachmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: BorderRadius.lg,
    marginBottom: 10,
    minHeight: 52,
  },
  attachmentName: {
    flex: 1,
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    marginLeft: 12,
    marginRight: 12,
  },
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 20,
    borderRadius: BorderRadius.xl,
    borderWidth: 1.5,
    marginTop: 8,
    marginBottom: 24,
  },
  securityText: {
    flex: 1,
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    marginLeft: 12,
    lineHeight: 20,
    paddingTop: 2,
  },
  submitButton: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    marginTop: 8,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  submitButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    minHeight: 64,
  },
  submitButtonText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#FFFFFF',
    marginLeft: 12,
  },
  bottomSpacing: {
    height: 32,
  },
});

