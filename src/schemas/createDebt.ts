import * as yup from 'yup';
import { isDate, parseToNumber } from 'brazilian-values';

export type CreateDebtFormData = {
  valor: string;
  dataPagamento: string;
  descricao: string;
  clienteId: number;
  creationDate: string;
};

export const schema = yup.object().shape({
  valor: yup
    .string()
    .required('Valor da dívida é obrigatório')
    .test('valid-value', 'Valor inválido', value => {
      return parseToNumber(value) > 0;
    }),
  dataPagamento: yup
    .string()
    .test('valid-date', 'Data inválida', value => {
      if (!value) return true;
      return isDate(value);
    })
    .nullable(),
  descricao: yup.string().required('Descrição da dívida é obrigatória'),
  creationDate: yup
    .string()
    .required('Data de criação da dívida é obrigatória')
    .test('valid-date', 'Data inválida', value => {
      if (!value) return true;
      return isDate(value);
    }),
});
