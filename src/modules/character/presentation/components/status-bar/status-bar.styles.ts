import styled, { css, keyframes } from 'styled-components';

export const HpBarContainer = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.spacing.xs};
  background: ${({ theme }) => theme.colors.card.foreground};
  border-radius: ${({ theme }) => theme.radius.full};
  overflow: hidden;
`;

const moveStripes = keyframes`
  from { background-position: 1rem 0; }
  to { background-position: 0 0; }
`;

export const HpBarFill = styled.div<{ $percent: number, $isUpdating?: boolean }>`
  height: 100%;
  width: ${({ $percent }) => $percent}%;
  background: ${({ theme }) => theme.colors.destructive.default};
  border-radius: ${({ theme }) => theme.radius.full};
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;

  ${props => props.$isUpdating && css`
    opacity: 0.7;
    background-image: linear-gradient(
      45deg, 
      rgba(255, 255, 255, 0.15) 25%, 
      transparent 25%, 
      transparent 50%, 
      rgba(255, 255, 255, 0.15) 50%, 
      rgba(255, 255, 255, 0.15) 75%, 
      transparent 75%, 
      transparent
    );
    background-size: 1rem 1rem; // Tamanho das listras
    animation: ${moveStripes} 1s linear infinite;
  `}
`;

export const HpBarLabel = styled.span`
  font-weight: bold;
  display: block;
  text-align: right;
`;
