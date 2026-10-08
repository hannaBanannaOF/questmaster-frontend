import type { ReactNode } from 'react';

import { Stack } from '../../atoms/stack/stack';

interface ListPageProps {
  header: ReactNode;
  children: ReactNode;
}

/** Página de listagem: cabeçalho com ações e a lista (ou estado vazio). */
export function ListPage({ header, children }: ListPageProps) {
  return (
    <Stack direction="column" align="stretch">
      {header}
      {children}
    </Stack>
  );
}
