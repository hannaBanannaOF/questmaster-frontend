import type { ReactNode } from 'react';

import { NavLink, type NavLinkVariant } from '../../atoms/nav-link/nav-link';
import styles from './nav.module.css';

export interface NavItem {
  href: string;
  label: string;
  /** Ícone decorativo; aparece na barra inferior do celular. */
  icon?: ReactNode;
  exact?: boolean;
}

interface NavProps {
  items: NavItem[];
  /** Nome acessível da navegação (já traduzido). */
  label: string;
  /** `inline` no cabeçalho; `bottom` na barra inferior do celular. */
  variant?: NavLinkVariant;
}

export function Nav({ items, label, variant = 'inline' }: NavProps) {
  return (
    <nav aria-label={label}>
      <ul className={styles.list} data-variant={variant}>
        {items.map((item) => (
          <li key={item.href}>
            <NavLink
              href={item.href}
              label={item.label}
              icon={item.icon}
              exact={item.exact}
              variant={variant}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
