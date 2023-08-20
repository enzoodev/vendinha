import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.ScrollView`
  flex: 1;
  padding: ${RFValue(16)}px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ListWrapper = styled.View`
  margin-top: ${RFValue(21)}px;
  gap: ${RFValue(20)}px;
`;
