import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Pagination } from './pagination';

const labels = {
  nav: 'Paginação',
  previous: 'Anterior',
  next: 'Próxima',
  page: (n: number) => `Página ${n}`,
};

function setup(page: number, pageCount: number) {
  render(
    <Pagination
      page={page}
      pageCount={pageCount}
      hrefFor={(n) => `/campaigns?page=${n}`}
      summary="Mostrando 21–30 de 47 campanhas"
      labels={labels}
      formatNumber={(n) => n.toLocaleString('pt-BR')}
    />,
  );
  return screen.queryByRole('navigation', { name: 'Paginação' });
}

describe('Pagination', () => {
  it('some quando tudo cabe numa página', () => {
    expect(setup(1, 1)).not.toBeInTheDocument();
  });

  it('marca a página atual e linka as outras', () => {
    const nav = setup(3, 5)!;

    expect(within(nav).getByRole('link', { name: 'Página 3' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(within(nav).getByRole('link', { name: 'Página 4' })).toHaveAttribute(
      'href',
      '/campaigns?page=4',
    );
    expect(within(nav).getByRole('link', { name: /Anterior/ })).toHaveAttribute(
      'href',
      '/campaigns?page=2',
    );
    expect(
      within(nav).getByText('Mostrando 21–30 de 47 campanhas'),
    ).toBeInTheDocument();
  });

  it('desabilita Anterior na primeira página e Próxima na última', () => {
    setup(1, 2);
    expect(
      screen.queryByRole('link', { name: /Anterior/ }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText('Anterior').closest('[aria-disabled]'),
    ).toHaveAttribute('aria-disabled', 'true');
  });

  it('com muitas páginas, usa reticências e formata o número', () => {
    const nav = setup(6, 1502)!;

    const pages = within(nav)
      .getAllByRole('link', { name: /^Página/ })
      .map((link) => link.textContent);
    expect(pages).toEqual(['1', '5', '6', '7', '1.502']);
    expect(within(nav).getAllByText('…')).toHaveLength(2);
  });
});
