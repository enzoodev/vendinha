import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled(SafeAreaView)`
  flex: 1;
  padding: ${({ theme }) => theme.responsiveValue * 16}px;
`;
