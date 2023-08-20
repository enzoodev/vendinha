import { TouchableOpacityProps } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Add from '@assets/images/Add.svg';

import * as S from './styles';

export function ButtonAdd({ ...props }: TouchableOpacityProps) {
  return (
    <S.Container {...props}>
      <Add height={RFValue(20)} width={RFValue(20)} />
    </S.Container>
  );
}
