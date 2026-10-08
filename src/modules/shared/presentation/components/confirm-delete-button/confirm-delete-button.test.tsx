import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import type { FormState } from '@/src/lib/actions';
import { renderWithProviders } from '@/src/test/render';

import { ConfirmDeleteButton } from './confirm-delete-button';

const labels = {
  trigger: 'Excluir',
  title: 'Excluir personagem',
  confirm: 'Excluir personagem',
  cancel: 'Cancelar',
  close: 'Fechar',
};

function setup(
  action = vi.fn(async (): Promise<FormState> => ({ status: 'success' })),
) {
  renderWithProviders(
    <ConfirmDeleteButton
      action={action}
      labels={labels}
      errorTitleKey="character.toast.error.delete"
      description="Isso removerá permanentemente Harvey."
    />,
  );
  return { action, user: userEvent.setup() };
}

const dialog = () => screen.getByRole('dialog', { hidden: true });

describe('ConfirmDeleteButton', () => {
  it('não exclui sem confirmação', async () => {
    const { action, user } = setup();

    await user.click(screen.getByRole('button', { name: 'Excluir' }));

    expect(dialog()).toHaveAttribute('open');
    expect(
      screen.getByText('Isso removerá permanentemente Harvey.'),
    ).toBeInTheDocument();
    expect(action).not.toHaveBeenCalled();
  });

  it('cancelar fecha o diálogo sem excluir', async () => {
    const { action, user } = setup();

    await user.click(screen.getByRole('button', { name: 'Excluir' }));
    await user.click(screen.getByRole('button', { name: 'Cancelar' }));

    expect(dialog()).not.toHaveAttribute('open');
    expect(action).not.toHaveBeenCalled();
  });

  it('confirmar chama a action', async () => {
    const { action, user } = setup();

    await user.click(screen.getByRole('button', { name: 'Excluir' }));
    await user.click(
      screen.getByRole('button', { name: 'Excluir personagem' }),
    );

    expect(action).toHaveBeenCalledOnce();
  });

  it('avisa quando a exclusão falha', async () => {
    const { user } = setup(
      vi.fn(async (): Promise<FormState> => ({
        status: 'error',
        message: 'A ficha está numa campanha',
      })),
    );

    await user.click(screen.getByRole('button', { name: 'Excluir' }));
    await user.click(
      screen.getByRole('button', { name: 'Excluir personagem' }),
    );

    expect(
      await screen.findByText('Não foi possível excluir personagem!'),
    ).toBeInTheDocument();
    expect(screen.getByText('A ficha está numa campanha')).toBeInTheDocument();
  });
});
