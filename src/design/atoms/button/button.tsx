import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

import { cx } from '../../utils';
import { Spinner } from '../spinner/spinner';
import styles from './button.module.css';

// solid/outline/muted/text: telas legadas. primary/secondary/tertiary/ghost: HeroUI v3
export type ButtonVariant =
  | 'solid'
  | 'outline'
  | 'muted'
  | 'text'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'ghost'
  | 'danger'
  | 'danger-soft';
export type ButtonColor = 'primary' | 'danger';
export type ButtonSize = 'md' | 'lg';

interface ButtonStyleProps {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  icon?: ReactNode;
  /** Abaixo de 48rem mostra só o ícone; o texto continua como nome acessível. */
  compactLabel?: boolean;
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
  compactLabel,
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
      <Label compact={compactLabel}>{children}</Label>
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
  compactLabel,
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
      <Label compact={compactLabel}>{children}</Label>
    </Link>
  );
}

function Label({
  compact,
  children,
}: {
  compact?: boolean;
  children: ReactNode;
}) {
  return compact ? (
    <span className={styles.compactLabel}>{children}</span>
  ) : (
    children
  );
}
