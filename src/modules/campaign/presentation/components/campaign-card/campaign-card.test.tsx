import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { aCampaign } from '@/src/test/fixtures';
import { renderWithProviders } from '@/src/test/render';

import { CampaignCard } from './campaign-card';

const yesterday = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date;
};

describe('CampaignCard', () => {
  it('mostra quando foi aberta pela última vez', () => {
    renderWithProviders(
      <CampaignCard campaign={aCampaign({ lastAccessedAt: yesterday() })} />,
    );

    expect(screen.getByText('Aberta ontem')).toBeInTheDocument();
  });

  it('campanha nunca aberta não mostra "Aberta"', () => {
    renderWithProviders(<CampaignCard campaign={aCampaign()} />);

    expect(screen.queryByText(/Aberta/)).not.toBeInTheDocument();
  });

  it('mostra as fichas do usuário na campanha', () => {
    renderWithProviders(
      <CampaignCard
        campaign={aCampaign({
          myCharacters: [{ slug: 'harvey', name: 'Harvey Walters' }],
        })}
      />,
    );

    expect(screen.getByText('Com Harvey Walters')).toBeInTheDocument();
  });
});
