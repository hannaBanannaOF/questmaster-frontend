'use client';

import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Text } from '../../atoms/text/text';
import { Title } from '../../atoms/title/title';
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

export function ToastProvider({ children }: PropsWithChildren) {
  const [toasts, setToasts] = useState<Toast[]>([]);
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
      setToasts((current) => [...current, { id, title, message, type }]);
      scheduleDismiss(id);
    },
    [scheduleDismiss],
  );

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ol className={styles.region} aria-live="polite">
        {toasts.map((item) => (
          <li
            key={item.id}
            className={styles.toast}
            data-type={item.type}
            role={item.type === 'error' ? 'alert' : 'status'}
            onMouseEnter={() => pauseDismiss(item.id)}
            onMouseLeave={() => scheduleDismiss(item.id)}
          >
            <Title order={4}>{item.title}</Title>
            {item.message && <Text>{item.message}</Text>}
          </li>
        ))}
      </ol>
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
