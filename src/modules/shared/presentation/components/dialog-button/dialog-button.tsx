'use client';

import {
  type ComponentProps,
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
  /** Estilo do botão que abre o diálogo; padrão sólido. */
  variant?: ComponentProps<typeof Button>['variant'];
  /** Só o ícone no celular (o rótulo vira nome acessível). */
  compactLabel?: boolean;
  icon?: ReactNode;
  title: string;
  description?: string;
  closeLabel: string;
  /** Gatilho próprio no lugar do Button (ex.: o card tracejado de "novo"). */
  renderTrigger?: (open: () => void) => ReactNode;
  /** Conteúdo do diálogo; montado só enquanto aberto (sempre começa limpo). */
  children: ReactNode;
}

/** Botão que abre um diálogo com o conteúdo recebido (renderizável no servidor). */
export function DialogButton({
  label,
  variant,
  compactLabel,
  icon,
  title,
  description,
  closeLabel,
  renderTrigger,
  children,
}: DialogButtonProps) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      {renderTrigger ? (
        renderTrigger(() => setOpen(true))
      ) : (
        <Button
          variant={variant}
          compactLabel={compactLabel}
          icon={icon}
          onClick={() => setOpen(true)}
        >
          {label}
        </Button>
      )}
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
