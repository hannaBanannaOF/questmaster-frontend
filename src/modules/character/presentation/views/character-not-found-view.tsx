import { getTranslations } from 'next-intl/server';

import { ResourceNotFound } from '@/src/modules/shared/presentation';

export async function CharacterNotFoundView() {
  const t = await getTranslations('character.detail.notFound');
  return (
    <ResourceNotFound
      title={t('title')}
      message={t('message')}
      backHref="/characters"
      backLabel={t('back')}
    />
  );
}
