'use client';
import { createContext, ReactNode } from 'react';

export interface ModalData {
  title: string;
  subtitle?: string;
  content: ReactNode;
}

interface ModalContextType {
  openModal: (data: ModalData) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);