import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MotiView } from 'moti';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Permission {
  id: string;
  provider: string;
  icon: string;
  access: 'full' | 'limited' | 'none';
  lastAccessed: string;
}

export default function DataPermissionsScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();

  const permissions: Permission[] = [
    {
      id: '1',
      provider: 'City Medical Lab',
      icon: 'medical',
      access: 'full',
      lastAccessed: '2024-10-28'
    },
    {
      id: '2',
      provider: 'Dr. Sarah Johnson',
      icon: 'people',
      access: 'full',
      lastAccessed: '2024-10-25'
    },
    {
      id: '3',
      provider: 'HealthCare Clinic',
      icon: 'business',
      access: 'limited',
      lastAccessed: '2024-10-20'
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
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Data Permissions</Text>
          
          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

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
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            Control which healthcare providers can access your health data
          </Text>

          {permissions.map((permission, index) => (
            <MotiView
              key={permission.id}
              from={{ opacity: 0, translateY: 30 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: 'spring',
                damping: 20,
                stiffness: 100,
                delay: 400 + index * 100,
              }}
            >
              <View style={[styles.card, { backgroundColor: colors.surface }]}>
                <View style={styles.providerInfo}>
                  <View style={[styles.providerIcon, { backgroundColor: `${colors.primary}20` }]}>
                    <Ionicons name={permission.icon as any} size={24} color={colors.primary} />
                  </View>
                  <View style={styles.providerDetails}>
                    <Text style={[styles.providerName, { color: colors.text }]}>
                      {permission.provider}
                    </Text>
                    <Text style={[styles.lastAccessed, { color: colors.textSecondary }]}>
                      Last accessed: {permission.lastAccessed}
                    </Text>
                  </View>
                </View>

                <View style={styles.permissionControls}>
                  <View style={styles.accessLevel}>
                    <View style={[
                      styles.badge,
                      { backgroundColor: permission.access === 'full' ? colors.primary : colors.warning }
                    ]}>
                      <Text style={styles.badgeText}>
                        {permission.access}
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={permission.access !== 'none'}
                    trackColor={{ false: colors.border, true: colors.primary }}
                    thumbColor="#FFFFFF"
                  />
                </View>
              </View>
            </MotiView>
          ))}

          <View style={styles.bottomSpacing} />
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
  description: {
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    marginBottom: 24,
    lineHeight: 22,
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
  providerInfo: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  providerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  providerDetails: {
    flex: 1,
  },
  providerName: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily.bold,
    marginBottom: 4,
  },
  lastAccessed: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
  },
  permissionControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accessLevel: {
    flex: 1,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.lg,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#FFFFFF',
  },
  bottomSpacing: {
    height: 32,
  },
});
