'use client';

import { CircleAlert, CircleCheck, Info, X } from 'lucide-react';
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { Button } from '../../atoms/button/button';
import styles from './toaster.module.css';

export type ToastType = 'info' | 'success' | 'error';

export interface ToastInput {
  title: string;
  message?: string;
  type?: ToastType;
}

interface Toast extends Required<Omit<ToastInput, 'message'>> {
  id: number;
  message?: string;
}

interface ToastContextValue {
  toast: (input: ToastInput) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const DISMISS_AFTER_MS = 5000;

// Um <dialog> modal fica acima de tudo e deixa o resto inerte: o aviso vai para dentro dele
const findHost = () => document.querySelector('dialog[open]');

const ICONS = { info: Info, success: CircleCheck, error: CircleAlert };

interface ToastProviderProps extends PropsWithChildren {
  /** Nome do botão que fecha um aviso de erro (já traduzido). */
  dismissLabel: string;
}

/**
 * Sucesso some em 5 s (pausa com mouse ou foco em cima); erro fica até fechar,
 * porque é a única explicação do que falhou.
 */
export function ToastProvider({ children, dismissLabel }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [host, setHost] = useState<Element | null>(null);
  const nextId = useRef(0);
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  const dismiss = useCallback((id: number) => {
    clearTimeout(timers.current.get(id));
    timers.current.delete(id);
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const scheduleDismiss = useCallback(
    (id: number) => {
      clearTimeout(timers.current.get(id));
      timers.current.set(
        id,
        setTimeout(() => dismiss(id), DISMISS_AFTER_MS),
      );
    },
    [dismiss],
  );

  const pauseDismiss = useCallback((id: number) => {
    clearTimeout(timers.current.get(id));
    timers.current.delete(id);
  }, []);

  const toast = useCallback(
    ({ title, message, type = 'info' }: ToastInput) => {
      const id = nextId.current++;
      setHost(findHost());
      // Um aviso igual a um aberto o substitui, em vez de empilhar cópias
      setToasts((current) => [
        ...current.filter(
          (item) =>
            item.title !== title ||
            item.message !== message ||
            item.type !== type,
        ),
        { id, title, message, type },
      ]);
      if (type !== 'error') scheduleDismiss(id);
    },
    [scheduleDismiss],
  );

  const value = useMemo(() => ({ toast }), [toast]);

  // Ao fechar o modal, os avisos voltam para a página
  useEffect(() => {
    const update = () => setHost(findHost());
    document.addEventListener('close', update, true);
    return () => document.removeEventListener('close', update, true);
  }, []);

  const region = (
    <ol className={styles.region} aria-live="polite">
      {toasts.map((item) => {
        const Icon = ICONS[item.type];
        const timed = item.type !== 'error';
        return (
          <li
            key={item.id}
            className={styles.toast}
            data-type={item.type}
            role={item.type === 'error' ? 'alert' : 'status'}
            onMouseEnter={timed ? () => pauseDismiss(item.id) : undefined}
            onMouseLeave={timed ? () => scheduleDismiss(item.id) : undefined}
            onFocus={timed ? () => pauseDismiss(item.id) : undefined}
            onBlur={timed ? () => scheduleDismiss(item.id) : undefined}
          >
            <span className={styles.icon} aria-hidden>
              <Icon />
            </span>
            <div className={styles.content}>
              <p className={styles.title}>{item.title}</p>
              {item.message && (
                <p className={styles.description}>{item.message}</p>
              )}
            </div>
            {!timed && (
              <Button
                variant="ghost"
                icon={<X size={18} />}
                aria-label={dismissLabel}
                onClick={() => dismiss(item.id)}
              />
            )}
          </li>
        );
      })}
    </ol>
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      {host ? createPortal(region, host) : region}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast precisa estar dentro de <ToastProvider>');
  }
  return context;
}
