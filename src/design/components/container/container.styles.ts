import styled from 'styled-components';

export const Container = styled.div<{
  $direction?: 'row' | 'column';
  $align?: 'start' | 'center' | 'end' | 'stretch';
  $compact?: boolean;
  $justify?: 'space-around' | 'space-between';
}>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction ?? 'row'};
  gap: ${({ $compact, theme }) =>
    $compact ? theme.spacing.xxs : theme.spacing.md};
  align-items: ${({ $align }) => $align ?? 'start'};
  justify-content: ${({ $justify }) => $justify ?? 'initial'};
  text-align: center;
`;
