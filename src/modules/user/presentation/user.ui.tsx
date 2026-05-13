'use client';
import { useTranslations } from 'next-intl';

import { Container, Skeleton, Text } from '@/src/design';

import { useUserInfo } from './user.hooks';

export function UserTag() {
  const t = useTranslations('common.user');
  const { data, isPending } = useUserInfo();

  return (
    <Container>
      <Skeleton loading={isPending}>
        <Text variant="muted">
          {data?.name || data?.username
            ? t('greeting', { name: data?.name ?? data?.username })
            : t('greeting_default')}
        </Text>
      </Skeleton>
    </Container>
  );
}
