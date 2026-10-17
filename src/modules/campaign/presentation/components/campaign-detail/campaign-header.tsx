import { Archive, Crown, Swords, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { DetailHero, DetailTitle } from '@/src/design';
import { SystemSeal, SystemTag, SystemWatermark } from '@/src/modules/rpg';

import { type CampaignDetails, CampaignStatus } from '../../../domain';
import { CampaignStatusChip } from '../campaign-status-chip/campaign-status-chip';
import styles from './campaign-detail.module.css';
import { CampaignHeaderActions } from './campaign-header-actions';
import { TableNameButton } from './table-name-button';

export const CAMPAIGN_TITLE_ID = 'campaign-title';

/** O "destaque" da página: sistema, papel, nome, status, party e as ações de status. */
export function CampaignHeader({ campaign }: { campaign: CampaignDetails }) {
  const t = useTranslations('campaign.detail');
  const archived = campaign.status === CampaignStatus.ARCHIVED;
  const party = [
    t('players', { count: campaign.playerCount }),
    !campaign.isDm && campaign.dmName && t('dmBy', { name: campaign.dmName }),
  ]
    .filter(Boolean)
    .join(' · ');
  // O apelido do jogador fica na ficha dele que está nesta campanha
  const myName = campaign.isDm
    ? campaign.dmName
    : campaign.characters.find((character) => character.isMine)?.playerName;

  return (
    <DetailHero
      labelledBy={CAMPAIGN_TITLE_ID}
      watermark={<SystemWatermark system={campaign.system} />}
      actions={campaign.isDm && <CampaignHeaderActions campaign={campaign} />}
      main={
        <>
          <div className={styles.identity}>
            <SystemSeal
              system={campaign.system}
              badge={campaign.isDm ? <Crown /> : <Swords />}
              badgeTone={campaign.isDm ? 'accent' : 'default'}
            />
            <div className={styles.identityText}>
              <SystemTag system={campaign.system} />
              <span className={styles.nickLine}>
                <span className={styles.muted}>
                  {myName
                    ? t.rich(campaign.isDm ? 'youDm' : 'youPlay', {
                        name: myName,
                        strong: (chunks) => (
                          <strong className={styles.strong}>{chunks}</strong>
                        ),
                      })
                    : t(campaign.isDm ? 'youDmNoName' : 'youPlayNoName')}
                </span>
                {!archived && (
                  <TableNameButton
                    campaignId={campaign.id}
                    campaignName={campaign.name}
                    name={myName}
                  />
                )}
              </span>
            </div>
          </div>
          <div>
            <DetailTitle id={CAMPAIGN_TITLE_ID}>{campaign.name}</DetailTitle>
            <div className={styles.metaRow}>
              <CampaignStatusChip status={campaign.status} />
              <span className={styles.party}>
                <Users aria-hidden />
                {party}
              </span>
            </div>
          </div>
        </>
      }
    >
      {campaign.overview && (
        <p className={styles.description}>{campaign.overview}</p>
      )}
      {archived && (
        <p className={styles.note}>
          <Archive aria-hidden />
          {t('archivedNote')}
        </p>
      )}
    </DetailHero>
  );
}
