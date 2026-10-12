import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '@/src/test/render';

import { CampaignStatus } from '../../../domain';
import { PartyMemberAction } from './party-member-action';

vi.mock('../../campaign.actions', () => ({
  leaveCampaignAction: vi.fn(),
  removeFromCampaignAction: vi.fn(),
}));

const campaign = {
  id: 1,
  slug: 'mascaras',
  isDm: false,
  status: CampaignStatus.ACTIVE,
};
const mine = { id: 2, slug: 'eleanor', name: 'Eleanor', isMine: true };
const other = { id: 3, slug: 'jack', name: 'Jack', isMine: false };

describe('PartyMemberAction', () => {
  it('jogador vê "Sair da campanha" só na própria ficha', () => {
    const { unmount } = renderWithProviders(
      <PartyMemberAction campaign={campaign} character={mine} />,
    );
    expect(
      screen.getByRole('button', { name: 'Sair da campanha' }),
    ).toBeInTheDocument();
    unmount();

    renderWithProviders(
      <PartyMemberAction campaign={campaign} character={other} />,
    );
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('DM vê "Remover" em qualquer ficha', () => {
    renderWithProviders(
      <PartyMemberAction
        campaign={{ ...campaign, isDm: true }}
        character={other}
      />,
    );

    expect(screen.getByRole('button', { name: 'Remover' })).toBeInTheDocument();
  });

  it('campanha arquivada não tem ação', () => {
    const archived = { ...campaign, status: CampaignStatus.ARCHIVED };
    renderWithProviders(
      <>
        <PartyMemberAction campaign={archived} character={mine} />
        <PartyMemberAction
          campaign={{ ...archived, isDm: true }}
          character={other}
        />
      </>,
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
