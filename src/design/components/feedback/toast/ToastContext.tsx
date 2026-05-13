'use client';
import { createContext, ReactNode } from 'react';

import { ToastType } from './types';

export interface ToastContextData {
  addToast: (
    title: string | ReactNode,
    message: string | ReactNode,
    type?: ToastType,
  ) => void;
}

export const ToastContext = createContext<ToastContextData>(
  {} as ToastContextData,
);
