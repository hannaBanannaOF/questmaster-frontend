import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(() => cleanup());

// next/font só funciona no compilador do Next; nos testes basta uma classe
vi.mock('next/font/google', () => {
  const font = () => ({ className: 'font', variable: 'font' });
  return { Cinzel: font, Nunito: font };
});

// jsdom ainda não implementa o modal do <dialog> nativo
if (typeof HTMLDialogElement !== 'undefined') {
  HTMLDialogElement.prototype.showModal ??= function (this: HTMLDialogElement) {
    this.open = true;
  };
  HTMLDialogElement.prototype.close ??= function (this: HTMLDialogElement) {
    this.open = false;
    this.dispatchEvent(new Event('close'));
  };
}
