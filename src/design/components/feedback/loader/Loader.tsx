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

export function Loader(props: LoaderProps) {
  return (
    <S.Wrapper>
      <S.IconWrapper>
        <Dices
          size={props.size === 'sm' ? 21 : props.size === 'lg' ? 84 : 42}
          display="flex"
        />
      </S.IconWrapper>

      {props.message &&
        (typeof props.message === 'string' ? <Text variant='muted'>{props.message}</Text> : props.message)}
    </S.Wrapper>
  );
}
