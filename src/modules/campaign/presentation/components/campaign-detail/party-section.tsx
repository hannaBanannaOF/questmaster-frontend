import { LogOut, UserMinus, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import { Chip, DetailSection, SectionHeader, Surface } from '@/src/design';

import {
  type CampaignCharacter,
  type CampaignDetails,
  canLeaveCampaign,
  canRemoveFromCampaign,
} from '../../../domain';
import {
  leaveCampaignAction,
  removeFromCampaignAction,
} from '../../campaign.actions';
import styles from './campaign-detail.module.css';
import { MemberMenu } from './member-menu';
import { PartyCard } from './party-card';

const HEADING_ID = 'campaign-party';

interface PartySectionProps {
  campaign: Pick<
    CampaignDetails,
    'id' | 'slug' | 'name' | 'isDm' | 'status' | 'characters'
  >;
  /** Ação do vazio: "Criar convite" quando ainda não há convite. */
  emptyAction?: ReactNode;
  /** O convite já aparece acima: o vazio só aponta para ele. */
  hasInvite: boolean;
}

/** Party da campanha; cada card abre a ficha e tem "⋯" quando há o que fazer. */
export function PartySection({
  campaign,
  emptyAction,
  hasInvite,
}: PartySectionProps) {
  const t = useTranslations();
  const { characters } = campaign;
  const close = t('common.actions.close');

  const menuFor = (character: CampaignCharacter) => {
    const href = character.slug ? `/characters/${character.slug}` : undefined;
    const base = {
      label: t('campaign.party.actions', { name: character.name }),
      openLabel: t('campaign.party.open'),
      openHref: href,
    };
    if (canRemoveFromCampaign(campaign)) {
      return (
        <MemberMenu
          {...base}
          destructive={{
            label: t('campaign.party.remove.menu'),
            icon: <UserMinus />,
            action: removeFromCampaignAction.bind(
              null,
              campaign.id,
              campaign.slug,
              character.id,
            ),
            title: t('campaign.party.remove.title', { name: character.name }),
            description: t('campaign.party.remove.confirm'),
            confirm: t('campaign.party.remove.submit'),
            cancel: t('campaign.party.remove.cancel'),
            close,
            errorTitleKey: 'campaign.party.toast.error.remove',
          }}
        />
      );
    }
    if (character.isMine && character.slug && canLeaveCampaign(campaign)) {
      return (
        <MemberMenu
          {...base}
          destructive={{
            label: t('campaign.party.leave.menu'),
            icon: <LogOut />,
            action: leaveCampaignAction.bind(
              null,
              campaign.id,
              character.id,
              character.slug,
            ),
            title: t('campaign.party.leave.title', { campaign: campaign.name }),
            description: t('campaign.party.leave.confirm', {
              name: character.name,
            }),
            confirm: t('campaign.party.leave.submit'),
            cancel: t('campaign.party.leave.cancel'),
            close,
            errorTitleKey: 'campaign.party.toast.error.leave',
          }}
        />
      );
    }
    return null;
  };

  return (
    <DetailSection labelledBy={HEADING_ID}>
      <SectionHeader
        id={HEADING_ID}
        title={t('campaign.party.title')}
        count={characters.length}
        countLabel={t('campaign.party.count', { count: characters.length })}
      />
      {characters.length === 0 ? (
        <Surface className={styles.empty}>
          <span className={styles.emptyIcon} aria-hidden>
            <Users />
          </span>
          <h3>{t('campaign.party.empty.title')}</h3>
          <p className={styles.muted}>
            {hasInvite
              ? t('campaign.party.empty.withInvite')
              : t('campaign.party.empty.message')}
          </p>
          {emptyAction}
        </Surface>
      ) : (
        <ul className={styles.grid} aria-labelledby={HEADING_ID}>
          {characters.map((character) => (
            <li key={character.id}>
              <PartyCard
                name={character.name}
                href={
                  character.slug ? `/characters/${character.slug}` : undefined
                }
                menu={menuFor(character)}
                footer={
                  character.isMine ? (
                    <Chip tone="accent">{t('campaign.mine')}</Chip>
                  ) : (
                    campaign.isDm &&
                    character.playerName && (
                      <span className={styles.muted}>
                        {t('campaign.party.owner', {
                          name: character.playerName,
                        })}
                      </span>
                    )
                  )
                }
              />
            </li>
          ))}
        </ul>
      )}
    </DetailSection>
  );
}
