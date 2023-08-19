/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';

import Home from '@assets/images/Home.svg';
import User from '@assets/images/User.svg';

import { HomeStackRoutes } from './Home/Stack.routes';
import { ClientsStackRoutes } from './Clients/Stack.routes';

const { Navigator, Screen } = createBottomTabNavigator();

export function TabsRoutes() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const iconSize = theme.responsiveValue * 24;

  return (
    <Navigator
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.primary,
        tabBarStyle: {
          backgroundColor: theme.colors.cardPrimary,
          height: theme.responsiveValue * 48 + insets.bottom,
          paddingTop: theme.responsiveValue * 16,
        },
      }}
      initialRouteName="HomeStackRoutes"
    >
      <Screen
        name="HomeStackRoutes"
        component={HomeStackRoutes}
        options={{
          tabBarIcon: () => <Home height={iconSize} width={iconSize} />,
        }}
      />

      <Screen
        name="ClientsStackRoutes"
        component={ClientsStackRoutes}
        options={{
          tabBarIcon: () => <User height={iconSize} width={iconSize} />,
        }}
      />
    </Navigator>
  );
}
