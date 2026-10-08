'use client';

import { Trash2 } from 'lucide-react';
import { type ReactNode, useActionState, useState } from 'react';

import { Button, Dialog, Stack, SubmitButton, Text } from '@/src/design';
import { type FormState, initialFormState } from '@/src/lib/actions';

import { useFormErrorToast } from '../../hooks/use-action-feedback';

interface ConfirmDeleteButtonProps {
  /** Server Action já vinculada ao id do recurso (bind no servidor). */
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  labels: {
    trigger: string;
    title: string;
    confirm: string;
    cancel: string;
    close: string;
  };
  /** Chave de tradução do título do toast de erro. */
  errorTitleKey: string;
  description: ReactNode;
}

/** Botão de excluir que pede confirmação num diálogo antes de chamar a action. */
export function ConfirmDeleteButton({
  action,
  labels,
  errorTitleKey,
  description,
}: ConfirmDeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useActionState(action, initialFormState);
  useFormErrorToast(state, errorTitleKey);

  const close = () => setOpen(false);

  return (
    <>
      <Button
        variant="outline"
        color="danger"
        icon={<Trash2 size={12} />}
        onClick={() => setOpen(true)}
      >
        {labels.trigger}
      </Button>
      <Dialog
        open={open}
        onClose={close}
        title={labels.title}
        closeLabel={labels.close}
      >
        <form action={formAction}>
          <Stack direction="column" align="stretch">
            <Text>{description}</Text>
            <Stack justify="end">
              <Button variant="text" onClick={close}>
                {labels.cancel}
              </Button>
              <SubmitButton color="danger">{labels.confirm}</SubmitButton>
            </Stack>
          </Stack>
        </form>
      </Dialog>
    </>
  );
}
