import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface ButtonProps {
  bgColor?: string;
  borderColor?: string;
}

interface ButtonTextProps {
  color?: string;
}

export const Container = styled.TouchableHighlight<ButtonProps>`
  align-items: center;
  justify-content: center;
  padding: ${RFValue(8)}px ${RFValue(10)}px;
  border-radius: ${RFValue(8)}px;
  ${({ bgColor }) =>
    !!bgColor &&
    css`
      background-color: ${bgColor};
    `};
  ${({ borderColor }) =>
    !!borderColor &&
    css`
      border: ${RFValue(1)}px solid ${borderColor};
    `};
`;

export const Title = styled.Text<ButtonTextProps>`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.OpenSans_Bold};
  color: ${({ theme, color }) => color || theme.colors.cardPrimary};
`;
