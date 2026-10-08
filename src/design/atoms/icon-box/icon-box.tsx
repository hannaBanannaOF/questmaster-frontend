import type { PropsWithChildren } from 'react';

import { cx } from '../../utils';
import styles from './icon-box.module.css';

interface IconBoxProps extends PropsWithChildren {
  tone?: 'primary' | 'surface';
  shape?: 'rounded' | 'circle';
  size?: 'sm' | 'md' | 'lg';
  /** Permite que o consumidor sobrescreva a cor do ícone. */
  className?: string;
}

/** Fundo suave atrás de um ícone (marcas, estados vazios, sistemas de jogo). */
export function IconBox({
  tone = 'primary',
  shape = 'rounded',
  size = 'md',
  className,
  children,
}: IconBoxProps) {
  return (
    <span
      className={cx(styles.iconBox, className)}
      data-tone={tone}
      data-shape={shape}
      data-size={size}
      aria-hidden
    >
      {children}
    </span>
  );
}
