import { Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { DetailHero, DetailTitle } from '@/src/design';
import { SystemTag, SystemWatermark } from '@/src/modules/rpg';

import type { Invite } from '../../../domain';
import styles from '../../views/invite.module.css';

const TITLE_ID = 'invite-campaign';

/** Destaque do convite: qual campanha está chamando, de quem e quantos já entraram. */
export function InviteHero({ invite }: { invite: Invite }) {
  const t = useTranslations('invite');
  const party = [
    // Mesmo zerado: quem é convidado quer saber se a mesa já tem gente
    t('players', { count: invite.campaignPlayerCount }),
    invite.dmName && t('dmBy', { name: invite.dmName }),
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <DetailHero
      labelledBy={TITLE_ID}
      watermark={<SystemWatermark system={invite.campaignSystem} />}
      main={
        <div className={styles.heroText}>
          <div className={styles.heroTop}>
            <span className={styles.eyebrow}>{t('invited')}</span>
            <SystemTag system={invite.campaignSystem} chip />
          </div>
          <DetailTitle id={TITLE_ID}>{invite.campaignName}</DetailTitle>
          <span className={styles.party}>
            <Users aria-hidden />
            {party}
          </span>
        </div>
      }
    >
      {invite.campaignOverview && (
        <p className={styles.description}>{invite.campaignOverview}</p>
      )}
    </DetailHero>
  );
}
