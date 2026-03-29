'use client';
import { ReactNode } from 'react';

import * as S from './title.styles';

export default function Title({
  order,
  children,
}: {
  order?: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
}) {
  return <S.Title as={`h${order ?? 1}`}>{children}</S.Title>;
}
