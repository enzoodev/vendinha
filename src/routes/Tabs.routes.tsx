/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

import Home from '@assets/images/Home.svg';
import User from '@assets/images/User.svg';

import { HomeStackRoutes } from './Home/Stack.routes';
import { ClientsStackRoutes } from './Clients/Stack.routes';

const { Navigator, Screen } = createBottomTabNavigator();

export function TabsRoutes() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const iconSize = RFValue(24);

  return (
    <Navigator
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.primary,
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: theme.colors.cardPrimary,
          height: RFValue(48) + insets.bottom,
          paddingTop: RFValue(10),
        },
      }}
      initialRouteName="HomeStackRoutes"
    >
      <Screen
        name="HomeStackRoutes"
        component={HomeStackRoutes}
        options={{
          tabBarIcon: () => (
            <Home
              height={iconSize}
              width={iconSize}
              style={{ left: RFValue(30) }}
            />
          ),
        }}
      />

      <Screen
        name="ClientsStackRoutes"
        component={ClientsStackRoutes}
        options={{
          tabBarIcon: () => (
            <User
              height={iconSize}
              width={iconSize}
              style={{ right: RFValue(30) }}
            />
          ),
        }}
      />
    </Navigator>
  );
}
