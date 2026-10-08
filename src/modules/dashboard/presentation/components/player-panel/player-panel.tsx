import { Swords } from 'lucide-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { Card, List, ListItem, Stack, Text, Title } from '@/src/design';
import {
  type CampaignSummary,
  CreateCampaignButton,
} from '@/src/modules/campaign';
import {
  CharacterCard,
  type CharacterSummary,
  CreateCharacterButton,
} from '@/src/modules/character';

import { pickContinueCampaign } from '../../../domain';
import type { Loaded } from '../../dashboard.loaders';
import styles from '../../dashboard.module.css';
import { ContinuePlayingCard } from '../continue-playing-card/continue-playing-card';
import { CrossRoleBanner } from '../cross-role-banner/cross-role-banner';
import { RoleEmptyState } from '../role-empty-state/role-empty-state';
import { SectionError } from '../section-error/section-error';

/** Quantos personagens cabem na prévia antes do "Ver todos". */
const PREVIEW_SIZE = 5;

interface PlayerPanelProps {
  /** Campanhas de outros mestres; ausente quando a busca falhou. */
  playerCampaigns?: CampaignSummary[];
  dmCampaignCount: number;
  characters: Loaded<CharacterSummary[]>;
  idleCharacters: Loaded<CharacterSummary[]>;
}

export async function PlayerPanel({
  playerCampaigns,
  dmCampaignCount,
  characters,
  idleCharacters,
}: PlayerPanelProps) {
  const [t, tCharacter, tCampaign] = await Promise.all([
    getTranslations('dashboard'),
    getTranslations('character'),
    getTranslations('campaign'),
  ]);

  const crossRole = dmCampaignCount > 0 && (
    <CrossRoleBanner
      title={t('crossRole.toDm.title', { count: dmCampaignCount })}
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

  const isEmpty =
    characters.data.length === 0 && (playerCampaigns?.length ?? 0) === 0;

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

  const continueCampaign = playerCampaigns
    ? pickContinueCampaign(playerCampaigns)
    : undefined;
  const idle = idleCharacters.ok ? idleCharacters.data : [];
  const allIdle =
    playerCampaigns?.length === 0 && idle.length === characters.data.length;
  // Com todos parados, o destaque "pronto pra aventura" já explica o convite
  const showIdle = !allIdle && idle.length > 0;
  const showBecomeDm = dmCampaignCount === 0;

  return (
    <>
      {!playerCampaigns && (
        <SectionError title={tCampaign('toast.error.list')} />
      )}
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
            {characters.data.length > PREVIEW_SIZE && (
              <Link href="/characters">{t('player.seeAll')}</Link>
            )}
          </Stack>
          <List>
            {characters.data.slice(0, PREVIEW_SIZE).map((character) => (
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
                    {t('player.idle.title', { count: idle.length })}
                  </Text>
                  <Text tone="muted" small>
                    {idle.map((character) => character.name).join(', ')}
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
