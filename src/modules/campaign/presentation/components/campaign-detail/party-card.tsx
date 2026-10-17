import Link from 'next/link';
import type { ReactNode } from 'react';

import { Avatar, Surface } from '@/src/design';

import styles from './campaign-detail.module.css';

interface PartyCardProps {
  name: string;
  /** Sem slug o core ainda não publicou o link da ficha: o card não navega. */
  href?: string;
  /** Linha de baixo: "de Marina", "Sua ficha" ou "Ninguém escolheu ainda". */
  footer?: ReactNode;
  /** Menu "⋯", fora do link esticado (botão dentro de link quebra o teclado). */
  menu?: ReactNode;
}

/** Card de ficha na campanha: iniciais e nome; sem sistema (é o da campanha) nem PV. */
export function PartyCard({ name, href, footer, menu }: PartyCardProps) {
  return (
    <Surface
      as="article"
      className={styles.member}
      data-menu={menu ? '' : undefined}
    >
      {menu && <div className={styles.menu}>{menu}</div>}
      <div className={styles.who}>
        <Avatar name={name} size="lg" ring />
        <h3 className={styles.memberName}>
          {href ? (
            <Link href={href} className={styles.stretched}>
              {name}
            </Link>
          ) : (
            name
          )}
        </h3>
      </div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </Surface>
  );
}
