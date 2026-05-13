import { ChevronRight, Heart } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'styled-components';

import { Card, Container, IconSpan, Text, Title } from '@/src/design';
import { GameSystemIcon, getGameSystemMeta } from '@/src/modules/rpg';

import { Character } from '../../../domain/character.types';

export function CharacterListCard({ character }: { character: Character }) {
  const systemMeta = getGameSystemMeta(character.system);
  const theme = useTheme();
  return (
    <Link href={`/characters/${character.slug}`}>
      <Card hover>
        <Container align="center" justify="space-between">
          <Container>
            <GameSystemIcon system={character.system} />
            <Container direction="column">
              <Container direction="column" compact>
                <Title order={3}>{character.name}</Title>
                <Text variant="muted">{systemMeta.label}</Text>
              </Container>
              {character.currentHp !== undefined && (
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
