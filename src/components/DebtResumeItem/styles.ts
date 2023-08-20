import styled, { css } from 'styled-components/native';
import { Skeleton } from '@components/Skeleton';

export const Container = styled.View`
  ${({ theme }) => css`
    padding: ${theme.responsiveValue * 16}px;
    gap: ${theme.responsiveValue * 14}px;
    border-radius: ${theme.responsiveValue * 8}px;
    background: ${theme.colors.cardPrimary};
    shadow-opacity: 0.3;
    shadow-color: rgba(0, 0, 0, 0.25);
    shadow-offset: ${theme.responsiveValue * 4}px;
  `};
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.secondary};
    font-family: ${theme.fonts.OpenSans_Bold};
    font-size: ${theme.responsiveValue * 16}px;
  `};
`;

export const InlineWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const InlineTitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.textSecondary};
    font-family: ${theme.fonts.OpenSans_Bold};
    font-size: ${theme.responsiveValue * 14}px;
  `};
`;

export const InlineSubtitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.textSecondary};
    font-family: ${theme.fonts.OpenSans_Regular};
    font-size: ${theme.responsiveValue * 14}px;
  `};
`;

export const LoadTitle = styled(Skeleton)`
  height: ${({ theme }) => theme.responsiveValue * 15}px;
  width: ${({ theme }) => theme.responsiveValue * 130}px;
`;

export const LoadSubtitle = styled(Skeleton)`
  height: ${({ theme }) => theme.responsiveValue * 14}px;
  width: 90%;
`;
