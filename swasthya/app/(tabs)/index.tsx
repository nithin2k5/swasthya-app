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

        {/* Quick Actions */}
        <MotiView
          from={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 100,
            delay: 900,
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
                  delay: 1000 + index * 100,
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
            delay: 1400,
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
                  delay: 1500 + index * 100,
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
            delay: 1800,
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
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily.bold,
    marginBottom: 20,
    marginLeft: 4,
  },
  actionsContainer: {
    marginTop: 8,
    marginBottom: 40,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -12,
  },
  actionCard: {
    width: (width - 72) / 2,
    margin: 12,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  actionCardGradient: {
    padding: 24,
    alignItems: 'center',
    minHeight: 140,
    justifyContent: 'center',
  },
  actionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  actionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.semiBold,
    textAlign: 'center',
    marginBottom: 6,
  },
  actionSubtitle: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    textAlign: 'center',
    lineHeight: 18,
  },
  activityContainer: {
    marginBottom: 40,
  },
  activityCard: {
    borderRadius: BorderRadius.xl,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  activityItem: {
    marginBottom: 16,
  },
  activityItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.semiBold,
    marginBottom: 4,
  },
  activityTime: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
  },
  insightsContainer: {
    marginBottom: 40,
  },
  insightCard: {
    borderRadius: BorderRadius.xl,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
  },
  insightContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  insightIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  insightText: {
    flex: 1,
  },
  insightTitle: {
    color: '#fff',
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily.bold,
    marginBottom: 10,
  },
  insightDescription: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    lineHeight: Typography.lineHeight.base,
  },
  bottomSpacing: {
    height: 32,
  },
});