import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { FormState } from '@/src/lib/actions';
import { DialogButton } from '@/src/modules/shared/presentation/components/dialog-button/dialog-button';
import { renderWithProviders } from '@/src/test/render';

import { createCampaignAction } from '../../campaign.actions';
import type { CampaignFormField } from '../../campaign.schema';
import { CampaignCreateForm } from './campaign-create-form';

vi.mock('../../campaign.actions', () => ({
  createCampaignAction: vi.fn(),
}));

const action = vi.mocked(createCampaignAction);
const key = (path: string) => `campaign.create.form.${path}`;

async function openForm() {
  const user = userEvent.setup();
  renderWithProviders(
    <DialogButton
      label="Nova campanha"
      title="Nova campanha"
      closeLabel="Fechar"
    >
      <CampaignCreateForm />
    </DialogButton>,
  );
  await user.click(screen.getByRole('button', { name: 'Nova campanha' }));
  return user;
}

describe('CampaignCreateForm', () => {
  beforeEach(() => action.mockReset());

  it('mostra o erro de cada campo inválido e continua aberto', async () => {
    action.mockResolvedValue({
      status: 'error',
      fieldErrors: {
        name: key('name.errors.required'),
        system: key('game_system.errors.required'),
      },
      values: { name: '', overview: 'Nova York, 1925.' },
    } satisfies FormState<CampaignFormField>);
    const user = await openForm();

    await user.click(screen.getByRole('button', { name: 'Criar' }));

    expect(
      await screen.findByText('Campo "Nome da campanha" é obrigatório!'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Campo "Sistema de jogo" é obrigatório!'),
    ).toBeInTheDocument();
    // O que foi digitado volta para o form
    expect(screen.getByLabelText(/Descrição/)).toHaveValue('Nova York, 1925.');
    // Erro de campo não vira toast
    expect(
      screen.queryByText('Não foi possível criar campanha!'),
    ).not.toBeInTheDocument();
  });

  it('envia os campos preenchidos', async () => {
    action.mockResolvedValue({ status: 'idle' });
    const user = await openForm();

    await user.type(screen.getByLabelText(/Nome da campanha/), 'Máscaras');
    await user.selectOptions(
      screen.getByLabelText(/Sistema de jogo/),
      'CALL_OF_CTHULHU',
    );
    await user.type(screen.getByLabelText(/Descrição/), 'Nova York, 1925.');
    await user.click(screen.getByRole('button', { name: 'Criar' }));

    const formData = action.mock.calls[0][1];
    expect(Object.fromEntries(formData)).toEqual({
      name: 'Máscaras',
      system: 'CALL_OF_CTHULHU',
      overview: 'Nova York, 1925.',
    });
  });

  it('ao criar, fecha o modal e avisa', async () => {
    action.mockResolvedValue({
      status: 'success',
      values: { name: 'Máscaras' },
    });
    const user = await openForm();

    await user.click(screen.getByRole('button', { name: 'Criar' }));

    expect(await screen.findByText('Nova campanha!')).toBeInTheDocument();
    expect(
      screen.getByText('"Máscaras" está pronta para aventura.'),
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
      await screen.findByText('Não foi possível criar campanha!'),
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
