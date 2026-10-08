'use client';

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';

import { Button, Dialog } from '@/src/design';

const CloseDialogContext = createContext<() => void>(() => {});

/** Fecha o diálogo do <DialogButton> mais próximo (ex.: form salvo com sucesso). */
export function useCloseDialog() {
  return useContext(CloseDialogContext);
}

interface DialogButtonProps {
  label: string;
  icon?: ReactNode;
  title: string;
  description?: string;
  closeLabel: string;
  /** Conteúdo do diálogo; montado só enquanto aberto (sempre começa limpo). */
  children: ReactNode;
}

/** Botão que abre um diálogo com o conteúdo recebido (renderizável no servidor). */
export function DialogButton({
  label,
  icon,
  title,
  description,
  closeLabel,
  children,
}: DialogButtonProps) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <Button icon={icon} onClick={() => setOpen(true)}>
        {label}
      </Button>
      <Dialog
        open={open}
        onClose={close}
        title={title}
        description={description}
        closeLabel={closeLabel}
      >
        {open && (
          <CloseDialogContext.Provider value={close}>
            {children}
          </CloseDialogContext.Provider>
        )}
      </Dialog>
    </>
  );
}
