export type Debt = {
  id: number;
  valor: number;
  dataPagamento: string | null;
  descricao: string;
  idControle: number;
  version: number;
  retorno: [];
};

export type DebtDTO = Debt & {
  cliente: {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    idControle: number;
    version: number;
    retorno: [];
  };
};
