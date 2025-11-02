import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MotiText, MotiView } from 'moti';
import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  availability: string;
  consultationFee: string;
  image: string;
  isOnline: boolean;
}

interface ConsultationType {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  price: string;
  duration: string;
  color: string;
}

export default function ContactDoctorScreen() {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const [selectedConsultationType, setSelectedConsultationType] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  const consultationTypes: ConsultationType[] = [
    {
      id: 'video',
      title: 'Video Consultation',
      subtitle: 'Face-to-face online consultation',
      icon: 'videocam',
      price: '$50',
      duration: '30 min',
      color: colors.primary,
    },
    {
      id: 'audio',
      title: 'Audio Call',
      subtitle: 'Voice consultation',
      icon: 'call',
      price: '$30',
      duration: '20 min',
      color: colors.accent,
    },
    {
      id: 'chat',
      title: 'Text Chat',
      subtitle: 'Message-based consultation',
      icon: 'chatbubble',
      price: '$20',
      duration: '24h response',
      color: colors.success,
    },
    {
      id: 'emergency',
      title: 'Emergency Call',
      subtitle: 'Immediate consultation',
      icon: 'medical',
      price: '$100',
      duration: '15 min',
      color: colors.error,
    },
  ];

  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'General Physician',
      rating: 4.9,
      experience: '15 years',
      availability: 'Available now',
      consultationFee: '$50',
      image: '👩‍⚕️',
      isOnline: true,
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Cardiologist',
      rating: 4.8,
      experience: '12 years',
      availability: 'Available in 30 min',
      consultationFee: '$75',
      image: '👨‍⚕️',
      isOnline: true,
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      specialty: 'Dermatologist',
      rating: 4.7,
      experience: '10 years',
      availability: 'Available tomorrow',
      consultationFee: '$60',
      image: '👩‍⚕️',
      isOnline: false,
    },
    {
      id: '4',
      name: 'Dr. James Wilson',
      specialty: 'Neurologist',
      rating: 4.9,
      experience: '20 years',
      availability: 'Available now',
      consultationFee: '$90',
      image: '👨‍⚕️',
      isOnline: true,
    },
  ];

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookConsultation = () => {
    if (selectedConsultationType && selectedDoctor) {
      // Navigate to booking confirmation or payment screen
      console.log('Booking consultation:', { selectedConsultationType, selectedDoctor });
      // For now, just show an alert or navigate back
      router.back();
    }
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
          
          <Text style={styles.headerTitle}>Contact Doctor</Text>
          
          <TouchableOpacity style={styles.emergencyButton}>
            <Ionicons name="medical" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 100,
            delay: 200,
          }}
          style={[styles.searchContainer, { backgroundColor: colors.surface }]}
        >
          <Ionicons name="search" size={20} color={colors.textMuted} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search doctors or specialties..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </MotiView>

        {/* Consultation Types */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 100,
            delay: 400,
          }}
          style={styles.section}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Consultation Type
          </Text>
          <View style={styles.consultationGrid}>
            {consultationTypes.map((type, index) => (
              <MotiView
                key={type.id}
                from={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'spring',
                  damping: 15,
                  stiffness: 100,
                  delay: 500 + index * 100,
                }}
              >
                <TouchableOpacity
                  style={[
                    styles.consultationCard,
                    {
                      backgroundColor: selectedConsultationType === type.id 
                        ? `${type.color}20` 
                        : colors.surface,
                      borderColor: selectedConsultationType === type.id 
                        ? type.color 
                        : colors.border,
                    }
                  ]}
                  onPress={() => setSelectedConsultationType(type.id)}
                >
                  <View style={[styles.consultationIcon, { backgroundColor: `${type.color}20` }]}>
                    <Ionicons name={type.icon} size={24} color={type.color} />
                  </View>
                  <Text style={[styles.consultationTitle, { color: colors.text }]}>
                    {type.title}
                  </Text>
                  <Text style={[styles.consultationSubtitle, { color: colors.textSecondary }]}>
                    {type.subtitle}
                  </Text>
                  <View style={styles.consultationDetails}>
                    <Text style={[styles.consultationPrice, { color: type.color }]}>
                      {type.price}
                    </Text>
                    <Text style={[styles.consultationDuration, { color: colors.textMuted }]}>
                      {type.duration}
                    </Text>
                  </View>
                </TouchableOpacity>
              </MotiView>
            ))}
          </View>
        </MotiView>

        {/* Available Doctors */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 100,
            delay: 800,
          }}
          style={styles.section}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Available Doctors
          </Text>
          {filteredDoctors.map((doctor, index) => (
            <MotiView
              key={doctor.id}
              from={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{
                type: 'spring',
                damping: 15,
                stiffness: 100,
                delay: 900 + index * 100,
              }}
            >
              <TouchableOpacity
                style={[
                  styles.doctorCard,
                  {
                    backgroundColor: selectedDoctor === doctor.id 
                      ? `${colors.primary}10` 
                      : colors.surface,
                    borderColor: selectedDoctor === doctor.id 
                      ? colors.primary 
                      : colors.border,
                  }
                ]}
                onPress={() => setSelectedDoctor(doctor.id)}
              >
                <View style={styles.doctorInfo}>
                  <View style={[styles.doctorAvatar, { backgroundColor: colors.surfaceSecondary }]}>
                    <Text style={styles.doctorAvatarText}>{doctor.image}</Text>
                    {doctor.isOnline && (
                      <View style={[styles.onlineIndicator, { backgroundColor: colors.success }]} />
                    )}
                  </View>
                  
                  <View style={styles.doctorDetails}>
                    <Text style={[styles.doctorName, { color: colors.text }]}>
                      {doctor.name}
                    </Text>
                    <Text style={[styles.doctorSpecialty, { color: colors.textSecondary }]}>
                      {doctor.specialty}
                    </Text>
                    <View style={styles.doctorMeta}>
                      <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={14} color="#FFD700" />
                        <Text style={[styles.rating, { color: colors.text }]}>
                          {doctor.rating}
                        </Text>
                      </View>
                      <Text style={[styles.experience, { color: colors.textMuted }]}>
                        {doctor.experience} exp
                      </Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.doctorActions}>
                  <Text style={[styles.availability, { 
                    color: doctor.isOnline ? colors.success : colors.textMuted 
                  }]}>
                    {doctor.availability}
                  </Text>
                  <Text style={[styles.consultationFee, { color: colors.primary }]}>
                    {doctor.consultationFee}
                  </Text>
                </View>
              </TouchableOpacity>
            </MotiView>
          ))}
        </MotiView>

        {/* Emergency Contact */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 100,
            delay: 1200,
          }}
          style={styles.emergencySection}
        >
          <LinearGradient
            colors={[colors.error, '#DC2626'] as any}
            style={styles.emergencyCard}
          >
            <View style={styles.emergencyContent}>
              <View style={styles.emergencyIcon}>
                <Ionicons name="medical" size={32} color="#FFFFFF" />
              </View>
              <View style={styles.emergencyText}>
                <Text style={styles.emergencyTitle}>Emergency?</Text>
                <Text style={styles.emergencySubtitle}>
                  Get immediate medical assistance
                </Text>
              </View>
              <TouchableOpacity style={styles.emergencyCallButton}>
                <Ionicons name="call" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </MotiView>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Book Consultation Button */}
      {selectedConsultationType && selectedDoctor && (
        <MotiView
          from={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 100,
          }}
          style={[styles.bookingContainer, { backgroundColor: colors.surface }]}
        >
          <TouchableOpacity
            style={[styles.bookButton, { backgroundColor: colors.primary }]}
            onPress={handleBookConsultation}
          >
            <Text style={styles.bookButtonText}>Book Consultation</Text>
            <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </MotiView>
      )}
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
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
  },
  emergencyButton: {
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: BorderRadius.lg,
    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.regular,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily.bold,
    marginBottom: 16,
  },
  consultationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  consultationCard: {
    width: (width - 56) / 2,
    margin: 8,
    padding: 16,
    borderRadius: BorderRadius.xl,
    borderWidth: 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  consultationIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  consultationTitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.semiBold,
    textAlign: 'center',
    marginBottom: 4,
  },
  consultationSubtitle: {
    fontSize: Typography.fontSize.xs,
    textAlign: 'center',
    marginBottom: 12,
  },
  consultationDetails: {
    alignItems: 'center',
  },
  consultationPrice: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily.bold,
  },
  consultationDuration: {
    fontSize: Typography.fontSize.xs,
    marginTop: 2,
  },
  doctorCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  doctorInfo: {
    flex: 1,
    flexDirection: 'row',
  },
  doctorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    position: 'relative',
  },
  doctorAvatarText: {
    fontSize: 24,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  doctorDetails: {
    flex: 1,
  },
  doctorName: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.semiBold,
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: Typography.fontSize.sm,
    marginBottom: 8,
  },
  doctorMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  rating: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    fontFamily: Typography.fontFamily.medium,
    marginLeft: 4,
  },
  experience: {
    fontSize: Typography.fontSize.sm,
  },
  doctorActions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  availability: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
    fontFamily: Typography.fontFamily.medium,
    marginBottom: 4,
  },
  consultationFee: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily.bold,
  },
  emergencySection: {
    marginBottom: 32,
  },
  emergencyCard: {
    borderRadius: BorderRadius.xl,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  emergencyContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emergencyIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  emergencyText: {
    flex: 1,
  },
  emergencyTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  emergencySubtitle: {
    fontSize: Typography.fontSize.sm,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  emergencyCallButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookingContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: BorderRadius.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  bookButtonText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#FFFFFF',
    marginRight: 8,
  },
  bottomSpacing: {
    height: 20,
  },
});
