import { GameSystem } from '../domain/game-system.types';
import { getGameSystemMeta } from './game-system.meta';
import * as S from './game-system.styles';

interface GameSystemIconProps {
  system: GameSystem;
}

export function GameSystemIcon({ system }: GameSystemIconProps) {
  const Icon = getGameSystemMeta(system).icon;
  return (
    <S.IconContainer $system={system}>
      <Icon size={24} display="flex" />
    </S.IconContainer>
  );
}
