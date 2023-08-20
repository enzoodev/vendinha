import { memo, useEffect } from 'react';
import { ViewProps } from 'react-native';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';

import * as S from './styles';

export const Skeleton = memo(({ style, ...rest }: ViewProps) => {
  const boxOpacity = useSharedValue(1);

  useEffect(() => {
    boxOpacity.value = withRepeat(
      withSequence(
        withTiming(0.5, {
          duration: 1000,
          easing: Easing.bezier(0.4, 0, 0.6, 1),
        }),
        withTiming(1, {
          duration: 1000,
          easing: Easing.bezier(0.4, 0, 0.6, 1),
        }),
      ),
      -1,
      true,
    );
  }, [boxOpacity]);

  const boxStyle = useAnimatedStyle(() => {
    return {
      opacity: boxOpacity.value,
    };
  });

  return <S.Container style={[boxStyle, style]} {...rest} />;
});
