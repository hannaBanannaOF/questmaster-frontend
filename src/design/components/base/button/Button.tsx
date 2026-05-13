'use client';
import { ComponentProps, ReactNode } from 'react';

import * as S from './styles';
import { ButtonColor, ButtonVariant } from './types';

interface ButtonProps extends ComponentProps<'button'> {
  icon?: ReactNode;
  text: string | ReactNode;
  variant?: ButtonVariant;
  buttonColor?: ButtonColor;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  icon,
  text,
  variant,
  buttonColor,
  loading,
  ...buttonProps
}) => {
  return (
    <S.Button
      $variant={variant ?? 'default'}
      $color={buttonColor ?? 'primary'}
      $loading={loading}
      disabled={loading}
      {...buttonProps}
    >
      {loading ? (
        <S.LoadingIcon />
      ) : (
        <>
          {icon}
          {text}
        </>
      )}
    </S.Button>
  );
};
