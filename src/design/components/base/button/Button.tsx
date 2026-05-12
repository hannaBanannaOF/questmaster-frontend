'use client';
import { ComponentProps, ReactNode } from 'react';

import * as S from './styles';
import { ButtonColor,ButtonVariant } from './types';

interface ButtonProps extends ComponentProps<'button'> {
  icon?: ReactNode;
  text: string | ReactNode;
  variant?: ButtonVariant;
  buttonColor?: ButtonColor;
  loading?: boolean;
}

export function Button(props: ButtonProps) {
  const {icon, text, variant, buttonColor, ...buttonProps} = props;
  return (
    <S.Button $variant={variant ?? 'default'} $color={buttonColor ?? 'primary'} $loading={props.loading} disabled={props.loading} {...buttonProps}>
      {props.loading ? <S.LoadingIcon /> : <>
        {icon}
        {text}
      </>}
    </S.Button>
  );
}
