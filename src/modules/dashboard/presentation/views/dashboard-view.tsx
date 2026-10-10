import { getTranslations } from 'next-intl/server';

import { Stack, Text, Title } from '@/src/design';
import { CreateCampaignButton } from '@/src/modules/campaign';
import { CreateCharacterButton } from '@/src/modules/character';

import { hasPlayerRole, resolveDashboardTab } from '../../domain';
import { DashboardTabs } from '../components/dashboard-tabs/dashboard-tabs';
import { DashboardUnavailable } from '../components/dashboard-unavailable/dashboard-unavailable';
import { DashboardWelcome } from '../components/dashboard-welcome/dashboard-welcome';
import { DmPanel } from '../components/dm-panel/dm-panel';
import { PlayerPanel } from '../components/player-panel/player-panel';
import { getDashboardData } from '../dashboard.loaders';

/** Home do app: abas de jogador e mestre sobre os mesmos dados. */
export async function DashboardView({ view }: { view?: string }) {
  const [{ campaigns, characters, idleCharacters }, t] = await Promise.all([
    getDashboardData(),
    getTranslations('dashboard'),
  ]);

  const campaignData = campaigns.ok ? campaigns.data : undefined;
  const hasPlayer =
    characters.ok &&
    hasPlayerRole(characters.data.total, campaignData?.playerTotal ?? 0);
  const hasDm = (campaignData?.dmTotal ?? 0) > 0;

  // Tudo falhou: mostrar abas com dois erros empilhados só confundiria
  if (!campaigns.ok && !characters.ok) {
    return <DashboardUnavailable />;
  }

  // Só é "primeiro acesso" quando as buscas responderam e não há nada
  if (campaigns.ok && characters.ok && !hasPlayer && !hasDm) {
    return <DashboardWelcome />;
  }

  const active = resolveDashboardTab(view, { hasPlayer, hasDm });

  return (
    <Stack direction="column" align="stretch" gap="lg">
      <Stack as="header" align="end" justify="space-between" wrap>
        <Stack direction="column" gap="xs">
          <Title>{t('greeting')}</Title>
          <Text tone="muted">
            {active === 'player' ? t('player.subtitle') : t('dm.subtitle')}
          </Text>
        </Stack>
        {active === 'player' ? (
          <CreateCharacterButton label={t('player.newCharacter')} />
        ) : (
          <CreateCampaignButton label={t('dm.newCampaign')} />
        )}
      </Stack>

      <DashboardTabs active={active} />

      {active === 'player' ? (
        <PlayerPanel
          campaigns={campaignData}
          characters={characters}
          idleCharacters={idleCharacters}
        />
      ) : (
        <DmPanel campaigns={campaignData} hasPlayerRole={hasPlayer} />
      )}
    </Stack>
  );
}
