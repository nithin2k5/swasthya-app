import { BorderRadius, HealthColors, Spacing, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function BlockchainKeysScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const [showPrivateKey, setShowPrivateKey] = useState(false);

  const walletAddress = '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12';
  const privateKey = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';

  const copyToClipboard = (text: string) => {
    Alert.alert('Copied', 'Information copied to clipboard');
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
          
          <Text style={styles.headerTitle}>Blockchain Keys</Text>
          
          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Warning */}
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: 'spring',
            damping: 20,
            stiffness: 100,
            delay: 200,
          }}
        >
          <View style={[styles.warningCard, { backgroundColor: `${HealthColors.warning}20`, borderColor: HealthColors.warning }]}>
            <Ionicons name="warning" size={32} color={HealthColors.warning} />
            <Text style={[styles.warningTitle, { color: colors.text }]}>
              Keep Your Keys Safe
            </Text>
            <Text style={[styles.warningText, { color: colors.textSecondary }]}>
              Never share your private key. Anyone with access to it can control your health records.
            </Text>
          </View>
        </MotiView>

        {/* Wallet Address */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 20,
            stiffness: 100,
            delay: 400,
          }}
        >
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <View style={styles.cardHeader}>
              <Ionicons name="wallet" size={24} color={colors.primary} />
              <Text style={[styles.cardTitle, { color: colors.text }]}>Wallet Address</Text>
            </View>
            <Text style={[styles.keyText, { color: colors.text }]}>{walletAddress}</Text>
            <TouchableOpacity
              style={styles.copyButton}
              onPress={() => copyToClipboard(walletAddress)}
            >
              <Ionicons name="copy-outline" size={20} color={colors.primary} />
              <Text style={[styles.copyText, { color: colors.primary }]}>Copy</Text>
            </TouchableOpacity>
          </View>
        </MotiView>

        {/* Private Key */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 20,
            stiffness: 100,
            delay: 600,
          }}
        >
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <View style={styles.cardHeader}>
              <Ionicons name="key" size={24} color={HealthColors.error} />
              <Text style={[styles.cardTitle, { color: colors.text }]}>Private Key</Text>
            </View>
            
            <TouchableOpacity
              style={styles.revealButton}
              onPress={() => setShowPrivateKey(!showPrivateKey)}
            >
              <Ionicons 
                name={showPrivateKey ? 'eye-off' : 'eye'} 
                size={20} 
                color={colors.primary} 
              />
              <Text style={[styles.revealText, { color: colors.primary }]}>
                {showPrivateKey ? 'Hide' : 'Reveal'} Private Key
              </Text>
            </TouchableOpacity>

            {showPrivateKey && (
              <View style={styles.privateKeyContainer}>
                <Text style={[styles.keyText, { color: colors.text }]}>{privateKey}</Text>
                <TouchableOpacity
                  style={styles.copyButton}
                  onPress={() => copyToClipboard(privateKey)}
                >
                  <Ionicons name="copy-outline" size={20} color={HealthColors.error} />
                  <Text style={[styles.copyText, { color: HealthColors.error }]}>Copy</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </MotiView>

        {/* Actions */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 20,
            stiffness: 100,
            delay: 800,
          }}
        >
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.surface }]}>
              <Ionicons name="download-outline" size={24} color={colors.primary} />
              <Text style={[styles.actionButtonText, { color: colors.primary }]}>
                Export Keys
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.surface }]}>
              <Ionicons name="shield-checkmark-outline" size={24} color={colors.accent} />
              <Text style={[styles.actionButtonText, { color: colors.accent }]}>
                Backup Keys
              </Text>
            </TouchableOpacity>
          </View>
        </MotiView>

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
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  warningCard: {
    borderRadius: BorderRadius.xl,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
    borderWidth: 2,
  },
  warningTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily.bold,
    marginTop: 16,
    marginBottom: 8,
  },
  warningText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
    textAlign: 'center',
    lineHeight: 20,
  },
  card: {
    borderRadius: BorderRadius.xl,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily.bold,
    marginLeft: 12,
  },
  keyText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: 'monospace',
    lineHeight: 22,
    marginBottom: 16,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    alignSelf: 'flex-start',
  },
  copyText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.semiBold,
    marginLeft: 8,
  },
  revealButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 16,
  },
  revealText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.semiBold,
    marginLeft: 8,
  },
  privateKeyContainer: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  actionsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    borderRadius: BorderRadius.xl,
    padding: 24,
    alignItems: 'center',
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  actionButtonText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.semiBold,
    marginTop: 12,
  },
  bottomSpacing: {
    height: 32,
  },
});
