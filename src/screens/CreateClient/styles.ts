import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  padding: ${RFValue(16)}px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Form = styled.View`
  gap: ${RFValue(16)}px;
  margin-top: ${RFValue(16)}px;
`;

export const InlineWrapper = styled.View`
  flex-direction: row;
  gap: ${RFValue(16)}px;
`;

export const EmptyDebtWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const EmptyDebtText = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.OpenSans_Regular};
    color: ${theme.colors.textSecondary};
    font-size: ${RFValue(16)}px;
  `};
`;

export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  align-self: center;
  gap: ${RFValue(16)}px;
`;
