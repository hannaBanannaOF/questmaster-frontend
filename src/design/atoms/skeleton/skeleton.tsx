import styles from './skeleton.module.css';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  radius?: 'sm' | 'md' | 'full';
}

/** Bloco de carregamento usado nos fallbacks de Suspense / loading.tsx. */
export function Skeleton({
  width = '100%',
  height = '1em',
  radius = 'sm',
}: SkeletonProps) {
  return (
    <span
      className={styles.skeleton}
      data-radius={radius}
      style={{ width, height }}
      aria-hidden
    />
  );
}
