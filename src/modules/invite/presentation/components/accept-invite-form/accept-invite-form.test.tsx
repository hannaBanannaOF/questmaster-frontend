import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import type { FormState } from '@/src/lib/actions';
import { aCharacter } from '@/src/test/fixtures';
import { renderWithProviders } from '@/src/test/render';

import { CharacterPicker } from '../character-picker/character-picker';
import { AcceptInviteForm } from './accept-invite-form';

type State = FormState<'character'>;

function setup(action: (state: State, formData: FormData) => Promise<State>) {
  renderWithProviders(
    <AcceptInviteForm action={action}>
      <CharacterPicker
        name="character"
        legend="Escolha seu personagem"
        characters={[
          aCharacter({ slug: 'harvey', name: 'Harvey Walters' }),
          aCharacter({ slug: 'jenny', name: 'Jenny Barnes' }),
        ]}
      />
    </AcceptInviteForm>,
  );
  return userEvent.setup();
}

const join = () => screen.getByRole('button', { name: 'Juntar-se a campanha' });

describe('AcceptInviteForm', () => {
  it('lista as fichas como rádios e envia a escolhida', async () => {
    const action = vi.fn(
      async (_state: State, _formData: FormData): Promise<State> => ({
        status: 'idle',
      }),
    );
    const user = setup(action);

    expect(screen.getAllByRole('radio')).toHaveLength(2);
    await user.click(screen.getByLabelText(/Jenny Barnes/));
    await user.click(join());

    expect(action.mock.calls[0][1].get('character')).toBe('jenny');
  });

  it('mostra o erro quando nenhuma ficha foi escolhida', async () => {
    const user = setup(async () => ({
      status: 'error',
      fieldErrors: { character: 'invite.character.required' },
    }));

    // O required do rádio barra o envio; o servidor valida do mesmo jeito
    await user.click(screen.getByLabelText(/Harvey Walters/));
    await user.click(join());

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Escolha um personagem para entrar na campanha.',
    );
    expect(
      screen.queryByText('Não foi possível se juntar a campanha!'),
    ).not.toBeInTheDocument();
  });

  it('avisa quando a API recusa a entrada', async () => {
    const user = setup(async () => ({
      status: 'error',
      message: 'Convite expirado',
    }));

    await user.click(screen.getByLabelText(/Harvey Walters/));
    await user.click(join());

    expect(
      await screen.findByText('Não foi possível se juntar a campanha!'),
    ).toBeInTheDocument();
    expect(screen.getByText('Convite expirado')).toBeInTheDocument();
  });
});
