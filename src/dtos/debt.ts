export type DebtDTO = {
  cliente: {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    idControle: number;
    version: number;
    retorno: [];
  };
  id: number;
  valor: number;
  dataPagamento: string | null;
  descricao: string;
  idControle: number;
  version: number;
  retorno: [];
};
