import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
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

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.secondary};
    font-family: ${theme.fonts.OpenSans_Bold};
    font-size: ${RFValue(16)}px;
  `};
`;

export const DebtText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.textSecondary};
    font-family: ${theme.fonts.OpenSans_Bold};
    font-size: ${RFValue(16)}px;
  `};
`;

export const DebtValue = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.textPrimary};
    font-family: ${theme.fonts.OpenSans_Bold};
    font-size: ${RFValue(16)}px;
  `};
`;
