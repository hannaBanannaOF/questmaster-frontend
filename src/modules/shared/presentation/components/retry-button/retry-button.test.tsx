import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { RetryButton } from './retry-button';

const refresh = vi.fn();
vi.mock('next/navigation', () => ({ useRouter: () => ({ refresh }) }));

describe('RetryButton', () => {
  it('busca os dados de novo sem recarregar a página', async () => {
    const user = userEvent.setup();
    render(<RetryButton label="Tentar novamente" />);

    await user.click(screen.getByRole('button', { name: 'Tentar novamente' }));

    expect(refresh).toHaveBeenCalledOnce();
  });
});
