'use client';
import { PropsWithChildren } from 'react';

import * as S from './styles';
import { TitleOrder, TitleVariant } from './types';

interface TitleProps extends PropsWithChildren {
  order?: TitleOrder;
  variant?: TitleVariant;
}

export const Title: React.FC<TitleProps> = ({
  order = 1,
  variant = 'default',
  children,
}) => {
  return (
    <S.Title as={`h${order}`} $variant={variant}>
      {children}
    </S.Title>
  );
};
