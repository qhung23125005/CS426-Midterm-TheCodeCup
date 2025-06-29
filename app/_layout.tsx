import { supabase } from '@/utils/supabase';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar'; // ✅ import here
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { AppState, StatusBar, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    // Supabase session auto-refresh
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        supabase.auth.startAutoRefresh();
      } else {
        supabase.auth.stopAutoRefresh();
      }
    });

    supabase.auth.startAutoRefresh();

    // ✅ Hide Android navigation bar
    NavigationBar.setVisibilityAsync('hidden');
    NavigationBar.setBehaviorAsync('overlay-swipe'); // Allows swipe-to-show behavior

    return () => {
      subscription.remove();
      supabase.auth.stopAutoRefresh();
    };
  }, []);

  if (!loaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <Stack screenOptions={{ headerShown: false }} />
          <StatusBar hidden />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
