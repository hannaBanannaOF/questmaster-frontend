import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { DialogButton } from '@/src/modules/shared/presentation';

import { CharacterCreateForm } from '../character-create-form/character-create-form';

/** Abre o form de novo personagem num modal. */
export function CreateCharacterButton({ label }: { label: string }) {
  const t = useTranslations();
  return (
    <DialogButton
      label={label}
      icon={<Plus size={20} />}
      title={t('character.create.title')}
      description={t('character.create.subtitle')}
      closeLabel={t('common.actions.close')}
    >
      <CharacterCreateForm />
    </DialogButton>
  );
}
