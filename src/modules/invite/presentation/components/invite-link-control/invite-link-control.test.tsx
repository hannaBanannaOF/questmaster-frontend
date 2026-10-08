import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import type { ActionResult } from '@/src/lib/actions';
import { renderWithProviders } from '@/src/test/render';

import { InviteLinkControl } from './invite-link-control';

const created = vi.fn(async (): Promise<ActionResult<string>> => ({
  ok: true,
  data: 'abc123',
}));

describe('InviteLinkControl', () => {
  it('sem convite, oferece criar e avisa quando cria', async () => {
    const user = userEvent.setup();
    renderWithProviders(<InviteLinkControl createInvite={created} />);

    await user.click(screen.getByRole('button', { name: 'Criar convite' }));

    expect(created).toHaveBeenCalledOnce();
    expect(await screen.findByText('Convite criado!')).toBeInTheDocument();
  });

  it('avisa quando não consegue criar', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <InviteLinkControl
        createInvite={async () => ({ ok: false, message: 'Sem permissão' })}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Criar convite' }));

    expect(
      await screen.findByText('Não foi possível criar o convite!'),
    ).toBeInTheDocument();
    expect(screen.getByText('Sem permissão')).toBeInTheDocument();
  });

  it('com convite, mostra o link e copia a URL completa', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <InviteLinkControl hash="abc123" createInvite={created} />,
    );

    expect(screen.getByText('/join/abc123')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Criar convite' }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Copiar' }));

    await expect(navigator.clipboard.readText()).resolves.toBe(
      `${window.location.origin}/join/abc123`,
    );
    expect(
      screen.getByRole('button', { name: 'Copiado!' }),
    ).toBeInTheDocument();
  });
});
