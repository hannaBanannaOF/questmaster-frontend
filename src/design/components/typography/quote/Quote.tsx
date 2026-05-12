import { PropsWithChildren } from 'react';

import * as S from './styles';

export function Quote(props: PropsWithChildren) {
  return <S.StyledQuote>{props.children}</S.StyledQuote>;
}
