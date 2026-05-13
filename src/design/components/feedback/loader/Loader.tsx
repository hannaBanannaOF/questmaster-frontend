'use client';
import { Dices } from 'lucide-react';
import { ReactNode } from 'react';

import { Text } from '../../typography/text/Text';
import * as S from './styles';
import { LoaderSize } from './types';

interface LoaderProps {
  size?: LoaderSize;
  message?: string | ReactNode;
}

export const Loader: React.FC<LoaderProps> = ({ size, message }) => {
  return (
    <S.Wrapper>
      <S.IconWrapper>
        <Dices
          size={size === 'sm' ? 21 : size === 'lg' ? 84 : 42}
          display="flex"
        />
      </S.IconWrapper>

      {message &&
        (typeof message === 'string' ? (
          <Text variant="muted">{message}</Text>
        ) : (
          message
        ))}
    </S.Wrapper>
  );
};
