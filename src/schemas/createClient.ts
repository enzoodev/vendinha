import * as yup from 'yup';
import { isCPF, isDate } from 'brazilian-values';

export type CreateClientFormData = {
  nome: string;
  email: string;
  cpf: string;
  dataNascimento: string;
};

export const schema = yup.object().shape({
  nome: yup.string().required('Nome do cliente é obrigatório'),
  email: yup
    .string()
    .email('Email inválido')
    .required('Email do cliente é obrigatório'),
  cpf: yup
    .string()
    .required('CPF do cliente é obrigatório')
    .test('valid-cpf', 'CPF inválido', isCPF),
  dataNascimento: yup
    .string()
    .required('Data de nascimento do cliente é obrigatória')
    .test('valid-date', 'Data inválida', isDate),
});
