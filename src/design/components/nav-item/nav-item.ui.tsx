'use client';
import { usePathname } from 'next/navigation';

import * as S from './nav-item.styles';

export default function NavItem({
  label,
  href,
  notActive,
}: {
  label: string;
  href: string;
  notActive?: boolean;
}) {
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
}
