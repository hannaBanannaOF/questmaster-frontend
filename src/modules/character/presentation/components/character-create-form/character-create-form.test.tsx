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
        hp: key('hp.errors.min'),
        system: key('game_system.errors.required'),
      },
      values: { name: '', hp: '0' },
    } satisfies FormState<CharacterFormField>);
    const user = await openForm();

    await user.click(screen.getByRole('button', { name: 'Criar' }));

    expect(
      await screen.findByText('Campo "Nome do personagem" é obrigatório!'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('O valor informado deve ser maior que 0!'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Campo "Sistema de jogo" é obrigatório!'),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Pontos de vida/)).toHaveValue(0);
    // Erro de campo não vira toast
    expect(
      screen.queryByText('Não foi possível criar personagem!'),
    ).not.toBeInTheDocument();
  });

  it('envia os campos preenchidos', async () => {
    action.mockResolvedValue({ status: 'idle' });
    const user = await openForm();

    await user.type(screen.getByLabelText(/Nome do personagem/), 'Harvey');
    await user.type(screen.getByLabelText(/Pontos de vida/), '12');
    await user.selectOptions(
      screen.getByLabelText(/Sistema de jogo/),
      'CALL_OF_CTHULHU',
    );
    await user.click(screen.getByRole('button', { name: 'Criar' }));

    const formData = action.mock.calls[0][1];
    expect(Object.fromEntries(formData)).toEqual({
      name: 'Harvey',
      hp: '12',
      system: 'CALL_OF_CTHULHU',
    });
  });

  it('ao criar, fecha o modal e avisa', async () => {
    action.mockResolvedValue({
      status: 'success',
      values: { name: 'Harvey' },
    });
    const user = await openForm();

    await user.click(screen.getByRole('button', { name: 'Criar' }));

    expect(await screen.findByText('Novo personagem!')).toBeInTheDocument();
    expect(
      screen.getByText('"Harvey" se junta a aventura.'),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Criar' }),
    ).not.toBeInTheDocument();
  });

  it('avisa quando a API falha', async () => {
    action.mockResolvedValue({ status: 'error', message: 'API fora do ar' });
    const user = await openForm();

    await user.click(screen.getByRole('button', { name: 'Criar' }));

    expect(
      await screen.findByText('Não foi possível criar personagem!'),
    ).toBeInTheDocument();
    expect(screen.getByText('API fora do ar')).toBeInTheDocument();
  });

  it('cancelar fecha o modal sem enviar', async () => {
    const user = await openForm();

    await user.click(screen.getByRole('button', { name: 'Cancelar' }));

    expect(
      screen.queryByRole('button', { name: 'Criar' }),
    ).not.toBeInTheDocument();
    expect(action).not.toHaveBeenCalled();
  });
});
