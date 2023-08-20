import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton } from '@components/BorderlessButton';

export const Container = styled(BorderlessButton)`
  ${({ theme }) => css`
    padding: ${RFValue(10)}px ${RFValue(16)}px;
    gap: ${RFValue(10)}px;
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
  gap: ${RFValue(8)}px;
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

export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${RFValue(4)}px 0;
  border-top-width: ${RFValue(1)}px;
  border-color: ${({ theme }) => theme.colors.cardBorderInner};
`;

export const DebtText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.secondary};
    font-family: ${theme.fonts.OpenSans_Bold};
    font-size: ${RFValue(16)}px;
  `};
`;

export const DebtValue = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.textSecondary};
    font-family: ${theme.fonts.OpenSans_Bold};
    font-size: ${RFValue(16)}px;
  `};
`;
