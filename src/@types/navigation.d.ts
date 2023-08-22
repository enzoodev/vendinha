export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      Clients: undefined;
      CreateClient: undefined;
      ClientDetails: { id: number };
      CreateDebt: { clientId: number };
      AllDebts: { clientId: number };
    }
  }
}
