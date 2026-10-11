import { Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { IconText, Stack, Text, Title } from '@/src/design';
import { GameSystemIcon, getGameSystemMeta } from '@/src/modules/rpg';
import { CardLink, LastAccess } from '@/src/modules/shared/presentation';

import { type CharacterSummary, clampHp, getMaxHp } from '../../../domain';
import styles from './character-card.module.css';

export function CharacterCard({ character }: { character: CharacterSummary }) {
  const t = useTranslations('character.list');
  const { label: systemLabel } = getGameSystemMeta(character.system);
  const maxHp = getMaxHp(character);

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
            <Stack direction="column" gap="xxs">
              <IconText tone="danger" icon={<Heart size={16} />}>
                {t('hpOf', { value: character.currentHp, max: maxHp })}
              </IconText>
              {/* O texto já diz o valor; a barra é só o reforço visual */}
              <span className={styles.track} aria-hidden>
                <span
                  className={styles.fill}
                  style={{
                    width: `${maxHp > 0 ? (clampHp(character.currentHp, maxHp) / maxHp) * 100 : 0}%`,
                  }}
                />
              </span>
            </Stack>
          )}
          <LastAccess date={character.lastAccessedAt} />
        </Stack>
      </Stack>
    </CardLink>
  );
}
