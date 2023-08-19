import styled, { css } from 'styled-components/native';
import { BorderlessButton } from '@components/BorderlessButton';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    text-align: center;
    color: ${theme.colors.primary};
    font-family: ${theme.fonts.OpenSans_Bold};
    font-size: ${theme.responsiveValue * 18}px;
  `};
`;

export const GoBackButton = styled(BorderlessButton)`
  position: absolute;
  left: 0;
`;
