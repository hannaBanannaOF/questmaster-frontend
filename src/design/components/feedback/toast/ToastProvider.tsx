'use client';
import {
  PropsWithChildren,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from 'react';

import { Container } from '../../layout';
import { Title } from '../../typography';
import * as S from './styles';
import { ToastContext } from './ToastContext';
import { ToastType } from './types';

interface Toast {
  id: number;
  title: string | ReactNode;
  message: string | ReactNode;
  type: ToastType;
}

export const ToastProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef<Record<number, NodeJS.Timeout>>({});

  const removeToast = useCallback((id: number) => {
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }
    setToasts((state) => state.filter((t) => t.id !== id));
  }, []);

  const startTimer = useCallback(
    (id: number) => {
      if (timers.current[id]) {
        clearTimeout(timers.current[id]);
      }

      timers.current[id] = setTimeout(() => {
        removeToast(id);
      }, 5000);
    },
    [removeToast],
  );

  const addToast = useCallback(
    (
      title: string | ReactNode,
      message: string | ReactNode,
      type: ToastType = 'info',
    ) => {
      const id = Date.now();
      setToasts((state) => [...state, { title, id, message, type }]);
      startTimer(id);
    },
    [startTimer],
  );

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <S.ToastContainer>
        {toasts.map((toast) => (
          <S.ToastItem
            key={toast.id}
            $hover={false}
            $type={toast.type}
            $compact
            onMouseEnter={() => {
              if (timers.current[toast.id]) {
                clearTimeout(timers.current[toast.id]);
                delete timers.current[toast.id];
              }
            }}
            onMouseLeave={() => {
              startTimer(toast.id);
            }}
          >
            <Container direction="column">
              <Title order={4}>{toast.title}</Title>
              {toast.message}
            </Container>
          </S.ToastItem>
        ))}
      </S.ToastContainer>
    </ToastContext.Provider>
  );
};
