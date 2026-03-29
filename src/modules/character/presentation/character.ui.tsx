import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { Card, Container, Text, Title } from '@/src/design/design-system';

import { getRpgKindMeta } from '../../rpg/presentation/rpg-kind.meta';
import { RpgKindIcon } from '../../rpg/presentation/rpg-kind.ui';
import { Character } from '../domain/character.types';

export function CharacterListCard({ character }: { character: Character }) {
  const kindMeta = getRpgKindMeta(character.system);
  return (
    <Link href="/">
      <Card>
        <Container align="center" justify="space-between">
          <Container>
            <RpgKindIcon kind={character.system} />
            <Container direction="column" compact>
              <Title order={3}>{character.name}</Title>
              <Text muted>{kindMeta.label}</Text>
            </Container>
          </Container>
          <ChevronRight display="flex" />
        </Container>
      </Card>
    </Link>
  );
}
