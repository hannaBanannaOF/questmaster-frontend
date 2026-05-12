'use client';

import { X } from 'lucide-react';
import React, { PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { Card } from '../../layout/card/Card';
import { Container } from '../../layout/container/Container';
import { Text } from '../../typography/text/Text';
import { Title } from '../../typography/title/Title';
import * as S from './styles';

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  title: string | ReactNode;
  subtitle?: string | ReactNode;
}

export function Modal(props: ModalProps) {
  const [shouldRender, setShouldRender] = useState(props.isOpen);
  const [isLeaving, setIsLeaving] = useState(false);

  // Sincroniza o estado interno com a prop isOpen
  useEffect(() => {
    if (props.isOpen) {
      setShouldRender(true);
      setIsLeaving(false);
    } else if (shouldRender) {
      // Inicia animação de saída
      setIsLeaving(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300); // Mesmo tempo da animação CSS
      return () => clearTimeout(timer);
    }
  }, [props.isOpen, shouldRender]);

  if (!shouldRender) return null;

  const handleClose = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    props.onClose(); // Dispara a mudança da prop isOpen no pai
  };

  return ReactDOM.createPortal(
    <S.ModalOverlay $isLeaving={isLeaving} onClick={handleClose}>
      <S.ModalCardWrapper $isLeaving={isLeaving} onClick={(e) => e.stopPropagation()}>
        <Card hover={false} compact>
          <Container compact justify='end' align='start'>
            <S.ModalCloseButton onClick={handleClose}>
              <X size={20}/>
            </S.ModalCloseButton>
          </Container>
          
          {(typeof props.title === 'string' ? <Title order={2}>{props.title}</Title> : props.title)}
          {props.subtitle && (typeof props.subtitle === 'string' ? <Text variant='muted'>{props.subtitle}</Text> : props.subtitle)}
          
          <S.ModalBody>
            {props.children}
          </S.ModalBody>
        </Card>
      </S.ModalCardWrapper>
    </S.ModalOverlay>,
    document.body
  );
}