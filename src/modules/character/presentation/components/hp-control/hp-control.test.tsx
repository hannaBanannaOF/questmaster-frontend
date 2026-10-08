import { act, fireEvent, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { ActionResult } from '@/src/lib/actions';
import { renderWithProviders } from '@/src/test/render';

import { HpControl } from './hp-control';

const saved = (hp: number): ActionResult<number> => ({ ok: true, data: hp });

function setup(props: Partial<Parameters<typeof HpControl>[0]> = {}) {
  const updateHp = vi.fn(async (hp: number) => saved(hp));
  renderWithProviders(
    <HpControl current={8} max={12} editable updateHp={updateHp} {...props} />,
  );
  return {
    updateHp: (props.updateHp as typeof updateHp) ?? updateHp,
    meter: () => screen.getByRole('meter'),
    decrease: () => screen.getByRole('button', { name: 'Diminuir PV' }),
    increase: () => screen.getByRole('button', { name: 'Aumentar PV' }),
  };
}

// Avança o atraso do salvamento e deixa a action resolver
const flushSave = () =>
  act(async () => {
    await vi.advanceTimersByTimeAsync(500);
  });

describe('HpControl', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('mostra o PV atual e o máximo', () => {
    const { meter } = setup();

    expect(screen.getByText('8 / 12')).toBeInTheDocument();
    expect(meter()).toHaveAttribute('aria-valuenow', '8');
    expect(meter()).toHaveAttribute('aria-valuemax', '12');
  });

  it('muda na hora e salva uma vez só, 500 ms depois do último clique', async () => {
    const { updateHp, increase, decrease, meter } = setup();

    fireEvent.click(increase());
    fireEvent.click(increase());
    act(() => vi.advanceTimersByTime(400));
    fireEvent.click(increase());
    fireEvent.click(decrease());

    expect(meter()).toHaveAttribute('aria-valuenow', '10');
    act(() => vi.advanceTimersByTime(499));
    expect(updateHp).not.toHaveBeenCalled();

    await flushSave();

    expect(updateHp).toHaveBeenCalledOnce();
    expect(updateHp).toHaveBeenCalledWith(10);
  });

  it('não salva quando o valor volta ao original', async () => {
    const { updateHp, increase, decrease } = setup();

    fireEvent.click(increase());
    fireEvent.click(decrease());
    await flushSave();

    expect(updateHp).not.toHaveBeenCalled();
  });

  it('não passa do máximo nem fica abaixo de 0', () => {
    const { increase, decrease } = setup({ current: 12, max: 12 });

    expect(increase()).toBeDisabled();
    expect(decrease()).toBeEnabled();

    setup({ current: 0, max: 12 });
    const [, decreaseAtZero] = screen.getAllByRole('button', {
      name: 'Diminuir PV',
    });
    expect(decreaseAtZero).toBeDisabled();
  });

  it('volta ao último valor salvo e avisa quando a API recusa', async () => {
    const updateHp = vi.fn(async (): Promise<ActionResult<number>> => ({
      ok: false,
      message: 'PV acima do máximo',
    }));
    const { increase, meter } = setup({ updateHp });

    fireEvent.click(increase());
    expect(meter()).toHaveAttribute('aria-valuenow', '9');

    await flushSave();

    expect(meter()).toHaveAttribute('aria-valuenow', '8');
    expect(
      screen.getByText('Não foi possível atualizar personagem!'),
    ).toBeInTheDocument();
    expect(screen.getByText('PV acima do máximo')).toBeInTheDocument();
  });

  it('traduz a mensagem de erro quando ela é uma chave', async () => {
    const updateHp = vi.fn(async (): Promise<ActionResult<number>> => ({
      ok: false,
    }));
    const { increase } = setup({ updateHp });

    fireEvent.click(increase());
    await flushSave();

    expect(
      screen.getByText('Algo deu errado. Tente novamente.'),
    ).toBeInTheDocument();
  });

  it('em modo leitura, mostra o PV sem os botões', () => {
    setup({ editable: false });

    expect(screen.getByRole('meter')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('adota o valor novo vindo do servidor', () => {
    const updateHp = vi.fn(async (hp: number) => saved(hp));
    const { rerender } = renderWithProviders(
      <HpControl current={8} max={12} editable updateHp={updateHp} />,
    );

    rerender(<HpControl current={5} max={12} editable updateHp={updateHp} />);

    expect(screen.getByRole('meter')).toHaveAttribute('aria-valuenow', '5');
  });
});
