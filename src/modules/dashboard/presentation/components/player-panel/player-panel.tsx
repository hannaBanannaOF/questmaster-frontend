import { TriangleAlert } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import { Alert, Avatar, SectionHeader, TextLink } from '@/src/design';
import { campaignListHref, CampaignRow } from '@/src/modules/campaign';
import { CharacterTile, CreateCharacterButton } from '@/src/modules/character';
import { RetryButton } from '@/src/modules/shared/presentation';

import styles from '../../dashboard.module.css';
import type { PlayerPanelVM } from '../../dashboard.view-model';
import { ContinueCard } from '../continue-card/continue-card';
import { ReadyCard } from '../ready-card/ready-card';

/** Aba Jogando: destaque, personagens e campanhas em que o usuário joga. */
export function PlayerPanel({ vm }: { vm: PlayerPanelVM }) {
  const t = useTranslations('dashboard');
  const tCommon = useTranslations('common');
  const format = useFormatter();
  const { hero, characters, campaigns } = vm;

  const sectionError = (title: string) => (
    <Alert
      tone="danger"
      icon={<TriangleAlert />}
      title={title}
      description={t('player.error.hint')}
      action={<RetryButton label={tCommon('actions.retry')} />}
    />
  );

  return (
    <>
      {hero?.kind === 'continue' && (
        <ContinueCard
          campaign={hero.campaign}
          eyebrow={t('player.continue')}
          action={t('player.openSession')}
        >
          {hero.campaign.myCharacters.length > 0 && (
            <>
              <Avatar name={hero.campaign.myCharacters[0].name} size="sm" />
              <span className={styles.muted}>
                {t.rich('player.as', {
                  names: format.list(
                    hero.campaign.myCharacters.map(({ name }) => name),
                  ),
                  strong: (chunks: ReactNode) => (
                    <strong className={styles.strong}>{chunks}</strong>
                  ),
                })}
              </span>
            </>
          )}
        </ContinueCard>
      )}
      {hero?.kind === 'ready' && <ReadyCard />}

      <div className={campaigns ? styles.columns : undefined}>
        <section className={styles.section} aria-labelledby="dash-characters">
          <SectionHeader
            id="dash-characters"
            title={t('player.characters')}
            count={characters.ok ? characters.total : undefined}
            countLabel={
              characters.ok ? t('count', { count: characters.total }) : ''
            }
            actions={
              <>
                <CreateCharacterButton
                  label={t('player.newCharacter')}
                  variant="ghost"
                  compactLabel
                />
                {characters.ok && characters.total > 0 && (
                  <TextLink href="/characters">{t('seeAll')}</TextLink>
                )}
              </>
            }
          />
          {characters.ok ? (
            <ul
              className={styles.characters}
              aria-label={t('player.characters')}
            >
              {characters.items.map((character) => (
                <li key={character.slug}>
                  <CharacterTile character={character} />
                </li>
              ))}
            </ul>
          ) : (
            sectionError(t('player.error.characters'))
          )}
        </section>

        {campaigns && (
          <section className={styles.section} aria-labelledby="dash-campaigns">
            <SectionHeader
              id="dash-campaigns"
              title={t('player.campaigns')}
              count={campaigns.ok ? campaigns.total : undefined}
              countLabel={
                campaigns.ok ? t('count', { count: campaigns.total }) : ''
              }
              actions={
                campaigns.ok && (
                  <TextLink href={campaignListHref({ role: 'player' })}>
                    {t('seeAllFem')}
                  </TextLink>
                )
              }
            />
            {campaigns.ok ? (
              <ul className={styles.rows} aria-label={t('player.campaigns')}>
                {campaigns.items.map((campaign) => (
                  <li key={campaign.slug}>
                    <CampaignRow campaign={campaign} />
                  </li>
                ))}
              </ul>
            ) : (
              sectionError(t('player.error.campaigns'))
            )}
          </section>
        )}
      </div>
    </>
  );
}
