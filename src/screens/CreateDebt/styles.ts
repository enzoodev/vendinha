import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  padding: ${RFValue(16)}px;
  background-color: ${({ theme }) => theme.colors.cardPrimary};
`;

export const Form = styled.View`
  gap: ${RFValue(16)}px;
  margin-top: ${RFValue(16)}px;
`;

export const InlineWrapper = styled.View`
  flex-direction: row;
  gap: ${RFValue(16)}px;
`;

export const Footer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  align-self: center;
  gap: ${RFValue(16)}px;
`;
