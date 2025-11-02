import { BorderRadius, HealthColors, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MotiView } from 'moti';
import React, { useState, useEffect } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View, Image } from 'react-native';
import { logout, getStoredUser, clearAuth } from '@/lib/api';

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
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const user = await getStoredUser();
      setUserData(user);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive', 
          onPress: async () => {
            try {
              await logout();
              await clearAuth();
              router.replace('/auth/login');
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          }
        }
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
          onPress: () => router.push('/personal-information' as any)
        },
        {
          id: 'medical-history',
          title: 'Medical History',
          subtitle: 'Conditions, allergies, medications',
          icon: 'medical',
          type: 'navigation',
          onPress: () => router.push('/medical-history' as any)
        },
        {
          id: 'health-goals',
          title: 'Health Goals',
          subtitle: 'Set and track your wellness objectives',
          icon: 'trophy',
          type: 'navigation',
          onPress: () => router.push('/health-goals' as any)
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
          onPress: () => router.push('/blockchain-keys' as any)
        },
        {
          id: 'data-permissions',
          title: 'Data Permissions',
          subtitle: 'Control who can access your data',
          icon: 'shield-checkmark',
          type: 'navigation',
          onPress: () => router.push('/data-permissions' as any)
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
          onPress: () => router.push('/language-settings' as any)
        },
        {
          id: 'accessibility',
          title: 'Accessibility',
          subtitle: 'Font size, voice control',
          icon: 'accessibility',
          type: 'navigation',
          onPress: () => router.push('/accessibility-settings' as any)
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
          onPress: () => router.push('/help-center' as any)
        },
        {
          id: 'contact',
          title: 'Contact Support',
          subtitle: 'Get help from our team',
          icon: 'chatbubble-ellipses',
          type: 'navigation',
          onPress: () => router.push('/contact-support' as any)
        },
        {
          id: 'feedback',
          title: 'Send Feedback',
          subtitle: 'Help us improve the app',
          icon: 'star',
          type: 'navigation',
          onPress: () => router.push('/send-feedback' as any)
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
        <View style={[styles.settingIcon, { backgroundColor: `${colors.primary}15` }]}>
          <Ionicons name={item.icon as any} size={22} color={colors.primary} />
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
            trackColor={{ false: colors.border, true: colors.primary }}
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
              <Text style={styles.avatarText}>
                {userData?.firstName?.[0] || 'U'}{userData?.lastName?.[0] || ''}
              </Text>
            </View>
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {userData?.firstName && userData?.lastName 
                ? `${userData.firstName} ${userData.lastName}` 
                : userData?.email || 'User'}
            </Text>
            <Text style={styles.profileEmail}>{userData?.email || ''}</Text>
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
            <Ionicons name="cube" size={28} color={colors.primary} />
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
            <TouchableOpacity style={[styles.viewBlockchainButton, { backgroundColor: `${colors.primary}15` }]}>
              <Text style={[styles.viewBlockchainText, { color: colors.primary }]}>View on Explorer</Text>
              <Ionicons name="open-outline" size={16} color={colors.primary} />
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
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  avatarText: {
    color: '#fff',
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily.bold,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: '#fff',
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily.bold,
    marginBottom: 6,
  },
  profileEmail: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    marginBottom: 12,
  },
  membershipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.xl,
    alignSelf: 'flex-start',
  },
  membershipText: {
    color: '#fff',
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.semiBold,
    marginLeft: 6,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: BorderRadius.xl,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: '#fff',
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily.bold,
    marginBottom: 4,
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.regular,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop:40,
    
  },
  blockchainCard: {
    borderRadius: BorderRadius.xl,
    padding: 20,
    marginTop: -12,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  blockchainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  blockchainTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily.bold,
    marginLeft: 12,
    flex: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: `${HealthColors.synced}20`,
    borderRadius: BorderRadius.lg,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: HealthColors.synced,
    marginRight: 6,
  },
  statusText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.semiBold,
    color: HealthColors.synced,
  },
  blockchainSubtitle: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    marginBottom: 16,
    lineHeight: 20,
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
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: BorderRadius.lg,
  },
  viewBlockchainText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.semiBold,
    marginRight: 6,
  },
  settingSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily.bold,
    marginBottom: 16,
    marginLeft: 4,
  },
  settingCard: {
    borderRadius: BorderRadius.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    minHeight: 68,
  },
  settingIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.semiBold,
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    lineHeight: 18,
  },
  settingDivider: {
    height: 1,
    marginLeft: 84,
    marginRight: 20,
  },
  dangerSection: {
    marginBottom: 32,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingBottom: 40,
  },
  versionText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.semiBold,
    marginBottom: 6,
  },
  versionSubtext: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.regular,
  },
});