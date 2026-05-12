'use client';
import { ComponentProps, PropsWithChildren } from 'react';

import * as S from './styles';

interface CardProps extends ComponentProps<'div'>, PropsWithChildren {
  hover?: boolean;
  hero?: boolean;
  compact?: boolean;
}

export function Card(props: CardProps) {
  return (
    <S.Card $hover={props.hover ?? true} $hero={props.hero} $compact={props.compact}>
      {props.children}
    </S.Card>
  );
}
