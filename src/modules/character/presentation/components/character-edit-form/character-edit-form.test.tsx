import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import type { FormState } from '@/src/lib/actions';
import { GameSystem } from '@/src/modules/rpg/domain';
import { DialogButton } from '@/src/modules/shared/presentation/components/dialog-button/dialog-button';
import { renderWithProviders } from '@/src/test/render';

import type { CharacterEditFormField } from '../../character.schema';
import { CharacterEditForm } from './character-edit-form';

type State = FormState<CharacterEditFormField>;

async function openForm(action: (s: State, f: FormData) => Promise<State>) {
  const user = userEvent.setup();
  renderWithProviders(
    <DialogButton label="Editar" title="Editar ficha" closeLabel="Fechar">
      <CharacterEditForm
        action={action}
        name="Maria"
        system={GameSystem.CALL_OF_CTHULHU}
      />
    </DialogButton>,
  );
  await user.click(screen.getByRole('button', { name: 'Editar' }));
  return user;
}

describe('CharacterEditForm', () => {
  it('abre com o nome atual, mostra o sistema só para leitura e envia o nome', async () => {
    const action = vi.fn(async (_s: State, _f: FormData): Promise<State> => ({
      status: 'idle',
    }));
    const user = await openForm(action);

    const name = screen.getByLabelText(/Nome do personagem/);
    expect(name).toHaveValue('Maria');
    expect(screen.getByText('Call of Cthulhu 7e')).toBeInTheDocument();
    expect(
      screen.getByText('O sistema não muda depois que a ficha é criada.'),
    ).toBeInTheDocument();

    await user.clear(name);
    await user.type(name, 'Jão');
    await user.click(screen.getByRole('button', { name: 'Salvar' }));

    const data = action.mock.calls[0][1];
    expect(Object.fromEntries(data)).toEqual({ name: 'Jão' });
  });

  it('mostra o erro do campo e continua aberto', async () => {
    const user = await openForm(
      vi.fn(async (): Promise<State> => ({
        status: 'error',
        fieldErrors: { name: 'character.edit.form.name.errors.required' },
        values: { name: '' },
      })),
    );

    await user.click(screen.getByRole('button', { name: 'Salvar' }));

    expect(
      await screen.findByText('Dê um nome ao personagem.'),
    ).toBeInTheDocument();
  });
});
