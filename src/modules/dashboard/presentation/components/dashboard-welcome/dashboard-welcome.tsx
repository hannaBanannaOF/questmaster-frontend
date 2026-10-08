import { Crown, ScrollText, Swords } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { Card, IconBox, Stack, Text, Title } from '@/src/design';
import { CreateCampaignButton } from '@/src/modules/campaign';
import { CreateCharacterButton } from '@/src/modules/character';

import styles from '../../dashboard.module.css';

/** Primeiro acesso: nada criado ainda, então oferece as duas portas de entrada. */
export async function DashboardWelcome() {
  const t = await getTranslations('dashboard.welcome');

  const doors = [
    {
      key: 'dm',
      icon: <Crown size={24} />,
      action: <CreateCampaignButton label={t('dm.action')} />,
    },
    {
      key: 'player',
      icon: <Swords size={24} />,
      action: <CreateCharacterButton label={t('player.action')} />,
    },
  ] as const;

  return (
    <Stack direction="column" align="center" gap="lg">
      <Stack direction="column" align="center" className={styles.center}>
        <IconBox size="lg">
          <ScrollText size={48} />
        </IconBox>
        <Title>{t('title')}</Title>
        <Text tone="muted">{t('message')}</Text>
      </Stack>
      <div className={styles.welcomeGrid}>
        {doors.map(({ key, icon, action }) => (
          <Card key={key} as="section" hero>
            <Stack direction="column">
              <IconBox>{icon}</IconBox>
              <Title order={3}>{t(`${key}.title`)}</Title>
              <Text tone="muted">{t(`${key}.message`)}</Text>
              {action}
            </Stack>
          </Card>
        ))}
      </div>
      <Text tone="muted" small className={styles.center}>
        {t('inviteHint')}
      </Text>
    </Stack>
  );
}
