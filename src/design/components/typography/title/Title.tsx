'use client';
import { PropsWithChildren } from 'react';

import * as S from './styles';
import { TitleOrder } from './types';

interface TitleProps extends PropsWithChildren {
  order?: TitleOrder;
}

export function Title(props: TitleProps) {
  return <S.Title as={`h${props.order ?? 1}`}>{props.children}</S.Title>;
}
