import styled, { css } from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(Animated.View)`
  ${({ theme }) => css`
    border-radius: ${RFValue(8)}px;
    background-color: ${theme.colors.skeleton};
  `};
`;
