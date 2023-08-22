import styled, { css } from 'styled-components/native';
import { EdgeInsets } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View<{ insets: EdgeInsets }>`
  align-items: center;
  ${({ theme, insets }) => css`
    height: ${insets.bottom + RFValue(208)}px;
    border-top-left-radius: ${RFValue(30)}px;
    border-top-right-radius: ${RFValue(30)}px;
    background: ${theme.colors.cardPrimary};
  `};
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    margin-top: ${RFValue(64)}px;
    text-align: center;
    color: ${theme.colors.textTertiary};
    font-family: ${theme.fonts.OpenSans_Bold};
    font-size: ${RFValue(14)}px;
  `};
`;

export const Footer = styled.View<{ insets: EdgeInsets }>`
  position: absolute;
  bottom: ${({ insets }) => insets.bottom + RFValue(14)}px;
  flex-direction: row;
  align-items: center;
  gap: ${RFValue(16)}px;
`;
