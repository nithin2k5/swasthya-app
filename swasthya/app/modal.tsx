import { BorderRadius, HealthColors, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MotiView } from 'moti';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ModalScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();

  // Mock data for demonstration
  const recordData = {
    id: '1',
    type: 'lab',
    title: 'Complete Blood Count (CBC)',
    date: '2024-10-28',
    provider: 'City Medical Lab',
    status: 'verified',
    blockchainHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
    results: [
      { name: 'White Blood Cells', value: '7.2', unit: 'K/uL', range: '4.0-11.0', status: 'normal' },
      { name: 'Red Blood Cells', value: '4.8', unit: 'M/uL', range: '4.2-5.4', status: 'normal' },
      { name: 'Hemoglobin', value: '14.2', unit: 'g/dL', range: '12.0-16.0', status: 'normal' },
      { name: 'Hematocrit', value: '42.1', unit: '%', range: '36.0-46.0', status: 'normal' },
      { name: 'Platelets', value: '285', unit: 'K/uL', range: '150-450', status: 'normal' },
    ],
    notes: 'All values within normal range. Patient shows healthy blood profile with no signs of infection or anemia.',
    doctorNotes: 'Continue current health regimen. Recommend follow-up in 6 months for routine monitoring.'
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return HealthColors.excellent;
      case 'high':
        return HealthColors.warning;
      case 'low':
        return HealthColors.poor;
      default:
        return colors.textMuted;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      {/* Header */}
      <LinearGradient
        colors={colors.gradientPrimary}
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
          <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>
          
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Medical Record</Text>
            <Text style={styles.headerSubtitle}>Detailed View</Text>
          </View>
          
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share" size={24} color="#fff" />
          </TouchableOpacity>
        </MotiView>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Record Info */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 100,
            delay: 400,
          }}
          style={[styles.infoCard, { backgroundColor: colors.surface }]}
        >
          <View style={styles.recordHeader}>
            <View style={[styles.recordIcon, { backgroundColor: `${HealthColors.info}20` }]}>
              <Ionicons name="flask" size={32} color={HealthColors.info} />
            </View>
            <View style={styles.recordInfo}>
              <Text style={[styles.recordTitle, { color: colors.text }]}>{recordData.title}</Text>
              <Text style={[styles.recordProvider, { color: colors.textSecondary }]}>{recordData.provider}</Text>
              <Text style={[styles.recordDate, { color: colors.textMuted }]}>{recordData.date}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: `${HealthColors.verified}20` }]}>
              <Ionicons name="shield-checkmark" size={16} color={HealthColors.verified} />
              <Text style={[styles.statusText, { color: HealthColors.verified }]}>Verified</Text>
            </View>
          </View>
        </MotiView>

        {/* Blockchain Info */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 100,
            delay: 500,
          }}
          style={[styles.blockchainCard, { backgroundColor: colors.surface }]}
        >
          <View style={styles.blockchainHeader}>
            <Ionicons name="cube" size={20} color={colors.secondary} />
            <Text style={[styles.blockchainTitle, { color: colors.text }]}>Blockchain Verification</Text>
          </View>
          <View style={[styles.hashContainer, { backgroundColor: colors.background }]}>
            <Text style={[styles.hashLabel, { color: colors.textSecondary }]}>Transaction Hash:</Text>
            <Text style={[styles.hashValue, { color: colors.text }]}>{recordData.blockchainHash}</Text>
            <TouchableOpacity style={styles.copyButton}>
              <Ionicons name="copy" size={16} color={colors.secondary} />
            </TouchableOpacity>
          </View>
        </MotiView>

        {/* Test Results */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 100,
            delay: 600,
          }}
          style={[styles.resultsCard, { backgroundColor: colors.surface }]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Test Results</Text>
          
          {recordData.results.map((result, index) => (
            <MotiView
              key={index}
              from={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{
                type: 'spring',
                damping: 15,
                stiffness: 100,
                delay: 700 + index * 100,
              }}
              style={[styles.resultItem, { borderBottomColor: colors.border }]}
            >
              <View style={styles.resultInfo}>
                <Text style={[styles.resultName, { color: colors.text }]}>{result.name}</Text>
                <Text style={[styles.resultRange, { color: colors.textMuted }]}>Range: {result.range}</Text>
              </View>
              <View style={styles.resultValue}>
                <Text style={[styles.resultNumber, { color: colors.text }]}>
                  {result.value} <Text style={[styles.resultUnit, { color: colors.textSecondary }]}>{result.unit}</Text>
                </Text>
                <View style={[styles.resultStatus, { backgroundColor: `${getStatusColor(result.status)}20` }]}>
                  <Text style={[styles.resultStatusText, { color: getStatusColor(result.status) }]}>
                    {result.status.toUpperCase()}
                  </Text>
                </View>
              </View>
            </MotiView>
          ))}
        </MotiView>

        {/* Notes */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 100,
            delay: 1200,
          }}
          style={[styles.notesCard, { backgroundColor: colors.surface }]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Lab Notes</Text>
          <Text style={[styles.notesText, { color: colors.textSecondary }]}>{recordData.notes}</Text>
          
          <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 20 }]}>Doctor's Notes</Text>
          <Text style={[styles.notesText, { color: colors.textSecondary }]}>{recordData.doctorNotes}</Text>
        </MotiView>

        {/* Actions */}
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 100,
            delay: 1400,
          }}
          style={styles.actionsContainer}
        >
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.surface }]}>
            <Ionicons name="download" size={20} color={colors.secondary} />
            <Text style={[styles.actionButtonText, { color: colors.secondary }]}>Download PDF</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.surface }]}>
            <Ionicons name="share" size={20} color={colors.secondary} />
            <Text style={[styles.actionButtonText, { color: colors.secondary }]}>Share with Doctor</Text>
          </TouchableOpacity>
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
  closeButton: {
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
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: Typography.fontSize.sm,
  },
  shareButton: {
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
  infoCard: {
    borderRadius: BorderRadius.xl,
    padding: 20,
    marginTop: -10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  recordHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  recordInfo: {
    flex: 1,
  },
  recordTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: 4,
  },
  recordProvider: {
    fontSize: Typography.fontSize.base,
    marginBottom: 2,
  },
  recordDate: {
    fontSize: Typography.fontSize.sm,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.lg,
  },
  statusText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
    marginLeft: 4,
  },
  blockchainCard: {
    borderRadius: BorderRadius.xl,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  blockchainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  blockchainTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    marginLeft: 8,
  },
  hashContainer: {
    padding: 12,
    borderRadius: BorderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  hashLabel: {
    fontSize: Typography.fontSize.sm,
    marginRight: 8,
  },
  hashValue: {
    flex: 1,
    fontSize: Typography.fontSize.xs,
    fontFamily: 'monospace',
  },
  copyButton: {
    padding: 4,
  },
  resultsCard: {
    borderRadius: BorderRadius.xl,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: 16,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: 2,
  },
  resultRange: {
    fontSize: Typography.fontSize.sm,
  },
  resultValue: {
    alignItems: 'flex-end',
  },
  resultNumber: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: 4,
  },
  resultUnit: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.normal,
  },
  resultStatus: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  resultStatusText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
  },
  notesCard: {
    borderRadius: BorderRadius.xl,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  notesText: {
    fontSize: Typography.fontSize.base,
    lineHeight: Typography.lineHeight.base,
  },
  actionsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginHorizontal: -8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: BorderRadius.xl,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  actionButtonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    marginLeft: 8,
  },
});