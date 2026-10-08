import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { GameSystem } from '@/src/modules/rpg/domain';
import { renderWithProviders } from '@/src/test/render';

import type { Invite } from '../../../domain';
import { InviteSummary } from './invite-summary';

const anInvite = (overrides: Partial<Invite> = {}): Invite => ({
  hash: '9cd949d1-1669-4710-9a4e-f49bd725a161',
  campaignSlug: 'mascaras',
  campaignName: 'Máscaras de Nyarlathotep',
  campaignOverview: 'Nova York, 1925.',
  campaignPlayerCount: 0,
  campaignSystem: GameSystem.CALL_OF_CTHULHU,
  ...overrides,
});

describe('InviteSummary', () => {
  it('mostra nome, sistema e descrição da campanha', () => {
    renderWithProviders(<InviteSummary invite={anInvite()} />);

    expect(screen.getByText('Você foi convidado para')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Máscaras de Nyarlathotep' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Call of Cthulhu 7e')).toBeInTheDocument();
    expect(screen.getByText('Nova York, 1925.')).toBeInTheDocument();
  });

  it.each([
    [0, 'Nenhum jogador ainda'],
    [1, '1 jogador'],
    [4, '4 jogadores'],
  ])('com %d jogadores mostra "%s"', (count, text) => {
    renderWithProviders(
      <InviteSummary invite={anInvite({ campaignPlayerCount: count })} />,
    );

    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
