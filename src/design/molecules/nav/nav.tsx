import { NavLink } from '../../atoms/nav-link/nav-link';
import styles from './nav.module.css';

export interface NavItem {
  href: string;
  label: string;
  exact?: boolean;
}

interface NavProps {
  items: NavItem[];
  /** Nome acessível da navegação (já traduzido). */
  label: string;
}

export function Nav({ items, label }: NavProps) {
  return (
    <nav aria-label={label}>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.href}>
            <NavLink href={item.href} label={item.label} exact={item.exact} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
