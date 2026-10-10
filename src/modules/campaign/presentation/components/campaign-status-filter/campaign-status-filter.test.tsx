import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ComponentProps } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { CampaignStatus } from '../../../domain';
import { CampaignStatusFilter } from './campaign-status-filter';

// O <Form> do Next navega pelo router; aqui basta um form GET comum
vi.mock('next/form', () => ({
  default: (props: ComponentProps<'form'>) => <form method="get" {...props} />,
}));

const options = [
  { value: '', label: 'Todos os status' },
  { value: 'ACTIVE', label: 'Jogando' },
  { value: 'PAUSED', label: 'Pausada' },
];

function setup(
  props: Partial<ComponentProps<typeof CampaignStatusFilter>> = {},
) {
  const submit = vi.fn((event: SubmitEvent) => event.preventDefault());
  render(
    <CampaignStatusFilter
      options={options}
      labels={{ status: 'Status', apply: 'Filtrar' }}
      {...props}
    />,
  );
  const select = screen.getByLabelText('Status') as HTMLSelectElement;
  select.form!.addEventListener('submit', submit);
  return { select, submit, user: userEvent.setup() };
}

describe('CampaignStatusFilter', () => {
  it('mostra o status atual', () => {
    const { select } = setup({ status: CampaignStatus.PAUSED });

    expect(select).toHaveValue('PAUSED');
  });

  it('sem status, mostra "Todos os status"', () => {
    const { select } = setup();

    expect(select).toHaveValue('');
  });

  it('envia o form ao escolher um status, mantendo o papel', async () => {
    const { select, submit, user } = setup({ role: 'dm' });

    await user.selectOptions(select, 'ACTIVE');

    expect(submit).toHaveBeenCalledOnce();
    expect(Object.fromEntries(new FormData(select.form!))).toEqual({
      role: 'dm',
      status: 'ACTIVE',
    });
  });

  it('não manda papel quando a lista não está filtrada por papel', () => {
    const { select } = setup();

    expect(new FormData(select.form!).has('role')).toBe(false);
  });
});
