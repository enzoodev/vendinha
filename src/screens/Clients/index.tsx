import { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { RFValue } from 'react-native-responsive-fontsize';
import { api } from '@services/api';
import { DebtDTO } from '@dtos/debt';
import { Client, ClientDTO } from '@dtos/client';

import { Header } from '@components/Header';
import { ClientSkeletonItem } from '@components/ClientSkeletonItem';
import { ClientItem } from '@components/ClientItem';
import { SearchBar } from '@components/SearchBar';
import { ButtonAdd } from '@components/ButtonAdd';

import * as S from './styles';

export function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const flatlistData = useMemo(() => {
    if (!clients || clients.length === 0) return [];

    return clients.filter(item =>
      item.nome.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [clients, searchText]);

  const drag = useSharedValue(0);

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(
            interpolate(drag.value, [0, 1], [0, 180], Extrapolate.CLAMP),
          ),
        },
      ],
    };
  });

  const loadingData = Array.from({ length: 8 }).map((_, index) => ({
    id: index,
  }));
  const data = isLoading ? loadingData : flatlistData;

  const keyExtractor = (item: ClientDTO) => String(item.id);

  const renderItem: ListRenderItem<ClientDTO> = ({ item }) => {
    if (isLoading) {
      return <ClientSkeletonItem />;
    }

    return <ClientItem item={item} />;
  };

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (event.nativeEvent.contentOffset.y > 0) {
        drag.value = 1;
      } else {
        drag.value = 0;
      }
    },
    [drag],
  );

  const handleFetchClients = useCallback(async () => {
    const [clientsResponse, debtsResponse] = await Promise.all([
      api.get(`/Cliente/GetOData`),
      api.get(`/Divida/GetOData`),
    ]);

    const clientsData: ClientDTO[] = clientsResponse.data.d.results;
    const debtsData: DebtDTO[] = debtsResponse.data.d.results;

    const clientsWithDebts = clientsData.map(client => {
      const clientDebts = debtsData.filter(
        debt => debt.cliente.id === client.id,
      );
      return {
        id: client.id,
        nome: client.nome,
        email: client.email,
        cpf: client.cpf,
        idControle: client.idControle,
        version: client.version,
        retorno: client.retorno,
        debts: clientDebts.map(debt => ({
          id: debt.id,
          valor: debt.valor,
          dataPagamento: debt.dataPagamento,
          descricao: debt.descricao,
          idControle: debt.idControle,
          version: debt.version,
          retorno: debt.retorno,
        })),
      };
    });

    setClients(clientsWithDebts);
  }, []);

  const handleRefetchClients = useCallback(async () => {
    setIsFetching(true);
    await handleFetchClients();
    setIsFetching(false);
  }, [handleFetchClients]);

  const handleLoadClients = useCallback(async () => {
    try {
      setIsLoading(true);

      await handleFetchClients();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Clientes',
        text2: 'Não foi possível carregar os clientes',
      });
    } finally {
      setIsLoading(false);
    }
  }, [handleFetchClients]);

  useFocusEffect(
    useCallback(() => {
      handleLoadClients();
    }, [handleLoadClients]),
  );

  return (
    <S.Container>
      <Toast />
      <FlatList
        data={data as []}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ItemSeparatorComponent={S.Separator}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: RFValue(32) }}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={handleRefetchClients}
          />
        }
        ListHeaderComponent={
          <S.HeaderWrapper>
            <Header title="Clientes" />
            <SearchBar
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Digite o nome do cliente"
            />
          </S.HeaderWrapper>
        }
        ListEmptyComponent={
          <S.ListEmptyTitle>Nenhum cliente encontrado.</S.ListEmptyTitle>
        }
      />
      <S.AnimatedContainer style={buttonAnimatedStyle}>
        <ButtonAdd onPress={() => {}} />
      </S.AnimatedContainer>
    </S.Container>
  );
}
