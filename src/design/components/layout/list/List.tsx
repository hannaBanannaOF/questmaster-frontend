'use client';
import React, { PropsWithChildren } from 'react';

import * as S from './styles';

export const List: React.FC<PropsWithChildren> = ({ children }) => {
  return <S.List>{children}</S.List>;
};
