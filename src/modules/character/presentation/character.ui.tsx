import { ChevronRight, Heart } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useTheme } from 'styled-components';

import {
  Breadcrumb,
  Card,
  Container,
  IconSpan,
  Skeleton,
  Text,
  Title,
} from '@/src/design/design-system';

import { getGameSystemMeta } from '../../rpg/presentation/game-system.meta';
import { GameSystemIcon } from '../../rpg/presentation/game-system.ui';
import { Character } from '../domain/character.types';
import * as S from './character.styles';

export function CharacterListCard({ character }: { character: Character }) {
  const systemMeta = getGameSystemMeta(character.system);
  const theme = useTheme();
  return (
    <Link href={`/characters/${character.slug}`}>
      <Card>
        <Container align="center" justify="space-between">
          <Container>
            <GameSystemIcon system={character.system} />
            <Container direction="column">
              <Container direction="column" compact>
                <Title order={3}>{character.name}</Title>
                <Text muted>{systemMeta.label}</Text>
              </Container>
              {character.currentHp && (
                <IconSpan
                  color={theme.colors.destructive.default}
                  icon={<Heart size={16} display="flex" />}
                  data={`${character.currentHp} HP`}
                />
              )}
            </Container>
          </Container>
          <ChevronRight display="flex" />
        </Container>
      </Card>
    </Link>
  );
}

function HPBar({ value, max }: { value: number; max: number }) {
  const percent = Math.max(0, Math.min(100, (value / max) * 100));

  return (
    <Container direction="column" align="stretch" compact>
      <Container justify="space-between">
        <Text muted>Hit points</Text>
        <S.HpBarLabel>
          {value} / {max}
        </S.HpBarLabel>
      </Container>
      <S.HpBarContainer>
        <S.HpBarFill $percent={percent} />
      </S.HpBarContainer>
    </Container>
  );
}

export function CharacterDetailContainer({
  character,
  loading,
}: {
  character: Character;
  loading?: boolean;
}) {
  const t = useTranslations('character');
  const systemMeta = getGameSystemMeta(character.system);
  return (
    <Container direction="column" align="stretch">
      <Skeleton loading={loading}>
        <Breadcrumb
          segments={[
            { label: t('list.title'), href: '/characters' },
            { label: character.name },
          ]}
        />
      </Skeleton>
      <Card hover={false} hero>
        <Container direction="column" align="stretch">
          <Container align="center">
            <Skeleton loading={loading}>
              <GameSystemIcon system={character.system} />
            </Skeleton>
            <Container direction="column" compact>
              <Skeleton loading={loading}>
                <Title order={2}>{character.name}</Title>
              </Skeleton>
              <Skeleton loading={loading}>
                <Text muted>{systemMeta.label}</Text>
              </Skeleton>
            </Container>
          </Container>
          <Skeleton loading={loading}>
            <HPBar
              value={character.currentHp ?? 0}
              max={character.maxHp ?? 100}
            />
          </Skeleton>
        </Container>
      </Card>
    </Container>
  );
}
