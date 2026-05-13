'use client';
import { PropsWithChildren } from 'react';

import * as S from './styles';
import { TextVariant } from './types';

interface TextProps extends PropsWithChildren {
  variant?: TextVariant;
  small?: boolean;
}

export const Text: React.FC<TextProps> = ({ variant, small, children }) => {
  return (
    <S.Text $variant={variant} $small={small}>
      {children}
    </S.Text>
  );
};
