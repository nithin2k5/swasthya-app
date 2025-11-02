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
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

interface Goal {
  id: string;
  title: string;
  category: 'fitness' | 'nutrition' | 'mental' | 'preventive';
  target: string;
  progress: number;
  deadline: string;
  status: 'active' | 'completed' | 'pending';
}

const goals: Goal[] = [
  {
    id: '1',
    title: 'Walk 10,000 steps daily',
    category: 'fitness',
    target: '90 days',
    progress: 67,
    deadline: '2024-12-31',
    status: 'active'
  },
  {
    id: '2',
    title: 'Lose 10 pounds',
    category: 'nutrition',
    target: '3 months',
    progress: 40,
    deadline: '2025-01-15',
    status: 'active'
  },
  {
    id: '3',
    title: 'Meditate daily',
    category: 'mental',
    target: 'Daily',
    progress: 85,
    deadline: 'Ongoing',
    status: 'active'
  },
  {
    id: '4',
    title: 'Annual health checkup',
    category: 'preventive',
    target: 'Complete',
    progress: 0,
    deadline: '2025-03-01',
    status: 'pending'
  }
];

const categoryConfig = {
  fitness: { icon: 'fitness', gradient: ['#14B8A6', '#0D9488'], color: '#14B8A6' },
  nutrition: { icon: 'nutrition', gradient: ['#3B82F6', '#2563EB'], color: '#3B82F6' },
  mental: { icon: 'leaf', gradient: ['#22C55E', '#059669'], color: '#22C55E' },
  preventive: { icon: 'shield-checkmark', gradient: ['#F59E0B', '#D97706'], color: '#F59E0B' },
};

export default function HealthGoalsScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

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
          
          <Text style={styles.headerTitle}>Health Goals</Text>
          
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add-circle" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Stats Summary */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: colors.text }]}>
            {goals.filter(g => g.status === 'active').length}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Active Goals</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: colors.text }]}>
            {Math.round(goals.filter(g => g.status === 'active').reduce((acc, g) => acc + g.progress, 0) / goals.filter(g => g.status === 'active').length)}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Avg Progress</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {goals.map((goal, index) => (
          <MotiView
            key={goal.id}
            from={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: 'spring',
              damping: 20,
              stiffness: 100,
              delay: index * 100,
            }}
          >
            <TouchableOpacity style={styles.goalCard}>
              <LinearGradient
                colors={categoryConfig[goal.category].gradient as any}
                style={styles.goalGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.goalIcon}>
                  <Ionicons 
                    name={categoryConfig[goal.category].icon as any} 
                    size={32} 
                    color="#FFFFFF" 
                  />
                </View>
                
                <View style={styles.goalInfo}>
                  <Text style={styles.goalTitle}>{goal.title}</Text>
                  <Text style={styles.goalTarget}>{goal.target}</Text>
                  
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressFill, 
                          { width: `${goal.progress}%` }
                        ]} 
                      />
                    </View>
                    <Text style={styles.progressText}>{goal.progress}%</Text>
                  </View>
                </View>
              </LinearGradient>
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginHorizontal: 20,
  },
  statValue: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily.bold,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  goalCard: {
    marginBottom: 16,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  goalGradient: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  goalIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
    marginBottom: 6,
  },
  goalTarget: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginRight: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  progressText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
    width: 44,
    textAlign: 'right',
  },
  bottomSpacing: {
    height: 32,
  },
});
