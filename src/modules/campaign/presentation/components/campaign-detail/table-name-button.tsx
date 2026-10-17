'use client';

import { Pencil } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useActionState, useEffect } from 'react';

import { Button, SubmitButton, TextField, useToast } from '@/src/design';
import { type FormState, initialFormState } from '@/src/lib/actions';
import {
  DialogButton,
  useCloseDialog,
} from '@/src/modules/shared/presentation/components/dialog-button/dialog-button';
import { useFormErrorToast } from '@/src/modules/shared/presentation/hooks/use-action-feedback';

import { updateTableNameAction } from '../../campaign.actions';
import { TABLE_NAME_MAX, type TableNameFormField } from '../../campaign.schema';
import formStyles from '../campaign-create-form/campaign-create-form.module.css';
import styles from './campaign-detail.module.css';

type State = FormState<TableNameFormField>;

interface TableNameButtonProps {
  campaignId: number;
  campaignName: string;
  /** Apelido atual; vazio quando o core ainda não tem um. */
  name?: string;
}

/** Lápis ao lado de "Você mestra/joga como …": muda o próprio apelido nesta campanha. */
export function TableNameButton({
  campaignId,
  campaignName,
  name,
}: TableNameButtonProps) {
  const t = useTranslations('campaign.tableName');

  return (
    <DialogButton
      label={t('edit')}
      title={t('title')}
      description={t('subtitle', { campaign: campaignName })}
      closeLabel={t('form.cancel')}
      renderTrigger={(open) => (
        <button
          type="button"
          className={styles.nickEdit}
          aria-haspopup="dialog"
          aria-label={t('edit')}
          onClick={open}
        >
          <Pencil aria-hidden />
        </button>
      )}
    >
      <TableNameForm campaignId={campaignId} name={name} />
    </DialogButton>
  );
}

function TableNameForm({
  campaignId,
  name,
}: Pick<TableNameButtonProps, 'campaignId' | 'name'>) {
  const t = useTranslations('campaign.tableName');
  const tRoot = useTranslations();
  const { toast } = useToast();
  const closeDialog = useCloseDialog();
  const [state, formAction] = useActionState(
    updateTableNameAction.bind(null, campaignId),
    initialFormState as State,
  );
  useFormErrorToast(state, 'campaign.tableName.toast.error');

  useEffect(() => {
    if (state.status !== 'success') return;
    toast({ type: 'success', title: t('toast.success') });
    closeDialog();
  }, [state, t, toast, closeDialog]);

  const error = state.fieldErrors?.name;

  return (
    <form action={formAction} noValidate className={formStyles.form}>
      <TextField
        name="name"
        label={t('form.label')}
        description={t('form.description')}
        required
        maxLength={TABLE_NAME_MAX}
        defaultValue={state.values?.name ?? name}
        error={error ? tRoot(error) : undefined}
      />
      <div className={formStyles.footer}>
        <Button variant="tertiary" onClick={closeDialog}>
          {t('form.cancel')}
        </Button>
        <SubmitButton variant="primary">{t('form.submit')}</SubmitButton>
      </div>
    </form>
  );
}
