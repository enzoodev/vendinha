import { Debt } from './debt';

export type Client = {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  dataNascimento: string;
  idControle: number;
  version: number;
  retorno: [];
  totalDebt: number;
  debts: Debt[];
};

export type ClientDTO = {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  dataNascimento: string;
  idControle: number;
  version: number;
  retorno: [];
};
