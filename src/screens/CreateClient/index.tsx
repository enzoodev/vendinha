import { useCallback, useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import { parseToDate } from 'brazilian-values';
import Toast from 'react-native-toast-message';

import { CreateClientFormData, schema } from '@schemas/createClient';
import { api } from '@services/api';

import { Header } from '@components/Header';
import { Input } from '@components/Input';
import { Label } from '@components/Label';
import { MaskInput } from '@components/MaskInput';
import { Button } from '@components/Button';

import * as S from './styles';

export function CreateClient() {
  const [isLoadingRequest, setIsLoadingRequest] = useState(false);
  const theme = useTheme();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateClientFormData>({
    resolver: yupResolver(schema),
  });

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onSubmit: SubmitHandler<CreateClientFormData> = useCallback(
    async data => {
      try {
        setIsLoadingRequest(true);

        await api.post('Cliente', {
          ...data,
          dataNascimento: parseToDate(data.dataNascimento),
        });

        Toast.show({
          type: 'success',
          text1: 'Clientes',
          text2: 'Cliente criado com sucesso!',
          onHide: handleGoBack,
          visibilityTime: 2000,
        });

        reset();
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Clientes',
          text2: 'Não foi possível criar o cliente',
        });
      } finally {
        setIsLoadingRequest(false);
      }
    },
    [handleGoBack, reset],
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Container>
        <Header title="Clientes" hasBackButton />
        <Toast />
        <S.Form>
          <Controller
            control={control}
            name="nome"
            render={({ field: { value, onChange } }) => (
              <Label title="Nome">
                <Input
                  value={value}
                  onChangeText={onChange}
                  placeholder="Nome do cliente"
                  formError={errors.nome?.message}
                />
              </Label>
            )}
          />
          <S.InlineWrapper>
            <Controller
              control={control}
              name="cpf"
              render={({ field: { value, onChange } }) => (
                <Label title="CPF" style={{ flex: 1 }}>
                  <MaskInput
                    mask="999.999.999-99"
                    value={value}
                    onChangeText={onChange}
                    placeholder="999.999.999-99"
                    formError={errors.cpf?.message}
                    keyboardType="number-pad"
                  />
                </Label>
              )}
            />
            <Controller
              control={control}
              name="dataNascimento"
              render={({ field: { value, onChange } }) => (
                <Label title="Nascimento" style={{ flex: 1 }}>
                  <MaskInput
                    mask="99/99/9999"
                    value={value}
                    onChangeText={onChange}
                    placeholder="DD/MM/AAAA"
                    formError={errors.dataNascimento?.message}
                    keyboardType="number-pad"
                  />
                </Label>
              )}
            />
          </S.InlineWrapper>
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Label title="Email">
                <Input
                  value={value}
                  onChangeText={onChange}
                  placeholder="Email do cliente"
                  formError={errors.email?.message}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  returnKeyType="send"
                  onSubmitEditing={handleSubmit(onSubmit)}
                />
              </Label>
            )}
          />
        </S.Form>
        <S.LabelWrapper>
          <Label title="Dívidas" />
        </S.LabelWrapper>
        <S.EmptyDebtWrapper>
          <S.EmptyDebtText>Cliente não possui dívidas.</S.EmptyDebtText>
        </S.EmptyDebtWrapper>
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
