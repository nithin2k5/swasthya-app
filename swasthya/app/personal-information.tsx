import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
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

export default function PersonalInformationScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const [editMode, setEditMode] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    fullName: 'John Doe',
    dateOfBirth: '1990-01-15',
    gender: 'Male',
    phoneNumber: '+1 (555) 123-4567',
    email: 'john.doe@email.com',
    address: '123 Main Street, City, State 12345',
    emergencyContact: 'Jane Doe',
    emergencyPhone: '+1 (555) 987-6543',
    emergencyRelation: 'Spouse',
    bloodType: 'O+',
  });

  const updateField = (field: string, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setEditMode(false);
    // Simulate save
    console.log('Saving personal information:', personalInfo);
  };

  const renderField = (
    icon: string,
    label: string,
    field: keyof typeof personalInfo,
    keyboardType: 'default' | 'email-address' | 'phone-pad' = 'default'
  ) => (
    <View style={styles.fieldContainer}>
      <View style={styles.fieldLabel}>
        <Ionicons name={icon as any} size={20} color={colors.primary} />
        <Text style={[styles.fieldLabelText, { color: colors.textSecondary }]}>{label}</Text>
      </View>
      <View style={[styles.inputContainer, { 
        backgroundColor: editMode ? colors.background : colors.surfaceSecondary, 
        borderColor: editMode ? colors.border : 'transparent',
        borderWidth: editMode ? 1.5 : 0
      }]}>
        <TextInput
          style={[styles.inputText, { color: colors.text, fontFamily: Typography.fontFamily.regular }]}
          value={personalInfo[field]}
          onChangeText={(value) => updateField(field, value)}
          editable={editMode}
          keyboardType={keyboardType}
          placeholderTextColor={colors.textMuted}
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
          
          <Text style={styles.headerTitle}>Personal Information</Text>
          
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => editMode ? handleSave() : setEditMode(true)}
          >
            <Text style={styles.editButtonText}>{editMode ? 'Save' : 'Edit'}</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
            {/* Profile Picture */}
            <View style={styles.profilePictureSection}>
              <View style={[styles.profilePicture, { backgroundColor: colors.primary }]}>
                <Text style={styles.profilePictureText}>
                  {personalInfo.fullName.split(' ').map(n => n[0]).join('')}
                </Text>
              </View>
              {editMode && (
                <TouchableOpacity style={styles.changePictureButton}>
                  <Ionicons name="camera" size={20} color={colors.primary} />
                  <Text style={[styles.changePictureText, { color: colors.primary }]}>
                    Change Picture
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Personal Details */}
            <View style={[styles.card, { backgroundColor: colors.surface }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Personal Details</Text>
              
              {renderField('person-outline', 'Full Name', 'fullName')}
              {renderField('calendar-outline', 'Date of Birth', 'dateOfBirth')}
              {renderField('people-outline', 'Gender', 'gender')}
              {renderField('call-outline', 'Phone Number', 'phoneNumber', 'phone-pad')}
              {renderField('mail-outline', 'Email Address', 'email', 'email-address')}
              {renderField('location-outline', 'Address', 'address')}
              {renderField('medical-outline', 'Blood Type', 'bloodType')}
            </View>

            {/* Emergency Contact */}
            <View style={[styles.card, { backgroundColor: colors.surface }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Emergency Contact</Text>
              
              {renderField('person-outline', 'Contact Name', 'emergencyContact')}
              {renderField('call-outline', 'Contact Phone', 'emergencyPhone', 'phone-pad')}
              {renderField('people-outline', 'Relationship', 'emergencyRelation')}
            </View>

            {editMode && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.cancelButton, { backgroundColor: colors.surfaceSecondary }]}
                  onPress={() => setEditMode(false)}
                >
                  <Text style={[styles.cancelButtonText, { color: colors.text }]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSave}
                >
                  <LinearGradient
                    colors={colors.gradientPrimary as any}
                    style={styles.saveButtonGradient}
                  >
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}

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
  editButton: {
    width: 60,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  formSection: {
    paddingVertical: 32,
  },
  profilePictureSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
  profilePictureText: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize['4xl'],
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily.bold,
  },
  changePictureButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: BorderRadius.lg,
    backgroundColor: 'transparent',
  },
  changePictureText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.semiBold,
    marginLeft: 8,
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
  fieldContainer: {
    marginBottom: 24,
  },
  fieldLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  fieldLabelText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.semiBold,
    marginLeft: 8,
  },
  inputContainer: {
    borderRadius: BorderRadius.lg,
    paddingHorizontal: 16,
    paddingVertical: 14,
    minHeight: 52,
    justifyContent: 'center',
  },
  inputText: {
    fontSize: Typography.fontSize.base,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 32,
  },
  cancelButton: {
    flex: 1,
    borderRadius: BorderRadius.xl,
    paddingVertical: 18,
    alignItems: 'center',
    marginRight: 12,
  },
  cancelButtonText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.semiBold,
  },
  saveButton: {
    flex: 1,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    marginLeft: 12,
  },
  saveButtonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#FFFFFF',
  },
  bottomSpacing: {
    height: 32,
  },
});
