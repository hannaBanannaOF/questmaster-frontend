import type { ReactNode } from 'react';

import { Stack } from '../../atoms/stack/stack';
import { Title } from '../../atoms/title/title';

interface PageHeaderProps {
  title: string;
  actions?: ReactNode;
}

/** Título da página com as ações principais alinhadas à direita. */
export function PageHeader({ title, actions }: PageHeaderProps) {
  return (
    <Stack as="header" align="center" justify="space-between" wrap>
      <Title order={2}>{title}</Title>
      {actions}
    </Stack>
  );
}
