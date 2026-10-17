import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import type { FormState } from '@/src/lib/actions';
import { GameSystem } from '@/src/modules/rpg/domain';
import { DialogButton } from '@/src/modules/shared/presentation/components/dialog-button/dialog-button';
import { renderWithProviders } from '@/src/test/render';

import type { PremadeCharacterFormField } from '../../campaign.schema';
import { PremadeCharacterForm } from './premade-character-form';

type State = FormState<PremadeCharacterFormField>;

async function openForm(action: (s: State, f: FormData) => Promise<State>) {
  const user = userEvent.setup();
  renderWithProviders(
    <DialogButton label="Nova ficha pronta" title="Nova" closeLabel="Fechar">
      <PremadeCharacterForm
        action={action}
        system={GameSystem.CALL_OF_CTHULHU}
      />
    </DialogButton>,
  );
  await user.click(screen.getByRole('button', { name: 'Nova ficha pronta' }));
  return user;
}

describe('PremadeCharacterForm', () => {
  it('mostra o erro do campo e continua aberto', async () => {
    const user = await openForm(
      vi.fn(async (): Promise<State> => ({
        status: 'error',
        fieldErrors: { name: 'campaign.premade.form.name.errors.required' },
      })),
    );

    await user.click(screen.getByRole('button', { name: 'Criar ficha' }));

    expect(await screen.findByText('Dê um nome à ficha.')).toBeInTheDocument();
  });

  it('envia o nome, avisa e fecha', async () => {
    const action = vi.fn(async (_s: State, _f: FormData): Promise<State> => ({
      status: 'success',
      values: { name: 'Harvey' },
    }));
    const user = await openForm(action);

    expect(
      screen.getByText('Ficha de Call of Cthulhu 7e, o sistema da campanha'),
    ).toBeInTheDocument();
    await user.type(screen.getByLabelText(/Nome do personagem/), 'Harvey');
    await user.click(screen.getByRole('button', { name: 'Criar ficha' }));

    const data = action.mock.calls[0][1];
    expect(data.get('name')).toBe('Harvey');
    expect(data.has('maxHp')).toBe(false);
    // O aviso nasce no modal e vai para a página quando ele fecha
    await waitFor(() =>
      expect(
        screen.getByText('"Harvey" já pode ser escolhida no convite.'),
      ).toBeInTheDocument(),
    );
    expect(
      screen.queryByLabelText(/Nome do personagem/),
    ).not.toBeInTheDocument();
  });
});
