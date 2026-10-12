import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import type { FormState } from '@/src/lib/actions';
import { DialogButton } from '@/src/modules/shared/presentation/components/dialog-button/dialog-button';
import { renderWithProviders } from '@/src/test/render';

import type { PremadeCharacterFormField } from '../../campaign.schema';
import { PremadeCharacterForm } from './premade-character-form';

type State = FormState<PremadeCharacterFormField>;

async function openForm(action: (s: State, f: FormData) => Promise<State>) {
  const user = userEvent.setup();
  renderWithProviders(
    <DialogButton label="Nova ficha pronta" title="Nova" closeLabel="Fechar">
      <PremadeCharacterForm action={action} />
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

    await user.click(screen.getByRole('button', { name: 'Criar' }));

    expect(
      await screen.findByText('Campo "Nome do personagem" é obrigatório!'),
    ).toBeInTheDocument();
  });

  it('envia nome e PV, avisa e fecha', async () => {
    const action = vi.fn(async (_s: State, _f: FormData): Promise<State> => ({
      status: 'success',
      values: { name: 'Harvey' },
    }));
    const user = await openForm(action);

    await user.type(screen.getByLabelText(/Nome do personagem/), 'Harvey');
    await user.type(screen.getByLabelText(/PV máximo/), '12');
    await user.click(screen.getByRole('button', { name: 'Criar' }));

    const data = action.mock.calls[0][1];
    expect(data.get('name')).toBe('Harvey');
    expect(data.get('maxHp')).toBe('12');
    expect(
      await screen.findByText('"Harvey" já pode ser escolhida no convite.'),
    ).toBeInTheDocument();
    expect(
      screen.queryByLabelText(/Nome do personagem/),
    ).not.toBeInTheDocument();
  });
});
