import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { FormState } from '@/src/lib/actions';
import { DialogButton } from '@/src/modules/shared/presentation/components/dialog-button/dialog-button';
import { renderWithProviders } from '@/src/test/render';

import { createCharacterAction } from '../../character.actions';
import type { CharacterFormField } from '../../character.schema';
import { CharacterCreateForm } from './character-create-form';

vi.mock('../../character.actions', () => ({
  createCharacterAction: vi.fn(),
}));

const action = vi.mocked(createCharacterAction);
const key = (path: string) => `character.create.form.${path}`;

async function openForm() {
  const user = userEvent.setup();
  renderWithProviders(
    <DialogButton
      label="Novo personagem"
      title="Novo personagem"
      closeLabel="Fechar"
    >
      <CharacterCreateForm />
    </DialogButton>,
  );
  await user.click(screen.getByRole('button', { name: 'Novo personagem' }));
  return user;
}

describe('CharacterCreateForm', () => {
  beforeEach(() => action.mockReset());

  it('mostra o erro de cada campo inválido e continua aberto', async () => {
    action.mockResolvedValue({
      status: 'error',
      fieldErrors: {
        name: key('name.errors.required'),
        system: key('game_system.errors.required'),
      },
      values: { name: 'Harv' },
    } satisfies FormState<CharacterFormField>);
    const user = await openForm();

    await user.click(screen.getByRole('button', { name: 'Criar personagem' }));

    expect(
      await screen.findByText('Dê um nome ao personagem.'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Escolha o sistema do personagem.'),
    ).toBeInTheDocument();
    // O erro fica ligado ao campo e substitui a ajuda
    expect(
      screen.getByLabelText(/Sistema de jogo/),
    ).toHaveAccessibleDescription('Escolha o sistema do personagem.');
    expect(screen.getByLabelText(/Nome do personagem/)).toHaveValue('Harv');
    // Erro de campo não vira toast
    expect(
      screen.queryByText('Não deu para criar o personagem'),
    ).not.toBeInTheDocument();
  });

  it('envia os campos preenchidos', async () => {
    action.mockResolvedValue({ status: 'idle' });
    const user = await openForm();

    await user.type(screen.getByLabelText(/Nome do personagem/), 'Harvey');
    await user.selectOptions(
      screen.getByLabelText(/Sistema de jogo/),
      'CALL_OF_CTHULHU',
    );
    await user.click(screen.getByRole('button', { name: 'Criar personagem' }));

    const formData = action.mock.calls[0][1];
    expect(Object.fromEntries(formData)).toEqual({
      name: 'Harvey',
      system: 'CALL_OF_CTHULHU',
    });
  });

  it('o sistema começa sem escolha e explica a regra', async () => {
    await openForm();

    expect(screen.getByLabelText(/Sistema de jogo/)).toHaveValue('');
    expect(
      screen.getByLabelText(/Sistema de jogo/),
    ).toHaveAccessibleDescription(
      'A ficha só entra em campanhas do mesmo sistema.',
    );
  });

  it('avisa quando a API falha', async () => {
    action.mockResolvedValue({ status: 'error', message: 'API fora do ar' });
    const user = await openForm();

    await user.click(screen.getByRole('button', { name: 'Criar personagem' }));

    expect(
      await screen.findByText('Não deu para criar o personagem'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Verifique a conexão e tente de novo.'),
    ).toBeInTheDocument();
  });

  it('cancelar fecha o modal sem enviar', async () => {
    const user = await openForm();

    await user.click(screen.getByRole('button', { name: 'Cancelar' }));

    expect(
      screen.queryByRole('button', { name: 'Criar personagem' }),
    ).not.toBeInTheDocument();
    expect(action).not.toHaveBeenCalled();
  });
});
