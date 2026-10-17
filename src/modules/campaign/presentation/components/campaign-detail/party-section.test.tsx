import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '@/src/test/render';

import { type CampaignCharacter, CampaignStatus } from '../../../domain';
import { PartySection } from './party-section';

vi.mock('../../campaign.actions', () => ({
  leaveCampaignAction: vi.fn(),
  removeFromCampaignAction: vi.fn(),
}));

const eleanor: CampaignCharacter = {
  id: 1,
  name: 'Eleanor Vance',
  slug: 'eleanor',
  isMine: true,
  playerName: 'Hanna',
};
const pete: CampaignCharacter = {
  id: 2,
  name: 'Ashcan Pete',
  slug: 'pete',
  isMine: false,
  playerName: 'Rafa',
};

const renderParty = (
  isDm: boolean,
  status = CampaignStatus.ACTIVE,
  characters = [eleanor, pete],
) =>
  renderWithProviders(
    <PartySection
      campaign={{
        id: 1,
        slug: 'innsmouth',
        name: 'Horror em Innsmouth',
        isDm,
        status,
        characters,
      }}
      hasInvite
    />,
  );

describe('PartySection', () => {
  it('mestre vê quem joga e remove pelo menu de cada ficha', async () => {
    renderParty(true);
    const user = userEvent.setup();

    expect(screen.getByText('de Rafa')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ashcan Pete' })).toHaveAttribute(
      'href',
      '/characters/pete',
    );

    await user.click(
      screen.getByRole('button', { name: 'Ações de Ashcan Pete' }),
    );
    expect(
      screen.getByRole('menuitem', { name: 'Abrir ficha' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('menuitem', { name: 'Remover da campanha' }),
    ).toBeInTheDocument();
  });

  it('jogador só tem menu na própria ficha, com "Sair da campanha"', async () => {
    renderParty(false);
    const user = userEvent.setup();

    expect(screen.getByText('Sua ficha')).toBeInTheDocument();
    expect(screen.queryByText('de Rafa')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Ações de Ashcan Pete' }),
    ).not.toBeInTheDocument();

    await user.click(
      screen.getByRole('button', { name: 'Ações de Eleanor Vance' }),
    );
    expect(
      screen.getByRole('menuitem', { name: 'Sair da campanha' }),
    ).toBeInTheDocument();
  });

  it('campanha arquivada não tem menus', () => {
    renderParty(true, CampaignStatus.ARCHIVED);

    expect(
      screen.queryByRole('button', { name: /^Ações de/ }),
    ).not.toBeInTheDocument();
  });

  it('sem jogadores, mostra o vazio', () => {
    renderParty(true, CampaignStatus.DRAFT, []);

    expect(screen.getByText('Ninguém entrou ainda')).toBeInTheDocument();
  });
});
