import { ReactNode, memo } from 'react';
import { ViewProps } from 'react-native';

import * as S from './styles';

type Props = ViewProps & {
  title: string;
  children?: ReactNode;
};

export const Label = memo(({ title, children, ...rest }: Props) => {
  return (
    <S.Container {...rest}>
      <S.Title>{title}</S.Title>
      {!!children && children}
    </S.Container>
  );
});
