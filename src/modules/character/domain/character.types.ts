import { GameSystem } from '../../rpg';

export type Character = {
  id?: number;
  slug: string;
  name: string;
  system: GameSystem;
  currentHp?: number;
  maxHp?: number;
};
