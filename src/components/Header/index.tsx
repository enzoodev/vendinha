import { memo, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import ArrowLeft from '@assets/images/Arrowleft.svg';

import * as S from './styles';

type Props = {
  title: string;
  hasBackButton?: boolean;
};

export const Header = memo(({ title, hasBackButton = false }: Props) => {
  const theme = useTheme();
  const size = theme.responsiveValue * 26;
  const navigation = useNavigation();

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <S.Container>
      {hasBackButton && (
        <S.GoBackButton onPress={handleGoBack}>
          <ArrowLeft height={size} width={size} />
        </S.GoBackButton>
      )}
      <S.Title>{title}</S.Title>
    </S.Container>
  );
});
