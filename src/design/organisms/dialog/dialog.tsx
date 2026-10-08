'use client';

import { X } from 'lucide-react';
import {
  type MouseEvent,
  type PropsWithChildren,
  useEffect,
  useId,
  useRef,
} from 'react';

import { Text } from '../../atoms/text/text';
import { Title } from '../../atoms/title/title';
import styles from './dialog.module.css';

interface DialogProps extends PropsWithChildren {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  /** Nome acessível do botão de fechar (já traduzido). */
  closeLabel: string;
}

/**
 * Modal baseado no <dialog> nativo: foco preso, Esc e backdrop de graça.
 * Fecha com Esc, clique fora ou no botão de fechar.
 */
export function Dialog({
  open,
  onClose,
  title,
  description,
  closeLabel,
  children,
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // O <dialog> ocupa só a área do conteúdo; clique nele mesmo = backdrop
  const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onClose={onClose}
      onClick={handleClick}
    >
      <div className={styles.content}>
        <div className={styles.header}>
          <Title order={2} id={titleId}>
            {title}
          </Title>
          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label={closeLabel}
          >
            <X size={20} />
          </button>
        </div>
        {description && (
          <Text tone="muted" id={descriptionId}>
            {description}
          </Text>
        )}
        <div className={styles.body}>{children}</div>
      </div>
    </dialog>
  );
}
