import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { UserBadge } from './user-badge';

describe('UserBadge', () => {
  it('mostra a inicial no avatar e o nome', () => {
    render(<UserBadge name="hanna" />);

    expect(screen.getByText('H')).toHaveAttribute('aria-hidden');
    expect(screen.getByText('hanna')).toBeInTheDocument();
  });
});
