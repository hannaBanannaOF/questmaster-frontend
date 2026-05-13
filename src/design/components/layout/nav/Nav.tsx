'use client';
import { PropsWithChildren } from 'react';

import * as S from './nav.styles';

export const Nav: React.FC<PropsWithChildren> = ({ children }) => {
  return <S.Nav>{children}</S.Nav>;
};
