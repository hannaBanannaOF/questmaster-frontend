'use client';
import { ReactNode } from 'react';

import * as S from './text.styles';

export default function Text({
  muted,
  small,
  children,
}: {
  muted?: boolean;
  small?: boolean;
  children?: ReactNode;
}) {
  return (
    <S.Text $muted={muted} $small={small}>
      {children}
    </S.Text>
  );
}
