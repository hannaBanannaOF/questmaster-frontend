import { GameSystem } from '../../rpg/domain/game-system.types';

export type Character = {
  slug: string;
  name: string;
  system: GameSystem;
  currentHp?: number;
  maxHp?: number;
};
