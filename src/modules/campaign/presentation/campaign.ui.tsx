import { ChevronRight, Crown, Users } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useTheme } from 'styled-components';

import {
  Card,
  Container,
  IconSpan,
  Text,
  Title,
} from '@/src/design/design-system';

import { getGameSystemMeta } from '../../rpg/presentation/game-system.meta';
import { GameSystemIcon } from '../../rpg/presentation/game-system.ui';
import { Campaign } from '../domain/campaign.types';
import * as S from './campaign.styles';
import { getCampaignStatusMeta } from './campaign-status.meta';

export function CampaignListCard({ campaign }: { campaign: Campaign }) {
  const t = useTranslations('campaign');
  const theme = useTheme();
  const statusMeta = getCampaignStatusMeta(campaign.status);
  const systemMeta = getGameSystemMeta(campaign.system);
  return (
    <Link href="/">
      <Card>
        <Container align="center" justify="space-between">
          <Container>
            <GameSystemIcon system={campaign.system} />
            <Container direction="column">
              <Container direction="column" compact>
                <Container>
                  <Title order={3}>{campaign.name}</Title>
                  {campaign.dmed && (
                    <IconSpan
                      color={theme.colors.primary.default}
                      icon={<Crown size={20} display="flex" />}
                      data={t('dm')}
                    />
                  )}
                </Container>
                <Text muted>{systemMeta.label}</Text>
              </Container>
              <Container align="center">
                <S.StatusBadge $status={campaign.status}>
                  {t(statusMeta.translationLabel)}
                </S.StatusBadge>
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
