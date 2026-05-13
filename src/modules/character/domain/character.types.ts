import { GameSystem } from '../../rpg';

export type Character = {
  slug: string;
  name: string;
  system: GameSystem;
  currentHp?: number;
  maxHp?: number;
};

export type CharacterDetail = Character & {
  id: number;
  isPlayer: boolean;
};
