import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton } from '@components/BorderlessButton';

export const Container = styled(BorderlessButton)`
  align-items: center;
  justify-content: center;
  height: ${RFValue(48)}px;
  width: ${RFValue(48)}px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
`;
