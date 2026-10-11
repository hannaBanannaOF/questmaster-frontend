import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '@/src/test/render';

import { formatLastAccess, LastAccess } from './last-access';

const now = new Date(2026, 9, 11, 10, 0);
const daysAgo = (days: number, hour = 10) =>
  new Date(2026, 9, 11 - days, hour, 0);

describe('formatLastAccess', () => {
  it.each([
    [daysAgo(0, 1), 'hoje'],
    [daysAgo(1, 23), 'ontem'],
    [daysAgo(4), 'há 4 dias'],
    [daysAgo(10), 'semana passada'],
    [daysAgo(21), 'há 3 semanas'],
    [daysAgo(70), 'há 2 meses'],
    [daysAgo(800), 'há 2 anos'],
  ])('%s → %s', (date, expected) => {
    expect(formatLastAccess(date, now, 'pt-BR')).toBe(expected);
  });

  it('conta dias do calendário, não 24 horas', () => {
    expect(formatLastAccess(new Date(2026, 9, 10, 23, 50), now, 'pt-BR')).toBe(
      'ontem',
    );
  });

  it('data no futuro vira hoje', () => {
    expect(formatLastAccess(new Date(2026, 9, 12), now, 'pt-BR')).toBe('hoje');
  });
});

describe('LastAccess', () => {
  it('mostra "Aberta …" quando há acesso', () => {
    renderWithProviders(<LastAccess date={new Date()} />);

    expect(screen.getByText('Aberta hoje')).toBeInTheDocument();
  });

  it('não mostra nada sem acesso', () => {
    renderWithProviders(<LastAccess />);

    expect(screen.queryByText(/Aberta/)).not.toBeInTheDocument();
  });
});
