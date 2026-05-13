'use client';
import { createContext, ReactNode } from 'react';

export interface ModalData {
  title: string;
  subtitle?: string;
  content: ReactNode;
}

export interface ModalContextData {
  openModal: (data: ModalData) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextData>(
  {} as ModalContextData,
);
