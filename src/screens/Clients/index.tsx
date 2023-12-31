import { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Toast from 'react-native-toast-message';
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

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
  const navigation = useNavigation();

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

  const handleCreateClient = useCallback(() => {
    navigation.navigate('CreateClient');
  }, [navigation]);

  const handleOpenClientDetails = useCallback(
    (id: number) => {
      navigation.navigate('ClientDetails', { id });
    },
    [navigation],
  );

  const loadingData = Array.from({ length: 8 }).map((_, index) => ({
    id: index,
  }));
  const data = isLoading ? loadingData : flatlistData;

  const keyExtractor = (item: Client) => String(item.id);

  const renderItem: ListRenderItem<Client> = ({ item }) => {
    if (isLoading) {
      return <ClientSkeletonItem />;
    }

    return (
      <ClientItem
        item={item}
        onPress={() => handleOpenClientDetails(item.id)}
      />
    );
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

    const clientsWithDebts = clientsData
      .map(client => {
        const debts = debtsData
          .filter(debt => debt.cliente.id === client.id)
          .map(debt => ({
            id: debt.id,
            valor: debt.valor,
            dataPagamento: debt.dataPagamento,
            descricao: debt.descricao,
            idControle: debt.idControle,
            version: debt.version,
            retorno: debt.retorno,
          }));

        return {
          id: client.id,
          nome: client.nome,
          email: client.email,
          cpf: client.cpf,
          dataNascimento: client.dataNascimento,
          idControle: client.idControle,
          version: client.version,
          retorno: client.retorno,
          debts,
          totalDebt: debts.reduce((prev, { valor }) => {
            return prev + valor;
          }, 0),
        };
      })
      .sort((clientA, clientB) => clientB.totalDebt - clientA.totalDebt);

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
        contentContainerStyle={{
          padding: RFValue(16),
          paddingBottom: RFValue(32),
        }}
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
        <ButtonAdd onPress={handleCreateClient} />
      </S.AnimatedContainer>
    </S.Container>
  );
}
