'use client';
import { ReactNode } from 'react';

import * as S from './card.styles';

export default function Card({
  hover,
  hero,
  children,
}: {
  hover?: boolean;
  hero?: boolean;
  children?: ReactNode;
}) {
  return (
    <S.Card $hover={hover ?? true} $hero={hero}>
      {children}
    </S.Card>
  );
}
