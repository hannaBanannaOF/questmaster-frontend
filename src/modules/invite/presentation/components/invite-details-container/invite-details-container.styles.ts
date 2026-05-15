import styled from 'styled-components';

import { Card } from '@/src/design';

export const ScrollIcon = styled.div`
  border-radius: ${({ theme }) => theme.radius.full};
  background-color: ${({ theme }) => theme.colors.primary.soft};
  color: ${({ theme }) => theme.colors.primary.default};
  padding: ${({ theme }) => theme.spacing.md};
`;

export const CharacterCard = styled(Card)<{ $selected?: boolean }>`
  ${({ $selected, theme }) =>
    !$selected &&
    `
  &:hover {
    background-color: ${theme.colors.card.foreground};
  }
  cursor: pointer;`}

  ${({ $selected, theme }) =>
    $selected &&
    `
    border: 1px solid ${theme.colors.primary.default};
    background-color: ${theme.colors.primary.soft};
  `}
`;
