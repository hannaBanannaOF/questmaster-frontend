import { getTranslations } from 'next-intl/server';

import { Skeleton, Text } from '@/src/design';

import { getDisplayName } from '../../../domain';
import { getCurrentUserOrNull } from '../../user.loaders';
import { UserBadge } from '../user-badge/user-badge';

export async function UserGreeting() {
  const [user, t] = await Promise.all([
    getCurrentUserOrNull(),
    getTranslations('common.user'),
  ]);

  return user ? (
    <UserBadge name={getDisplayName(user)} />
  ) : (
    <Text tone="muted">{t('greeting_default')}</Text>
  );
}

export function UserGreetingSkeleton() {
  return <Skeleton width={140} height="1.25em" />;
}
