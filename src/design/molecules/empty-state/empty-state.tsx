import type { ReactNode } from 'react';

import { IconBox } from '../../atoms/icon-box/icon-box';
import { Stack } from '../../atoms/stack/stack';
import { Text } from '../../atoms/text/text';
import { Title } from '../../atoms/title/title';
import styles from './empty-state.module.css';

interface EmptyStateProps {
  title: string;
  message?: string;
  icon?: ReactNode;
  /** Ação principal, normalmente um botão ou link. */
  action?: ReactNode;
}

export function EmptyState({ title, message, icon, action }: EmptyStateProps) {
  return (
    <Stack direction="column" align="center" className={styles.emptyState}>
      {icon && (
        <IconBox tone="primary" size="lg">
          {icon}
        </IconBox>
      )}
      <Title order={2}>{title}</Title>
      {message && <Text tone="muted">{message}</Text>}
      {action}
    </Stack>
  );
}
