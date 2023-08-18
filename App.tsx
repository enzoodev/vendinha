/* eslint-disable react/style-prop-object */
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Routes } from './src/routes';
import { theme } from './src/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <Routes />
        <StatusBar style="dark" />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
