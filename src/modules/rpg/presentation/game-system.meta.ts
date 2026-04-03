import { Cpu, Eye, Ghost, Swords } from 'lucide-react';

import { GameSystem } from '@/src/modules/rpg/domain/game-system.types';

export const GAME_SYSTEM_META = {
  [GameSystem.CALL_OF_CTHULHU]: {
    label: 'Call of Cthulhu 7e',
    icon: Eye,
  },
  [GameSystem.DUNGEONS_AND_DRAGONS]: {
    label: 'D&D 5e',
    icon: Swords,
  },
  [GameSystem.CYBERPUNK_RED]: {
    label: 'Cyberpunk RED',
    icon: Cpu,
  },
  [GameSystem.ORDEM_PARANORMAL]: {
    label: 'Ordem Paranormal',
    icon: Ghost,
  },
} as const;

export function getGameSystemMeta(system: GameSystem) {
  return GAME_SYSTEM_META[system];
}

export function getGameSystemSelectValues() {
  return Object.entries(GAME_SYSTEM_META).map(([value, meta]) => ({
    value: value as GameSystem,
    label: meta.label,
  }));
}
