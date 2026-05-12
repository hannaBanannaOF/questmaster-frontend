'use client';
import { usePathname } from 'next/navigation';

import * as S from './styles';

interface NavItemProps {
  label: string;
  href: string;
  notActive?: boolean;
}


export function NavItem(props: NavItemProps) {
  const pathname = usePathname();

  const isActive = pathname === props.href || pathname.startsWith(`${props.href}/`);
  return (
    <S.NavItem
      href={props.href}
      $active={!props.notActive && isActive}
      aria-current={isActive ? 'page' : undefined}
    >
      {props.label}
    </S.NavItem>
  );
}