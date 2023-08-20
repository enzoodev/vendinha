import { memo } from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';

import * as S from './styles';

type Props = TextInputProps & {
  value: string;
  placeholder: string;
  formError?: string;
};

export const Input = memo(
  ({ value, placeholder, formError, ...rest }: Props) => {
    const theme = useTheme();

    return (
      <S.Wrapper>
        <S.Input
          value={value}
          placeholder={placeholder}
          textAlignVertical="center"
          autoCorrect={false}
          placeholderTextColor={theme.colors.placeholder}
          selectionColor={theme.colors.placeholder}
          {...rest}
        />
        {!!formError && <S.FormError>{formError}</S.FormError>}
      </S.Wrapper>
    );
  },
);
