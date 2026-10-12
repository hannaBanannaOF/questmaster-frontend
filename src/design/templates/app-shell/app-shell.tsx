import type { PropsWithChildren, ReactNode } from 'react';

import styles from './app-shell.module.css';

interface AppShellProps extends PropsWithChildren {
  header: ReactNode;
  /** Navegação fixa no rodapé, só no celular (abaixo de 48rem). */
  bottomNav?: ReactNode;
}

/** Esqueleto de toda página: cabeçalho no topo, conteúdo centralizado e, no celular, a barra inferior. */
export function AppShell({ header, bottomNav, children }: AppShellProps) {
  return (
    <>
      {header}
      <main
        className={styles.main}
        data-bottom-nav={bottomNav ? '' : undefined}
      >
        {children}
      </main>
      {bottomNav && <div className={styles.bottomNav}>{bottomNav}</div>}
    </>
  );
}
