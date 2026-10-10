import { Swords, Users } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';

import { IconText, Stack, Text, Title } from '@/src/design';
import { GameSystemIcon, getGameSystemMeta } from '@/src/modules/rpg';
import { CardLink } from '@/src/modules/shared/presentation';

import type { CampaignSummary } from '../../../domain';
import { CampaignStatusBadge } from '../campaign-status-badge/campaign-status-badge';
import { DmBadge } from '../dm-badge/dm-badge';

export function CampaignCard({ campaign }: { campaign: CampaignSummary }) {
  const t = useTranslations('campaign.card');
  const format = useFormatter();
  const { label: systemLabel } = getGameSystemMeta(campaign.system);
  const myCharacters = campaign.myCharacters.map(({ name }) => name);

  return (
    <CardLink href={`/campaigns/${campaign.slug}`}>
      <Stack align="center">
        <GameSystemIcon system={campaign.system} />
        <Stack direction="column">
          <Stack direction="column" gap="xxs">
            <Stack align="center">
              <Title order={3}>{campaign.name}</Title>
              {campaign.isDm && <DmBadge />}
            </Stack>
            <Text tone="muted">{systemLabel}</Text>
          </Stack>
          <Stack align="center">
            <CampaignStatusBadge status={campaign.status} />
            {campaign.playerCount > 0 && (
              <IconText tone="muted" icon={<Users size={16} />}>
                {campaign.playerCount}
              </IconText>
            )}
            {myCharacters.length > 0 && (
              <IconText tone="muted" icon={<Swords size={16} />}>
                {t('playingWith', { names: format.list(myCharacters) })}
              </IconText>
            )}
          </Stack>
        </Stack>
      </Stack>
    </CardLink>
  );
}
