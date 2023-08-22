import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTheme } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import ArrowDown from '@assets/images/Arrowdown.svg';
import ArrowUp from '@assets/images/Arrowup.svg';
import DropdownSearch from '@assets/images/DropdownSearch.svg';

import * as S from './styles';

type Props = {
  value: 1 | 0 | null;
  onSelectOption: (id: number) => void;
};

export const Dropdown = memo(({ value, onSelectOption }: Props) => {
  const options = useMemo(
    () => [
      {
        id: 1,
        label: 'Pago',
      },
      {
        id: 0,
        label: 'Pendente',
      },
    ],
    [],
  );
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [searchText, setSearchText] = useState('');
  const [isShowOptions, setIsShowOptions] = useState(false);
  const theme = useTheme();

  const optionsHeight = useSharedValue(0);
  const optionsAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: optionsHeight.value,
    };
  });

  const handleToggleIsShowOptions = useCallback(() => {
    optionsHeight.value = isShowOptions
      ? withTiming(0, { duration: 250 })
      : withTiming(RFValue(130), { duration: 300 });

    setIsShowOptions(prevState => !prevState);
  }, [optionsHeight, isShowOptions]);

  const handleSelectOption = useCallback(
    (id: number) => {
      onSelectOption(id);
      handleToggleIsShowOptions();
    },
    [handleToggleIsShowOptions, onSelectOption],
  );

  const handleSearch = useCallback(
    (text: string) => {
      const filtered = options.filter(option =>
        option.label.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredOptions(filtered);
    },
    [options],
  );

  useEffect(() => {
    handleSearch(searchText);
  }, [handleSearch, searchText]);

  return (
    <S.Container>
      <S.Header onPress={handleToggleIsShowOptions}>
        <S.Title>
          {value === 1 && 'Pago'}
          {value === 0 && 'Pendente'}
          {value === null && 'Selecione uma situação'}
        </S.Title>
        {isShowOptions ? (
          <ArrowUp height={RFValue(18)} width={RFValue(18)} />
        ) : (
          <ArrowDown height={RFValue(18)} width={RFValue(18)} />
        )}
      </S.Header>
      <Animated.View style={optionsAnimatedStyle}>
        <S.Content
          style={
            isShowOptions && { borderWidth: RFValue(1), padding: RFValue(8) }
          }
        >
          <S.InputWrapper style={isShowOptions && { borderWidth: RFValue(1) }}>
            <S.Input
              value={searchText}
              onChangeText={text => {
                setSearchText(text);
                handleSearch(text);
              }}
              textAlignVertical="center"
              autoCorrect={false}
              placeholderTextColor={theme.colors.placeholder}
              selectionColor={theme.colors.placeholder}
            />
            {isShowOptions && (
              <DropdownSearch height={RFValue(18)} width={RFValue(18)} />
            )}
          </S.InputWrapper>
          {filteredOptions.map(item => (
            <S.Option key={item.id} onPress={() => handleSelectOption(item.id)}>
              <S.OptionText>{item.label}</S.OptionText>
            </S.Option>
          ))}
          {filteredOptions.length === 0 && (
            <S.EmptyText>Nenhuma opção encontrada.</S.EmptyText>
          )}
        </S.Content>
      </Animated.View>
    </S.Container>
  );
});
