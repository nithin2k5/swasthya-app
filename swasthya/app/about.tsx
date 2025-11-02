import { BorderRadius, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MotiView } from 'moti';
import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AboutScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();

  const teamMembers = [
    { name: 'Dr. Sarah Johnson', role: 'Chief Medical Officer', icon: 'medical' },
    { name: 'Alex Chen', role: 'AI/ML Engineer', icon: 'analytics' },
    { name: 'Maria Rodriguez', role: 'Blockchain Developer', icon: 'cube' },
    { name: 'David Kim', role: 'Mobile Developer', icon: 'phone-portrait' },
  ];

  const features = [
    { title: 'Blockchain Security', description: 'Immutable health records', icon: 'shield-checkmark' },
    { title: 'AI Diagnosis', description: 'Machine learning powered insights', icon: 'analytics' },
    { title: 'Privacy First', description: 'You own and control your data', icon: 'lock-closed' },
    { title: '24/7 Access', description: 'Your health data anywhere, anytime', icon: 'time' },
  ];

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      {/* Header */}
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
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>About Swasthya</Text>
            <Text style={styles.headerSubtitle}>Redefining Healthcare</Text>
          </View>
          
          <View style={styles.placeholder} />
        </MotiView>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* App Logo & Mission */}
        <MotiView
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 100,
            delay: 400,
          }}
          style={[styles.missionCard, { backgroundColor: colors.surface }]}
        >
          <View style={styles.logoContainer}>
            <LinearGradient
              colors={colors.gradientSecondary as any}
              style={styles.logoBackground}
            >
              <Ionicons name="medical" size={48} color="#fff" />
            </LinearGradient>
          </View>
          
          <Text style={[styles.appName, { color: colors.text }]}>Swasthya</Text>
          <Text style={[styles.tagline, { color: colors.textSecondary }]}>
            Empowering individuals through secure, AI-driven healthcare technology
          </Text>
          
          <Text style={[styles.missionText, { color: colors.textSecondary }]}>
            Our mission is to revolutionize healthcare by combining cutting-edge AI technology 
            with blockchain security, putting patients in control of their health data while 
            providing intelligent insights for better health outcomes.
          </Text>
        </MotiView>

        {/* Key Features */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 100,
            delay: 600,
          }}
          style={styles.section}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Key Features</Text>
          
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <MotiView
                key={index}
                from={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'spring',
                  damping: 15,
                  stiffness: 100,
                  delay: 700 + index * 100,
                }}
                style={[styles.featureCard, { backgroundColor: colors.surface }]}
              >
                <View style={[styles.featureIcon, { backgroundColor: `${colors.secondary}20` }]}>
                  <Ionicons name={feature.icon as any} size={24} color={colors.secondary} />
                </View>
                <Text style={[styles.featureTitle, { color: colors.text }]}>{feature.title}</Text>
                <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>
                  {feature.description}
                </Text>
              </MotiView>
            ))}
          </View>
        </MotiView>

        {/* Team */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 100,
            delay: 1100,
          }}
          style={styles.section}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Our Team</Text>
          
          <View style={[styles.teamCard, { backgroundColor: colors.surface }]}>
            {teamMembers.map((member, index) => (
              <MotiView
                key={index}
                from={{ opacity: 0, translateX: -20 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{
                  type: 'spring',
                  damping: 15,
                  stiffness: 100,
                  delay: 1200 + index * 100,
                }}
                style={styles.teamMember}
              >
                <View style={[styles.memberIcon, { backgroundColor: `${colors.secondary}20` }]}>
                  <Ionicons name={member.icon as any} size={20} color={colors.secondary} />
                </View>
                <View style={styles.memberInfo}>
                  <Text style={[styles.memberName, { color: colors.text }]}>{member.name}</Text>
                  <Text style={[styles.memberRole, { color: colors.textSecondary }]}>{member.role}</Text>
                </View>
              </MotiView>
            ))}
          </View>
        </MotiView>

        {/* Technology Stack */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 100,
            delay: 1600,
          }}
          style={styles.section}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Technology Stack</Text>
          
          <View style={[styles.techCard, { backgroundColor: colors.surface }]}>
            <View style={styles.techGrid}>
              {[
                { name: 'React Native', icon: 'phone-portrait' },
                { name: 'Blockchain', icon: 'cube' },
                { name: 'AI/ML', icon: 'analytics' },
                { name: 'Cloud Security', icon: 'cloud-done' },
              ].map((tech, index) => (
                <View key={index} style={styles.techItem}>
                  <Ionicons name={tech.icon as any} size={20} color={colors.secondary} />
                  <Text style={[styles.techName, { color: colors.text }]}>{tech.name}</Text>
                </View>
              ))}
            </View>
          </View>
        </MotiView>

        {/* Legal & Support */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 100,
            delay: 1800,
          }}
          style={styles.section}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Legal & Support</Text>
          
          <View style={[styles.legalCard, { backgroundColor: colors.surface }]}>
            {[
              { title: 'Privacy Policy', subtitle: 'How we protect your data', icon: 'shield-checkmark' },
              { title: 'Terms of Service', subtitle: 'Usage terms and conditions', icon: 'document-text' },
              { title: 'Support Center', subtitle: 'Get help and support', icon: 'help-circle' },
              { title: 'Contact Us', subtitle: 'Reach out to our team', icon: 'mail' },
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.legalItem}
                onPress={() => console.log(`Open ${item.title}`)}
              >
                <View style={[styles.legalIcon, { backgroundColor: `${colors.secondary}20` }]}>
                  <Ionicons name={item.icon as any} size={20} color={colors.secondary} />
                </View>
                <View style={styles.legalContent}>
                  <Text style={[styles.legalTitle, { color: colors.text }]}>{item.title}</Text>
                  <Text style={[styles.legalSubtitle, { color: colors.textSecondary }]}>{item.subtitle}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
              </TouchableOpacity>
            ))}
          </View>
        </MotiView>

        {/* App Version */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            type: 'timing',
            duration: 1000,
            delay: 2000,
          }}
          style={styles.versionInfo}
        >
          <Text style={[styles.versionText, { color: colors.textMuted }]}>Version 1.0.0</Text>
          <Text style={[styles.buildText, { color: colors.textMuted }]}>Build 2024.10.28</Text>
          <Text style={[styles.copyrightText, { color: colors.textMuted }]}>
            © 2024 Swasthya. All rights reserved.
          </Text>
        </MotiView>
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
  headerInfo: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: Typography.fontSize.sm,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  missionCard: {
    borderRadius: BorderRadius.xl,
    padding: 24,
    alignItems: 'center',
    marginTop: -10,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logoContainer: {
    marginBottom: 16,
  },
  logoBackground: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    marginBottom: 8,
  },
  tagline: {
    fontSize: Typography.fontSize.base,
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: Typography.fontWeight.medium,
  },
  missionText: {
    fontSize: Typography.fontSize.base,
    textAlign: 'center',
    lineHeight: Typography.lineHeight.base,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: 16,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  featureCard: {
    width: '47%',
    margin: 8,
    padding: 16,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    textAlign: 'center',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: Typography.fontSize.sm,
    textAlign: 'center',
  },
  teamCard: {
    borderRadius: BorderRadius.xl,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  teamMember: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  memberIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: 2,
  },
  memberRole: {
    fontSize: Typography.fontSize.sm,
  },
  techCard: {
    borderRadius: BorderRadius.xl,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  techGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  techItem: {
    alignItems: 'center',
    margin: 8,
  },
  techName: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    marginTop: 8,
  },
  legalCard: {
    borderRadius: BorderRadius.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  legalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  legalIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  legalContent: {
    flex: 1,
  },
  legalTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: 2,
  },
  legalSubtitle: {
    fontSize: Typography.fontSize.sm,
  },
  versionInfo: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  versionText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
  },
  buildText: {
    fontSize: Typography.fontSize.sm,
    marginTop: 4,
  },
  copyrightText: {
    fontSize: Typography.fontSize.sm,
    marginTop: 8,
  },
});
