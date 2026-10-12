import { Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import { Badge, Card, Stack, Title } from '@/src/design';
// Caminho direto: o barrel de character carrega loaders server-only
import { CharacterCard } from '@/src/modules/character/presentation/components/character-card/character-card';
import type { GameSystem } from '@/src/modules/rpg/domain';

import type { CampaignCharacter } from '../../../domain';
import styles from './campaign-characters.module.css';

const HEADING_ID = 'campaign-characters';

export function CampaignCharacters({
  characters,
  system,
  empty,
}: {
  characters: CampaignCharacter[];
  /** As fichas da campanha são todas do sistema dela. */
  system: GameSystem;
  /** Mostrado no lugar da grade quando a campanha não tem jogadores. */
  empty?: ReactNode;
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
      {characters.length === 0 ? (
        empty
      ) : (
        <ul className={styles.grid} aria-labelledby={HEADING_ID}>
          {characters.map(({ id, slug, name, currentHp, maxHp, isMine }) => (
            <li key={id}>
              {slug ? (
                <CharacterCard
                  character={{ slug, name, system, currentHp, maxHp }}
                  tag={isMine && <Badge tone="info">{t('mine')}</Badge>}
                />
              ) : (
                // Sem slug o core ainda não publicou o link da ficha
                <Card>
                  <Title order={4}>{name}</Title>
                </Card>
              )}
            </li>
          ))}
        </ul>
      )}
    </Stack>
  );
}
