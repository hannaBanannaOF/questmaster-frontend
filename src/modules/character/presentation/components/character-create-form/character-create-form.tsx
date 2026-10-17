'use client';

import { Dices, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useActionState, useState } from 'react';

import { Button, SelectField, SubmitButton, TextField } from '@/src/design';
import { type FormState, initialFormState } from '@/src/lib/actions';
import { GameSystem, isGameSystem } from '@/src/modules/rpg/domain';
import {
  getGameSystemMeta,
  getGameSystemOptions,
} from '@/src/modules/rpg/presentation/game-system.meta';
import { useCloseDialog } from '@/src/modules/shared/presentation/components/dialog-button/dialog-button';
import { useFormErrorToast } from '@/src/modules/shared/presentation/hooks/use-action-feedback';

import { createCharacterAction } from '../../character.actions';
import type { CharacterFormField } from '../../character.schema';
import styles from './character-create-form.module.css';

/**
 * Form de criação (dentro do modal): nome e sistema; PV saiu porque não é
 * comum a todos os sistemas. A Server Action valida e leva à ficha nova.
 */
export function CharacterCreateForm({ returnTo }: { returnTo?: string }) {
  const t = useTranslations();
  const closeDialog = useCloseDialog();
  const [state, formAction] = useActionState(
    createCharacterAction,
    initialFormState as FormState<CharacterFormField>,
  );
  useFormErrorToast(state, 'character.toast.error.create');
  // Só para o glifo ao lado do valor; o select segue não controlado
  const [system, setSystem] = useState(state.values?.system ?? '');

  const fieldError = (field: CharacterFormField) => {
    const key = state.fieldErrors?.[field];
    return key ? t(key) : undefined;
  };
  const label = (path: string) => t(`character.create.form.${path}`);
  const SystemIcon = isGameSystem(system)
    ? getGameSystemMeta(system as GameSystem).icon
    : Dices;

  return (
    <form action={formAction} noValidate className={styles.form}>
      {returnTo && <input type="hidden" name="returnTo" value={returnTo} />}
      <TextField
        name="name"
        label={label('name.label')}
        placeholder={label('name.placeholder')}
        required
        maxLength={255}
        defaultValue={state.values?.name}
        error={fieldError('name')}
      />
      <SelectField
        name="system"
        label={label('game_system.label')}
        placeholder={label('game_system.placeholder')}
        description={label('game_system.description')}
        options={getGameSystemOptions()}
        required
        defaultValue={state.values?.system ?? ''}
        onChange={(event) => setSystem(event.currentTarget.value)}
        startContent={<SystemIcon size={18} />}
        error={fieldError('system')}
      />
      <div className={styles.footer}>
        <Button variant="tertiary" onClick={closeDialog}>
          {label('cancel')}
        </Button>
        <SubmitButton variant="primary" icon={<Plus size={18} />}>
          {label('submit')}
        </SubmitButton>
      </div>
    </form>
  );
}
