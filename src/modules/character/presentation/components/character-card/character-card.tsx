import { Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { IconText, Stack, Text, Title } from '@/src/design';
import { GameSystemIcon, getGameSystemMeta } from '@/src/modules/rpg';
import { CardLink } from '@/src/modules/shared/presentation';

import type { CharacterSummary } from '../../../domain';

export function CharacterCard({ character }: { character: CharacterSummary }) {
  const t = useTranslations('character.list');
  const { label: systemLabel } = getGameSystemMeta(character.system);

  return (
    <CardLink href={`/characters/${character.slug}`}>
      <Stack align="center">
        <GameSystemIcon system={character.system} />
        <Stack direction="column">
          <Stack direction="column" gap="xxs">
            <Title order={3}>{character.name}</Title>
            <Text tone="muted">{systemLabel}</Text>
          </Stack>
          {character.currentHp !== undefined && (
            <IconText tone="danger" icon={<Heart size={16} />}>
              {t('hp', { value: character.currentHp })}
            </IconText>
          )}
        </Stack>
      </Stack>
    </CardLink>
  );
}
