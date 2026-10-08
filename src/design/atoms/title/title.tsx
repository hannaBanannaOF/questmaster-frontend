import type { PropsWithChildren } from 'react';

import styles from './title.module.css';

export type TitleOrder = 1 | 2 | 3 | 4 | 5 | 6;
export type TitleTone = 'default' | 'contrast';

interface TitleProps extends PropsWithChildren {
  order?: TitleOrder;
  tone?: TitleTone;
  id?: string;
}

export function Title({
  order = 1,
  tone = 'default',
  id,
  children,
}: TitleProps) {
  const Tag = `h${order}` as const;
  return (
    <Tag id={id} className={styles.title} data-tone={tone}>
      {children}
    </Tag>
  );
}
