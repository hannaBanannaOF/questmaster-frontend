import { ChevronDown } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';

import { cx } from '../../utils';
import controlStyles from '../input/control.module.css';
import styles from './select.module.css';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends ComponentProps<'select'> {
  options: SelectOption[];
  /** Opção vazia e desabilitada exibida antes de o usuário escolher. */
  placeholder?: string;
  /** Ícone à esquerda do valor (ex.: o glifo do sistema escolhido). */
  startContent?: ReactNode;
}

export function Select({
  options,
  placeholder,
  startContent,
  className,
  defaultValue,
  ...props
}: SelectProps) {
  return (
    <div className={styles.wrapper} data-start={startContent ? '' : undefined}>
      {startContent && (
        <span className={styles.start} aria-hidden>
          {startContent}
        </span>
      )}
      <select
        // O React não atualiza o defaultSelected: sem remontar, o reset do form depois da action volta ao placeholder
        key={String(defaultValue ?? '')}
        className={cx(controlStyles.control, styles.select, className)}
        defaultValue={defaultValue ?? (placeholder ? '' : undefined)}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className={styles.icon} aria-hidden>
        <ChevronDown size={18} strokeWidth={2.5} />
      </span>
    </div>
  );
}
