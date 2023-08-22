import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Skeleton } from '@components/Skeleton';

export const Container = styled.View`
  ${({ theme }) => css`
    padding: ${RFValue(16)}px;
    gap: ${RFValue(14)}px;
    border-radius: ${RFValue(8)}px;
    background: ${theme.colors.cardPrimary};
    shadow-opacity: 0.8;
    shadow-color: rgba(0, 0, 0, 0.25);
    shadow-offset: 0 ${RFValue(4)}px;
  `};
`;

export const Title = styled(Skeleton)`
  height: ${RFValue(15)}px;
  width: ${RFValue(130)}px;
`;

export const Subtitle = styled(Skeleton)`
  height: ${RFValue(14)}px;
  width: 90%;
`;
