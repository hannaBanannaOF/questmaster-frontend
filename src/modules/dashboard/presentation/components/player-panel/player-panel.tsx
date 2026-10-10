import { Swords } from 'lucide-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { Card, List, ListItem, Stack, Text, Title } from '@/src/design';
import type { Page } from '@/src/lib/pagination';
import { CreateCampaignButton } from '@/src/modules/campaign';
import {
  CharacterCard,
  type CharacterSummary,
  CreateCharacterButton,
} from '@/src/modules/character';

import type { DashboardCampaigns, Loaded } from '../../dashboard.loaders';
import styles from '../../dashboard.module.css';
import { ContinuePlayingCard } from '../continue-playing-card/continue-playing-card';
import { CrossRoleBanner } from '../cross-role-banner/cross-role-banner';
import { RoleEmptyState } from '../role-empty-state/role-empty-state';
import { SectionError } from '../section-error/section-error';

interface PlayerPanelProps {
  /** Ausente quando a busca de campanhas falhou. */
  campaigns?: DashboardCampaigns;
  /** Prévia dos personagens, com o total. */
  characters: Loaded<Page<CharacterSummary>>;
  /** Prévia dos personagens sem campanha, com o total. */
  idleCharacters: Loaded<Page<CharacterSummary>>;
}

export async function PlayerPanel({
  campaigns,
  characters,
  idleCharacters,
}: PlayerPanelProps) {
  const [t, tCharacter, tCampaign] = await Promise.all([
    getTranslations('dashboard'),
    getTranslations('character'),
    getTranslations('campaign'),
  ]);

  const dmTotal = campaigns?.dmTotal ?? 0;
  const playerTotal = campaigns?.playerTotal ?? 0;

  const crossRole = dmTotal > 0 && (
    <CrossRoleBanner
      title={t('crossRole.toDm.title', { count: dmTotal })}
      hint={t('crossRole.toDm.hint')}
      href="/?view=dm"
      action={t('crossRole.toDm.action')}
    />
  );

  if (!characters.ok) {
    return (
      <>
        <SectionError title={tCharacter('toast.error.list')} />
        {crossRole}
      </>
    );
  }

  const isEmpty = characters.data.total === 0 && playerTotal === 0;

  if (isEmpty) {
    return (
      <>
        <RoleEmptyState
          icon={<Swords size={32} />}
          title={t('player.empty.title')}
          message={t('player.empty.message')}
          stepsLabel={t('steps')}
          steps={[
            t('player.empty.steps.create'),
            t('player.empty.steps.invite'),
            t('player.empty.steps.join'),
          ]}
          action={<CreateCharacterButton label={t('player.empty.action')} />}
        />
        {crossRole}
      </>
    );
  }

  const continueCampaign = campaigns?.continueCampaign;
  const idle = idleCharacters.ok
    ? idleCharacters.data
    : { items: [], total: 0 };
  const allIdle =
    campaigns !== undefined &&
    playerTotal === 0 &&
    idle.total === characters.data.total;
  // Com todos parados, o destaque "pronto pra aventura" já explica o convite
  const showIdle = !allIdle && idle.total > 0;
  const hiddenIdle = idle.total - idle.items.length;
  const showBecomeDm = campaigns !== undefined && dmTotal === 0;

  return (
    <>
      {!campaigns && <SectionError title={tCampaign('toast.error.list')} />}
      {continueCampaign && <ContinuePlayingCard campaign={continueCampaign} />}
      {!continueCampaign && allIdle && (
        <Card as="section" hero aria-labelledby="dashboard-ready">
          <Stack direction="column" gap="xs">
            <Text small bold uppercase tone="muted" className={styles.eyebrow}>
              {t('eyebrow.ready')}
            </Text>
            <Title order={2} id="dashboard-ready">
              {t('player.ready.title')}
            </Title>
            <Text tone="muted">{t('player.ready.message')}</Text>
          </Stack>
        </Card>
      )}

      <div className={styles.columns}>
        <Stack
          as="section"
          direction="column"
          align="stretch"
          className={styles.main}
        >
          <Stack align="center" justify="space-between">
            <Title order={3}>{t('player.characters')}</Title>
            {characters.data.total > characters.data.items.length && (
              <Link href="/characters">
                {t('player.seeAll', { count: characters.data.total })}
              </Link>
            )}
          </Stack>
          <List>
            {characters.data.items.map((character) => (
              <ListItem key={character.slug}>
                <CharacterCard character={character} />
              </ListItem>
            ))}
          </List>
        </Stack>

        {(showIdle || showBecomeDm) && (
          <Stack
            as="section"
            direction="column"
            align="stretch"
            className={styles.aside}
          >
            <Title order={3}>{t('player.nextSteps')}</Title>
            {showIdle && (
              <Card compact>
                <Stack direction="column" gap="xs">
                  <Text bold>
                    {t('player.idle.title', { count: idle.total })}
                  </Text>
                  <Text tone="muted" small>
                    {idle.items.map((character) => character.name).join(', ')}
                    {hiddenIdle > 0 &&
                      ` ${t('player.idle.more', { count: hiddenIdle })}`}
                  </Text>
                  <Text tone="muted" small>
                    {t('player.idle.message')}
                  </Text>
                </Stack>
              </Card>
            )}
            {showBecomeDm && (
              <Card compact>
                <Stack direction="column" gap="xs">
                  <Text bold>{t('player.becomeDm.title')}</Text>
                  <Text tone="muted" small>
                    {t('player.becomeDm.message')}
                  </Text>
                  <CreateCampaignButton label={t('player.becomeDm.action')} />
                </Stack>
              </Card>
            )}
          </Stack>
        )}
      </div>

      {crossRole}
    </>
  );
}
