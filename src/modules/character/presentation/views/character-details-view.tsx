import { getTranslations } from 'next-intl/server';

import { DetailPage } from '@/src/design';

import { getCharacterBySlug } from '../character.loaders';
import { CharacterCampaignSection } from '../components/character-sheet/character-campaign-section';
import { CharacterSheetHeader } from '../components/character-sheet/character-sheet-header';

/** Uma coluna, como a campanha: voltar → cabeçalho → campanha. */
export async function CharacterDetailsView({ slug }: { slug: string }) {
  const [character, t] = await Promise.all([
    getCharacterBySlug(slug),
    getTranslations('character.detail'),
  ]);

  return (
    <DetailPage back={{ href: '/characters', label: t('back') }}>
      <CharacterSheetHeader character={character} />
      {/* Ausente: core anterior a character-details-context, sem como saber */}
      {character.campaign !== undefined && (
        <CharacterCampaignSection character={character} />
      )}
    </DetailPage>
  );
}
