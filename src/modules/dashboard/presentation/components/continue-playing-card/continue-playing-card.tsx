import { Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ButtonLink, Card, IconText, Stack, Text, Title } from '@/src/design';
import {
  CampaignStatusBadge,
  type CampaignSummary,
} from '@/src/modules/campaign';
import { GameSystemIcon, getGameSystemMeta } from '@/src/modules/rpg';

import styles from '../../dashboard.module.css';

const TITLE_ID = 'continue-playing';

/** Destaque da aba de jogador: a campanha em andamento mais à mão. */
export function ContinuePlayingCard({
  campaign,
}: {
  campaign: CampaignSummary;
}) {
  const t = useTranslations('dashboard');
  const { label: systemLabel } = getGameSystemMeta(campaign.system);

  return (
    <Card as="section" hero aria-labelledby={TITLE_ID}>
      <Stack direction="column" align="stretch">
        <Text small bold uppercase tone="muted" className={styles.eyebrow}>
          {t('eyebrow.continue')}
        </Text>
        <Stack align="center" justify="space-between" wrap>
          <Stack align="center">
            <GameSystemIcon system={campaign.system} size={30} />
            <Stack direction="column" gap="xs">
              <Title order={2} id={TITLE_ID}>
                {campaign.name}
              </Title>
              <Stack align="center" gap="sm" wrap>
                <CampaignStatusBadge status={campaign.status} />
                <Text tone="muted" small>
                  {systemLabel}
                </Text>
                {campaign.playerCount > 0 && (
                  <IconText tone="muted" icon={<Users size={16} />}>
                    {campaign.playerCount}
                  </IconText>
                )}
              </Stack>
            </Stack>
          </Stack>
          <ButtonLink href={`/campaigns/${campaign.slug}`} size="lg">
            {t('player.openCampaign')}
          </ButtonLink>
        </Stack>
      </Stack>
    </Card>
  );
}
