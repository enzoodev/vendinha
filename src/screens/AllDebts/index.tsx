import { useCallback, useMemo, useState } from 'react';
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
import { AxiosResponse } from 'axios';
import { useTheme } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { formatToBRL, formatToDate } from 'brazilian-values';
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import ReactNativeModal from 'react-native-modal';

import { api } from '@services/api';
import { Debt } from '@dtos/debt';
import { AllDebtsDTO } from '@dtos/allDebts';

import { Header } from '@components/Header';
import { PayDebtModal } from '@components/PayDebtModal';
import { ListedDebtItem } from '@components/ListedDebt';
import { ListedDebtSkeletonItem } from '@components/ListedDebtSkeletonItem';
import { Button } from '@components/Button';

import * as S from './styles';

type RouteParams = {
  clientId: number;
};

export function AllDebts() {
  const route = useRoute();
  const { clientId } = route.params as RouteParams;
  const [debts, setDebts] = useState<Debt[]>([]);
  const [debtIdSelected, setDebtIdSelected] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPayDebt, setIsLoadingPayDebt] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const theme = useTheme();

  const totalDebt = useMemo(() => {
    if (debts.length === 0) return 0;

    return debts.reduce((prev, { valor }) => {
      return prev + valor;
    }, 0);
  }, [debts]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

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

      const index = debts.findIndex(item => item.id === debtIdSelected);

      const updatedDebts = debts;
      debts[index].dataPagamento = formatToDate(new Date());
      setDebts(updatedDebts);

      Toast.show({
        type: 'success',
        text1: 'Listagem de dívidas',
        text2: 'Dívida paga com sucesso!',
      });

      toggleModal();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Listagem de dívidas',
        text2: 'Não foi possível pagar a dívida',
      });
    } finally {
      setIsLoadingPayDebt(false);
    }
  }, [debtIdSelected, debts, toggleModal]);

  const loadingData = Array.from({ length: 8 }).map((_, index) => ({
    id: index,
  }));
  const data = isLoading ? loadingData : debts;

  const keyExtractor = (item: Debt) => String(item.id);

  const renderItem: ListRenderItem<Debt> = ({ item }) => {
    if (isLoading) {
      return <ListedDebtSkeletonItem />;
    }

    return (
      <ListedDebtItem item={item} onPay={() => handleConfirmPayDebt(item.id)} />
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

  const handleFetchDebts = useCallback(async () => {
    const { data }: AxiosResponse<AllDebtsDTO> =
      await api.get(`/Divida/GetOData`);

    setDebts(
      data.d.results
        .filter(item => item.cliente.id === clientId)
        .sort((debtA, debtB) => {
          if (debtA.dataPagamento === null && debtB.dataPagamento !== null) {
            return -1;
          }
          if (debtA.dataPagamento !== null && debtB.dataPagamento === null) {
            return 1;
          }
          return debtB.valor - debtA.valor;
        }),
    );
  }, [clientId]);

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
      Toast.show({
        type: 'error',
        text1: 'Listagem de dívidas',
        text2: 'Não foi possível carregar as dívidas',
        onHide: handleGoBack,
        visibilityTime: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  }, [handleFetchDebts, handleGoBack]);

  useFocusEffect(
    useCallback(() => {
      handleLoadDebts();
    }, [handleLoadDebts]),
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
            onRefresh={handleRefetchDebts}
          />
        }
        ListHeaderComponent={
          <S.HeaderWrapper>
            <Header title="Listagem de dívidas" hasBackButton />
            <Toast />
          </S.HeaderWrapper>
        }
        ListFooterComponent={
          <S.TotalDebtWrapper>
            <S.TotalDebtText>Total</S.TotalDebtText>
            <S.TotalDebtValue>{formatToBRL(totalDebt)}</S.TotalDebtValue>
          </S.TotalDebtWrapper>
        }
        ListEmptyComponent={
          <S.ListEmptyTitle>Cliente não possui dívidas.</S.ListEmptyTitle>
        }
      />
      <S.AnimatedContainer style={buttonAnimatedStyle}>
        <Button
          title="Pagar"
          onPress={() => handleConfirmPayDebt(debts[0].id)}
          bgColor={theme.colors.primary}
        />
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
