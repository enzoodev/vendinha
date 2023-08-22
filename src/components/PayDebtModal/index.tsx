import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';
import { Button } from '@components/Button';
import * as S from './styles';

type Props = {
  closeModal: () => void;
  onSubmit: () => void;
  isLoadingSubmit: boolean;
};

export function PayDebtModal({ closeModal, onSubmit, isLoadingSubmit }: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <S.Container insets={insets}>
      <S.Title>
        Ao confirmar, essa dívida será quitada.
        {'\n'}
        Deseja realmente confirmar?
      </S.Title>
      <S.Footer insets={insets}>
        <Button
          title="Cancelar"
          onPress={closeModal}
          color={theme.colors.primary}
          borderColor={theme.colors.primary}
        />
        <Button
          title="Confirmar"
          onPress={onSubmit}
          isLoading={isLoadingSubmit}
          bgColor={theme.colors.primary}
        />
      </S.Footer>
    </S.Container>
  );
}
