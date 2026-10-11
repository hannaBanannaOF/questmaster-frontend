import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { CampaignStatus } from '@/src/modules/campaign/domain';
import { renderWithProviders } from '@/src/test/render';

import { StatusCountGrid } from './status-count-grid';

const counts = {
  [CampaignStatus.DRAFT]: 2,
  [CampaignStatus.ACTIVE]: 3,
  [CampaignStatus.PAUSED]: 0,
  [CampaignStatus.ARCHIVED]: 1,
};

describe('StatusCountGrid', () => {
  it('na ordem Jogando, Rascunho, Pausada e Arquivada', () => {
    renderWithProviders(<StatusCountGrid counts={counts} />);

    const grid = screen.getByRole('region', { name: 'Resumo por status' });
    expect(
      [...grid.children].map((cell) => cell.textContent?.replace(/\d/g, '')),
    ).toEqual(['Jogando', 'Rascunho', 'Pausada', 'Arquivada']);
  });

  it('contagem maior que zero leva à lista filtrada', () => {
    renderWithProviders(<StatusCountGrid counts={counts} />);

    expect(screen.getByRole('link', { name: /Jogando/ })).toHaveAttribute(
      'href',
      '/campaigns?role=dm&status=ACTIVE',
    );
  });

  it('contagem zerada não é link', () => {
    renderWithProviders(<StatusCountGrid counts={counts} />);

    const grid = screen.getByRole('region', { name: 'Resumo por status' });
    expect(within(grid).getAllByRole('link')).toHaveLength(3);
    expect(
      screen.queryByRole('link', { name: /Pausada/ }),
    ).not.toBeInTheDocument();
    expect(within(grid).getByText('Pausada')).toBeInTheDocument();
  });
});
