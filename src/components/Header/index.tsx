import { memo, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ArrowLeft from '@assets/images/Arrowleft.svg';

import * as S from './styles';

type Props = {
  title: string;
  hasBackButton?: boolean;
};

export const Header = memo(({ title, hasBackButton = false }: Props) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <S.Container insets={insets}>
      {hasBackButton && (
        <S.GoBackButton onPress={handleGoBack}>
          <ArrowLeft height={RFValue(26)} width={RFValue(26)} />
        </S.GoBackButton>
      )}
      <S.Title>{title}</S.Title>
    </S.Container>
  );
});
