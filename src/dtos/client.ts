import { Debt } from './debt';

export type Client = {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  idControle: number;
  version: number;
  retorno: [];
  debts: Debt[];
};

export type ClientDTO = {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  idControle: number;
  version: number;
  retorno: [];
};
