import { BorderRadius, HealthColors, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

interface SettingItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  type: 'toggle' | 'navigation' | 'action';
  value?: boolean;
  onPress?: () => void;
  color?: string;
}

export default function ProfileScreen() {
  const router = useRouter();
  const { colors, isDark, toggleColorScheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [dataBackupEnabled, setDataBackupEnabled] = useState(true);
  const [healthReminders, setHealthReminders] = useState(true);
  const [shareAnalytics, setShareAnalytics] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => console.log('Logout') }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your health data will be permanently deleted from the blockchain.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => console.log('Delete account') }
      ]
    );
  };

  const settingSections = [
    {
      title: 'Health Profile',
      items: [
        {
          id: 'personal-info',
          title: 'Personal Information',
          subtitle: 'Name, age, emergency contacts',
          icon: 'person',
          type: 'navigation',
          onPress: () => console.log('Personal info')
        },
        {
          id: 'medical-history',
          title: 'Medical History',
          subtitle: 'Conditions, allergies, medications',
          icon: 'medical',
          type: 'navigation',
          onPress: () => console.log('Medical history')
        },
        {
          id: 'health-goals',
          title: 'Health Goals',
          subtitle: 'Set and track your wellness objectives',
          icon: 'trophy',
          type: 'navigation',
          onPress: () => console.log('Health goals')
        },
        {
          id: 'health-reminders',
          title: 'Health Reminders',
          subtitle: 'Medication and appointment alerts',
          icon: 'alarm',
          type: 'toggle',
          value: healthReminders,
          onPress: () => setHealthReminders(!healthReminders)
        }
      ]
    },
    {
      title: 'Privacy & Security',
      items: [
        {
          id: 'biometric',
          title: 'Biometric Authentication',
          subtitle: 'Use fingerprint or face ID',
          icon: 'finger-print',
          type: 'toggle',
          value: biometricEnabled,
          onPress: () => setBiometricEnabled(!biometricEnabled)
        },
        {
          id: 'blockchain-keys',
          title: 'Blockchain Keys',
          subtitle: 'Manage your encryption keys',
          icon: 'key',
          type: 'navigation',
          onPress: () => console.log('Blockchain keys')
        },
        {
          id: 'data-permissions',
          title: 'Data Permissions',
          subtitle: 'Control who can access your data',
          icon: 'shield-checkmark',
          type: 'navigation',
          onPress: () => console.log('Data permissions')
        },
        {
          id: 'backup',
          title: 'Data Backup',
          subtitle: 'Secure cloud backup of your health data',
          icon: 'cloud-upload',
          type: 'toggle',
          value: dataBackupEnabled,
          onPress: () => setDataBackupEnabled(!dataBackupEnabled)
        },
        {
          id: 'share-analytics',
          title: 'Share Analytics',
          subtitle: 'Help improve AI with anonymous data',
          icon: 'analytics',
          type: 'toggle',
          value: shareAnalytics,
          onPress: () => setShareAnalytics(!shareAnalytics)
        }
      ]
    },
    {
      title: 'App Settings',
      items: [
        {
          id: 'notifications',
          title: 'Notifications',
          subtitle: 'Health reminders and alerts',
          icon: 'notifications',
          type: 'toggle',
          value: notificationsEnabled,
          onPress: () => setNotificationsEnabled(!notificationsEnabled)
        },
        {
          id: 'theme',
          title: 'Dark Mode',
          subtitle: isDark ? 'Dark theme enabled' : 'Light theme enabled',
          icon: 'moon',
          type: 'toggle',
          value: isDark,
          onPress: toggleColorScheme
        },
        {
          id: 'language',
          title: 'Language',
          subtitle: 'English (US)',
          icon: 'language',
          type: 'navigation',
          onPress: () => console.log('Language')
        },
        {
          id: 'accessibility',
          title: 'Accessibility',
          subtitle: 'Font size, voice control',
          icon: 'accessibility',
          type: 'navigation',
          onPress: () => console.log('Accessibility')
        }
      ]
    },
    {
      title: 'Support & Information',
      items: [
        {
          id: 'help',
          title: 'Help Center',
          subtitle: 'FAQs and support articles',
          icon: 'help-circle',
          type: 'navigation',
          onPress: () => console.log('Help')
        },
        {
          id: 'contact',
          title: 'Contact Support',
          subtitle: 'Get help from our team',
          icon: 'chatbubble-ellipses',
          type: 'navigation',
          onPress: () => console.log('Contact')
        },
        {
          id: 'feedback',
          title: 'Send Feedback',
          subtitle: 'Help us improve the app',
          icon: 'star',
          type: 'navigation',
          onPress: () => console.log('Feedback')
        },
        {
          id: 'about',
          title: 'About Swasthya',
          subtitle: 'Version, terms, privacy policy',
          icon: 'information-circle',
          type: 'navigation',
          onPress: () => router.push('/about' as any)
        }
      ]
    }
  ];

  const renderSettingItem = (item: any, index: number) => (
    <MotiView
      key={item.id}
      from={{ opacity: 0, translateX: -20 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{
        type: 'spring',
        damping: 15,
        stiffness: 100,
        delay: 600 + index * 50,
      }}
    >
      <TouchableOpacity
        style={styles.settingItem}
        onPress={item.onPress}
        disabled={item.type === 'toggle'}
      >
        <View style={[styles.settingIcon, { backgroundColor: `${colors.secondary}20` }]}>
          <Ionicons name={item.icon as any} size={20} color={colors.secondary} />
        </View>
        
        <View style={styles.settingContent}>
          <Text style={[styles.settingTitle, { color: colors.text }]}>{item.title}</Text>
          {item.subtitle && (
            <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>{item.subtitle}</Text>
          )}
        </View>

        {item.type === 'toggle' ? (
          <Switch
            value={item.value}
            onValueChange={item.onPress}
            trackColor={{ false: colors.border, true: colors.secondary }}
            thumbColor={item.value ? '#fff' : colors.textMuted}
          />
        ) : (
          <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
        )}
      </TouchableOpacity>
    </MotiView>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      {/* Header */}
      <LinearGradient
        colors={colors.gradientPrimary as any}
        style={styles.header}
      >
        <MotiView
          from={{ opacity: 0, translateY: -30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 100,
            delay: 200,
          }}
          style={styles.profileSection}
        >
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>JD</Text>
            </View>
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>john.doe@email.com</Text>
            <View style={styles.membershipBadge}>
              <Ionicons name="shield-checkmark" size={14} color={HealthColors.verified} />
              <Text style={styles.membershipText}>Verified Member</Text>
            </View>
          </View>
        </MotiView>

        {/* Health Stats */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 100,
            delay: 400,
          }}
          style={styles.statsContainer}
        >
          <View style={styles.statItem}>
            <Text style={styles.statValue}>247</Text>
            <Text style={styles.statLabel}>Records</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Providers</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>98%</Text>
            <Text style={styles.statLabel}>Health Score</Text>
          </View>
        </MotiView>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Blockchain Status */}
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 100,
            delay: 500,
          }}
          style={[styles.blockchainCard, { backgroundColor: colors.surface }]}
        >
          <View style={styles.blockchainHeader}>
            <Ionicons name="cube" size={24} color={colors.secondary} />
            <Text style={[styles.blockchainTitle, { color: colors.text }]}>Blockchain Status</Text>
            <View style={styles.statusBadge}>
              <MotiView
                from={{ scale: 0.8 }}
                animate={{ scale: 1.2 }}
                transition={{
                  type: 'timing',
                  duration: 1000,
                  loop: true,
                  repeatReverse: true,
                }}
                style={styles.statusDot}
              />
              <Text style={[styles.statusText, { color: HealthColors.synced }]}>Synced</Text>
            </View>
          </View>
          <Text style={[styles.blockchainSubtitle, { color: colors.textSecondary }]}>
            Your health data is securely stored on the blockchain
          </Text>
          <View style={styles.blockchainStats}>
            <View style={styles.blockchainStat}>
              <Text style={[styles.blockchainStatValue, { color: colors.text }]}>0x1a2b3c...</Text>
              <Text style={[styles.blockchainStatLabel, { color: colors.textMuted }]}>Wallet Address</Text>
            </View>
            <TouchableOpacity style={[styles.viewBlockchainButton, { backgroundColor: `${colors.secondary}20` }]}>
              <Text style={[styles.viewBlockchainText, { color: colors.secondary }]}>View on Explorer</Text>
              <Ionicons name="open" size={14} color={colors.secondary} />
            </TouchableOpacity>
          </View>
        </MotiView>

        {/* Settings Sections */}
        {settingSections.map((section, sectionIndex) => (
          <MotiView
            key={sectionIndex}
            from={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: 'spring',
              damping: 15,
              stiffness: 100,
              delay: 600 + sectionIndex * 100,
            }}
            style={styles.settingSection}
          >
            <Text style={[styles.sectionTitle, { color: colors.text }]}>{section.title}</Text>
            <View style={[styles.settingCard, { backgroundColor: colors.surface }]}>
              {section.items.map((item, itemIndex) => (
                <View key={item.id}>
                  {renderSettingItem(item, itemIndex)}
                  {itemIndex < section.items.length - 1 && (
                    <View style={[styles.settingDivider, { backgroundColor: colors.border }]} />
                  )}
                </View>
              ))}
            </View>
          </MotiView>
        ))}

        {/* Danger Zone */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 100,
            delay: 1000,
          }}
          style={styles.dangerSection}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Account</Text>
          <View style={[styles.settingCard, { backgroundColor: colors.surface }]}>
            <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
              <View style={[styles.settingIcon, { backgroundColor: `${HealthColors.warning}20` }]}>
                <Ionicons name="log-out" size={20} color={HealthColors.warning} />
              </View>
              <View style={styles.settingContent}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>Logout</Text>
                <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>Sign out of your account</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
            </TouchableOpacity>

            <View style={[styles.settingDivider, { backgroundColor: colors.border }]} />

            <TouchableOpacity style={styles.settingItem} onPress={handleDeleteAccount}>
              <View style={[styles.settingIcon, { backgroundColor: `${HealthColors.error}20` }]}>
                <Ionicons name="trash" size={20} color={HealthColors.error} />
              </View>
              <View style={styles.settingContent}>
                <Text style={[styles.settingTitle, { color: HealthColors.error }]}>Delete Account</Text>
                <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>Permanently delete your account and data</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
        </MotiView>

        {/* App Version */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            type: 'timing',
            duration: 1000,
            delay: 1200,
          }}
          style={styles.versionContainer}
        >
          <Text style={[styles.versionText, { color: colors.textMuted }]}>Swasthya v1.0.0</Text>
          <Text style={[styles.versionSubtext, { color: colors.textMuted }]}>Built with ❤️ for your health</Text>
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: '#fff',
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: 4,
  },
  profileEmail: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: Typography.fontSize.sm,
    marginBottom: 8,
  },
  membershipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.lg,
    alignSelf: 'flex-start',
  },
  membershipText: {
    color: '#fff',
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: BorderRadius.xl,
    padding: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: '#fff',
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: Typography.fontSize.xs,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  blockchainCard: {
    borderRadius: BorderRadius.xl,
    padding: 16,
    marginTop: -10,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  blockchainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  blockchainTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    marginLeft: 8,
    flex: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: HealthColors.synced,
    marginRight: 4,
  },
  statusText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
  },
  blockchainSubtitle: {
    fontSize: Typography.fontSize.sm,
    marginBottom: 12,
  },
  blockchainStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  blockchainStat: {
    flex: 1,
  },
  blockchainStatValue: {
    fontSize: Typography.fontSize.xs,
    fontFamily: 'monospace',
    fontWeight: Typography.fontWeight.semibold,
  },
  blockchainStatLabel: {
    fontSize: Typography.fontSize.xs,
    marginTop: 2,
  },
  viewBlockchainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.md,
  },
  viewBlockchainText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
    marginRight: 4,
  },
  settingSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: 12,
  },
  settingCard: {
    borderRadius: BorderRadius.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: Typography.fontSize.sm,
  },
  settingDivider: {
    height: 1,
    marginLeft: 68,
  },
  dangerSection: {
    marginBottom: 24,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  versionText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
  },
  versionSubtext: {
    fontSize: Typography.fontSize.xs,
    marginTop: 4,
  },
});