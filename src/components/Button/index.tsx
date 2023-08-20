import { memo } from 'react';
import { ActivityIndicator, TouchableHighlightProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { shade } from 'polished';

import * as S from './styles';

interface Props extends TouchableHighlightProps {
  title: string;
  onPress: () => void;
  color?: string;
  bgColor?: string;
  borderColor?: string;
  isLoading?: boolean;
}

export const Button = memo(
  ({
    title,
    color,
    bgColor,
    onPress,
    borderColor,
    isLoading = false,
    disabled,
    ...rest
  }: Props) => {
    const theme = useTheme();

    return (
      <S.Container
        testID="button-id"
        underlayColor={shade(0.2, bgColor || theme.colors.background)}
        onPress={onPress}
        bgColor={bgColor}
        borderColor={borderColor}
        disabled={disabled || isLoading}
        {...rest}
      >
        {isLoading ? (
          <ActivityIndicator
            color={color || theme.colors.cardPrimary}
            style={{
              paddingVertical: RFValue(1),
              paddingHorizontal: RFValue(16),
            }}
          />
        ) : (
          <S.Title color={color} testID="title-id">
            {title}
          </S.Title>
        )}
      </S.Container>
    );
  },
);
