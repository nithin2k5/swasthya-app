import { BorderRadius, HealthColors, Spacing, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

interface Condition {
  id: string;
  name: string;
  diagnosed: string;
  status: 'active' | 'resolved';
  severity: 'mild' | 'moderate' | 'severe';
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  started: string;
}

interface Allergy {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  reaction: string;
}

export default function MedicalHistoryScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<'conditions' | 'medications' | 'allergies'>('conditions');

  const conditions: Condition[] = [
    {
      id: '1',
      name: 'Type 2 Diabetes',
      diagnosed: '2018-03-15',
      status: 'active',
      severity: 'moderate'
    },
    {
      id: '2',
      name: 'Hypertension',
      diagnosed: '2019-06-20',
      status: 'active',
      severity: 'mild'
    },
    {
      id: '3',
      name: 'Seasonal Allergies',
      diagnosed: '2020-04-10',
      status: 'active',
      severity: 'mild'
    }
  ];

  const medications: Medication[] = [
    {
      id: '1',
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      started: '2018-03-20'
    },
    {
      id: '2',
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      started: '2019-07-01'
    },
    {
      id: '3',
      name: 'Vitamin D',
      dosage: '1000 IU',
      frequency: 'Once daily',
      started: '2022-01-15'
    }
  ];

  const allergies: Allergy[] = [
    {
      id: '1',
      name: 'Penicillin',
      severity: 'severe',
      reaction: 'Hives, difficulty breathing'
    },
    {
      id: '2',
      name: 'Shellfish',
      severity: 'moderate',
      reaction: 'Rash, swelling'
    },
    {
      id: '3',
      name: 'Pollen',
      severity: 'mild',
      reaction: 'Sneezing, watery eyes'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'severe':
        return HealthColors.error;
      case 'moderate':
        return HealthColors.warning;
      default:
        return HealthColors.success;
    }
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
          
          <Text style={styles.headerTitle}>Medical History</Text>
          
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add-circle" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Tabs */}
      <View style={[styles.tabsContainer, { backgroundColor: colors.surface }]}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'conditions' && { backgroundColor: colors.primary }
          ]}
          onPress={() => setActiveTab('conditions')}
        >
          <Text style={[
            styles.tabText,
            { 
              color: activeTab === 'conditions' ? '#FFFFFF' : colors.textSecondary,
              fontFamily: Typography.fontFamily.semiBold
            }
          ]}>
            Conditions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'medications' && { backgroundColor: colors.primary }
          ]}
          onPress={() => setActiveTab('medications')}
        >
          <Text style={[
            styles.tabText,
            { 
              color: activeTab === 'medications' ? '#FFFFFF' : colors.textSecondary,
              fontFamily: Typography.fontFamily.semiBold
            }
          ]}>
            Medications
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'allergies' && { backgroundColor: colors.primary }
          ]}
          onPress={() => setActiveTab('allergies')}
        >
          <Text style={[
            styles.tabText,
            { 
              color: activeTab === 'allergies' ? '#FFFFFF' : colors.textSecondary,
              fontFamily: Typography.fontFamily.semiBold
            }
          ]}>
            Allergies
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'conditions' && conditions.map((condition, index) => (
          <MotiView
            key={condition.id}
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: 'spring',
              damping: 20,
              stiffness: 100,
              delay: index * 100,
            }}
          >
            <View style={[styles.card, { backgroundColor: colors.surface }]}>
              <View style={styles.cardHeader}>
                <View style={styles.cardInfo}>
                  <Text style={[styles.cardTitle, { color: colors.text }]}>{condition.name}</Text>
                  <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>
                    Diagnosed: {condition.diagnosed}
                  </Text>
                </View>
                <View style={[
                  styles.statusBadge,
                  { 
                    backgroundColor: condition.status === 'active' 
                      ? `${HealthColors.error}20` 
                      : `${HealthColors.success}20`
                  }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { 
                      color: condition.status === 'active' 
                        ? HealthColors.error 
                        : HealthColors.success,
                      fontFamily: Typography.fontFamily.semiBold
                    }
                  ]}>
                    {condition.status === 'active' ? 'Active' : 'Resolved'}
                  </Text>
                </View>
              </View>
              
              <View style={styles.cardFooter}>
                <View style={[styles.severityBadge, { backgroundColor: `${getSeverityColor(condition.severity)}20` }]}>
                  <Ionicons 
                    name="alert-circle" 
                    size={16} 
                    color={getSeverityColor(condition.severity)} 
                  />
                  <Text style={[
                    styles.severityText,
                    { 
                      color: getSeverityColor(condition.severity),
                      fontFamily: Typography.fontFamily.medium
                    }
                  ]}>
                    {condition.severity.charAt(0).toUpperCase() + condition.severity.slice(1)}
                  </Text>
                </View>
              </View>
            </View>
          </MotiView>
        ))}

        {activeTab === 'medications' && medications.map((med, index) => (
          <MotiView
            key={med.id}
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: 'spring',
              damping: 20,
              stiffness: 100,
              delay: index * 100,
            }}
          >
            <View style={[styles.card, { backgroundColor: colors.surface }]}>
              <View style={styles.cardHeader}>
                <View style={styles.cardInfo}>
                  <Text style={[styles.cardTitle, { color: colors.text }]}>{med.name}</Text>
                  <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>
                    Started: {med.started}
                  </Text>
                </View>
                <Ionicons name="medical" size={24} color={colors.primary} />
              </View>
              
              <View style={styles.medicationDetails}>
                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Dosage:</Text>
                  <Text style={[styles.detailValue, { color: colors.text }]}>{med.dosage}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Frequency:</Text>
                  <Text style={[styles.detailValue, { color: colors.text }]}>{med.frequency}</Text>
                </View>
              </View>
            </View>
          </MotiView>
        ))}

        {activeTab === 'allergies' && allergies.map((allergy, index) => (
          <MotiView
            key={allergy.id}
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: 'spring',
              damping: 20,
              stiffness: 100,
              delay: index * 100,
            }}
          >
            <View style={[styles.card, { backgroundColor: colors.surface }]}>
              <View style={styles.cardHeader}>
                <View style={styles.cardInfo}>
                  <Text style={[styles.cardTitle, { color: colors.text }]}>{allergy.name}</Text>
                  <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>
                    {allergy.reaction}
                  </Text>
                </View>
                <View style={[
                  styles.severityBadge,
                  { backgroundColor: `${getSeverityColor(allergy.severity)}20` }
                ]}>
                  <Ionicons 
                    name="warning" 
                    size={20} 
                    color={getSeverityColor(allergy.severity)} 
                  />
                  <Text style={[
                    styles.severityText,
                    { 
                      color: getSeverityColor(allergy.severity),
                      fontFamily: Typography.fontFamily.semiBold
                    }
                  ]}>
                    {allergy.severity.charAt(0).toUpperCase() + allergy.severity.slice(1)}
                  </Text>
                </View>
              </View>
            </View>
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  tabText: {
    fontSize: Typography.fontSize.base,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  card: {
    borderRadius: BorderRadius.xl,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily.bold,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.lg,
  },
  statusText: {
    fontSize: Typography.fontSize.xs,
  },
  severityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.lg,
    alignSelf: 'flex-start',
  },
  severityText: {
    fontSize: Typography.fontSize.xs,
    marginLeft: 6,
  },
  cardFooter: {
    marginTop: 8,
  },
  medicationDetails: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
  },
  detailValue: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.semiBold,
  },
  bottomSpacing: {
    height: 32,
  },
});
