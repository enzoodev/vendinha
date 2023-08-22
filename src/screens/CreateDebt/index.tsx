import { useCallback, useState } from 'react';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import { parseToDate, parseToNumber } from 'brazilian-values';
import Toast from 'react-native-toast-message';

import { CreateDebtFormData, schema } from '@schemas/createDebt';
import { api } from '@services/api';

import { Header } from '@components/Header';
import { Input } from '@components/Input';
import { Label } from '@components/Label';
import { MaskInput } from '@components/MaskInput';
import { Button } from '@components/Button';
import { Dropdown } from '@components/Dropdown';

import * as S from './styles';

type RouteParams = {
  clientId: number;
};

export function CreateDebt() {
  const [isLoadingRequest, setIsLoadingRequest] = useState(false);
  const [paidOptionSelected, setPaidOptionSelected] = useState<1 | 0 | null>(
    null,
  );
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { clientId } = route.params as RouteParams;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateDebtFormData>({
    resolver: yupResolver(schema) as any,
  });

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSelectPaidOption = useCallback((id: number) => {
    setPaidOptionSelected(id as 1 | 0);
  }, []);

  const onSubmit: SubmitHandler<CreateDebtFormData> = useCallback(
    async data => {
      try {
        if (paidOptionSelected === null) {
          return Alert.alert('Nova dívida', 'Informe a situação da dívida');
        }

        setIsLoadingRequest(true);

        await api.post('Divida', {
          clienteId: clientId,
          valor: parseToNumber(data.valor.replace(/(\d{2})$/, ',$1')),
          descricao: data.descricao,
          dataPagamento:
            paidOptionSelected === 1 &&
            !!data.dataPagamento &&
            data.dataPagamento.length > 0
              ? parseToDate(data.dataPagamento)
              : null,
        });

        Toast.show({
          type: 'success',
          text1: 'Nova dívida',
          text2: 'Dívida criada com sucesso!',
          onHide: handleGoBack,
          visibilityTime: 2000,
        });

        reset({
          valor: '',
          dataPagamento: '',
          descricao: '',
          creationDate: '',
        });
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Nova dívida',
          text2: 'Não foi possível criar a dívida',
        });
      } finally {
        setIsLoadingRequest(false);
      }
    },
    [clientId, handleGoBack, paidOptionSelected, reset],
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Container>
        <Header title="Nova dívida" hasBackButton />
        <Toast />
        <S.Form>
          <Controller
            control={control}
            name="descricao"
            render={({ field: { value, onChange } }) => (
              <Label title="Nome">
                <Input
                  value={value}
                  onChangeText={onChange}
                  placeholder="Descrição da dívida"
                  formError={errors.descricao?.message}
                />
              </Label>
            )}
          />
          <S.InlineWrapper>
            <Controller
              control={control}
              name="creationDate"
              render={({ field: { value, onChange } }) => (
                <Label title="Data de criação" style={{ flex: 1 }}>
                  <MaskInput
                    mask="99/99/9999"
                    value={value}
                    onChangeText={onChange}
                    placeholder="DD/MM/AAAA"
                    formError={errors.creationDate?.message}
                    keyboardType="number-pad"
                  />
                </Label>
              )}
            />
            <Controller
              control={control}
              name="valor"
              render={({ field: { value, onChange } }) => (
                <Label title="Valor" style={{ flex: 1 }}>
                  <MaskInput
                    type="currency"
                    options={{
                      prefix: 'R$ ',
                      decimalSeparator: ',',
                      precision: 2,
                    }}
                    keyboardType="numeric"
                    value={value}
                    onChangeText={(_, rawText) => onChange(rawText)}
                    placeholder="R$ 0,00"
                    formError={errors.valor?.message}
                  />
                </Label>
              )}
            />
          </S.InlineWrapper>
          <Label title="Situação">
            <Dropdown
              value={paidOptionSelected}
              onSelectOption={handleSelectPaidOption}
            />
          </Label>
          <Controller
            control={control}
            name="dataPagamento"
            render={({ field: { value, onChange } }) => (
              <Label title="Data do pagamento" style={{ width: '47%' }}>
                <MaskInput
                  mask="99/99/9999"
                  value={value}
                  onChangeText={onChange}
                  placeholder="DD/MM/AAAA"
                  formError={errors.dataPagamento?.message}
                  keyboardType="number-pad"
                />
              </Label>
            )}
          />
        </S.Form>

        <S.Footer>
          <Button
            title="Cancelar"
            onPress={handleGoBack}
            color={theme.colors.primary}
            borderColor={theme.colors.primary}
          />
          <Button
            title="Salvar"
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoadingRequest}
            bgColor={theme.colors.primary}
          />
        </S.Footer>
      </S.Container>
    </TouchableWithoutFeedback>
  );
}
