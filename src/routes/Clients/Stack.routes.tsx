import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Clients } from '@screens/Clients';
import { CreateClient } from '@screens/CreateClient';
import { ClientDetails } from '@screens/ClientDetails';
import { CreateDebt } from '@screens/CreateDebt';
import { AllDebts } from '@screens/AllDebts';

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
      <Screen name="CreateDebt" component={CreateDebt} />
      <Screen name="AllDebts" component={AllDebts} />
    </Navigator>
  );
}
