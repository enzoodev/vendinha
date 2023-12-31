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

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.secondary};
    font-family: ${theme.fonts.OpenSans_Bold};
    font-size: ${RFValue(16)}px;
  `};
`;

export const InlineWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const InlineTitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.textSecondary};
    font-family: ${theme.fonts.OpenSans_Bold};
    font-size: ${RFValue(14)}px;
  `};
`;

export const InlineSubtitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.textSecondary};
    font-family: ${theme.fonts.OpenSans_Regular};
    font-size: ${RFValue(14)}px;
  `};
`;

export const LoadTitle = styled(Skeleton)`
  height: ${RFValue(15)}px;
  width: ${RFValue(130)}px;
`;

export const LoadSubtitle = styled(Skeleton)`
  height: ${RFValue(14)}px;
  width: 90%;
`;
