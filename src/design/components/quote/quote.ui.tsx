import { ReactNode } from 'react';

import * as S from './quote.styles';

export default function Quote({ children }: { children?: ReactNode }) {
  return <S.StyledQuote>{children}</S.StyledQuote>;
}
