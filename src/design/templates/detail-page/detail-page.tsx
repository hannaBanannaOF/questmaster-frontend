import type { ReactNode } from 'react';

import { Stack } from '../../atoms/stack/stack';

interface DetailPageProps {
  breadcrumb: ReactNode;
  /** Card principal com os dados da entidade. */
  hero: ReactNode;
  children?: ReactNode;
}

/** Página de detalhe: trilha de navegação, card principal e seções extras. */
export function DetailPage({ breadcrumb, hero, children }: DetailPageProps) {
  return (
    <Stack direction="column" align="stretch">
      {breadcrumb}
      {hero}
      {children}
    </Stack>
  );
}
