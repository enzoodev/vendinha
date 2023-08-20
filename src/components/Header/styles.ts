import styled, { css } from 'styled-components/native';
import { EdgeInsets } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton } from '@components/BorderlessButton';

type LayoutProps = {
  insets: EdgeInsets;
};

export const Container = styled.View<LayoutProps>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: ${({ insets }) => insets.top}px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    text-align: center;
    color: ${theme.colors.primary};
    font-family: ${theme.fonts.OpenSans_Bold};
    font-size: ${RFValue(18)}px;
  `};
`;

export const GoBackButton = styled(BorderlessButton)`
  position: absolute;
  left: 0;
`;
