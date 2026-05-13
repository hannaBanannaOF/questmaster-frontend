'use client';
import { PropsWithChildren, useState } from 'react';

import { Modal } from './Modal';
import { ModalContext, ModalData } from './ModalContext';

export const ModalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalData | null>(null);

  const openModal = (data: ModalData) => {
    setModalData(data);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modalData && (
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          title={modalData.title}
          subtitle={modalData.subtitle}
        >
          {modalData.content}
        </Modal>
      )}
    </ModalContext.Provider>
  );
};
