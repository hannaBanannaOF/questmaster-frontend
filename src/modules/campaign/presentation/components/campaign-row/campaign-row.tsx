import { ChevronRight, Crown, Link2, Swords } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';

import { SurfaceLink } from '@/src/design';
import { getGameSystemMeta, SystemSeal } from '@/src/modules/rpg';

import type { CampaignSummary } from '../../../domain';
import { CampaignStatusChip } from '../campaign-status-chip/campaign-status-chip';
import styles from './campaign-row.module.css';

interface CampaignRowProps {
  campaign: CampaignSummary;
  /** Campanha do mestre em que ninguém entrou: pede convite. */
  needsInvite?: boolean;
  /** Só o sistema na linha de baixo (lista), sem jogadores ou fichas. */
  hideDetail?: boolean;
}

/** Linha de campanha: o nome tem a largura toda e o status fica sempre no mesmo lugar. */
export function CampaignRow({
  campaign,
  needsInvite,
  hideDetail,
}: CampaignRowProps) {
  const t = useTranslations('campaign.row');
  const format = useFormatter();
  const { label, shortLabel } = getGameSystemMeta(campaign.system);
  const myCharacters = campaign.myCharacters.map(({ name }) => name);

  const role = needsInvite ? 'needsInvite' : campaign.isDm ? 'dm' : 'player';
  const badge = {
    needsInvite: <Link2 />,
    dm: <Crown />,
    player: <Swords />,
  }[role];
  const detail = hideDetail
    ? null
    : needsInvite
      ? t('nobodyJoined')
      : campaign.isDm
        ? t('players', { count: campaign.playerCount })
        : myCharacters.length > 0 &&
          t('as', { names: format.list(myCharacters) });

  return (
    <SurfaceLink href={`/campaigns/${campaign.slug}`} className={styles.row}>
      <SystemSeal
        system={campaign.system}
        badge={badge}
        badgeTone={
          role === 'needsInvite'
            ? 'warning'
            : role === 'dm'
              ? 'accent'
              : 'default'
        }
      />
      <span className={styles.mid}>
        <h3 className={styles.title}>
          <span className="visually-hidden">{t(`role.${role}`)} </span>
          {campaign.name}
        </h3>
        <span className={styles.meta}>
          <CampaignStatusChip status={campaign.status} />
          <span className={styles.description}>
            <span aria-hidden>{shortLabel}</span>
            <span className="visually-hidden">{label}</span>
            {detail && ` · ${detail}`}
          </span>
        </span>
      </span>
      <ChevronRight className={styles.end} aria-hidden />
    </SurfaceLink>
  );
}
