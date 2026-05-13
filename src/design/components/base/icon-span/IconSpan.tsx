import { ReactNode } from 'react';

import * as S from './styles';

interface IconSpanProps {
  icon: ReactNode;
  data: string | number;
  color?: string;
}

export const IconSpan: React.FC<IconSpanProps> = ({ icon, data, color }) => {
  return (
    <S.IconSpan $color={color}>
      {icon}
      {data}
    </S.IconSpan>
  );
};
