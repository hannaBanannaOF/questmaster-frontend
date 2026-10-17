'use client';

import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import {
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

import styles from './menu.module.css';

export interface MenuItem {
  key: string;
  label: string;
  icon?: ReactNode;
  /** Item que navega; sem ele, `onSelect` age. */
  href?: string;
  onSelect?: () => void;
  /** Ação destrutiva: em vermelho, sempre por último. */
  danger?: boolean;
}

interface MenuProps {
  /** Nome acessível do botão, ex.: "Ações de Eleanor Vance". */
  label: string;
  items: MenuItem[];
  className?: string;
}

/**
 * Dropdown do HeroUI v3 no botão "⋯": setas, Home/End, Esc e clique fora
 * fecham e devolvem o foco ao botão. Fica fora de links (botão dentro de
 * link quebra teclado e leitor de tela).
 */
export function Menu({ label, items, className }: MenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const menuId = useId();

  const itemsEls = () =>
    Array.from(
      listRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? [],
    );

  const close = (returnFocus = true) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  const onListKeyDown = (event: KeyboardEvent) => {
    const els = itemsEls();
    const index = els.indexOf(document.activeElement as HTMLElement);
    const focusAt = (i: number) => els[(i + els.length) % els.length]?.focus();
    switch (event.key) {
      case 'ArrowDown':
        focusAt(index + 1);
        break;
      case 'ArrowUp':
        focusAt(index - 1);
        break;
      case 'Home':
        focusAt(0);
        break;
      case 'End':
        focusAt(els.length - 1);
        break;
      case 'Escape':
        close();
        break;
      case 'Tab':
        close(false);
        return;
      default:
        return;
    }
    event.preventDefault();
  };

  const onTriggerKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setOpen(true);
    }
  };

  return (
    <div ref={rootRef} className={`${styles.root} ${className ?? ''}`}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={onTriggerKeyDown}
      >
        <MoreHorizontal size={20} aria-hidden />
      </button>
      {open && (
        <ul
          ref={listRef}
          id={menuId}
          role="menu"
          aria-label={label}
          className={styles.menu}
          onKeyDown={onListKeyDown}
        >
          {items.map((item) => (
            <li key={item.key} role="none">
              {item.href ? (
                <Link
                  href={item.href}
                  role="menuitem"
                  tabIndex={-1}
                  className={styles.item}
                  onClick={() => close(false)}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ) : (
                <button
                  type="button"
                  role="menuitem"
                  tabIndex={-1}
                  className={styles.item}
                  data-danger={item.danger || undefined}
                  onClick={() => {
                    close(false);
                    item.onSelect?.();
                  }}
                >
                  {item.icon}
                  {item.label}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
