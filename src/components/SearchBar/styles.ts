import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface ContainerTypeStyleProps {
  isFocused: boolean;
}

export const Container = styled.View<ContainerTypeStyleProps>`
  flex-direction: row;
  align-items: center;
  height: ${RFValue(35)}px;
  padding: ${RFValue(8)}px;
  border-radius: ${RFValue(8)}px;
  border-width: ${RFValue(1)}px;
  border-color: ${({ theme, isFocused }) =>
    isFocused ? theme.colors.primary : theme.colors.search};
`;

export const Content = styled.TextInput`
  flex: 1;
  ${({ theme }) => css`
    font-family: ${theme.fonts.Inter_Regular};
    color: ${theme.colors.search};
    font-size: ${RFValue(16)}px;
    margin-right: ${RFValue(16)}px;
  `};
`;
