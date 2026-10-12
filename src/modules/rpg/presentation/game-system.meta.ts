import { Dices } from 'lucide-react';
import type { ComponentType } from 'react';

import type { SelectOption } from '@/src/design';

import { GameSystem } from '../domain';
import { InterlacedTentaclesIcon } from './components/interlaced-tentacles-icon/interlaced-tentacles-icon';

interface GameSystemMeta {
  label: string;
  icon: ComponentType<{ size?: number }>;
}

const GAME_SYSTEM_META: Record<GameSystem, GameSystemMeta> = {
  [GameSystem.CALL_OF_CTHULHU]: {
    label: 'Call of Cthulhu 7e',
    icon: InterlacedTentaclesIcon,
  },
};

/** Sistemas que a API conhece mas o front ainda não: mostra o código cru. */
const fallbackMeta = (system: string): GameSystemMeta => ({
  label: system,
  icon: Dices,
});

export function getGameSystemMeta(system: GameSystem): GameSystemMeta {
  return GAME_SYSTEM_META[system] ?? fallbackMeta(system);
}

export function getGameSystemOptions(): SelectOption[] {
  return Object.entries(GAME_SYSTEM_META).map(([value, meta]) => ({
    value,
    label: meta.label,
  }));
}
