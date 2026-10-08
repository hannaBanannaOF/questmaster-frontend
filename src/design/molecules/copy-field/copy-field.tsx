'use client';

import { Check, Copy } from 'lucide-react';
import { type ClipboardEvent, useEffect, useState } from 'react';

import styles from './copy-field.module.css';

interface CopyFieldProps {
  /** Texto exibido no campo. */
  display: string;
  /** Valor copiado; função para resolver só no clique (ex.: depende de window). */
  value: string | (() => string);
  copyLabel: string;
  copiedLabel: string;
}

const RESET_AFTER_MS = 3000;

export function CopyField({
  display,
  value,
  copyLabel,
  copiedLabel,
}: CopyFieldProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), RESET_AFTER_MS);
    return () => clearTimeout(timeout);
  }, [copied]);

  const resolve = () => (typeof value === 'function' ? value() : value);

  const handleClick = async () => {
    await navigator.clipboard.writeText(resolve());
    setCopied(true);
  };

  // Ctrl+C no texto exibido também copia o valor completo
  const handleCopy = (event: ClipboardEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.clipboardData.setData('text/plain', resolve());
    setCopied(true);
  };

  return (
    <span className={styles.copyField}>
      <span className={styles.value} onCopy={handleCopy}>
        {display}
      </span>
      <button type="button" className={styles.button} onClick={handleClick}>
        {copied ? <Check size={12} /> : <Copy size={12} />}
        <span aria-live="polite">{copied ? copiedLabel : copyLabel}</span>
      </button>
    </span>
  );
}
