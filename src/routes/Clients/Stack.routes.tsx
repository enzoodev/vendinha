import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Clients } from '@screens/Clients';
import { CreateClient } from '@screens/CreateClient';
import { ClientDetails } from '@screens/ClientDetails';

const { Navigator, Screen } = createNativeStackNavigator();

export function ClientsStackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Clients"
    >
      <Screen name="Clients" component={Clients} />
      <Screen name="CreateClient" component={CreateClient} />
      <Screen name="ClientDetails" component={ClientDetails} />
    </Navigator>
  );
}
