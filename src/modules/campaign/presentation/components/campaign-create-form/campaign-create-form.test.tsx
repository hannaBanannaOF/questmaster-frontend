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
      <CampaignCreateForm defaultDmName="Hanna" />
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

    await user.click(screen.getByRole('button', { name: 'Criar campanha' }));

    expect(
      await screen.findByText('Dê um nome à campanha.'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Escolha o sistema da campanha.'),
    ).toBeInTheDocument();
    // O erro fica ligado ao campo para o leitor de tela
    expect(
      screen.getByLabelText(/Nome da campanha/),
    ).toHaveAccessibleDescription('Dê um nome à campanha.');
    // O que foi digitado volta para o form
    expect(screen.getByLabelText(/Descrição/)).toHaveValue('Nova York, 1925.');
    // Erro de campo não vira toast
    expect(
      screen.queryByText('Não deu para criar a campanha'),
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
    await user.click(screen.getByRole('button', { name: 'Criar campanha' }));

    const formData = action.mock.calls[0][1];
    expect(Object.fromEntries(formData)).toEqual({
      name: 'Máscaras',
      system: 'CALL_OF_CTHULHU',
      // O apelido já vem com o nome da conta
      dmName: 'Hanna',
      overview: 'Nova York, 1925.',
    });
  });

  it('avisa quando a API falha', async () => {
    action.mockResolvedValue({ status: 'error', message: 'API fora do ar' });
    const user = await openForm();

    await user.click(screen.getByRole('button', { name: 'Criar campanha' }));

    expect(
      await screen.findByText('Não deu para criar a campanha'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Verifique a conexão e tente de novo.'),
    ).toBeInTheDocument();
  });

  it('cancelar fecha o modal sem enviar', async () => {
    const user = await openForm();

    await user.click(screen.getByRole('button', { name: 'Cancelar' }));

    expect(
      screen.queryByRole('button', { name: 'Criar campanha' }),
    ).not.toBeInTheDocument();
    expect(action).not.toHaveBeenCalled();
  });
});
