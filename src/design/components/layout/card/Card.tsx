'use client';
import { ComponentProps, PropsWithChildren } from 'react';

import * as S from './styles';

interface CardProps extends ComponentProps<'div'>, PropsWithChildren {
  hover?: boolean;
  hero?: boolean;
  compact?: boolean;
}

export const Card: React.FC<CardProps> = ({
  hover = false,
  hero,
  compact,
  children,
}) => {
  return (
    <S.Card $hover={hover} $hero={hero} $compact={compact}>
      {children}
    </S.Card>
  );
};
