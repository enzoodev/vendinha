/* eslint-disable global-require */
/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';

import { Image } from 'react-native';
import { HomeStackRoutes } from './Home/Stack.routes';
import { ClientsStackRoutes } from './Clients/Stack.routes';

const { Navigator, Screen } = createBottomTabNavigator();

export function TabsRoutes() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

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
          tabBarIcon: () => (
            <Image
              source={require('@assets/images/Home.png')}
              style={{
                width: theme.responsiveValue * 24,
                height: theme.responsiveValue * 24,
              }}
            />
          ),
        }}
      />

      <Screen
        name="ClientsStackRoutes"
        component={ClientsStackRoutes}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('@assets/images/User.png')}
              style={{
                width: theme.responsiveValue * 24,
                height: theme.responsiveValue * 24,
              }}
            />
          ),
        }}
      />
    </Navigator>
  );
}
