'use client';
import { ReactNode } from 'react';

import * as S from './button.styles';

export default function Button({
  icon,
  text,
  onClick,
}: {
  icon?: ReactNode;
  text: string | ReactNode;
  onClick?: () => void;
}) {
  return (
    <S.Button onClick={onClick}>
      {icon}
      {text}
    </S.Button>
  );
}
