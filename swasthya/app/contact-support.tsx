import { BorderRadius, Spacing, Typography } from '@/constants/theme';
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

export default function ContactSupportScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const [category, setCategory] = useState('technical');
  const [message, setMessage] = useState('');

  const categories = [
    { value: 'technical', label: 'Technical Issue', icon: 'bug' },
    { value: 'billing', label: 'Billing Question', icon: 'card' },
    { value: 'feature', label: 'Feature Request', icon: 'bulb' },
    { value: 'other', label: 'Other', icon: 'chatbubble-ellipses' },
  ];

  const handleSubmit = () => {
    Alert.alert(
      'Message Sent',
      'Thank you for contacting us. We\'ll respond within 24 hours.',
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

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
          
          <Text style={styles.headerTitle}>Contact Support</Text>
          
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
          >
            {/* Contact Info */}
            <View style={[styles.card, { backgroundColor: colors.surface }]}>
              <View style={styles.contactMethod}>
                <View style={[styles.contactIcon, { backgroundColor: `${colors.primary}20` }]}>
                  <Ionicons name="mail" size={24} color={colors.primary} />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={[styles.contactLabel, { color: colors.textSecondary }]}>Email</Text>
                  <Text style={[styles.contactValue, { color: colors.text }]}>support@swasthya.app</Text>
                </View>
              </View>

              <View style={styles.contactMethod}>
                <View style={[styles.contactIcon, { backgroundColor: `${colors.accent}20` }]}>
                  <Ionicons name="call" size={24} color={colors.accent} />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={[styles.contactLabel, { color: colors.textSecondary }]}>Phone</Text>
                  <Text style={[styles.contactValue, { color: colors.text }]}>1-800-SWASTHYA</Text>
                </View>
              </View>

              <View style={styles.contactMethod}>
                <View style={[styles.contactIcon, { backgroundColor: `${colors.success}20` }]}>
                  <Ionicons name="chatbubbles" size={24} color={colors.success} />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={[styles.contactLabel, { color: colors.textSecondary }]}>Live Chat</Text>
                  <Text style={[styles.contactValue, { color: colors.text }]}>Available 24/7</Text>
                </View>
              </View>
            </View>

            {/* Category Selection */}
            <View style={[styles.card, { backgroundColor: colors.surface }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Category</Text>
              <View style={styles.categoryGrid}>
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat.value}
                    style={[
                      styles.categoryOption,
                      {
                        backgroundColor: category === cat.value 
                          ? `${colors.primary}20` 
                          : colors.background,
                        borderColor: category === cat.value 
                          ? colors.primary 
                          : colors.border,
                      }
                    ]}
                    onPress={() => setCategory(cat.value)}
                  >
                    <Ionicons
                      name={cat.icon as any}
                      size={24}
                      color={category === cat.value ? colors.primary : colors.textSecondary}
                    />
                    <Text style={[
                      styles.categoryText,
                      { 
                        color: category === cat.value ? colors.primary : colors.textSecondary,
                        fontFamily: Typography.fontFamily.medium
                      }
                    ]}>
                      {cat.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Message Input */}
            <View style={[styles.card, { backgroundColor: colors.surface }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Message</Text>
              <View style={[styles.inputContainer, { backgroundColor: colors.background, borderColor: colors.border }]}>
                <TextInput
                  style={[styles.textArea, { color: colors.text, fontFamily: Typography.fontFamily.regular }]}
                  placeholder="Describe your issue or question..."
                  placeholderTextColor={colors.textMuted}
                  value={message}
                  onChangeText={setMessage}
                  multiline
                  numberOfLines={8}
                  textAlignVertical="top"
                />
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <LinearGradient
                colors={colors.gradientPrimary as any}
                style={styles.submitButtonGradient}
              >
                <Ionicons name="send" size={20} color="#FFFFFF" />
                <Text style={styles.submitButtonText}>Send Message</Text>
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
  contactMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    marginBottom: 4,
  },
  contactValue: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.semiBold,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily.bold,
    marginBottom: 20,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  categoryOption: {
    width: '48%',
    padding: 20,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
    margin: 6,
    borderWidth: 2,
  },
  categoryText: {
    fontSize: Typography.fontSize.sm,
    marginTop: 8,
    textAlign: 'center',
  },
  inputContainer: {
    borderRadius: BorderRadius.xl,
    borderWidth: 1.5,
    padding: 16,
  },
  textArea: {
    fontSize: Typography.fontSize.base,
    minHeight: 150,
  },
  submitButton: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    marginBottom: 32,
  },
  submitButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
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
