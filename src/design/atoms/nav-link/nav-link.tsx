'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './nav-link.module.css';

interface NavLinkProps {
  href: string;
  label: string;
  /** Só fica ativo na rota exata (útil para "/"). */
  exact?: boolean;
}

// Client só para ler a rota atual; o resto da navegação é server-rendered
export function NavLink({ href, label, exact }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = exact
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={styles.navLink}
      aria-current={isActive ? 'page' : undefined}
    >
      {label}
    </Link>
  );
}
