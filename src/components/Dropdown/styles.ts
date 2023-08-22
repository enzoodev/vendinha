import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton } from '@components/BorderlessButton';

export const Container = styled.View`
  gap: ${RFValue(4)}px;
`;

export const Header = styled(BorderlessButton)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${RFValue(8)}px;
  border-radius: ${RFValue(8)}px;
  border: ${RFValue(1)}px solid ${({ theme }) => theme.colors.search};
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.dropdownText};
    font-family: ${theme.fonts.Inter_Regular};
    font-size: ${RFValue(14)}px;
  `};
`;

export const Content = styled.View`
  gap: ${RFValue(8)}px;
  padding-bottom: 0;
  border-bottom-left-radius: ${RFValue(8)}px;
  border-bottom-right-radius: ${RFValue(8)}px;
  background-color: ${({ theme }) => theme.colors.background};
  border-color: ${({ theme }) => theme.colors.search};
`;

export const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${RFValue(8)}px;
  border-radius: ${RFValue(8)}px;
  border-color: ${({ theme }) => theme.colors.search};
`;

export const Input = styled.TextInput`
  ${({ theme }) => css`
    flex: 1;
    font-family: ${theme.fonts.Inter_Regular};
    font-size: ${RFValue(14)}px;
    color: ${theme.colors.textPrimary};
  `};
`;

export const Option = styled(BorderlessButton)`
  padding: ${RFValue(8)}px;
  padding-left: ${RFValue(4)}px;
`;

export const OptionText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.dropdownText};
    font-family: ${theme.fonts.Inter_Regular};
    font-size: ${RFValue(14)}px;
  `};
`;

export const EmptyText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.dropdownText};
    font-family: ${theme.fonts.Inter_Regular};
    font-size: ${RFValue(14)}px;
    padding: ${RFValue(8)}px;
    padding-left: ${RFValue(4)}px;
  `};
`;
