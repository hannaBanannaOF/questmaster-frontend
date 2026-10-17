import Link from 'next/link';

import styles from './brand.module.css';

interface BrandProps {
  name: string;
  href?: string;
}

/** Selo do d20 e o nome do app; leva ao início. */
export function Brand({ name, href = '/' }: BrandProps) {
  return (
    <Link href={href} className={styles.brand}>
      <span className={styles.mark} aria-hidden>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2 21 7v10l-9 5-9-5V7z" />
          <path d="M12 7 7.5 15h9z" />
          <path d="M12 2v5" />
          <path d="M3 7l4.5 8" />
          <path d="M21 7l-4.5 8" />
          <path d="M7.5 15 12 22l4.5-7" />
        </svg>
      </span>
      <span className={styles.name}>{name}</span>
    </Link>
  );
}
