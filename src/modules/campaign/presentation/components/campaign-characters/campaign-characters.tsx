import { Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Card, List, ListItem, Stack, Title } from '@/src/design';

import type { CampaignCharacter } from '../../../domain';

const HEADING_ID = 'campaign-characters';

export function CampaignCharacters({
  characters,
}: {
  characters: CampaignCharacter[];
}) {
  const t = useTranslations('campaign');

  return (
    <Stack as="section" direction="column" align="stretch">
      <Stack align="center">
        <Users size={24} color="var(--color-primary)" aria-hidden />
        <Title order={3} id={HEADING_ID}>
          {t('characters')} ({characters.length})
        </Title>
      </Stack>
      <List aria-labelledby={HEADING_ID}>
        {characters.map((character) => (
          <ListItem key={character.id}>
            <Card>
              <Title order={4}>{character.name}</Title>
            </Card>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
