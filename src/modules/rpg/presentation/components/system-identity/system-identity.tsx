import type { ReactNode } from 'react';

import { cx } from '@/src/design';

import { GameSystem } from '../../../domain';
import { getGameSystemMeta } from '../../game-system.meta';
import styles from './system-identity.module.css';

// O sistema é sempre glifo + cor + nome juntos, nunca só cor ou só ícone
const SYSTEM_CLASS: Record<GameSystem, string> = {
  [GameSystem.CALL_OF_CTHULHU]: styles.callOfCthulhu,
};

const systemClass = (system: GameSystem) => SYSTEM_CLASS[system];

interface SystemTagProps {
  system: GameSystem;
  /** Em chip (fundo na cor do sistema), para o destaque. */
  chip?: boolean;
}

/** Glifo + nome do sistema, como o logo numa ficha impressa. */
export function SystemTag({ system, chip }: SystemTagProps) {
  const { label, icon: Icon } = getGameSystemMeta(system);
  return (
    <span
      className={cx(styles.tag, systemClass(system))}
      data-chip={chip || undefined}
    >
      <span className={styles.glyph} aria-hidden>
        <Icon size={16} />
      </span>
      {label}
    </span>
  );
}

interface SystemSealProps {
  system: GameSystem;
  /** Distintivo no canto: o papel do usuário (mestra, joga, falta convidar). */
  badge?: ReactNode;
  badgeTone?: 'default' | 'accent' | 'warning';
}

/** Quadrado com o glifo do sistema; decorativo, o texto ao lado diz o sistema e o papel. */
export function SystemSeal({
  system,
  badge,
  badgeTone = 'default',
}: SystemSealProps) {
  const { icon: Icon } = getGameSystemMeta(system);
  return (
    <span className={cx(styles.seal, systemClass(system))} aria-hidden>
      <span className={styles.glyph}>
        <Icon size={26} />
      </span>
      {badge && (
        <span className={styles.badge} data-tone={badgeTone}>
          {badge}
        </span>
      )}
    </span>
  );
}

/** Glifo grande do sistema, cortado no canto inferior direito do card. */
export function SystemWatermark({ system }: { system: GameSystem }) {
  const { icon: Icon } = getGameSystemMeta(system);
  return (
    <span className={cx(styles.watermark, systemClass(system))} aria-hidden>
      <Icon size={220} />
    </span>
  );
}
