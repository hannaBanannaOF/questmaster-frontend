'use client';
import { ReactNode } from 'react';

import * as S from './list.styles';

export default function List({ children }: { children: ReactNode }) {
  return <S.List>{children}</S.List>;
}
