import { Search, X } from 'lucide-react';
import Link from 'next/link';

import styles from './search-field.module.css';

interface SearchFieldProps {
  name: string;
  /** Nome acessível do campo (já traduzido). */
  label: string;
  placeholder?: string;
  defaultValue?: string;
  /** Link da lista sem a busca; com ele aparece o botão de limpar. */
  clearHref?: string;
  clearLabel?: string;
}

/** SearchField do HeroUI v3 (variante secondary); vai dentro de um form GET. */
export function SearchField({
  name,
  label,
  placeholder,
  defaultValue,
  clearHref,
  clearLabel,
}: SearchFieldProps) {
  return (
    <div className={styles.field}>
      <label htmlFor={`search-${name}`} className="visually-hidden">
        {label}
      </label>
      <div className={styles.group}>
        <Search className={styles.icon} aria-hidden />
        <input
          id={`search-${name}`}
          className={styles.input}
          type="search"
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          maxLength={100}
          autoComplete="off"
        />
        {clearHref && (
          <Link
            href={clearHref}
            className={styles.clear}
            aria-label={clearLabel}
          >
            <X aria-hidden />
          </Link>
        )}
      </div>
    </div>
  );
}
