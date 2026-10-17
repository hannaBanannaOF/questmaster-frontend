'use client';

import { useTranslations } from 'next-intl';
import { useActionState } from 'react';

import { Button, SubmitButton, TextField } from '@/src/design';
import { type FormState, initialFormState } from '@/src/lib/actions';
import type { GameSystem } from '@/src/modules/rpg/domain';
import { getGameSystemMeta } from '@/src/modules/rpg/presentation/game-system.meta';
import { useCloseDialog } from '@/src/modules/shared/presentation/components/dialog-button/dialog-button';
import { useFormErrorToast } from '@/src/modules/shared/presentation/hooks/use-action-feedback';

import type { CharacterEditFormField } from '../../character.schema';
import formStyles from '../character-create-form/character-create-form.module.css';
import styles from '../character-sheet/character-sheet.module.css';

type State = FormState<CharacterEditFormField>;

/** Form de edição (dentro do modal): só o nome; o sucesso leva ao slug novo. */
export function CharacterEditForm({
  action,
  name,
  system,
}: {
  /** Server Action já vinculada ao id do personagem. */
  action: (state: State, formData: FormData) => Promise<State>;
  name: string;
  system: GameSystem;
}) {
  const t = useTranslations();
  const closeDialog = useCloseDialog();
  const [state, formAction] = useActionState(action, initialFormState as State);
  useFormErrorToast(state, 'character.toast.error.update');
  const { label: systemLabel, icon: SystemIcon } = getGameSystemMeta(system);

  const error = state.fieldErrors?.name;
  const label = (path: string) => t(`character.edit.form.${path}`);

  return (
    <form action={formAction} noValidate className={formStyles.form}>
      <TextField
        name="name"
        label={label('name.label')}
        required
        maxLength={255}
        defaultValue={state.values?.name ?? name}
        error={error ? t(error) : undefined}
      />
      <div>
        <p id="edit-system-label" className={styles.label}>
          {label('system.label')}
        </p>
        <p
          className={styles.readonly}
          aria-labelledby="edit-system-label"
          aria-describedby="edit-system-description"
        >
          <SystemIcon size={16} />
          {systemLabel}
        </p>
        <p id="edit-system-description" className={styles.muted}>
          {label('system.description')}
        </p>
      </div>
      <div className={formStyles.footer}>
        <Button variant="tertiary" onClick={closeDialog}>
          {label('cancel')}
        </Button>
        <SubmitButton variant="primary">{label('submit')}</SubmitButton>
      </div>
    </form>
  );
}
