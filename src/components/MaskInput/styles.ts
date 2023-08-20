import styled, { css } from 'styled-components/native';
import { MaskedTextInput } from 'react-native-mask-text';
import { RFValue } from 'react-native-responsive-fontsize';

export const Wrapper = styled.View``;

export const Input = styled(MaskedTextInput)`
  padding: ${RFValue(10)}px ${RFValue(8)}px;
  border-radius: ${RFValue(8)}px;
  font-size: ${RFValue(14)}px;
  ${({ theme }) => css`
    border: ${RFValue(1)}px solid ${theme.colors.cardBorderInner};
    font-family: ${theme.fonts.OpenSans_Regular};
    color: ${theme.colors.textPrimary};
  `};
`;

export const FormError = styled.Text`
  font-size: ${RFValue(10)}px;
  ${({ theme }) => css`
    font-family: ${theme.fonts.OpenSans_Regular};
    color: ${theme.colors.secondary};
  `};
`;
