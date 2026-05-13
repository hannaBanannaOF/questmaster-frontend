import styled from 'styled-components';

import { ContainerAlign, ContainerDirection, ContainerJustify } from './types';

export const Container = styled.div<{
  $direction?: ContainerDirection;
  $align?: ContainerAlign;
  $compact?: boolean;
  $justify?: ContainerJustify;
}>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction ?? 'row'};
  gap: ${({ $compact, theme }) =>
    $compact ? theme.spacing.xxs : theme.spacing.md};
  align-items: ${({ $align }) => $align ?? 'start'};
  justify-content: ${({ $justify }) => $justify ?? 'initial'};
  text-align: start;
`;
