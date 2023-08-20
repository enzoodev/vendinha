import { memo, useMemo } from 'react';
import { TouchableOpacityProps } from 'react-native';
import { formatToBRL } from 'brazilian-values';

import { ClientDTO } from '@dtos/client';

import * as S from './styles';

type Props = TouchableOpacityProps & {
  item: ClientDTO;
};

export const ClientItem = memo(({ item, ...rest }: Props) => {
  const debt = useMemo(() => {
    return item.debts.reduce((prev, { valor }) => {
      return prev + valor;
    }, 0);
  }, [item.debts]);

  return (
    <S.Container {...rest}>
      <S.Title>{item.nome}</S.Title>
      <S.InlineWrapper>
        <S.InlineTitle>CPF:</S.InlineTitle>
        <S.InlineSubtitle>{item.cpf}</S.InlineSubtitle>
      </S.InlineWrapper>
      <S.InlineWrapper>
        <S.InlineTitle>E-mail:</S.InlineTitle>
        <S.InlineSubtitle>{item.email}</S.InlineSubtitle>
      </S.InlineWrapper>
      <S.Footer>
        <S.DebtText>Valor da dívida:</S.DebtText>
        <S.DebtValue>{formatToBRL(debt)}</S.DebtValue>
      </S.Footer>
    </S.Container>
  );
});
