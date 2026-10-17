import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { type ToastInput, ToastProvider, useToast } from './toaster';

function Trigger(input: ToastInput) {
  const { toast } = useToast();
  return <button onClick={() => toast(input)}>avisar</button>;
}

function show(input: ToastInput) {
  render(
    <ToastProvider dismissLabel="Fechar aviso">
      <Trigger {...input} />
    </ToastProvider>,
  );
  fireEvent.click(screen.getByRole('button', { name: 'avisar' }));
}

describe('ToastProvider', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('o sucesso some sozinho em 5 s, sem botão de fechar', () => {
    show({ type: 'success', title: 'Campanha criada' });

    expect(screen.getByRole('status')).toHaveTextContent('Campanha criada');
    expect(
      screen.queryByRole('button', { name: 'Fechar aviso' }),
    ).not.toBeInTheDocument();

    act(() => vi.advanceTimersByTime(5000));
    expect(screen.queryByText('Campanha criada')).not.toBeInTheDocument();
  });

  it('o tempo pausa enquanto o foco está no aviso', () => {
    show({ type: 'success', title: 'Ficha atualizada' });

    fireEvent.focus(screen.getByRole('status'));
    act(() => vi.advanceTimersByTime(10000));
    expect(screen.getByText('Ficha atualizada')).toBeInTheDocument();

    fireEvent.blur(screen.getByRole('status'));
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.queryByText('Ficha atualizada')).not.toBeInTheDocument();
  });

  it('o erro fica até a pessoa fechar', () => {
    show({
      type: 'error',
      title: 'Não deu para pausar a campanha',
      message: 'Verifique a conexão e tente de novo.',
    });

    act(() => vi.advanceTimersByTime(60000));
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Verifique a conexão e tente de novo.',
    );

    fireEvent.click(screen.getByRole('button', { name: 'Fechar aviso' }));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('um aviso igual a um aberto o substitui', () => {
    show({ type: 'error', title: 'Não deu para criar a campanha' });
    fireEvent.click(screen.getByRole('button', { name: 'avisar' }));

    expect(screen.getAllByRole('alert')).toHaveLength(1);
  });
});
