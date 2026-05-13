import { PropsWithChildren } from 'react';

import * as S from './styles';

export const Quote: React.FC<PropsWithChildren> = ({ children }) => {
  return <S.StyledQuote>{children}</S.StyledQuote>;
};
