import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Animated from 'react-native-reanimated';

export const Container = styled.View`
  flex: 1;
  padding: ${RFValue(16)}px;
  background-color: ${({ theme }) => theme.colors.cardPrimary};
`;

export const HeaderWrapper = styled.View`
  gap: ${RFValue(16)}px;
  margin-bottom: ${RFValue(16)}px;
`;

export const Separator = styled.View`
  height: ${RFValue(10)}px;
`;

export const AnimatedContainer = styled(Animated.View)`
  z-index: 1;
  position: absolute;
  bottom: ${RFValue(70)}px;
  right: ${RFValue(16)}px;
`;

export const ListEmptyTitle = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.OpenSans_Regular};
    color: ${theme.colors.textSecondary};
    font-size: ${RFValue(16)}px;
  `};
`;
