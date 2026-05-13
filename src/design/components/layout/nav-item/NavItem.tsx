'use client';
import { usePathname } from 'next/navigation';

import * as S from './styles';

interface NavItemProps {
  label: string;
  href: string;
  notActive?: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({ label, href, notActive }) => {
  const pathname = usePathname();

  const isActive = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <S.NavItem
      href={href}
      $active={!notActive && isActive}
      aria-current={isActive ? 'page' : undefined}
    >
      {label}
    </S.NavItem>
  );
};
