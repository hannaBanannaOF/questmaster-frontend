import { ChevronRight, Users } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'styled-components';

import { Card, Container, IconSpan, Text, Title } from '@/src/design';
import { GameSystemIcon, getGameSystemMeta } from '@/src/modules/rpg';

import { Campaign } from '../../domain';
import { DmBadge } from '../dm-badge/dm-badge.ui';
import { StatusBadge } from '../status-badge/status-badge.ui';

interface CampaignListCardProps {
  campaign: Campaign;
}

export function CampaignListCard({ campaign }: CampaignListCardProps) {
  const theme = useTheme();
  const systemMeta = getGameSystemMeta(campaign.system);
  return (
    <Link href={`/campaigns/${campaign.slug}`}>
      <Card hover>
        <Container align="center" justify="space-between">
          <Container>
            <GameSystemIcon system={campaign.system} />
            <Container direction="column">
              <Container direction="column" compact>
                <Container>
                  <Title order={3}>{campaign.name}</Title>
                  {campaign.dmed && <DmBadge />}
                </Container>
                <Text variant="muted">{systemMeta.label}</Text>
              </Container>
              <Container align="center">
                <StatusBadge status={campaign.status} />
                {campaign.playerCount > 0 && (
                  <IconSpan
                    color={theme.colors.text.muted}
                    icon={<Users size={16} display="flex" />}
                    data={campaign.playerCount}
                  />
                )}
              </Container>
            </Container>
          </Container>
          <ChevronRight display="flex" />
        </Container>
      </Card>
    </Link>
  );
}
