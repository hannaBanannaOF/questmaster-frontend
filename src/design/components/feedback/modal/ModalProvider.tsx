'use client';
import { PropsWithChildren, useState } from 'react';

import { Modal } from './Modal';
import { ModalContext, ModalData } from './ModalContext';

export function ModalProvider(props: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalData | null>(null);

  const openModal = (data: ModalData) => {
    setModalData(data);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {props.children}
      {/* O componente Modal fica aqui para estar sempre disponível */}
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