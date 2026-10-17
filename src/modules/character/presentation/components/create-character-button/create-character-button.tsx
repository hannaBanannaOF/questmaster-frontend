import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ComponentProps } from 'react';

import { DialogButton } from '@/src/modules/shared/presentation';

import { CharacterCreateForm } from '../character-create-form/character-create-form';

type DialogButtonStyle = Pick<
  ComponentProps<typeof DialogButton>,
  'variant' | 'compactLabel'
>;

/** Abre o form de novo personagem num modal. */
export function CreateCharacterButton({
  label,
  returnTo,
  ...style
}: {
  label: string;
  /** Volta para cá depois de criar (ex.: o convite) em vez de ir para a ficha. */
  returnTo?: string;
} & DialogButtonStyle) {
  const t = useTranslations();
  return (
    <DialogButton
      label={label}
      {...style}
      icon={<Plus size={20} />}
      title={t('character.create.title')}
      description={t('character.create.subtitle')}
      closeLabel={t('common.actions.close')}
    >
      <CharacterCreateForm returnTo={returnTo} />
    </DialogButton>
  );
}
