'use client';
import { PropsWithChildren } from 'react';

import * as S from './styles';
import { TitleOrder } from './types';

interface TitleProps extends PropsWithChildren {
  order?: TitleOrder;
}

export const Title: React.FC<TitleProps> = ({ order = 1, children }) => {
  return <S.Title as={`h${order}`}>{children}</S.Title>;
};
