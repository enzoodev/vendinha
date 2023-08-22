import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Skeleton } from '@components/Skeleton';

export const Container = styled.View`
  flex: 1;
  gap: ${RFValue(2)}px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.primary};
    font-family: ${theme.fonts.OpenSans_SemiBold};
    font-size: ${RFValue(14)}px;
  `};
`;

export const Subtitle = styled.Text`
  ${({ theme }) => css`
    padding: ${RFValue(10)}px 0;
    color: ${theme.colors.textSecondary};
    font-family: ${theme.fonts.OpenSans_Regular};
    font-size: ${RFValue(14)}px;
  `};
`;

export const SubtitleSkeleton = styled(Skeleton)`
  width: 70%;
  height: ${RFValue(14)}px;
  margin: ${RFValue(10)}px 0;
`;
