'use client';
import { Dices } from 'lucide-react';
import { ReactNode } from 'react';

import Text from '../text/text.ui';
import * as S from './loader.styles';

export default function Loader({
  size,
  message,
}: {
  size?: 'sm' | 'md' | 'lg';
  message?: string | ReactNode;
}) {
  return (
    <S.Wrapper>
      <S.IconWrapper>
        <Dices
          size={size === 'sm' ? 21 : size === 'lg' ? 84 : 42}
          display="flex"
        />
      </S.IconWrapper>

      {message &&
        (typeof message === 'string' ? <Text muted>{message}</Text> : message)}
    </S.Wrapper>
  );
}
