import { ChevronRight, Crown } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Card, Container, Text, Title } from '@/src/design/design-system';

import { getRpgKindMeta } from '../../rpg/presentation/rpg-kind.meta';
import { RpgKindIcon } from '../../rpg/presentation/rpg-kind.ui';
import { Campaign } from '../domain/campaign.types';
import * as S from './campaign.styles';
import { getCampaignStatusMeta } from './campaign-status.meta';

export function DmBadge() {
  const t = useTranslations('campaign');
  return (
    <S.DmSpan>
      <Crown size={20} display="flex" />
      {t('dm')}
    </S.DmSpan>
  );
}

export function CampaignListCard({ campaign }: { campaign: Campaign }) {
  const t = useTranslations('campaign');
  const statusMeta = getCampaignStatusMeta(campaign.status);
  const kindMeta = getRpgKindMeta(campaign.system);
  return (
    <Link href="/">
      <Card>
        <Container align="center" justify="space-between">
          <Container>
            <RpgKindIcon kind={campaign.system} />
            <Container direction="column" compact>
              <Container>
                <Title order={3}>{campaign.name}</Title>
                {campaign.dmed && <DmBadge />}
              </Container>
              <Text muted>{kindMeta.label}</Text>
              <S.StatusBadge $status={campaign.status}>
                {t(statusMeta.translationLabel)}
              </S.StatusBadge>
            </Container>
          </Container>
          <ChevronRight display="flex" />
        </Container>
      </Card>
    </Link>
  );
}
