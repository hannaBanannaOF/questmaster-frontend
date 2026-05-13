'use client';
import { PropsWithChildren } from 'react';

import * as S from './styles';
import { ContainerAlign, ContainerDirection, ContainerJustify } from './types';

interface ContainerProps extends PropsWithChildren {
  direction?: ContainerDirection;
  align?: ContainerAlign;
  justify?: ContainerJustify;
  compact?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  direction,
  align,
  justify,
  compact,
  children,
}) => {
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
};
