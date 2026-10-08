import { Dices } from 'lucide-react';

import { Text } from '../../atoms/text/text';
import styles from './loader.module.css';

const ICON_SIZES = { sm: 21, md: 42, lg: 84 } as const;

interface LoaderProps {
  size?: keyof typeof ICON_SIZES;
  message?: string;
}

export function Loader({ size = 'md', message }: LoaderProps) {
  return (
    <div className={styles.loader} role="status" aria-live="polite">
      <span className={styles.icon} aria-hidden>
        <Dices size={ICON_SIZES[size]} />
      </span>
      {message && <Text tone="muted">{message}</Text>}
    </div>
  );
}
