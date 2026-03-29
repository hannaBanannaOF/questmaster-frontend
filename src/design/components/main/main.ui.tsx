'use client';
import { ReactNode } from 'react';

import * as S from './main.styles';

export default function Main({ children }: { children: ReactNode }) {
  return <S.Main>{children}</S.Main>;
}
