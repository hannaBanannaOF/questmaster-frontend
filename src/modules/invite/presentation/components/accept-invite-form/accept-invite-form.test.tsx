import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import type { FormState } from '@/src/lib/actions';
import { aCharacter } from '@/src/test/fixtures';
import { renderWithProviders } from '@/src/test/render';

import { AcceptInviteForm } from './accept-invite-form';

type State = FormState<'character'>;

function setup(action: (state: State, formData: FormData) => Promise<State>) {
  renderWithProviders(
    <AcceptInviteForm
      action={action}
      characters={[
        aCharacter({ slug: 'harvey', name: 'Harvey Walters' }),
        aCharacter({ slug: 'jenny', name: 'Jenny Barnes' }),
      ]}
    />,
  );
  return userEvent.setup();
}

const join = () => screen.getByRole('button', { name: 'Juntar-se a campanha' });
const radio = (name: RegExp) => screen.getByRole('radio', { name });

describe('AcceptInviteForm', () => {
  it('lista as fichas como rádios e envia a escolhida', async () => {
    const action = vi.fn(
      async (_state: State, _formData: FormData): Promise<State> => ({
        status: 'idle',
      }),
    );
    const user = setup(action);

    expect(screen.getAllByRole('radio')).toHaveLength(2);
    await user.click(radio(/Jenny Barnes/));
    await user.click(join());

    expect(action.mock.calls[0][1].get('character')).toBe('jenny');
  });

  it('sem escolha, envia e mostra a mensagem do app', async () => {
    const action = vi.fn(async (): Promise<State> => ({
      status: 'error',
      fieldErrors: { character: 'invite.character.required' },
    }));
    const user = setup(action);

    // Sem o balão nativo do navegador: a action valida
    await user.click(join());

    expect(action).toHaveBeenCalledOnce();
    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(
      'Escolha um personagem para entrar na campanha.',
    );
    expect(screen.getByRole('group')).toHaveAttribute(
      'aria-describedby',
      alert.id,
    );
    expect(
      screen.queryByText('Não foi possível se juntar a campanha!'),
    ).not.toBeInTheDocument();
  });

  it('avisa quando a API recusa e mantém a ficha escolhida', async () => {
    const user = setup(async (_state, formData) => ({
      status: 'error',
      message: 'Convite expirado',
      values: { character: String(formData.get('character')) },
    }));

    await user.click(radio(/Jenny Barnes/));
    await user.click(join());

    expect(
      await screen.findByText('Não foi possível se juntar a campanha!'),
    ).toBeInTheDocument();
    expect(screen.getByText('Convite expirado')).toBeInTheDocument();
    expect(radio(/Jenny Barnes/)).toBeChecked();
    expect(radio(/Harvey Walters/)).not.toBeChecked();
  });
});
