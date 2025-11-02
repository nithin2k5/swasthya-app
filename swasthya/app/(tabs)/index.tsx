import { BorderRadius, HealthColors, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MotiText, MotiView } from 'moti';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

interface HealthMetric {
  id: string;
  label: string;
  value: string;
  unit: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: string;
}

interface QuickAction {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  gradient: string[];
}

export default function HomeScreen() {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName] = useState('John Doe');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const healthMetrics: HealthMetric[] = [
    {
      id: 'heartRate',
      label: 'Heart Rate',
      value: '72',
      unit: 'BPM',
      icon: 'heart',
      color: HealthColors.heartRate,
      trend: 'stable',
      trendValue: '0%',
    },
    {
      id: 'steps',
      label: 'Steps',
      value: '8,432',
      unit: 'steps',
      icon: 'walk',
      color: HealthColors.steps,
      trend: 'up',
      trendValue: '+12%',
    },
    {
      id: 'sleep',
      label: 'Sleep',
      value: '7.5',
      unit: 'hours',
      icon: 'moon',
      color: HealthColors.sleep,
      trend: 'up',
      trendValue: '+15%',
    },
    {
      id: 'water',
      label: 'Water',
      value: '2.1',
      unit: 'liters',
      icon: 'water',
      color: HealthColors.water,
      trend: 'down',
      trendValue: '-5%',
    },
  ];

  const quickActions: QuickAction[] = [
    {
      id: 'aiChat',
      title: 'AI Health Chat',
      subtitle: 'Ask health questions',
      icon: 'chatbubble-ellipses',
      color: colors.primary,
      gradient: [colors.surfaceSecondary, colors.surfaceTertiary],
    },
    {
      id: 'records',
      title: 'Medical Records',
      subtitle: 'View your history',
      icon: 'document-text',
      color: colors.accent,
      gradient: [colors.surfaceSecondary, colors.surfaceTertiary],
    },
    {
      id: 'diagnosis',
      title: 'AI Diagnosis',
      subtitle: 'Upload & analyze',
      icon: 'medical',
      color: colors.success,
      gradient: [colors.surfaceSecondary, colors.surfaceTertiary],
    },
    {
      id: 'contactDoctor',
      title: 'Contact Doctor',
      subtitle: 'Schedule consultation',
      icon: 'call',
      color: colors.warning,
      gradient: [colors.surfaceSecondary, colors.surfaceTertiary],
    },
  ];

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'trending-up';
      case 'down':
        return 'trending-down';
      default:
        return 'remove';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return HealthColors.excellent;
      case 'down':
        return HealthColors.poor;
      default:
        return HealthColors.fair;
    }
  };

  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case 'aiChat':
        router.push('/chat');
        break;
      case 'records':
        router.push('/records');
        break;
      case 'diagnosis':
        router.push('/diagnosis');
        break;
      case 'contactDoctor':
        router.push('/contact-doctor');
        break;
      default:
        break;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      {/* Animated Header */}
      <LinearGradient
        colors={colors.gradientPrimary as any}
        style={styles.header}
      >
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 100,
            delay: 200,
          }}
          style={styles.headerContent}
        >
          <View style={styles.greetingSection}>
            <MotiText
              from={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{
                type: 'spring',
                damping: 15,
                stiffness: 100,
                delay: 400,
              }}
              style={styles.greeting}
            >
              {getGreeting()}
            </MotiText>
            <MotiText
              from={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{
                type: 'spring',
                damping: 15,
                stiffness: 100,
                delay: 500,
              }}
              style={styles.userName}
            >
              {userName}
            </MotiText>
          </View>
          
          <MotiView
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'spring',
              damping: 15,
              stiffness: 100,
              delay: 600,
            }}
          >
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications-outline" size={24} color="#fff" />
              <MotiView
                from={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: 'spring',
                  damping: 15,
                  stiffness: 100,
                  delay: 800,
                }}
                style={styles.notificationBadge}
              />
            </TouchableOpacity>
          </MotiView>
        </MotiView>

        {/* AI Health Score */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 100,
            delay: 700,
          }}
          style={styles.healthScoreContainer}
        >
          <View style={styles.healthScoreContent}>
            <View style={styles.scoreIcon}>
              <Ionicons name="analytics" size={24} color="#fff" />
            </View>
            <View style={styles.scoreInfo}>
              <Text style={styles.scoreLabel}>AI Health Score</Text>
              <Text style={styles.scoreValue}>98%</Text>
            </View>
            <View style={styles.scoreTrend}>
              <Ionicons name="trending-up" size={16} color={HealthColors.excellent} />
              <Text style={styles.scoreTrendText}>+5%</Text>
            </View>
          </View>
        </MotiView>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Health Metrics */}
        <MotiView
          from={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 100,
            delay: 900,
          }}
          style={styles.metricsContainer}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Today's Health</Text>
          <View style={styles.metricsGrid}>
            {healthMetrics.map((metric, index) => (
              <MotiView
                key={metric.id}
                from={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'spring',
                  damping: 15,
                  stiffness: 100,
                  delay: 1000 + index * 100,
                }}
                style={[styles.metricCard, { backgroundColor: colors.surface }]}
              >
                <TouchableOpacity style={styles.metricContent}>
                  <View style={[styles.metricIcon, { backgroundColor: `${metric.color}20` }]}>
                    <Ionicons name={metric.icon} size={24} color={metric.color} />
                  </View>
                  
                  <View style={styles.metricInfo}>
                    <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>
                      {metric.label}
                    </Text>
                    <View style={styles.metricValueContainer}>
                      <Text style={[styles.metricValue, { color: colors.text }]}>
                        {metric.value}
                      </Text>
                      <Text style={[styles.metricUnit, { color: colors.textMuted }]}>
                        {metric.unit}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.metricTrend}>
                    <Ionicons 
                      name={getTrendIcon(metric.trend)} 
                      size={16} 
                      color={getTrendColor(metric.trend)} 
                    />
                    <Text style={[styles.metricTrendText, { color: getTrendColor(metric.trend) }]}>
                      {metric.trendValue}
                    </Text>
                  </View>
                </TouchableOpacity>
              </MotiView>
            ))}
          </View>
        </MotiView>

        {/* Quick Actions */}
        <MotiView
          from={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 100,
            delay: 1400,
          }}
          style={styles.actionsContainer}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <MotiView
                key={action.id}
                from={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'spring',
                  damping: 15,
                  stiffness: 100,
                  delay: 1500 + index * 100,
                }}
                style={styles.actionCard}
              >
                <TouchableOpacity onPress={() => handleQuickAction(action.id)}>
                  <LinearGradient
                    colors={isDark ? [colors.surface, colors.surface] : action.gradient as any}
                    style={styles.actionCardGradient}
                  >
                    <View style={[styles.actionIcon, { backgroundColor: `${action.color}20` }]}>
                      <Ionicons name={action.icon} size={28} color={action.color} />
                    </View>
                    <Text style={[styles.actionTitle, { color: colors.text }]}>
                      {action.title}
                    </Text>
                    <Text style={[styles.actionSubtitle, { color: colors.textSecondary }]}>
                      {action.subtitle}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </MotiView>
            ))}
          </View>
        </MotiView>

        {/* Recent Activity */}
        <MotiView
          from={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 100,
            delay: 1800,
          }}
          style={styles.activityContainer}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Activity</Text>
          <View style={[styles.activityCard, { backgroundColor: colors.surface }]}>
            {[
              {
                icon: 'medical',
                title: 'Blood Test Results',
                time: '2 hours ago',
                color: '#3B82F6',
                bgColor: '#DBEAFE',
              },
              {
                icon: 'chatbubble',
                title: 'AI Health Consultation',
                time: 'Yesterday',
                color: '#22C55E',
                bgColor: '#DCFCE7',
              },
              {
                icon: 'fitness',
                title: 'Weekly Health Report',
                time: '3 days ago',
                color: '#F59E0B',
                bgColor: '#FEF3C7',
              },
            ].map((activity, index) => (
              <MotiView
                key={index}
                from={{ opacity: 0, translateX: -20 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{
                  type: 'spring',
                  damping: 15,
                  stiffness: 100,
                  delay: 1900 + index * 100,
                }}
                style={styles.activityItem}
              >
                <TouchableOpacity style={styles.activityItemContent}>
                  <View style={[styles.activityIcon, { backgroundColor: activity.bgColor }]}>
                    <Ionicons name={activity.icon as any} size={20} color={activity.color} />
                  </View>
                  <View style={styles.activityInfo}>
                    <Text style={[styles.activityTitle, { color: colors.text }]}>
                      {activity.title}
                    </Text>
                    <Text style={[styles.activityTime, { color: colors.textMuted }]}>
                      {activity.time}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
                </TouchableOpacity>
              </MotiView>
            ))}
          </View>
        </MotiView>

        {/* AI Insights */}
        <MotiView
          from={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 100,
            delay: 2200,
          }}
          style={styles.insightsContainer}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>AI Health Insights</Text>
          <LinearGradient
            colors={colors.gradientAccent as any}
            style={styles.insightCard}
          >
            <View style={styles.insightContent}>
              <View style={styles.insightIcon}>
                <Ionicons name="bulb" size={24} color="#fff" />
              </View>
              <View style={styles.insightText}>
                <Text style={styles.insightTitle}>Personalized Tip</Text>
                <Text style={styles.insightDescription}>
                  Your sleep pattern has improved by 15% this week. Keep maintaining your bedtime routine for optimal health!
                </Text>
              </View>
            </View>
          </LinearGradient>
        </MotiView>

        {/* Bottom Spacing */}
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
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greetingSection: {
    flex: 1,
  },
  greeting: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    fontFamily: Typography.fontFamily.medium,
  },
  userName: {
    color: '#fff',
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily.bold,
    marginTop: 4,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  healthScoreContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: BorderRadius.xl,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  healthScoreContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  scoreInfo: {
    flex: 1,
  },
  scoreLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
  },
  scoreValue: {
    color: '#fff',
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
  },
  scoreTrend: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreTrendText: {
    color: HealthColors.excellent,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    marginLeft: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: 16,
  },
  metricsContainer: {
    marginTop: -10,
    marginBottom: 32,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  metricCard: {
    width: (width - 56) / 2,
    margin: 8,
    borderRadius: BorderRadius.xl,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  metricContent: {
    alignItems: 'flex-start',
  },
  metricIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  metricInfo: {
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    marginBottom: 4,
  },
  metricValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  metricValue: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
  },
  metricUnit: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
    marginLeft: 4,
  },
  metricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricTrendText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
    marginLeft: 4,
  },
  actionsContainer: {
    marginBottom: 32,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  actionCard: {
    width: (width - 56) / 2,
    margin: 8,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  actionCardGradient: {
    padding: 20,
    alignItems: 'center',
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    textAlign: 'center',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: Typography.fontSize.sm,
    textAlign: 'center',
  },
  activityContainer: {
    marginBottom: 32,
  },
  activityCard: {
    borderRadius: BorderRadius.xl,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  activityItem: {
    marginBottom: 12,
  },
  activityItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: 2,
  },
  activityTime: {
    fontSize: Typography.fontSize.sm,
  },
  insightsContainer: {
    marginBottom: 32,
  },
  insightCard: {
    borderRadius: BorderRadius.xl,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  insightContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  insightIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  insightText: {
    flex: 1,
  },
  insightTitle: {
    color: '#fff',
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: 8,
  },
  insightDescription: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: Typography.fontSize.base,
    lineHeight: Typography.lineHeight.base,
  },
  bottomSpacing: {
    height: 20,
  },
});