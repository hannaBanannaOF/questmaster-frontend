import type { ReactNode } from 'react';

import styles from './header.module.css';

interface HeaderProps {
  brand: ReactNode;
  nav?: ReactNode;
  /** Área à direita (usuário logado, ações globais). */
  actions?: ReactNode;
}

export function Header({ brand, nav, actions }: HeaderProps) {
  return (
    <header className={styles.header}>
      {brand}
      {nav}
      {actions}
    </header>
  );
}
