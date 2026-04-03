import { GameSystem } from '../domain/game-system.types';
import { getGameSystemMeta } from './game-system.meta';
import * as S from './game-system.styles';

export function GameSystemIcon({ system }: { system: GameSystem }) {
  const Icon = getGameSystemMeta(system).icon;
  return (
    <S.IconContainer $system={system}>
      <Icon size={24} display="flex" />
    </S.IconContainer>
  );
}
