import { ReactNode } from 'react';

import * as S from './icon-span.styles';

export default function IconSpan({
  icon,
  data,
  color,
}: {
  icon: ReactNode;
  data: string | number;
  color?: string;
}) {
  return (
    <S.IconSpan $color={color}>
      {icon}
      {data}
    </S.IconSpan>
  );
}
