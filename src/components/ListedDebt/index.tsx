import { memo } from 'react';
import { useTheme } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { formatToBRL } from 'brazilian-values';

import { Debt } from '@dtos/debt';

import CheckIcon from '@assets/images/SituacaoAviso.svg';
import { Button } from '@components/Button';

import * as S from './styles';

type Props = {
  item: Debt;
  onPay: () => void;
};

export const ListedDebtItem = memo(({ item, onPay }: Props) => {
  const theme = useTheme();

  return (
    <S.Container>
      <S.Header>
        <S.Title>{item.descricao}</S.Title>
        {item.dataPagamento ? (
          <CheckIcon height={RFValue(16)} width={RFValue(16)} />
        ) : (
          <Button
            title="Pagar"
            onPress={onPay}
            bgColor={theme.colors.cardSecondary}
          />
        )}
      </S.Header>
      <S.Footer>
        <S.DebtText>Valor da dívida:</S.DebtText>
        <S.DebtValue>{formatToBRL(item.valor)}</S.DebtValue>
      </S.Footer>
    </S.Container>
  );
});
