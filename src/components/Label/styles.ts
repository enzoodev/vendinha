import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  gap: ${RFValue(2)}px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.primary};
    font-family: ${theme.fonts.OpenSans_SemiBold};
    font-size: ${RFValue(14)}px;
  `};
`;
