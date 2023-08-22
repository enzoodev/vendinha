import { memo } from 'react';
import { TouchableOpacityProps } from 'react-native';
import { formatToBRL } from 'brazilian-values';

import { Client } from '@dtos/client';

import * as S from './styles';

type Props = TouchableOpacityProps & {
  item: Client;
};

export const ClientItem = memo(({ item, ...rest }: Props) => {
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
        <S.DebtValue>{formatToBRL(item.totalDebt)}</S.DebtValue>
      </S.Footer>
    </S.Container>
  );
});
