import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import type { ActionResult } from '@/src/lib/actions';
import { renderWithProviders } from '@/src/test/render';

import { CampaignStatus, getAvailableTransitions } from '../../../domain';
import { CampaignStatusActions } from './campaign-status-actions';

const { DRAFT, ACTIVE, PAUSED, ARCHIVED } = CampaignStatus;

function setup(
  status: CampaignStatus,
  updateStatus = vi.fn(async (): Promise<ActionResult> => ({
    ok: true,
    data: undefined,
  })),
) {
  renderWithProviders(
    <CampaignStatusActions
      status={status}
      transitions={getAvailableTransitions(status)}
      updateStatus={updateStatus}
    />,
  );
  return { updateStatus, user: userEvent.setup() };
}

const buttonNames = () =>
  screen.queryAllByRole('button').map((button) => button.textContent);

describe('CampaignStatusActions', () => {
  it.each([
    [DRAFT, ['Iniciar']],
    [ACTIVE, ['Pausar', 'Encerrar']],
    [PAUSED, ['Resumir', 'Arquivar']],
    [ARCHIVED, []],
  ])('em %s mostra %j', (status, expected) => {
    setup(status);

    expect(buttonNames()).toEqual(expected);
  });

  it('pede a transição clicada', async () => {
    const { updateStatus, user } = setup(ACTIVE);

    await user.click(screen.getByRole('button', { name: 'Pausar' }));

    expect(updateStatus).toHaveBeenCalledWith(PAUSED);
  });

  it('bloqueia os botões enquanto a mudança está em andamento', async () => {
    let finish!: (result: ActionResult) => void;
    const updateStatus = vi.fn(
      () => new Promise<ActionResult>((resolve) => (finish = resolve)),
    );
    const { user } = setup(ACTIVE, updateStatus);

    await user.click(screen.getByRole('button', { name: 'Encerrar' }));

    for (const button of screen.getAllByRole('button')) {
      expect(button).toBeDisabled();
    }
    expect(screen.getByRole('button', { name: 'Encerrar' })).toHaveAttribute(
      'aria-busy',
      'true',
    );

    finish({ ok: true, data: undefined });
    // O botão já existe desabilitado; espera a transição terminar
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Pausar' })).toBeEnabled(),
    );
  });

  it('avisa com o motivo quando a API recusa', async () => {
    const { user } = setup(
      DRAFT,
      vi.fn(async (): Promise<ActionResult> => ({
        ok: false,
        message: 'campaign.errors.invalidTransition',
      })),
    );

    await user.click(screen.getByRole('button', { name: 'Iniciar' }));

    expect(
      await screen.findByText('Não foi possível atualizar campanha!'),
    ).toBeInTheDocument();
    expect(
      screen.queryByText('campaign.errors.invalidTransition'),
    ).not.toBeInTheDocument();
  });
});
