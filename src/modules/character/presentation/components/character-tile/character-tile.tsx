import { Map as MapIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Avatar, Chip, SurfaceLink } from '@/src/design';
import { SystemTag } from '@/src/modules/rpg';

import type { CharacterSummary } from '../../../domain';
import styles from './character-tile.module.css';

/** Card de ficha: sistema no topo, iniciais e nome, e a campanha em que está. */
export function CharacterTile({ character }: { character: CharacterSummary }) {
  const t = useTranslations('character.tile');
  const { campaign } = character;

  return (
    <SurfaceLink href={`/characters/${character.slug}`} className={styles.tile}>
      <SystemTag system={character.system} />
      <div className={styles.who}>
        <Avatar name={character.name} size="lg" ring />
        <h3 className={styles.name}>{character.name}</h3>
      </div>
      {/* Ausente: core antigo, que não diz a campanha; melhor nada que "Sem campanha" errado */}
      {campaign !== undefined && (
        <span className={styles.campaign}>
          {campaign ? (
            <>
              <MapIcon aria-hidden />
              <span className={styles.campaignName}>
                <span className="visually-hidden">{t('campaign')} </span>
                {campaign.name}
              </span>
            </>
          ) : (
            <Chip>{t('noCampaign')}</Chip>
          )}
        </span>
      )}
    </SurfaceLink>
  );
}
