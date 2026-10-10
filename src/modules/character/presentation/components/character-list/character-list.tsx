import { List, ListItem } from '@/src/design';

import type { CharacterSummary } from '../../../domain';
import { CharacterCard } from '../character-card/character-card';

export function CharacterList({
  characters,
}: {
  characters: CharacterSummary[];
}) {
  return (
    <List>
      {characters.map((character) => (
        <ListItem key={character.slug}>
          <CharacterCard character={character} />
        </ListItem>
      ))}
    </List>
  );
}
