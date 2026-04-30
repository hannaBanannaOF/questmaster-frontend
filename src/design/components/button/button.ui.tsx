'use client';
import { ReactNode } from 'react';

import * as S from './button.styles';

export default function Button({
  icon,
  text,
  variant,
  onClick,
}: {
  icon?: ReactNode;
  text: string | ReactNode;
  variant?: 'muted' | 'outline';
  onClick?: () => void;
}) {
  return (
    <S.Button onClick={onClick} $variant={variant ?? 'default'}>
      {icon}
      {text}
    </S.Button>
  );
}
