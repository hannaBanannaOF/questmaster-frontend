import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { DetailSection, SectionHeader } from '@/src/design';

import type { CampaignDetails } from '../../../domain';
import {
  createPremadeCharacterAction,
  deletePremadeCharacterAction,
} from '../../campaign.actions';
import { AddPremadeCard } from './add-premade-card';
import styles from './campaign-detail.module.css';
import { MemberMenu } from './member-menu';
import { PartyCard } from './party-card';

const HEADING_ID = 'campaign-premade';

/** Fichas prontas do mestre, ainda sem jogador; só o mestre vê. */
export function PremadeSection({
  campaign,
  canCreate,
}: {
  campaign: Pick<
    CampaignDetails,
    'id' | 'slug' | 'system' | 'premadeCharacters'
  >;
  /** A campanha ainda aceita convites, então aceita fichas novas. */
  canCreate: boolean;
}) {
  const t = useTranslations();
  const characters = campaign.premadeCharacters;

  return (
    <DetailSection labelledBy={HEADING_ID}>
      <SectionHeader
        id={HEADING_ID}
        title={t('campaign.premade.title')}
        count={characters.length}
        countLabel={t('campaign.party.count', { count: characters.length })}
      />
      {canCreate && <p className={styles.help}>{t('campaign.premade.help')}</p>}
      <ul className={styles.grid} aria-labelledby={HEADING_ID}>
        {characters.map(({ id, slug, name }) => {
          const href = slug ? `/characters/${slug}` : undefined;
          return (
            <li key={id}>
              <PartyCard
                name={name}
                href={href}
                footer={
                  <span className={styles.muted}>
                    {t('campaign.premade.unclaimed')}
                  </span>
                }
                menu={
                  canCreate && (
                    <MemberMenu
                      label={t('campaign.premade.actions', { name })}
                      openLabel={t('campaign.party.open')}
                      openHref={href}
                      destructive={{
                        label: t('campaign.premade.delete.menu'),
                        icon: <Trash2 />,
                        action: deletePremadeCharacterAction.bind(
                          null,
                          campaign.slug,
                          id,
                        ),
                        title: t('campaign.premade.delete.title', { name }),
                        description: t('campaign.premade.delete.confirm'),
                        confirm: t('campaign.premade.delete.submit'),
                        cancel: t('campaign.premade.delete.cancel'),
                        close: t('common.actions.close'),
                        errorTitleKey: 'campaign.premade.toast.error.delete',
                      }}
                    />
                  )
                }
              />
            </li>
          );
        })}
        {canCreate && (
          <li>
            <AddPremadeCard
              action={createPremadeCharacterAction.bind(null, campaign.id)}
              system={campaign.system}
            />
          </li>
        )}
      </ul>
    </DetailSection>
  );
}
