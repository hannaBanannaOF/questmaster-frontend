import type { ReactNode } from 'react';

import { Card, IconBox, Stack, Text, Title } from '@/src/design';

import styles from './role-empty-state.module.css';

interface RoleEmptyStateProps {
  icon: ReactNode;
  title: string;
  message: string;
  stepsLabel: string;
  steps: ReactNode[];
  action: ReactNode;
}

/** Aba sem conteúdo: convida a começar e mostra o caminho em passos. */
export function RoleEmptyState({
  icon,
  title,
  message,
  stepsLabel,
  steps,
  action,
}: RoleEmptyStateProps) {
  return (
    <Card as="section" hero className={styles.card}>
      <Stack direction="column" align="center">
        <IconBox size="lg">{icon}</IconBox>
        <Title order={2}>{title}</Title>
        <Text tone="muted" className={styles.message}>
          {message}
        </Text>
        <ol className={styles.steps} aria-label={stepsLabel}>
          {steps.map((step, index) => (
            <li key={index} className={styles.step}>
              <span className={styles.number} aria-hidden>
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        {action}
      </Stack>
    </Card>
  );
}
