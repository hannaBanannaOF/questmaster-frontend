import { getTranslations } from 'next-intl/server';

import { Breadcrumb, Card, DetailPage, Stack, Text, Title } from '@/src/design';
import { GameSystemIcon, getGameSystemMeta } from '@/src/modules/rpg';
import { ConfirmDeleteButton } from '@/src/modules/shared/presentation';

import { canEditCharacter, getMaxHp } from '../../domain';
import {
  deleteCharacterAction,
  updateCharacterHpAction,
} from '../character.actions';
import { getCharacterBySlug } from '../character.loaders';
import { HpControl } from '../components/hp-control/hp-control';

const TITLE_ID = 'character-title';

export async function CharacterDetailsView({ slug }: { slug: string }) {
  const [character, t, tCommon] = await Promise.all([
    getCharacterBySlug(slug),
    getTranslations('character'),
    getTranslations('common'),
  ]);

  const { label: systemLabel } = getGameSystemMeta(character.system);
  const editable = canEditCharacter(character);

  return (
    <DetailPage
      breadcrumb={
        <Breadcrumb
          label={tCommon('breadcrumb')}
          segments={[
            { label: t('list.title'), href: '/characters' },
            { label: character.name },
          ]}
        />
      }
      hero={
        <Card as="article" hero aria-labelledby={TITLE_ID}>
          <Stack direction="column" align="stretch">
            <Stack align="start" justify="space-between" wrap>
              <Stack align="center">
                <GameSystemIcon system={character.system} />
                <Stack direction="column" gap="xxs">
                  <Title order={3} id={TITLE_ID}>
                    {character.name}
                  </Title>
                  <Text tone="muted">{systemLabel}</Text>
                </Stack>
              </Stack>
              {editable && (
                <ConfirmDeleteButton
                  // id vinculado aqui; a permissão é checada no use case/API
                  action={deleteCharacterAction.bind(null, character.id)}
                  errorTitleKey="character.toast.error.delete"
                  labels={{
                    trigger: t('actions.delete'),
                    title: t('delete.title'),
                    confirm: t('delete.submit'),
                    cancel: t('delete.cancel'),
                    close: tCommon('actions.close'),
                  }}
                  description={t.rich('delete.confirm', {
                    name: character.name,
                    bold: (chunks) => <strong>{chunks}</strong>,
                  })}
                />
              )}
            </Stack>
            <HpControl
              current={character.currentHp ?? 0}
              max={getMaxHp(character)}
              editable={editable}
              updateHp={updateCharacterHpAction.bind(null, character.id)}
            />
          </Stack>
        </Card>
      }
    />
  );
}
