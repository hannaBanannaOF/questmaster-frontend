'use client';
import { PropsWithChildren } from 'react';

import * as S from './styles';
import { TextVariant } from './types';

interface TextProps extends PropsWithChildren {
  variant?: TextVariant;
  small?: boolean;
}

export function Text(props: TextProps) {
  return (
    <S.Text $variant={props.variant} $small={props.small}>
      {props.children}
    </S.Text>
  );
}
