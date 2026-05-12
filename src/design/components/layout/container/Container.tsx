'use client';
import { PropsWithChildren } from 'react';

import * as S from './styles';
import { ContainerAlign,ContainerDirection, ContainerJustify } from './types';

interface ContainerProps extends PropsWithChildren {
  direction?: ContainerDirection;
  align?: ContainerAlign;
  justify?: ContainerJustify;
  compact?: boolean;
}

export function Container(props: ContainerProps) {
  return (
    <S.Container
      $compact={props.compact}
      $align={props.align}
      $direction={props.direction}
      $justify={props.justify}
    >
      {props.children}
    </S.Container>
  );
}
