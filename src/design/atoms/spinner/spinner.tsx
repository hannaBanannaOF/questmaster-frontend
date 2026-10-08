import { LoaderCircle } from 'lucide-react';

import styles from './spinner.module.css';

interface SpinnerProps {
  size?: number;
  /** Texto para leitores de tela; sem ele o spinner é decorativo. */
  label?: string;
}

export function Spinner({ size = 16, label }: SpinnerProps) {
  return (
    <LoaderCircle
      size={size}
      className={styles.spinner}
      role={label ? 'status' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}
