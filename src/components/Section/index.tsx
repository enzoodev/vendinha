import { memo } from 'react';
import { ViewProps } from 'react-native';

import * as S from './styles';

type Props = ViewProps & {
  title: string;
  subtitle: string;
  isLoading?: boolean;
};

export const Section = memo(
  ({ title, subtitle, isLoading = false, ...rest }: Props) => {
    return (
      <S.Container {...rest}>
        <S.Title>{title}</S.Title>
        {isLoading ? (
          <S.SubtitleSkeleton />
        ) : (
          <S.Subtitle>{subtitle}</S.Subtitle>
        )}
      </S.Container>
    );
  },
);
