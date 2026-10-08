import type { PropsWithChildren } from 'react';

import styles from './quote.module.css';

export function Quote({ children }: PropsWithChildren) {
  return <blockquote className={styles.quote}>{children}</blockquote>;
}
