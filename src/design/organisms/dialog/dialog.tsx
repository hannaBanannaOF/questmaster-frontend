'use client';

import { X } from 'lucide-react';
import {
  type MouseEvent,
  type PropsWithChildren,
  type ReactNode,
  useEffect,
  useId,
  useRef,
} from 'react';

import styles from './dialog.module.css';

interface DialogProps extends PropsWithChildren {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  /** Nome acessível do botão de fechar (já traduzido). */
  closeLabel: string;
  /**
   * AlertDialog: confirmação com ícone, sem o X (sai por "Cancelar" ou Esc).
   * A descrição é a consequência, em uma frase.
   */
  alertIcon?: ReactNode;
}

/**
 * Modal do HeroUI v3 sobre o <dialog> nativo (foco preso, Esc e fundo inerte
 * de graça): folha que sobe de baixo no celular, centralizado a partir de 48rem.
 * Fecha com Esc, clique fora ou no botão de fechar.
 */
export function Dialog({
  open,
  onClose,
  title,
  description,
  closeLabel,
  alertIcon,
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
      role={alertIcon ? 'alertdialog' : undefined}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onClose={onClose}
      onClick={handleClick}
    >
      <div className={styles.content}>
        <span className={styles.grabber} aria-hidden />
        {!alertIcon && (
          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label={closeLabel}
          >
            <X size={20} />
          </button>
        )}
        <header
          className={styles.header}
          data-alert={alertIcon ? '' : undefined}
        >
          {alertIcon && (
            <span className={styles.alertIcon} aria-hidden>
              {alertIcon}
            </span>
          )}
          <h2 id={titleId} className={styles.heading}>
            {title}
          </h2>
          {description && (
            <p id={descriptionId} className={styles.description}>
              {description}
            </p>
          )}
        </header>
        <div className={styles.body}>{children}</div>
      </div>
    </dialog>
  );
}
