'use client';
import { PropsWithChildren } from 'react';

import * as S from './styles';

export function Main(props: PropsWithChildren) {
  return <S.Main>{props.children}</S.Main>;
}
