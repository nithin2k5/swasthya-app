import { BorderRadius, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
  const router = useRouter();
  const { colors, isDark, toggleColorScheme } = useTheme();
  
  const [settings, setSettings] = useState({
    notifications: true,
    biometric: false,
    autoBackup: true,
    dataSharing: false,
    locationServices: true,
    crashReports: true,
    analytics: false,
  });

  const updateSetting = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    Alert.alert(
      'Reset Settings',
      'This will reset all settings to their default values. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive', 
          onPress: () => {
            setSettings({
              notifications: true,
              biometric: false,
              autoBackup: true,
              dataSharing: false,
              locationServices: true,
              crashReports: true,
              analytics: false,
            });
          }
        }
      ]
    );
  };

  const settingSections = [
    {
      title: 'Notifications',
      items: [
        {
          id: 'notifications',
          title: 'Push Notifications',
          subtitle: 'Receive health reminders and alerts',
          icon: 'notifications',
          type: 'toggle',
          value: settings.notifications,
          onToggle: (value: boolean) => updateSetting('notifications', value),
        },
        {
          id: 'health-alerts',
          title: 'Health Alerts',
          subtitle: 'Critical health notifications',
          icon: 'medical',
          type: 'navigation',
          onPress: () => console.log('Health alerts settings'),
        },
        {
          id: 'appointment-reminders',
          title: 'Appointment Reminders',
          subtitle: 'Upcoming appointments and checkups',
          icon: 'calendar',
          type: 'navigation',
          onPress: () => console.log('Appointment reminders'),
        },
      ]
    },
    {
      title: 'Security & Privacy',
      items: [
        {
          id: 'biometric',
          title: 'Biometric Authentication',
          subtitle: 'Use fingerprint or Face ID',
          icon: 'finger-print',
          type: 'toggle',
          value: settings.biometric,
          onToggle: (value: boolean) => updateSetting('biometric', value),
        },
        {
          id: 'auto-backup',
          title: 'Auto Backup',
          subtitle: 'Automatically backup health data',
          icon: 'cloud-upload',
          type: 'toggle',
          value: settings.autoBackup,
          onToggle: (value: boolean) => updateSetting('autoBackup', value),
        },
        {
          id: 'data-sharing',
          title: 'Data Sharing',
          subtitle: 'Share anonymous data for research',
          icon: 'share',
          type: 'toggle',
          value: settings.dataSharing,
          onToggle: (value: boolean) => updateSetting('dataSharing', value),
        },
        {
          id: 'encryption',
          title: 'Data Encryption',
          subtitle: 'Manage encryption settings',
          icon: 'lock-closed',
          type: 'navigation',
          onPress: () => console.log('Encryption settings'),
        },
      ]
    },
    {
      title: 'App Preferences',
      items: [
        {
          id: 'theme',
          title: 'Dark Mode',
          subtitle: isDark ? 'Dark theme enabled' : 'Light theme enabled',
          icon: 'moon',
          type: 'toggle',
          value: isDark,
          onToggle: toggleColorScheme,
        },
        {
          id: 'location',
          title: 'Location Services',
          subtitle: 'Find nearby healthcare providers',
          icon: 'location',
          type: 'toggle',
          value: settings.locationServices,
          onToggle: (value: boolean) => updateSetting('locationServices', value),
        },
        {
          id: 'language',
          title: 'Language',
          subtitle: 'English (US)',
          icon: 'language',
          type: 'navigation',
          onPress: () => console.log('Language settings'),
        },
        {
          id: 'units',
          title: 'Units of Measurement',
          subtitle: 'Metric / Imperial',
          icon: 'calculator',
          type: 'navigation',
          onPress: () => console.log('Units settings'),
        },
      ]
    },
    {
      title: 'Data & Analytics',
      items: [
        {
          id: 'crash-reports',
          title: 'Crash Reports',
          subtitle: 'Help improve app stability',
          icon: 'bug',
          type: 'toggle',
          value: settings.crashReports,
          onToggle: (value: boolean) => updateSetting('crashReports', value),
        },
        {
          id: 'analytics',
          title: 'Usage Analytics',
          subtitle: 'Anonymous usage statistics',
          icon: 'analytics',
          type: 'toggle',
          value: settings.analytics,
          onToggle: (value: boolean) => updateSetting('analytics', value),
        },
        {
          id: 'data-export',
          title: 'Export Data',
          subtitle: 'Download your health data',
          icon: 'download',
          type: 'navigation',
          onPress: () => console.log('Export data'),
        },
        {
          id: 'data-deletion',
          title: 'Delete All Data',
          subtitle: 'Permanently remove all data',
          icon: 'trash',
          type: 'navigation',
          onPress: () => console.log('Delete data'),
          danger: true,
        },
      ]
    }
  ];

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
            <Text style={styles.headerTitle}>Settings</Text>
            <Text style={styles.headerSubtitle}>Customize your experience</Text>
          </View>
          
          <TouchableOpacity style={styles.resetButton} onPress={resetSettings}>
            <Ionicons name="refresh" size={24} color="#fff" />
          </TouchableOpacity>
        </MotiView>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {settingSections.map((section, sectionIndex) => (
          <MotiView
            key={section.title}
            from={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: 'spring',
              damping: 15,
              stiffness: 100,
              delay: 400 + sectionIndex * 100,
            }}
            style={styles.section}
          >
            <Text style={[styles.sectionTitle, { color: colors.text }]}>{section.title}</Text>
            
            <View style={[styles.sectionCard, { backgroundColor: colors.surface }]}>
              {section.items.map((item, itemIndex) => (
                <MotiView
                  key={item.id}
                  from={{ opacity: 0, translateX: -20 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  transition={{
                    type: 'spring',
                    damping: 15,
                    stiffness: 100,
                    delay: 500 + sectionIndex * 100 + itemIndex * 50,
                  }}
                >
                  <TouchableOpacity
                    style={styles.settingItem}
                    onPress={item.onPress}
                    disabled={item.type === 'toggle'}
                  >
                    <View style={[
                      styles.settingIcon,
                      { 
                        backgroundColor: item.danger 
                          ? `${colors.error}20` 
                          : `${colors.secondary}20` 
                      }
                    ]}>
                      <Ionicons 
                        name={item.icon as any} 
                        size={20} 
                        color={item.danger ? colors.error : colors.secondary} 
                      />
                    </View>
                    
                    <View style={styles.settingContent}>
                      <Text style={[
                        styles.settingTitle, 
                        { color: item.danger ? colors.error : colors.text }
                      ]}>
                        {item.title}
                      </Text>
                      <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>
                        {item.subtitle}
                      </Text>
                    </View>

                    {item.type === 'toggle' ? (
                      <Switch
                        value={item.value}
                        onValueChange={item.onToggle}
                        trackColor={{ false: colors.border, true: colors.primary }}
                        thumbColor={item.value ? '#fff' : colors.textMuted}
                      />
                    ) : (
                      <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
                    )}
                  </TouchableOpacity>
                  
                  {itemIndex < section.items.length - 1 && (
                    <View style={[styles.divider, { backgroundColor: colors.border }]} />
                  )}
                </MotiView>
              ))}
            </View>
          </MotiView>
        ))}

        {/* App Info */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            type: 'timing',
            duration: 1000,
            delay: 1000,
          }}
          style={styles.appInfo}
        >
          <Text style={[styles.appVersion, { color: colors.textMuted }]}>Swasthya v1.0.0</Text>
          <Text style={[styles.buildInfo, { color: colors.textMuted }]}>Build 2024.10.28</Text>
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
  resetButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: 12,
    marginTop: 8,
  },
  sectionCard: {
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
  divider: {
    height: 1,
    marginLeft: 68,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  appVersion: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
  },
  buildInfo: {
    fontSize: Typography.fontSize.xs,
    marginTop: 4,
  },
});
