import { memo } from 'react';
import { MaskedTextInputProps } from 'react-native-mask-text';
import { useTheme } from 'styled-components/native';

import * as S from './styles';

type Props = MaskedTextInputProps & {
  value: string;
  placeholder: string;
  formError?: string;
};

export const MaskInput = memo(
  ({ value, placeholder, formError, ...rest }: Props) => {
    const theme = useTheme();

    return (
      <S.Wrapper>
        <S.Input
          textValue={value}
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
