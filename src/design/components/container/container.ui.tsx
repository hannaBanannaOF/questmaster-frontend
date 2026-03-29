'use client';
import { ReactNode } from 'react';

import * as S from './container.styles';

export default function Container({
  direction,
  align,
  justify,
  compact,
  children,
}: {
  direction?: 'row' | 'column';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'space-around' | 'space-between';
  compact?: boolean;
  children?: ReactNode;
}) {
  return (
    <S.Container
      $compact={compact}
      $align={align}
      $direction={direction}
      $justify={justify}
    >
      {children}
    </S.Container>
  );
}
