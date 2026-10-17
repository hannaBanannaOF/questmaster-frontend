'use client';

import { Trash2 } from 'lucide-react';
import { type ReactNode, useState } from 'react';

import { Button } from '@/src/design';
import type { FormState } from '@/src/lib/actions';

import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';

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
  /** Ícone do botão que abre a confirmação; padrão lixeira. */
  icon?: ReactNode;
  /** Visual do botão que abre; padrão vermelho suave. */
  triggerVariant?: 'danger-soft' | 'ghost';
  className?: string;
}

/** Botão vermelho suave que pede confirmação (AlertDialog) antes de chamar a action. */
export function ConfirmDeleteButton({
  action,
  labels,
  errorTitleKey,
  description,
  icon = <Trash2 size={18} />,
  triggerVariant = 'danger-soft',
  className,
}: ConfirmDeleteButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant={triggerVariant}
        icon={icon}
        className={className}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        {labels.trigger}
      </Button>
      <ConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        action={action}
        title={labels.title}
        description={description}
        confirmLabel={labels.confirm}
        cancelLabel={labels.cancel}
        closeLabel={labels.close}
        errorTitleKey={errorTitleKey}
        icon={icon}
      />
    </>
  );
}
