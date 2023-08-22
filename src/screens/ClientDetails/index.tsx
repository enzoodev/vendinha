import { useCallback, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
} from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Toast from 'react-native-toast-message';
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { formatToCPF, formatToDate } from 'brazilian-values';
import ReactNativeModal from 'react-native-modal';

import { api } from '@services/api';
import { Debt, DebtDTO } from '@dtos/debt';
import { Client, ClientDTO } from '@dtos/client';

import { DebtSkeletonItem } from '@components/DebtSkeletonItem';
import { ButtonAdd } from '@components/ButtonAdd';
import { DebtItem } from '@components/DebtItem';
import { Header } from '@components/Header';
import { Section } from '@components/Section';
import { PayDebtModal } from '@components/PayDebtModal';

import * as S from './styles';

type RouteParams = {
  id: number;
};

export function ClientDetails() {
  const route = useRoute();
  const { id } = route.params as RouteParams;
  const [client, setClient] = useState<Client>({
    id,
    nome: '',
    email: '',
    cpf: '',
    dataNascimento: new Date().toISOString(),
    idControle: 0,
    version: 0,
    retorno: [],
    debts: [],
    totalDebt: 0,
  });
  const [debtIdSelected, setDebtIdSelected] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPayDebt, setIsLoadingPayDebt] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const toggleModal = useCallback(() => {
    setModalVisible(prevState => !prevState);
  }, []);

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

  const handleConfirmPayDebt = useCallback(
    async (id: number) => {
      setDebtIdSelected(id);
      toggleModal();
    },
    [toggleModal],
  );

  const handlePayDebt = useCallback(async () => {
    try {
      setIsLoadingPayDebt(true);

      await api.put('Divida/Pagar', {
        dividaId: debtIdSelected,
      });

      const index = client.debts.findIndex(item => item.id === debtIdSelected);

      const updateClient = client;
      updateClient.debts[index].dataPagamento = formatToDate(new Date());
      setClient(updateClient);

      Toast.show({
        type: 'success',
        text1: 'Clientes',
        text2: 'Dívida paga com sucesso!',
      });

      toggleModal();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Clientes',
        text2: 'Não foi possível pagar a dívida',
      });
    } finally {
      setIsLoadingPayDebt(false);
    }
  }, [client, debtIdSelected, toggleModal]);

  const loadingData = Array.from({ length: 8 }).map((_, index) => ({
    id: index,
  }));
  const data = isLoading ? loadingData : client.debts;

  const keyExtractor = (item: Debt) => String(item.id);

  const renderItem: ListRenderItem<Debt> = ({ item }) => {
    if (isLoading) {
      return <DebtSkeletonItem />;
    }

    return <DebtItem item={item} onPay={() => handleConfirmPayDebt(item.id)} />;
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

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleCreateDebt = useCallback(() => {
    // navigation.navigate('CreateDebt');
  }, [navigation]);

  const handleOpenAllDebts = useCallback(() => {}, []);

  const handleFetchClient = useCallback(async () => {
    const [clientsResponse, debtsResponse] = await Promise.all([
      api.get(`/Cliente/${id}`),
      api.get(`/Divida/GetOData`),
    ]);

    const clientData: ClientDTO = clientsResponse.data;
    const debtsData: DebtDTO[] = debtsResponse.data.d.results;

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
      }))
      .sort((debtA, debtB) => {
        if (debtA.dataPagamento === null && debtB.dataPagamento !== null) {
          return -1;
        }
        if (debtA.dataPagamento !== null && debtB.dataPagamento === null) {
          return 1;
        }
        return debtB.valor - debtA.valor;
      });

    setClient({
      id: clientData.id,
      nome: clientData.nome,
      email: clientData.email,
      cpf: clientData.cpf,
      dataNascimento: clientData.dataNascimento,
      idControle: clientData.idControle,
      version: clientData.version,
      retorno: clientData.retorno,
      debts,
      totalDebt: debts.reduce((prev, { valor }) => {
        return prev + valor;
      }, 0),
    });
  }, [client.id, id]);

  const handleRefetchClient = useCallback(async () => {
    setIsFetching(true);
    await handleFetchClient();
    setIsFetching(false);
  }, [handleFetchClient]);

  const handleLoadClient = useCallback(async () => {
    try {
      setIsLoading(true);

      await handleFetchClient();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Clientes',
        text2: 'Não foi possível carregar os dados do cliente',
        onHide: handleGoBack,
        visibilityTime: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  }, [handleFetchClient, handleGoBack]);

  useFocusEffect(
    useCallback(() => {
      handleLoadClient();
    }, [handleLoadClient]),
  );

  return (
    <S.Container>
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
            onRefresh={handleRefetchClient}
          />
        }
        ListHeaderComponent={
          <S.HeaderWrapper>
            <Header title="Clientes" hasBackButton />
            <S.SectionsWrapper>
              <Section
                title="Nome"
                subtitle={client.nome}
                isLoading={isLoading}
              />
              <S.CoupleSectionWrapper>
                <Section
                  title="CPF"
                  subtitle={formatToCPF(client.cpf)}
                  isLoading={isLoading}
                />
                <Section
                  title="Nascimento"
                  subtitle={formatToDate(new Date(client.dataNascimento))}
                  isLoading={isLoading}
                />
              </S.CoupleSectionWrapper>
              <Section
                title="Email"
                subtitle={client.email}
                isLoading={isLoading}
              />
            </S.SectionsWrapper>
            <S.DebtContentWrapper>
              <S.DebtTitle>Dívidas</S.DebtTitle>
              <S.OpenAllDebtsButton onPress={handleOpenAllDebts}>
                <S.OpenAllDebtsText>Ver todas</S.OpenAllDebtsText>
              </S.OpenAllDebtsButton>
            </S.DebtContentWrapper>
            <Toast />
          </S.HeaderWrapper>
        }
        ListEmptyComponent={
          <S.ListEmptyTitle>Cliente não possui dívidas.</S.ListEmptyTitle>
        }
      />
      <S.AnimatedContainer style={buttonAnimatedStyle}>
        <ButtonAdd onPress={handleCreateDebt} />
      </S.AnimatedContainer>
      <ReactNativeModal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        propagateSwipe
        style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        <PayDebtModal
          closeModal={toggleModal}
          onSubmit={handlePayDebt}
          isLoadingSubmit={isLoadingPayDebt}
        />
      </ReactNativeModal>
    </S.Container>
  );
}
