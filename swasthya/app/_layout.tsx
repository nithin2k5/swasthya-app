import { LoadingScreen } from '@/components/loading-screen';
import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import 'react-native-reanimated';

import { ErrorBoundary } from '@/components/error-boundary';
import { ThemeProvider } from '@/contexts/ThemeContext';

export const unstable_settings = {
  initialRouteName: 'splash',
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#14B8A6' }}>
        <LoadingScreen 
          message="Loading fonts..." 
          showBackground={true} 
          colors={{
            gradientPrimary: ['#14B8A6', '#0D9488'],
            background: '#FAFAF9',
            text: '#FFFFFF',
            secondary: '#14B8A6'
          }}
        />
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="splash" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="auth/login" options={{ headerShown: false }} />
          <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
          <Stack.Screen name="profile-setup" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen 
            name="modal" 
            options={{ 
              presentation: 'modal', 
              headerShown: false,
              animation: 'slide_from_bottom'
            }} 
          />
          <Stack.Screen 
            name="settings" 
            options={{ 
              headerShown: false,
              animation: 'slide_from_right'
            }} 
          />
          <Stack.Screen 
            name="about" 
            options={{ 
              headerShown: false,
              animation: 'slide_from_right'
            }} 
          />
          <Stack.Screen 
            name="contact-doctor" 
            options={{ 
              headerShown: false,
              animation: 'slide_from_right'
            }} 
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </ErrorBoundary>
  );
}
