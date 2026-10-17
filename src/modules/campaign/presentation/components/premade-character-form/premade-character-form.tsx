'use client';

import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useActionState, useEffect } from 'react';

import { Button, SubmitButton, TextField, useToast } from '@/src/design';
import { type FormState, initialFormState } from '@/src/lib/actions';
import type { GameSystem } from '@/src/modules/rpg/domain';
import { getGameSystemMeta } from '@/src/modules/rpg/presentation/game-system.meta';
import { useCloseDialog } from '@/src/modules/shared/presentation/components/dialog-button/dialog-button';
import { useFormErrorToast } from '@/src/modules/shared/presentation/hooks/use-action-feedback';

import type { PremadeCharacterFormField } from '../../campaign.schema';
import styles from '../campaign-create-form/campaign-create-form.module.css';

type State = FormState<PremadeCharacterFormField>;

/**
 * Form de ficha pronta (dentro do modal): só o nome. O sistema é o da
 * campanha e só é informado; PV saiu porque não é comum a todos os sistemas.
 */
export function PremadeCharacterForm({
  action,
  system,
}: {
  /** Server Action já vinculada ao id da campanha. */
  action: (state: State, formData: FormData) => Promise<State>;
  system: GameSystem;
}) {
  const t = useTranslations();
  const { toast } = useToast();
  const closeDialog = useCloseDialog();
  const [state, formAction] = useActionState(action, initialFormState as State);
  useFormErrorToast(state, 'campaign.premade.toast.error.create');
  const { label: systemLabel, icon: SystemIcon } = getGameSystemMeta(system);

  useEffect(() => {
    if (state.status !== 'success') return;
    toast({
      type: 'success',
      title: t('campaign.premade.toast.success.create.title'),
      message: t('campaign.premade.toast.success.create.message', {
        name: state.values?.name ?? '',
      }),
    });
    closeDialog();
  }, [state, t, toast, closeDialog]);

  const fieldError = (field: PremadeCharacterFormField) => {
    const key = state.fieldErrors?.[field];
    return key ? t(key) : undefined;
  };
  const label = (path: string) => t(`campaign.premade.form.${path}`);

  return (
    <form action={formAction} noValidate className={styles.form}>
      <TextField
        name="name"
        label={label('name.label')}
        placeholder={label('name.placeholder')}
        required
        maxLength={255}
        defaultValue={state.values?.name}
        error={fieldError('name')}
      />
      <p className={styles.system}>
        <SystemIcon size={16} />
        {t('campaign.premade.form.system', { system: systemLabel })}
      </p>
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
