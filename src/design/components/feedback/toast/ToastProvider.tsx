'use client';
import { ReactNode, useCallback, useRef, useState } from 'react';

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

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Guardamos os timers aqui para acessá-los fora do escopo de criação
  const timers = useRef<Record<number, NodeJS.Timeout>>({});

  const removeToast = useCallback((id: number) => {
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }
    setToasts((state) => state.filter((t) => t.id !== id));
  }, []);

  const startTimer = useCallback((id: number) => {
    // Se já existir um timer para esse ID, limpamos antes de começar outro (reset)
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
    }

    timers.current[id] = setTimeout(() => {
      removeToast(id);
    }, 5000);
  }, [removeToast]);

  const addToast = useCallback((title: string | ReactNode, message: string | ReactNode, type: ToastType = 'info') => {
    const id = Date.now();
    setToasts((state) => [...state, { title, id, message, type }]);
    startTimer(id);
  }, [startTimer]);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <S.ToastContainer>
        {toasts.map((toast) => (
          <S.ToastItem key={toast.id} $hover={false} $type={toast.type} $compact onMouseEnter={() => {
              if (timers.current[toast.id]) {
                clearTimeout(timers.current[toast.id]);
                delete timers.current[toast.id];
              }
            }}
            onMouseLeave={() => {
              startTimer(toast.id);
            }}>
            <Container direction='column'>
              <Title order={4}>{toast.title}</Title>
              {toast.message}
            </Container>
          </S.ToastItem>
        ))}
      </S.ToastContainer>
    </ToastContext.Provider>
  );
};