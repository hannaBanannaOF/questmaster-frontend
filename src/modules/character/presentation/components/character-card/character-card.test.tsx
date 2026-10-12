import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { aCharacter } from '@/src/test/fixtures';
import { renderWithProviders } from '@/src/test/render';

import { CharacterCard } from './character-card';

const bar = (container: HTMLElement) =>
  container.querySelector<HTMLElement>('[aria-hidden] > span');

describe('CharacterCard', () => {
  it('mostra o PV com o máximo e a barra proporcional', () => {
    const { container } = renderWithProviders(
      <CharacterCard character={aCharacter({ currentHp: 3, maxHp: 10 })} />,
    );

    expect(screen.getByText('3 / 10 PV')).toBeInTheDocument();
    expect(bar(container)).toHaveStyle({ width: '30%' });
  });

  it('sem PV máximo, assume 100', () => {
    renderWithProviders(
      <CharacterCard
        character={aCharacter({ currentHp: 40, maxHp: undefined })}
      />,
    );

    expect(screen.getByText('40 / 100 PV')).toBeInTheDocument();
  });

  it('sem PV, não mostra PV nem barra', () => {
    const { container } = renderWithProviders(
      <CharacterCard character={aCharacter({ currentHp: undefined })} />,
    );

    expect(screen.queryByText(/PV/)).not.toBeInTheDocument();
    expect(bar(container)).toBeNull();
  });

  it('mostra quando foi aberta pela última vez', () => {
    renderWithProviders(
      <CharacterCard character={aCharacter({ lastAccessedAt: new Date() })} />,
    );

    expect(screen.getByText('Aberta hoje')).toBeInTheDocument();
  });

  it('ficha nunca aberta não mostra "Aberta"', () => {
    renderWithProviders(<CharacterCard character={aCharacter()} />);

    expect(screen.queryByText(/Aberta/)).not.toBeInTheDocument();
  });

  it('mostra o selo quando passado', () => {
    renderWithProviders(
      <CharacterCard character={aCharacter()} tag={<span>Sua ficha</span>} />,
    );

    expect(screen.getByText('Sua ficha')).toBeInTheDocument();
  });
});
