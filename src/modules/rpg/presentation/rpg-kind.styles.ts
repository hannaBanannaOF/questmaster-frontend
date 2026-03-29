import styled, { DefaultTheme } from 'styled-components';

import { RpgKind } from '../domain/rpg-kind.types';

const kindStyles = (theme: DefaultTheme) => ({
  [RpgKind.DUNGEONS_AND_DRAGONS]: `
    color: ${theme.colors.gameSystem.dnd};
  `,
  [RpgKind.CALL_OF_CTHULHU]: `
    color: ${theme.colors.gameSystem.coc};
  `,
  [RpgKind.CYBERPUNK_RED]: `
    color: ${theme.colors.gameSystem.cpr};
  `,
  [RpgKind.ORDEM_PARANORMAL]: `
    color: ${theme.colors.gameSystem.op};
  `,
});

export const IconContainer = styled.div<{ $kind: RpgKind }>`
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.card.foreground};
  border-radius: ${({ theme }) => theme.radius.md};
  ${({ $kind, theme }) => kindStyles(theme)[$kind]}
`;
