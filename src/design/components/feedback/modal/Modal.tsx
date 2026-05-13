'use client';

import { X } from 'lucide-react';
import React, {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useState,
} from 'react';
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

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
}) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsLeaving(false);
    } else if (shouldRender) {
      setIsLeaving(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldRender]);

  if (!shouldRender) return null;

  const handleClose = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    onClose();
  };

  return ReactDOM.createPortal(
    <S.ModalOverlay $isLeaving={isLeaving} onClick={handleClose}>
      <S.ModalCardWrapper
        $isLeaving={isLeaving}
        onClick={(e) => e.stopPropagation()}
      >
        <Card compact>
          <Container compact justify="end" align="start">
            <S.ModalCloseButton onClick={handleClose}>
              <X size={20} />
            </S.ModalCloseButton>
          </Container>

          {typeof title === 'string' ? <Title order={2}>{title}</Title> : title}
          {subtitle &&
            (typeof subtitle === 'string' ? (
              <Text variant="muted">{subtitle}</Text>
            ) : (
              subtitle
            ))}

          <S.ModalBody>{children}</S.ModalBody>
        </Card>
      </S.ModalCardWrapper>
    </S.ModalOverlay>,
    document.body,
  );
};
