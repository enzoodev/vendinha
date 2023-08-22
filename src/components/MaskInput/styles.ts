import styled, { css } from 'styled-components/native';
import { MaskedTextInput } from 'react-native-mask-text';
import { RFValue } from 'react-native-responsive-fontsize';

export const Wrapper = styled.View``;

export const Input = styled(MaskedTextInput)<{ textValue: string }>`
  padding: ${RFValue(10)}px ${RFValue(8)}px;
  border-radius: ${RFValue(8)}px;
  font-size: ${RFValue(14)}px;
  ${({ theme, textValue }) => css`
    border: ${RFValue(1)}px solid ${theme.colors.cardBorderInner};
    font-family: ${theme.fonts.OpenSans_Regular};
    color: ${!!textValue && textValue.trim().length > 0 && textValue !== '0'
      ? theme.colors.textPrimary
      : theme.colors.placeholder};
  `};
`;

export const FormError = styled.Text`
  font-size: ${RFValue(10)}px;
  ${({ theme }) => css`
    font-family: ${theme.fonts.OpenSans_Regular};
    color: ${theme.colors.secondary};
  `};
`;
