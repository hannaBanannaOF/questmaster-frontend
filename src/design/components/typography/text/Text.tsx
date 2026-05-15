'use client';
import { PropsWithChildren } from 'react';

import * as S from './styles';
import { TextVariant } from './types';

interface TextProps extends PropsWithChildren {
  variant?: TextVariant;
  small?: boolean;
  uppercase?: boolean;
}

export const Text: React.FC<TextProps> = ({
  variant,
  small,
  uppercase,
  children,
}) => {
  return (
    <S.Text $variant={variant} $small={small} $uppercase={uppercase}>
      {children}
    </S.Text>
  );
};
