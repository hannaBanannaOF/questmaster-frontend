import { Users } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { ButtonLink, DetailPage, ListState } from '@/src/design';

/** Ficha excluída ou sem acesso: um estado só, sem revelar se ela existe. */
export async function CharacterNotFoundView() {
  const t = await getTranslations('character.detail');
  return (
    <DetailPage back={{ href: '/characters', label: t('back') }}>
      <ListState
        id="character-not-found"
        headingLevel={1}
        icon={<Users />}
        title={t('notFound.title')}
        message={t('notFound.message')}
        actions={
          <ButtonLink href="/characters" variant="secondary">
            {t('notFound.back')}
          </ButtonLink>
        }
      />
    </DetailPage>
  );
}
