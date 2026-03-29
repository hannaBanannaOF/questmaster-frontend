'use client';
import { ReactNode } from 'react';

import * as S from './nav.styles';

export default function Nav({ children }: { children?: ReactNode }) {
  return <S.Nav>{children}</S.Nav>;
}
