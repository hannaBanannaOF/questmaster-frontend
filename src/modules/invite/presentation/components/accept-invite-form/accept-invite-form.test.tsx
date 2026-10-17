import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import type { FormState } from '@/src/lib/actions';
import { aCharacter } from '@/src/test/fixtures';
import { renderWithProviders } from '@/src/test/render';

import type { AcceptInviteField } from '../../invite.schema';
import { AcceptInviteForm } from './accept-invite-form';

type State = FormState<AcceptInviteField>;

const jack = aCharacter({ slug: 'jack', name: 'Jack Brady' });
const roland = aCharacter({ slug: 'roland', name: 'Roland Banks' });

function setup(
  action: (state: State, formData: FormData) => Promise<State> = vi.fn(
    async (): Promise<State> => ({ status: 'idle' }),
  ),
  props: Partial<Parameters<typeof AcceptInviteForm>[0]> = {},
) {
  renderWithProviders(
    <AcceptInviteForm
      action={action}
      campaignName="Sombras de Yuggoth"
      defaultPlayerName="Hanna"
      mine={[jack]}
      premade={[roland]}
      {...props}
    />,
  );
  return userEvent.setup();
}

const join = () => screen.getByRole('button', { name: /Juntar-se à campanha/ });
const radio = (name: RegExp) => screen.getByRole('radio', { name });

describe('AcceptInviteForm', () => {
  it('mostra os dois grupos numa escolha só, sem nada marcado', async () => {
    const user = setup();

    expect(screen.getByRole('group', { name: 'Suas fichas' })).toContainElement(
      radio(/Jack Brady/),
    );
    expect(
      screen.getByRole('group', { name: 'Fichas prontas do mestre' }),
    ).toContainElement(radio(/Roland Banks/));
    expect(radio(/Jack Brady/)).not.toBeChecked();
    expect(radio(/Roland Banks/)).not.toBeChecked();

    await user.click(radio(/Jack Brady/));
    await user.click(radio(/Roland Banks/));

    expect(radio(/Jack Brady/)).not.toBeChecked();
    expect(radio(/Roland Banks/)).toBeChecked();
  });

  it('o resumo diz quem entra e com qual ficha', async () => {
    const user = setup();

    expect(screen.getByText('Escolha uma ficha para continuar')).toBeVisible();
    expect(join()).toHaveAttribute('aria-disabled', 'true');

    await user.click(radio(/Jack Brady/));

    expect(
      screen.getByText(
        (_, node) =>
          node?.textContent === 'Você entra como Hanna, com Jack Brady',
      ),
    ).toBeInTheDocument();
    expect(join()).not.toHaveAttribute('aria-disabled');
  });

  it('envia a ficha e o apelido, já preenchido com o nome da conta', async () => {
    const action = vi.fn(
      async (_state: State, _formData: FormData): Promise<State> => ({
        status: 'idle',
      }),
    );
    const user = setup(action);

    await user.click(radio(/Roland Banks/));
    await user.click(join());

    expect(Object.fromEntries(action.mock.calls[0][1])).toEqual({
      character: 'roland',
      playerName: 'Hanna',
    });
  });

  it('sem escolha, mostra a mensagem acima das fichas e leva o foco a elas', async () => {
    const user = setup(
      vi.fn(async (): Promise<State> => ({
        status: 'error',
        fieldErrors: { character: 'invite.character.required' },
        values: { playerName: 'Hanna' },
      })),
    );

    await user.click(join());

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Escolha uma ficha para entrar na campanha.',
    );
    expect(screen.getByRole('radiogroup')).toHaveFocus();
  });

  it('sem apelido, mostra o erro no campo e leva o foco a ele', async () => {
    const user = setup(
      vi.fn(async (): Promise<State> => ({
        status: 'error',
        fieldErrors: { playerName: 'invite.playerName.errors.required' },
        values: { character: 'jack', playerName: '' },
      })),
    );

    await user.click(join());

    expect(await screen.findByText('Escolha um apelido.')).toBeInTheDocument();
    expect(screen.getByLabelText(/Seu apelido na campanha/)).toHaveFocus();
    // A escolha continua marcada
    expect(radio(/Jack Brady/)).toBeChecked();
  });

  it('ficha pronta pega: avisa pelo nome e limpa a escolha', async () => {
    const user = setup(
      vi.fn(async (): Promise<State> => ({
        status: 'error',
        fieldErrors: { character: 'invite.character.taken' },
        values: { character: 'roland', playerName: 'Hanna' },
      })),
    );

    await user.click(radio(/Roland Banks/));
    await user.click(join());

    expect(
      await screen.findByText(
        'Outra pessoa entrou com Roland Banks. Escolha outra ficha.',
      ),
    ).toBeInTheDocument();
    expect(radio(/Roland Banks/)).not.toBeChecked();
    expect(
      screen.queryByRole('alert', { name: /Escolha uma ficha/ }),
    ).toBeNull();
  });

  it('sem fichas próprias, as prontas vêm com a linha de criar personagem', () => {
    setup(undefined, {
      mine: [],
      noneMine: {
        message: 'Você ainda não tem fichas de Call of Cthulhu 7e.',
        action: <a href="#novo">Criar personagem</a>,
      },
    });

    expect(screen.queryByRole('group', { name: 'Suas fichas' })).toBeNull();
    expect(
      screen.getByText(/Você ainda não tem fichas de Call of Cthulhu 7e/),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Criar personagem' }),
    ).toBeVisible();
  });
});
