import type { ComponentProps } from 'react';

import styles from './list.module.css';

/** Lista vertical sem marcadores; os filhos devem ser <ListItem>. */
export function List(props: ComponentProps<'ul'>) {
  return <ul className={styles.list} {...props} />;
}

export function ListItem(props: ComponentProps<'li'>) {
  return <li {...props} />;
}
