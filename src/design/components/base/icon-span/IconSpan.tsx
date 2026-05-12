import { ReactNode } from 'react';

import * as S from './styles';

interface IconSpanProps {
  icon: ReactNode;
  data: string | number;
  color?: string;
}

export function IconSpan(props: IconSpanProps) {
  return (
    <S.IconSpan $color={props.color}>
      {props.icon}
      {props.data}
    </S.IconSpan>
  );
}
