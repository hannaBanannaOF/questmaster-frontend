'use client';
import { ReactNode } from 'react';

import * as S from './card.styles';

export default function Card({ children }: { children?: ReactNode }) {
  return <S.Card>{children}</S.Card>;
}
