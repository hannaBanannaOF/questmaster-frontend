'use client';
import { PropsWithChildren } from 'react';

import * as S from './styles';

export const Main: React.FC<PropsWithChildren> = ({ children }) => {
  return <S.Main>{children}</S.Main>;
};
