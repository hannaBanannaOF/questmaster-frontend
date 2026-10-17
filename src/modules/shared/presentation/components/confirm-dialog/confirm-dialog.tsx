'use client';

import { TriangleAlert } from 'lucide-react';
import { type ReactNode, useActionState, useEffect, useRef } from 'react';

import { Button, Dialog, SubmitButton } from '@/src/design';
import { type FormState, initialFormState } from '@/src/lib/actions';

import { useFormErrorToast } from '../../hooks/use-action-feedback';
import styles from './confirm-dialog.module.css';

export interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  /** Server Action já vinculada ao recurso (bind no servidor). */
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  /** Título com o nome da coisa, ex.: "Encerrar Boston Noir?". */
  title: string;
  /** A consequência, em uma frase. */
  description: ReactNode;
  /** Mesmo verbo do botão que abriu, ex.: "Encerrar campanha". */
  confirmLabel: string;
  cancelLabel: string;
  /** Rótulo do botão de fechar do Dialog (não aparece no modo alerta). */
  closeLabel: string;
  /** Chave de tradução do título do toast de erro. */
  errorTitleKey: string;
  icon?: ReactNode;
}

/** AlertDialog do HeroUI: confirma uma ação destrutiva antes de chamar a action. */
export function ConfirmDialog({
  open,
  onClose,
  action,
  title,
  description,
  confirmLabel,
  cancelLabel,
  closeLabel,
  errorTitleKey,
  icon = <TriangleAlert />,
}: ConfirmDialogProps) {
  const [state, formAction] = useActionState(action, initialFormState);
  useFormErrorToast(state, errorTitleKey);

  // Sucesso sem redirect (ex.: encerrar): a página revalida e o diálogo fecha.
  // Só reage a um resultado novo; reabrir depois não fecha sozinho.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  useEffect(() => {
    if (state.status === 'success') onCloseRef.current();
  }, [state]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={title}
      description={typeof description === 'string' ? description : undefined}
      closeLabel={closeLabel}
      alertIcon={icon}
    >
      <form action={formAction} className={styles.form}>
        {typeof description !== 'string' && (
          <p className={styles.description}>{description}</p>
        )}
        <div className={styles.footer}>
          <Button variant="tertiary" onClick={onClose}>
            {cancelLabel}
          </Button>
          <SubmitButton variant="danger">{confirmLabel}</SubmitButton>
        </div>
      </form>
    </Dialog>
  );
}
