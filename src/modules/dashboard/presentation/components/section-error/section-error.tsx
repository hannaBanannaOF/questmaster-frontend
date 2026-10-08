import { TriangleAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Card, IconBox, Stack, Text, Title } from '@/src/design';

import { RetryButton } from '../retry-button/retry-button';
import styles from './section-error.module.css';

/** Uma parte do dashboard falhou; o resto da página continua de pé. */
export function SectionError({ title }: { title: string }) {
  const t = useTranslations('common');

  return (
    <Card as="section" role="alert" className={styles.card}>
      <Stack direction="column" align="center">
        <IconBox size="lg" className={styles.icon}>
          <TriangleAlert size={32} />
        </IconBox>
        <Title order={3}>{title}</Title>
        <Text tone="muted">{t('errors.unexpected')}</Text>
        <RetryButton label={t('actions.retry')} />
      </Stack>
    </Card>
  );
}
