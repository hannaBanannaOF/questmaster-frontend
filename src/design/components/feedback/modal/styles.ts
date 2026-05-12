import styled, { css,keyframes } from 'styled-components';

const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideUp = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-30px); }
`;

export const ModalOverlay = styled.div<{ $isLeaving: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: start;
  padding: ${({ theme }) => theme.spacing.lg};
  justify-content: center;
  z-index: 1000;
  
  transition: opacity 0.3s ease;
  ${({ $isLeaving }) => $isLeaving && css`opacity: 0;`}
`;

export const ModalCardWrapper = styled.div<{ $isLeaving: boolean }>`
  width: 100%;
  max-width: 500px;
  cursor: default;
  
  /* Alterna a animação baseada no estado de saída */
  animation: ${({ $isLeaving }) => ($isLeaving ? slideUp : slideDown)} 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
`;

export const ModalCloseButton = styled.button`
  background: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.muted};
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
  border: none;
  padding: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const ModalBody = styled.div`
  padding: ${({ theme }) => theme.spacing.md} 0;
`;