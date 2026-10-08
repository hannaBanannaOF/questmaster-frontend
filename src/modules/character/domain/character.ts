import type { GameSystem } from '@/src/modules/rpg/domain';

export interface CharacterSummary {
  slug: string;
  name: string;
  system: GameSystem;
  currentHp?: number;
  maxHp?: number;
}

export interface CharacterDetails extends CharacterSummary {
  id: number;
  /** O usuário logado é o jogador dono da ficha. */
  isPlayer: boolean;
}

/** PV máximo assumido quando a ficha ainda não define um. */
export const DEFAULT_MAX_HP = 100;

export function getMaxHp(character: Pick<CharacterSummary, 'maxHp'>) {
  return character.maxHp ?? DEFAULT_MAX_HP;
}

/** Só o dono da ficha altera PV ou exclui o personagem. */
export function canEditCharacter(
  character: Pick<CharacterDetails, 'isPlayer'>,
) {
  return character.isPlayer;
}

export function isValidHp(hp: number, maxHp?: number) {
  return (
    Number.isInteger(hp) && hp >= 0 && (maxHp === undefined || hp <= maxHp)
  );
}

export function clampHp(hp: number, maxHp: number) {
  return Math.min(Math.max(hp, 0), maxHp);
}
