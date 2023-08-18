import { NavigationContainer } from '@react-navigation/native';
import { TabsRoutes } from './Tabs.routes';

export function Routes() {
  return (
    <NavigationContainer>
      <TabsRoutes />
    </NavigationContainer>
  );
}
