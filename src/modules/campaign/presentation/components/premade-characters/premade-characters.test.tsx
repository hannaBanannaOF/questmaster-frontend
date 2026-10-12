import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { GameSystem } from '@/src/modules/rpg/domain';
import { renderWithProviders } from '@/src/test/render';

import { PremadeCharacters } from './premade-characters';

vi.mock('../../campaign.actions', () => ({
  createPremadeCharacterAction: vi.fn(),
  deletePremadeCharacterAction: vi.fn(),
}));

const campaign = {
  id: 1,
  slug: 'mascaras',
  system: GameSystem.CALL_OF_CTHULHU,
  premadeCharacters: [
    {
      id: 4,
      slug: 'harvey',
      name: 'Harvey',
      currentHp: 12,
      maxHp: 12,
      isMine: false,
    },
  ],
};

describe('PremadeCharacters', () => {
  it('mostra as fichas prontas com link, PV e botão de excluir', () => {
    renderWithProviders(<PremadeCharacters campaign={campaign} canCreate />);

    expect(screen.getByText('Fichas prontas (1)')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Harvey/ })).toHaveAttribute(
      'href',
      '/characters/harvey',
    );
    expect(screen.getByText('12 / 12 PV')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Excluir' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Nova ficha pronta' }),
    ).toBeInTheDocument();
  });

  it('sem poder criar, esconde o botão de nova ficha', () => {
    renderWithProviders(
      <PremadeCharacters campaign={campaign} canCreate={false} />,
    );

    expect(
      screen.queryByRole('button', { name: 'Nova ficha pronta' }),
    ).not.toBeInTheDocument();
  });

  it('sem fichas, mostra só o título e o botão', () => {
    renderWithProviders(
      <PremadeCharacters
        campaign={{ ...campaign, premadeCharacters: [] }}
        canCreate
      />,
    );

    expect(screen.getByText('Fichas prontas (0)')).toBeInTheDocument();
    expect(
      screen.queryByRole('list', { name: 'Fichas prontas (0)' }),
    ).not.toBeInTheDocument();
  });
});
