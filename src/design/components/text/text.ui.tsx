'use client';
import { ReactNode } from 'react';

import * as S from './text.styles';

export default function Text({
  muted,
  children,
}: {
  muted?: boolean;
  children?: ReactNode;
}) {
  return <S.Text $muted={muted}>{children}</S.Text>;
}
