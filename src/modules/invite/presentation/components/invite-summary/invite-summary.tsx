import { Scroll, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

import {
  Card,
  IconBox,
  IconText,
  Quote,
  Stack,
  Text,
  Title,
} from '@/src/design';
import { GameSystemIcon, getGameSystemMeta } from '@/src/modules/rpg';

import type { Invite } from '../../../domain';
import styles from './invite-summary.module.css';

/** Cabeçalho da página de convite: qual campanha está chamando o jogador. */
export function InviteSummary({ invite }: { invite: Invite }) {
  const t = useTranslations('invite');
  const { label: systemLabel } = getGameSystemMeta(invite.campaignSystem);

  return (
    <Card as="section" hero aria-labelledby="invite-campaign">
      <Stack direction="column" align="center" className={styles.summary}>
        <IconBox shape="circle" size="lg">
          <Scroll size={24} />
        </IconBox>
        <Stack direction="column" align="center" gap="xxs">
          <Text tone="muted" uppercase>
            {t('invited')}
          </Text>
          <Title id="invite-campaign">{invite.campaignName}</Title>
        </Stack>
        <Stack align="center" gap="sm" className={styles.meta}>
          <GameSystemIcon system={invite.campaignSystem} size={16} />
          <span>{systemLabel}</span>
          {invite.campaignPlayerCount > 0 && (
            <>
              <span aria-hidden>•</span>
              <IconText tone="muted" icon={<Users size={12} />}>
                {invite.campaignPlayerCount}
              </IconText>
            </>
          )}
        </Stack>
        {invite.campaignOverview && <Quote>{invite.campaignOverview}</Quote>}
      </Stack>
    </Card>
  );
}
