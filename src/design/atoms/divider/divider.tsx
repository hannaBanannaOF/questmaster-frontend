import styles from './divider.module.css';

interface DividerProps {
  vertical?: boolean;
}

export function Divider({ vertical }: DividerProps) {
  return (
    <div
      role="separator"
      aria-orientation={vertical ? 'vertical' : 'horizontal'}
      className={styles.divider}
    />
  );
}
