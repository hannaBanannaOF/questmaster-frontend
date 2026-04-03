import styled, { DefaultTheme } from 'styled-components';

import { GameSystem } from '../domain/game-system.types';

const gameSystemStyles = (theme: DefaultTheme) => ({
  [GameSystem.DUNGEONS_AND_DRAGONS]: `
    color: ${theme.colors.gameSystem.dnd};
  `,
  [GameSystem.CALL_OF_CTHULHU]: `
    color: ${theme.colors.gameSystem.coc};
  `,
  [GameSystem.CYBERPUNK_RED]: `
    color: ${theme.colors.gameSystem.cpr};
  `,
  [GameSystem.ORDEM_PARANORMAL]: `
    color: ${theme.colors.gameSystem.op};
  `,
});

export const IconContainer = styled.div<{ $system: GameSystem }>`
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.card.foreground};
  border-radius: ${({ theme }) => theme.radius.md};
  ${({ $system, theme }) => gameSystemStyles(theme)[$system]}
`;
