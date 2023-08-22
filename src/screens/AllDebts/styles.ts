import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Animated from 'react-native-reanimated';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const HeaderWrapper = styled.View`
  margin-bottom: ${RFValue(16)}px;
`;

export const Separator = styled.View`
  height: ${RFValue(16)}px;
`;

export const AnimatedContainer = styled(Animated.View)`
  z-index: 1;
  position: absolute;
  align-self: center;
  bottom: ${RFValue(16)}px;
`;

export const TotalDebtWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${RFValue(8)}px 0;
  border-top-width: ${RFValue(1)}px;
  border-color: ${({ theme }) => theme.colors.cardBorderInner};
  margin-top: ${RFValue(16)}px;
`;

export const TotalDebtText = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.OpenSans_SemiBold};
    color: ${theme.colors.textSecondary};
    font-size: ${RFValue(16)}px;
  `};
`;

export const TotalDebtValue = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.OpenSans_Regular};
    color: ${theme.colors.textSecondary};
    font-size: ${RFValue(16)}px;
  `};
`;

export const ListEmptyTitle = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.OpenSans_SemiBold};
    color: ${theme.colors.textSecondary};
    font-size: ${RFValue(16)}px;
  `};
`;
