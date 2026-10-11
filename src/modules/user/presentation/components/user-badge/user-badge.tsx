import styles from './user-badge.module.css';

/** Avatar com a inicial e o nome; a saudação fica no título do dashboard. */
export function UserBadge({ name }: { name: string }) {
  return (
    <span className={styles.badge}>
      <span className={styles.avatar} aria-hidden>
        {name.charAt(0).toUpperCase()}
      </span>
      {name}
    </span>
  );
}
