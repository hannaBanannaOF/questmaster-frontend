import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Menu } from './menu';

const setup = () => {
  const onRemove = vi.fn();
  render(
    <Menu
      label="Ações de Eleanor"
      items={[
        { key: 'open', label: 'Abrir ficha', href: '/characters/eleanor' },
        { key: 'remove', label: 'Remover', danger: true, onSelect: onRemove },
      ]}
    />,
  );
  return { user: userEvent.setup(), onRemove };
};

describe('Menu', () => {
  it('abre com o primeiro item focado e anda pelas setas', async () => {
    const { user } = setup();
    const trigger = screen.getByRole('button', { name: 'Ações de Eleanor' });

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menuitem', { name: 'Abrir ficha' })).toHaveFocus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitem', { name: 'Remover' })).toHaveFocus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitem', { name: 'Abrir ficha' })).toHaveFocus();
  });

  it('Esc fecha e devolve o foco ao botão', async () => {
    const { user } = setup();
    const trigger = screen.getByRole('button', { name: 'Ações de Eleanor' });

    await user.click(trigger);
    await user.keyboard('{Escape}');

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('escolher uma ação fecha o menu e age', async () => {
    const { user, onRemove } = setup();

    await user.click(screen.getByRole('button', { name: 'Ações de Eleanor' }));
    await user.click(screen.getByRole('menuitem', { name: 'Remover' }));

    expect(onRemove).toHaveBeenCalledOnce();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});
