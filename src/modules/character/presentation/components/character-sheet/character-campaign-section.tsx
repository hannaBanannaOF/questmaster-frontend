import { Link2, LogOut } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { DetailSection, SectionHeader } from '@/src/design';
import { CampaignRow } from '@/src/modules/campaign';
import { leaveCampaignAction } from '@/src/modules/campaign/presentation/campaign.actions';
import { getGameSystemMeta } from '@/src/modules/rpg';
import { ConfirmDeleteButton } from '@/src/modules/shared/presentation';

import type { CharacterDetails } from '../../../domain';
import styles from './character-sheet.module.css';

const HEADING_ID = 'character-campaign';

/** A mesa da ficha: a linha da campanha (com "Sair" para a dona) ou o caminho do convite. */
export function CharacterCampaignSection({
  character,
}: {
  character: CharacterDetails;
}) {
  const t = useTranslations();
  const { campaign } = character;

  return (
    <DetailSection labelledBy={HEADING_ID}>
      <SectionHeader
        id={HEADING_ID}
        title={t('character.detail.campaign.title')}
      />
      {campaign ? (
        <>
          <CampaignRow
            hideDetail
            campaign={{
              slug: campaign.slug,
              name: campaign.name,
              system: character.system,
              status: campaign.status,
              isDm: campaign.isDm,
              // hideDetail: a linha não mostra jogadores nem fichas
              playerCount: 0,
              myCharacters: [],
            }}
          />
          {character.isPremade && (
            <p className={styles.help}>
              {t('character.detail.campaign.premadeHelp')}
            </p>
          )}
          {character.isPlayer && (
            <div className={styles.rowActions}>
              <ConfirmDeleteButton
                action={leaveCampaignAction.bind(
                  null,
                  campaign.id,
                  character.id,
                  character.slug,
                )}
                errorTitleKey="campaign.party.toast.error.leave"
                icon={<LogOut size={18} />}
                triggerVariant="ghost"
                labels={{
                  trigger: t('character.detail.campaign.leave'),
                  title: t('campaign.party.leave.title', {
                    campaign: campaign.name,
                  }),
                  confirm: t('campaign.party.leave.submit'),
                  cancel: t('campaign.party.leave.cancel'),
                  close: t('common.actions.close'),
                }}
                description={t('campaign.party.leave.confirm', {
                  name: character.name,
                })}
              />
            </div>
          )}
        </>
      ) : (
        <div className={styles.freeCard}>
          <span className={styles.indicator} aria-hidden>
            <Link2 />
          </span>
          <div>
            <p className={styles.freeTitle}>
              {t('character.detail.campaign.none.title')}
            </p>
            <p className={styles.muted}>
              {t('character.detail.campaign.none.message', {
                system: getGameSystemMeta(character.system).label,
              })}
            </p>
          </div>
        </div>
      )}
    </DetailSection>
  );
}
