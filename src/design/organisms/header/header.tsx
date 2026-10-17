import type { ReactNode } from 'react';

import styles from './header.module.css';

interface HeaderProps {
  brand: ReactNode;
  /** Navegação do cabeçalho; no celular ela vai para a barra inferior. */
  nav?: ReactNode;
}

export function Header({ brand, nav }: HeaderProps) {
  return (
    <header className={styles.header}>
      {brand}
      {nav && <div className={styles.nav}>{nav}</div>}
    </header>
  );
}
