import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Color Palettes - Professional Healthcare Theme
export const Colors = {
  light: {
    // Primary Healthcare Colors
    primary: '#14B8A6', // Teal
    secondary: '#0D9488', // Darker teal for mobile
    accent: '#3B82F6', // Blue
    accentMobile: '#2563EB', // More saturated blue for mobile
    background: '#FAFAF9', // Off-white
    surface: '#FFFFFF', // Pure white
    surfaceSecondary: '#F8FAFC', // Light gray
    surfaceTertiary: '#F1F5F9', // Lighter gray
    text: '#1A1A1A', // Dark gray
    textSecondary: '#6B7280', // Gray
    textMuted: '#9CA3AF', // Light gray
    border: '#E5E7EB',
    
    // Status colors
    success: '#059669', // Emerald green
    warning: '#D97706', // Amber
    error: '#DC2626', // Red
    info: '#14B8A6',
    
    // Gradient colors
    gradientPrimary: ['#14B8A6', '#0D9488'],
    gradientSecondary: ['#3B82F6', '#2563EB'],
    gradientAccent: ['#14B8A6', '#3B82F6'],
    
    // Shadows
    shadow: 'rgba(26, 26, 26, 0.1)',
    shadowDark: 'rgba(26, 26, 26, 0.2)',
    
    tint: '#14B8A6',
    tabIconDefault: '#9CA3AF',
    tabIconSelected: '#14B8A6',
  },
  dark: {
    // Dark mode healthcare theme
    primary: '#14B8A6',
    secondary: '#0D9488',
    accent: '#3B82F6',
    accentMobile: '#2563EB',
    background: '#0F172A',
    surface: '#1E293B',
    surfaceSecondary: '#334155',
    surfaceTertiary: '#475569',
    text: '#F8FAFC',
    textSecondary: '#CBD5E1',
    textMuted: '#94A3B8',
    border: '#475569',
    
    // Status colors
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#14B8A6',
    
    // Gradient colors
    gradientPrimary: ['#14B8A6', '#0D9488'],
    gradientSecondary: ['#3B82F6', '#2563EB'],
    gradientAccent: ['#14B8A6', '#3B82F6'],
    
    // Shadows
    shadow: 'rgba(0, 0, 0, 0.3)',
    shadowDark: 'rgba(0, 0, 0, 0.5)',
    
    tint: '#14B8A6',
    tabIconDefault: '#64748B',
    tabIconSelected: '#14B8A6',
  },
};

// Typography
export const Typography = {
  // Font families - Poppins
  fontFamily: {
    regular: 'Poppins_400Regular',
    medium: 'Poppins_500Medium',
    semiBold: 'Poppins_600SemiBold',
    bold: 'Poppins_700Bold',
  },
  
  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
  },
  
  // Line heights
  lineHeight: {
    xs: 16,
    sm: 20,
    base: 24,
    lg: 28,
    xl: 32,
    '2xl': 36,
    '3xl': 42,
    '4xl': 48,
    '5xl': 60,
    '6xl': 72,
  },
  
  // Font weights
  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
};

// Spacing system
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
  '7xl': 80,
  '8xl': 96,
};

// Border radius
export const BorderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
};

// Dimensions
export const Layout = {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  isLargeDevice: width >= 414,
  headerHeight: 100,
  tabBarHeight: 80,
};

// Animation timings
export const Animation = {
  timing: {
    fast: 200,
    normal: 300,
    slow: 500,
    verySlow: 800,
  },
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
};

// Component styles
export const Components = {
  card: {
    borderRadius: BorderRadius.xl,
    shadowColor: Colors.light.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  
  button: {
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    minHeight: 48,
  },
  
  input: {
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    minHeight: 48,
    borderWidth: 1,
  },
  
  glassmorphism: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
  },
};

// Health-specific colors
export const HealthColors = {
  heartRate: '#EF4444',
  bloodPressure: '#F59E0B',
  temperature: '#EF4444',
  oxygenSaturation: '#3B82F6',
  glucose: '#8B5CF6',
  weight: '#22C55E',
  steps: '#22C55E',
  sleep: '#8B5CF6',
  water: '#06B6D4',
  calories: '#F59E0B',
  
  // Status colors
  excellent: '#22C55E',
  good: '#84CC16',
  fair: '#F59E0B',
  poor: '#EF4444',
  critical: '#DC2626',
  warning: '#F59E0B',
  
  // Blockchain colors
  verified: '#22C55E',
  pending: '#F59E0B',
  encrypted: '#3B82F6',
  synced: '#22C55E',
  error: '#EF4444',
};

// Icon sizes
export const IconSizes = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
};

export default {
  Colors,
  Typography,
  Spacing,
  BorderRadius,
  Layout,
  Animation,
  Components,
  HealthColors,
  IconSizes,
};