import { memo } from 'react';
import { formatToBRL } from 'brazilian-values';

import * as S from './styles';

type Props = {
  title: string;
  quantity: number;
  totalValue: number;
  isLoading: boolean;
};

export const DebtResumeItem = memo(
  ({ title, quantity, totalValue, isLoading }: Props) => {
    return (
      <S.Container>
        {isLoading ? (
          <>
            <S.LoadTitle />
            <S.LoadSubtitle />
            <S.LoadSubtitle />
          </>
        ) : (
          <>
            <S.Title>{title}</S.Title>
            <S.InlineWrapper>
              <S.InlineTitle>Qtde:</S.InlineTitle>
              <S.InlineSubtitle>{quantity}</S.InlineSubtitle>
            </S.InlineWrapper>
            <S.InlineWrapper>
              <S.InlineTitle>Valor total:</S.InlineTitle>
              <S.InlineSubtitle>{formatToBRL(totalValue)}</S.InlineSubtitle>
            </S.InlineWrapper>
          </>
        )}
      </S.Container>
    );
  },
);
