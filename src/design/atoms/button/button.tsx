import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

import { cx } from '../../utils';
import { Spinner } from '../spinner/spinner';
import styles from './button.module.css';

export type ButtonVariant = 'solid' | 'outline' | 'muted' | 'text';
export type ButtonColor = 'primary' | 'danger';
export type ButtonSize = 'md' | 'lg';

interface ButtonStyleProps {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  icon?: ReactNode;
}

export interface ButtonProps
  extends Omit<ComponentProps<'button'>, 'color'>, ButtonStyleProps {
  loading?: boolean;
}

export function Button({
  variant = 'solid',
  color = 'primary',
  size = 'md',
  icon,
  loading,
  disabled,
  type = 'button',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cx(styles.button, className)}
      data-variant={variant}
      data-color={color}
      data-size={size}
      data-loading={loading || undefined}
      data-icon-only={(!children && !!icon) || undefined}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Spinner size={16} /> : icon}
      {children}
    </button>
  );
}

export type ButtonLinkProps = ComponentProps<typeof Link> & ButtonStyleProps;

/** Link de navegação com a aparência de botão. */
export function ButtonLink({
  variant = 'solid',
  color = 'primary',
  size = 'md',
  icon,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cx(styles.button, className)}
      data-variant={variant}
      data-color={color}
      data-size={size}
      {...props}
    >
      {icon}
      {children}
    </Link>
  );
}
