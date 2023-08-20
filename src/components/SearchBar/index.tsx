import { memo, useCallback, useState } from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';

import { RFValue } from 'react-native-responsive-fontsize';
import SearchIcon from '@assets/images/Search.svg';

import * as S from './styles';

export const SearchBar = memo(({ ...props }: TextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const theme = useTheme();

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <S.Container isFocused={isFocused}>
      <S.Content
        {...props}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        selectionColor={theme.colors.search}
        placeholderTextColor={theme.colors.search}
        autoCapitalize="none"
      />
      <SearchIcon height={RFValue(18)} width={RFValue(18)} />
    </S.Container>
  );
});
