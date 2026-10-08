import { IconBox } from '@/src/design';

import { GameSystem } from '../../../domain';
import { getGameSystemMeta } from '../../game-system.meta';
import styles from './game-system-icon.module.css';

const SYSTEM_COLOR: Record<GameSystem, string> = {
  [GameSystem.CALL_OF_CTHULHU]: styles.callOfCthulhu,
};

interface GameSystemIconProps {
  system: GameSystem;
  size?: number;
}

export function GameSystemIcon({ system, size = 24 }: GameSystemIconProps) {
  const { icon: Icon } = getGameSystemMeta(system);
  return (
    <IconBox tone="surface" className={SYSTEM_COLOR[system]}>
      <Icon size={size} />
    </IconBox>
  );
}
