'use client';
import { PropsWithChildren } from 'react';

import * as S from './nav.styles';

export function Nav(props: PropsWithChildren) {
  return <S.Nav>{props.children}</S.Nav>;
}

