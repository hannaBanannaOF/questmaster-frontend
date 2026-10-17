import { Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ButtonLink, SectionHeader, TextLink } from '@/src/design';
import {
  campaignListHref,
  CampaignRow,
  CampaignStatusChip,
  CreateCampaignButton,
} from '@/src/modules/campaign';
import { CriticalFailure } from '@/src/modules/shared/presentation';

import styles from '../../dashboard.module.css';
import type { DmPanelVM } from '../../dashboard.view-model';
import { ContinueCard } from '../continue-card/continue-card';

/** Aba Mestrando: destaque, campanhas e as que ainda precisam de jogadores. */
export function DmPanel({ vm }: { vm: DmPanelVM }) {
  const t = useTranslations('dashboard');

  if (!vm.ok) {
    return (
      <CriticalFailure
        title={t('dm.error.title')}
        message={t('dm.error.message')}
        secondaryAction={
          <ButtonLink href="/?view=player" variant="tertiary">
            {t('dm.error.toPlayer')}
          </ButtonLink>
        }
      />
    );
  }

  const { hero, campaigns, needsYou } = vm;

  return (
    <>
      {hero && (
        <ContinueCard
          campaign={hero}
          eyebrow={t('dm.continue')}
          action={t('dm.openCampaign')}
        >
          <CampaignStatusChip status={hero.status} />
          <span className={styles.party}>
            <Users aria-hidden />
            {t('dm.players', { count: hero.playerCount })}
          </span>
        </ContinueCard>
      )}

      <div className={needsYou.total > 0 ? styles.columns : undefined}>
        <section className={styles.section} aria-labelledby="dash-dm">
          <SectionHeader
            id="dash-dm"
            title={t('dm.campaigns')}
            count={campaigns.total}
            countLabel={t('count', { count: campaigns.total })}
            actions={
              <>
                <CreateCampaignButton
                  label={t('dm.newCampaign')}
                  variant="ghost"
                  compactLabel
                />
                <TextLink href={campaignListHref({ role: 'dm' })}>
                  {t('seeAllFem')}
                </TextLink>
              </>
            }
          />
          <ul className={styles.rows} aria-label={t('dm.campaigns')}>
            {campaigns.items.map((campaign) => (
              <li key={campaign.slug}>
                <CampaignRow campaign={campaign} />
              </li>
            ))}
          </ul>
        </section>

        {needsYou.total > 0 && (
          <section className={styles.section} aria-labelledby="dash-needs-you">
            <SectionHeader
              id="dash-needs-you"
              title={t('dm.needsYou')}
              count={needsYou.total}
              countLabel={t('count', { count: needsYou.total })}
            />
            <ul className={styles.rows} aria-label={t('dm.needsYouList')}>
              {needsYou.items.map((campaign) => (
                <li key={campaign.slug}>
                  <CampaignRow campaign={campaign} needsInvite />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
