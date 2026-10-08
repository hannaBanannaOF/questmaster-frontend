import { unstable_rethrow } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { Skeleton, Text } from '@/src/design';

import { getDisplayName, type User } from '../../../domain';
import { getCurrentUser } from '../../user.loaders';

async function loadUser(): Promise<User | null> {
  try {
    return await getCurrentUser();
  } catch (error) {
    // Sessão expirada vira redirect pro login; outras falhas não derrubam o header
    unstable_rethrow(error);
    return null;
  }
}

export async function UserGreeting() {
  const [user, t] = await Promise.all([
    loadUser(),
    getTranslations('common.user'),
  ]);

  return (
    <Text tone="muted">
      {user
        ? t('greeting', { name: getDisplayName(user) })
        : t('greeting_default')}
    </Text>
  );
}

export function UserGreetingSkeleton() {
  return <Skeleton width={140} height="1.25em" />;
}
