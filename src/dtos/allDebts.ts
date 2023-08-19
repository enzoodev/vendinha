import { DebtDTO } from './debt';

export type AllDebtsDTO = {
  d: {
    __count: number;
    results: DebtDTO[];
  };
};
