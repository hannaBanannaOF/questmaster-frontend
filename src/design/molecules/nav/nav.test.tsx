import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Nav } from './nav';

vi.mock('next/navigation', () => ({
  usePathname: () => '/campaigns/mascaras',
}));

const items = [
  {
    href: '/',
    label: 'Dashboard',
    icon: <svg data-testid="icon" />,
    exact: true,
  },
  { href: '/campaigns', label: 'Campanhas', icon: <svg data-testid="icon" /> },
  {
    href: '/characters',
    label: 'Personagens',
    icon: <svg data-testid="icon" />,
  },
];

describe('Nav', () => {
  it('na barra inferior mostra ícone e rótulo e marca a página atual', () => {
    render(<Nav label="Navegação principal" items={items} variant="bottom" />);

    expect(screen.getAllByTestId('icon')).toHaveLength(3);
    expect(screen.getByRole('link', { name: 'Campanhas' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getByRole('link', { name: 'Dashboard' })).not.toHaveAttribute(
      'aria-current',
    );
  });

  it('no cabeçalho mostra ícone e rótulo', () => {
    render(<Nav label="Navegação principal" items={items} />);

    expect(screen.getAllByTestId('icon')).toHaveLength(3);
    expect(
      screen.getByRole('link', { name: 'Personagens' }),
    ).toBeInTheDocument();
  });
});
