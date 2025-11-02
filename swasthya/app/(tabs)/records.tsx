import { BorderRadius, HealthColors, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface HealthRecord {
  id: string;
  type: 'lab' | 'prescription' | 'visit' | 'imaging';
  title: string;
  date: string;
  provider: string;
  status: 'verified' | 'pending' | 'encrypted';
  blockchainHash?: string;
}

const mockRecords: HealthRecord[] = [
  {
    id: '1',
    type: 'lab',
    title: 'Complete Blood Count',
    date: '2024-10-28',
    provider: 'City Medical Lab',
    status: 'verified',
    blockchainHash: '0x1a2b3c4d5e6f7890abcdef1234567890',
  },
  {
    id: '2',
    type: 'prescription',
    title: 'Vitamin D Supplement',
    date: '2024-10-25',
    provider: 'Dr. Sarah Johnson',
    status: 'verified',
    blockchainHash: '0x5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t',
  },
  {
    id: '3',
    type: 'visit',
    title: 'Annual Physical Exam',
    date: '2024-10-20',
    provider: 'HealthCare Clinic',
    status: 'encrypted',
    blockchainHash: '0x9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x',
  },
  {
    id: '4',
    type: 'imaging',
    title: 'Chest X-Ray',
    date: '2024-10-15',
    provider: 'Radiology Center',
    status: 'pending',
  },
  {
    id: '5',
    type: 'lab',
    title: 'Lipid Panel',
    date: '2024-10-10',
    provider: 'City Medical Lab',
    status: 'verified',
    blockchainHash: '0x1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j',
  },
];

export default function RecordsScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const getRecordIcon = (type: string) => {
    switch (type) {
      case 'lab':
        return 'flask';
      case 'prescription':
        return 'medical';
      case 'visit':
        return 'person';
      case 'imaging':
        return 'scan';
      default:
        return 'document';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return HealthColors.verified;
      case 'pending':
        return HealthColors.pending;
      case 'encrypted':
        return colors.primary;
      default:
        return colors.textMuted;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lab':
        return '#3B82F6';
      case 'prescription':
        return '#22C55E';
      case 'visit':
        return '#F59E0B';
      case 'imaging':
        return '#8B5CF6';
      default:
        return colors.secondary;
    }
  };

  const filteredRecords = mockRecords.filter(record => {
    const matchesSearch = record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.provider.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || record.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

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
        >
          <Text style={styles.headerTitle}>Health Records</Text>
          <Text style={styles.headerSubtitle}>Blockchain-secured medical data</Text>
        </MotiView>
      </LinearGradient>

      {/* Search and Filters */}
      <MotiView
        from={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: 'spring',
          damping: 15,
          stiffness: 100,
          delay: 400,
        }}
        style={[styles.searchSection, { backgroundColor: colors.surface }]}
      >
        <View style={[styles.searchContainer, { backgroundColor: colors.background }]}>
          <Ionicons name="search" size={20} color={colors.textMuted} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search records..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={colors.textMuted}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
          {['all', 'lab', 'prescription', 'visit', 'imaging'].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterChip,
                {
                  backgroundColor: selectedFilter === filter ? colors.secondary : colors.background,
                  borderColor: selectedFilter === filter ? colors.secondary : colors.border,
                }
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text style={[
                styles.filterText,
                { color: selectedFilter === filter ? '#fff' : colors.text }
              ]}>
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </MotiView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Blockchain Security Info */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 100,
            delay: 600,
          }}
          style={[styles.securityCard, { backgroundColor: colors.surface }]}
        >
          <View style={styles.securityHeader}>
            <Ionicons name="shield-checkmark" size={24} color={HealthColors.verified} />
            <Text style={[styles.securityTitle, { color: colors.text }]}>Blockchain Protected</Text>
          </View>
          <Text style={[styles.securityText, { color: colors.textSecondary }]}>
            Your health records are encrypted and stored on a secure blockchain network, 
            ensuring immutability and complete privacy control.
          </Text>
        </MotiView>

        {/* Records */}
        <View style={styles.recordsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {filteredRecords.length} Record{filteredRecords.length !== 1 ? 's' : ''}
          </Text>
          
          {filteredRecords.map((record, index) => (
            <MotiView
              key={record.id}
              from={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{
                type: 'spring',
                damping: 15,
                stiffness: 100,
                delay: 800 + index * 100,
              }}
              style={[styles.recordCard, { backgroundColor: colors.surface }]}
            >
              <TouchableOpacity onPress={() => router.push('/modal')}>
                <View style={styles.recordHeader}>
                  <View style={[styles.recordIconContainer, { backgroundColor: `${getTypeColor(record.type)}20` }]}>
                    <Ionicons 
                      name={getRecordIcon(record.type) as any} 
                      size={24} 
                      color={getTypeColor(record.type)} 
                    />
                  </View>
                  <View style={styles.recordInfo}>
                    <Text style={[styles.recordTitle, { color: colors.text }]}>{record.title}</Text>
                    <Text style={[styles.recordProvider, { color: colors.textSecondary }]}>{record.provider}</Text>
                    <Text style={[styles.recordDate, { color: colors.textMuted }]}>{record.date}</Text>
                  </View>
                  <View style={styles.recordStatus}>
                    <View style={[
                      styles.statusDot,
                      { backgroundColor: getStatusColor(record.status) }
                    ]} />
                    <Text style={[
                      styles.statusText,
                      { color: getStatusColor(record.status) }
                    ]}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </Text>
                  </View>
                </View>

                {record.blockchainHash && (
                  <View style={[styles.blockchainInfo, { backgroundColor: colors.background }]}>
                    <Ionicons name="link" size={16} color={colors.textMuted} />
                    <Text style={[styles.hashText, { color: colors.textSecondary }]}>
                      Hash: {record.blockchainHash.substring(0, 20)}...
                    </Text>
                    <TouchableOpacity>
                      <Ionicons name="copy" size={16} color={colors.secondary} />
                    </TouchableOpacity>
                  </View>
                )}

                <View style={[styles.recordActions, { borderTopColor: colors.border }]}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="eye" size={16} color={colors.secondary} />
                    <Text style={[styles.actionText, { color: colors.secondary }]}>View</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="share" size={16} color={colors.secondary} />
                    <Text style={[styles.actionText, { color: colors.secondary }]}>Share</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="download" size={16} color={colors.secondary} />
                    <Text style={[styles.actionText, { color: colors.secondary }]}>Export</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </MotiView>
          ))}
        </View>

        {/* Add Record Button */}
        <MotiView
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 100,
            delay: 1200,
          }}
          style={styles.addButtonContainer}
        >
          <TouchableOpacity onPress={() => router.push('/add-record' as any)}>
            <LinearGradient
              colors={colors.gradientPrimary as any}
              style={styles.addButtonGradient}
            >
              <Ionicons name="add" size={24} color="#fff" />
              <Text style={styles.addButtonText}>Add New Record</Text>
            </LinearGradient>
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
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily.bold,
    marginBottom: 4,
    textAlign: 'center',
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
    textAlign: 'center',
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.lg,
    paddingHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: Typography.fontSize.base,
  },
  filtersContainer: {
    flexDirection: 'row',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  filterText: {
    fontWeight: Typography.fontWeight.semibold,
    fontSize: Typography.fontSize.sm,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  securityCard: {
    borderRadius: BorderRadius.xl,
    padding: 16,
    marginTop: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: HealthColors.verified,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  securityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  securityTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    marginLeft: 8,
  },
  securityText: {
    fontSize: Typography.fontSize.sm,
    lineHeight: Typography.lineHeight.sm,
  },
  recordsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: 16,
  },
  recordCard: {
    borderRadius: BorderRadius.xl,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  recordHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  recordIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  recordInfo: {
    flex: 1,
  },
  recordTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: 4,
  },
  recordProvider: {
    fontSize: Typography.fontSize.sm,
    marginBottom: 2,
  },
  recordDate: {
    fontSize: Typography.fontSize.xs,
  },
  recordStatus: {
    alignItems: 'flex-end',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  statusText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
  },
  blockchainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: BorderRadius.md,
    marginBottom: 12,
  },
  hashText: {
    flex: 1,
    fontSize: Typography.fontSize.xs,
    marginLeft: 8,
    marginRight: 8,
    fontFamily: 'monospace',
  },
  recordActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  actionText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    marginLeft: 4,
  },
  addButtonContainer: {
    marginTop: 24,
    marginBottom: 32,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  addButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
  },
  addButtonText: {
    color: '#fff',
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily.bold,
    marginLeft: 12,
  },
});