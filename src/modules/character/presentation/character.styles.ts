import styled from 'styled-components';

export const HpBarContainer = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.spacing.xs};
  background: ${({ theme }) => theme.colors.card.foreground};
  border-radius: ${({ theme }) => theme.radius.full};
  overflow: hidden;
`;

export const HpBarFill = styled.div<{ $percent: number }>`
  height: 100%;
  width: ${({ $percent }) => $percent}%;
  background: ${({ theme }) => theme.colors.destructive.default};
  border-radius: ${({ theme }) => theme.radius.full};
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
`;

export const HpBarLabel = styled.span`
  font-weight: bold;
  display: block;
  text-align: right;
`;
