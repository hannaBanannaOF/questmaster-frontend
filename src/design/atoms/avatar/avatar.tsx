import styles from './avatar.module.css';

interface AvatarProps {
  /** Nome de quem o avatar representa; vira as iniciais. */
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Anel de destaque (ficha do usuário). */
  ring?: boolean;
}

/** Iniciais de até duas palavras do nome: "Eleanor Vance" → "EV". */
export function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

/** Avatar soft com iniciais (HeroUI Avatar); decorativo, o nome fica no texto ao lado. */
export function Avatar({ name, size = 'md', ring }: AvatarProps) {
  return (
    <span
      className={styles.avatar}
      data-size={size}
      data-ring={ring || undefined}
      aria-hidden
    >
      {getInitials(name)}
    </span>
  );
}
