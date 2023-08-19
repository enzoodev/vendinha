/* eslint-disable global-require */
/* eslint-disable react/style-prop-object */
import { useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { Routes } from './src/routes';
import { theme } from './src/theme';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('./src/assets/fonts/Inter-Regular.ttf'),
    'OpenSans-Regular': require('./src/assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-SemiBold': require('./src/assets/fonts/OpenSans-SemiBold.ttf'),
    'OpenSans-Bold': require('./src/assets/fonts/OpenSans-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <ThemeProvider theme={theme}>
        <Routes />
        <StatusBar style="dark" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
