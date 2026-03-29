import { Cpu, Eye, Ghost, Swords } from 'lucide-react';

import { RpgKind } from '@/src/modules/rpg/domain/rpg-kind.types';

export const RPG_KIND_META = {
  [RpgKind.CALL_OF_CTHULHU]: {
    label: 'Call of Cthulhu 7e',
    icon: Eye,
  },
  [RpgKind.DUNGEONS_AND_DRAGONS]: {
    label: 'D&D 5e',
    icon: Swords,
  },
  [RpgKind.CYBERPUNK_RED]: {
    label: 'Cyberpunk RED',
    icon: Cpu,
  },
  [RpgKind.ORDEM_PARANORMAL]: {
    label: 'Ordem Paranormal',
    icon: Ghost,
  },
} as const;

export function getRpgKindMeta(kind: RpgKind) {
  return RPG_KIND_META[kind];
}

export function getRpgKindSelectValues() {
  return Object.entries(RPG_KIND_META).map(([value, meta]) => ({
    value: value as RpgKind,
    label: meta.label,
  }));
}
