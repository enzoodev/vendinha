import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Animated from 'react-native-reanimated';
import { BorderlessButton } from '@components/BorderlessButton';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const HeaderWrapper = styled.View`
  margin-bottom: ${RFValue(8)}px;
`;

export const Separator = styled.View`
  height: ${RFValue(16)}px;
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

export const SectionsWrapper = styled.View`
  gap: ${RFValue(8)}px;
  margin-top: ${RFValue(16)}px;
`;

export const CoupleSectionWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${RFValue(8)}px;
`;

export const DebtContentWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${RFValue(16)}px;
`;

export const DebtTitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.primary};
    font-family: ${theme.fonts.OpenSans_Bold};
    font-size: ${RFValue(16)}px;
  `};
`;

export const OpenAllDebtsButton = styled(BorderlessButton)`
  padding: ${RFValue(4)}px 0;
  gap: ${RFValue(4)}px;
  border-bottom-width: ${RFValue(1)}px;
  border-color: ${({ theme }) => theme.colors.primary};
`;

export const OpenAllDebtsText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.primary};
    font-family: ${theme.fonts.OpenSans_Bold};
    font-size: ${RFValue(16)}px;
    line-height: ${RFValue(24)}px;
  `};
`;
