'use client';
import { PropsWithChildren } from 'react';

import * as S from './styles';

export function List(props: PropsWithChildren) {
  return <S.List>{props.children}</S.List>;
}
