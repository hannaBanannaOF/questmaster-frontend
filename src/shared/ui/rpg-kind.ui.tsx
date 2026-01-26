import { RpgKind } from '@/src/domain/rpg-kind';
import { GiBookAura, GiFlexibleStar, GiFloatingGhost } from 'react-icons/gi';

export const RPG_KIND_META = {
  [RpgKind.CALL_OF_CTHULHU]: {
    label: 'Call of Cthulhu',
    icon: GiFlexibleStar,
  },
  [RpgKind.GHOSTBUSTERS]: {
    label: 'Ghostbusters',
    icon: GiFloatingGhost,
  },
} as const;

export function getRpgKindLabel(kind?: RpgKind) {
  return kind ? RPG_KIND_META[kind]?.label ?? '' : '';
}

export function getRpgKindIcon(kind?: RpgKind, size = 24) {
  const Icon = kind ? RPG_KIND_META[kind]?.icon : GiBookAura;
  return <Icon size={size} />;
}

export function getRpgKindSelectValues() {
  return Object.entries(RPG_KIND_META).map(([value, meta]) => ({
    value,
    label: meta.label,
  }));
}