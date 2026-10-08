import { Users } from 'lucide-react';

import { IconText, Stack, Text, Title } from '@/src/design';
import { GameSystemIcon, getGameSystemMeta } from '@/src/modules/rpg';
import { CardLink } from '@/src/modules/shared/presentation';

import type { CampaignSummary } from '../../../domain';
import { CampaignStatusBadge } from '../campaign-status-badge/campaign-status-badge';
import { DmBadge } from '../dm-badge/dm-badge';

export function CampaignCard({ campaign }: { campaign: CampaignSummary }) {
  const { label: systemLabel } = getGameSystemMeta(campaign.system);

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
          </Stack>
        </Stack>
      </Stack>
    </CardLink>
  );
}
