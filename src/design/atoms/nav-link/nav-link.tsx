'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import styles from './nav-link.module.css';

export type NavLinkVariant = 'inline' | 'bottom';

interface NavLinkProps {
  href: string;
  label: string;
  /** Ícone decorativo, ao lado do rótulo ou sobre ele na variante `bottom`. */
  icon?: ReactNode;
  /** Só fica ativo na rota exata (útil para "/"). */
  exact?: boolean;
  variant?: NavLinkVariant;
}

// Client só para ler a rota atual; o resto da navegação é server-rendered
export function NavLink({
  href,
  label,
  icon,
  exact,
  variant = 'inline',
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = exact
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={styles.navLink}
      data-variant={variant}
      aria-current={isActive ? 'page' : undefined}
    >
      {icon && (
        <span className={styles.icon} aria-hidden>
          {icon}
        </span>
      )}
      {label}
    </Link>
  );
}
