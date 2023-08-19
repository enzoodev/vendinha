import { useCallback, useState } from 'react';
import { Alert, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { AxiosResponse } from 'axios';

import { api } from '@services/api';
import { AllDebtsDTO } from '@dtos/allDebts';
import { DebtDTO } from '@dtos/debt';

import { Header } from '@components/Header';
import * as S from './styles';

export function Home() {
  const [debts, setDebts] = useState<DebtDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const handleFetchDebts = useCallback(async () => {
    const { data }: AxiosResponse<AllDebtsDTO> =
      await api.get(`/Divida/GetOData`);

    setDebts(data.d.results);
  }, []);

  const handleRefetchDebts = useCallback(async () => {
    setIsFetching(true);
    await handleFetchDebts();
    setIsFetching(false);
  }, [handleFetchDebts]);

  const handleLoadDebts = useCallback(async () => {
    try {
      setIsLoading(true);

      await handleFetchDebts();
    } catch (error) {
      return Alert.alert('Home', 'Não foi possível carregar as dívidas');
    } finally {
      setIsLoading(false);
    }
  }, [handleFetchDebts]);

  useFocusEffect(
    useCallback(() => {
      handleLoadDebts();
    }, [handleLoadDebts]),
  );

  return (
    <S.Container
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
          onRefresh={handleRefetchDebts}
        />
      }
    >
      <S.Content edges={['right', 'top', 'left']}>
        <Header title="Resumo de dívidas" />
      </S.Content>
    </S.Container>
  );
}
