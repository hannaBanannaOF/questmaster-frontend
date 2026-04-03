'use client';
import { useTranslations } from 'next-intl';

import { Container, Skeleton, Text } from '@/src/design/design-system';

import { useUserInfo } from './user.hooks';

export function UserTag() {
  const t = useTranslations('common.user');
  const { data, isFetching } = useUserInfo();

  return (
    <Container>
      <Skeleton loading={isFetching}>
        <Text muted>
          {data?.name || data?.username
            ? t('greeting', { name: data?.name ?? data?.username })
            : t('greeting_default')}
        </Text>
      </Skeleton>
    </Container>
  );
}
