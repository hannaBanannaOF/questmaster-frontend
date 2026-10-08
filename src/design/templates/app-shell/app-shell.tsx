import type { PropsWithChildren, ReactNode } from 'react';

import styles from './app-shell.module.css';

interface AppShellProps extends PropsWithChildren {
  header: ReactNode;
}

/** Esqueleto de toda página: cabeçalho fixo no topo e conteúdo centralizado. */
export function AppShell({ header, children }: AppShellProps) {
  return (
    <>
      {header}
      <main className={styles.main}>{children}</main>
    </>
  );
}
