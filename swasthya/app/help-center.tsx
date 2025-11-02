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
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export default function HelpCenterScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['All', 'Getting Started', 'Security', 'Features', 'Troubleshooting'];
  const faqs: FAQ[] = [
    {
      id: '1',
      category: 'Getting Started',
      question: 'How do I create an account?',
      answer: 'Creating an account is easy! Download the Swasthya app, tap "Sign Up", enter your email and create a secure password. Then complete your profile to start managing your health data.'
    },
    {
      id: '2',
      category: 'Security',
      question: 'Is my health data secure?',
      answer: 'Yes! Swasthya uses blockchain technology to ensure your health data is encrypted, decentralized, and completely secure. Only you control access to your information.'
    },
    {
      id: '3',
      category: 'Features',
      question: 'How does AI Diagnosis work?',
      answer: 'Our AI uses advanced machine learning to analyze symptoms, medical history, and uploaded images. It provides preliminary insights and recommendations, but always consult healthcare professionals for official diagnosis.'
    },
    {
      id: '4',
      category: 'Getting Started',
      question: 'How do I upload medical records?',
      answer: 'Go to Medical Records tab, tap the "+" button, and select your document from your device. You can upload lab results, prescriptions, visit notes, and imaging reports. All files are automatically encrypted.'
    },
    {
      id: '5',
      category: 'Troubleshooting',
      question: 'The app is running slowly',
      answer: 'Try clearing the app cache, restarting your device, or updating to the latest version. If issues persist, contact our support team for assistance.'
    },
    {
      id: '6',
      category: 'Features',
      question: 'Can I share records with my doctor?',
      answer: 'Yes! In your Data Permissions settings, you can grant specific healthcare providers access to your records. You control who sees what and when.'
    }
  ];

  const filteredFAQs = selectedCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

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
          
          <Text style={styles.headerTitle}>Help Center</Text>
          
          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      >
        {/* Categories */}
        <View style={[styles.categoriesContainer, { backgroundColor: colors.surface }]}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  {
                    backgroundColor: selectedCategory === category 
                      ? colors.primary 
                      : colors.background,
                  }
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.categoryText,
                  { 
                    color: selectedCategory === category 
                      ? '#FFFFFF' 
                      : colors.textSecondary,
                    fontFamily: Typography.fontFamily.semiBold
                  }
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* FAQs */}
        {filteredFAQs.map((faq, index) => (
          <MotiView
            key={faq.id}
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: 'spring',
              damping: 20,
              stiffness: 100,
              delay: index * 100,
            }}
          >
            <TouchableOpacity
              style={[styles.faqCard, { backgroundColor: colors.surface }]}
              onPress={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
            >
              <View style={styles.faqHeader}>
                <Text style={[styles.faqQuestion, { color: colors.text }]}>
                  {faq.question}
                </Text>
                <Ionicons
                  name={expandedId === faq.id ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={colors.textMuted}
                />
              </View>
              {expandedId === faq.id && (
                <Text style={[styles.faqAnswer, { color: colors.textSecondary }]}>
                  {faq.answer}
                </Text>
              )}
            </TouchableOpacity>
          </MotiView>
        ))}

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
  },
  categoriesContainer: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: BorderRadius.full,
    marginHorizontal: 6,
  },
  categoryText: {
    fontSize: Typography.fontSize.sm,
  },
  faqCard: {
    borderRadius: BorderRadius.xl,
    padding: 20,
    marginHorizontal: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    flex: 1,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.semiBold,
    marginRight: 16,
  },
  faqAnswer: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    marginTop: 16,
    lineHeight: 22,
  },
  bottomSpacing: {
    height: 32,
  },
});
