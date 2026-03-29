'use client';
import { ReactNode } from 'react';

import * as S from './header.styles';

export default function Header({
  brand,
  children,
}: {
  brand?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <S.Header>
      {brand}
      {children}
    </S.Header>
  );
}
