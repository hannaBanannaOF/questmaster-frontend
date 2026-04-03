'use client';
import { ReactNode } from 'react';

import * as S from './card.styles';

export default function Card({
  hover,
  children,
}: {
  hover?: boolean;
  children?: ReactNode;
}) {
  return <S.Card $hover={hover ?? true}>{children}</S.Card>;
}
