import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { GameSystem } from '@/src/modules/rpg/domain';
import { renderWithProviders } from '@/src/test/render';

import type { CampaignCharacter } from '../../../domain';
import { CampaignCharacters } from './campaign-characters';

const harvey = {
  id: 1,
  name: 'Harvey',
  slug: 'harvey',
  currentHp: 8,
  maxHp: 12,
  isMine: true,
};
const jenny = { id: 2, name: 'Jenny', slug: 'jenny', isMine: false };

const renderParty = (
  characters: CampaignCharacter[] = [harvey, jenny],
  empty?: string,
) =>
  renderWithProviders(
    <CampaignCharacters
      characters={characters}
      system={GameSystem.CALL_OF_CTHULHU}
      empty={empty}
    />,
  );

describe('CampaignCharacters', () => {
  it('mostra a party com contagem, PV e link para cada ficha', () => {
    renderParty();

    expect(screen.getByText('Personagens (2)')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Harvey/ })).toHaveAttribute(
      'href',
      '/characters/harvey',
    );
    expect(screen.getByRole('link', { name: /Jenny/ })).toHaveAttribute(
      'href',
      '/characters/jenny',
    );
    expect(screen.getByText('8 / 12 PV')).toBeInTheDocument();
  });

  it('marca só a ficha do usuário com "Sua ficha"', () => {
    renderParty();

    expect(screen.getAllByText('Sua ficha')).toHaveLength(1);
    expect(screen.getByRole('link', { name: /Harvey/ })).toHaveTextContent(
      'Sua ficha',
    );
  });

  it('personagem sem slug aparece sem link', () => {
    renderParty([{ id: 3, name: 'Velho', isMine: false }]);

    expect(screen.getByText('Velho')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('sem personagens, mostra o estado vazio', () => {
    renderParty([], 'Ninguém entrou ainda');

    expect(screen.getByText('Personagens (0)')).toBeInTheDocument();
    expect(screen.getByText('Ninguém entrou ainda')).toBeInTheDocument();
    expect(
      screen.queryByRole('list', { name: 'Personagens (0)' }),
    ).not.toBeInTheDocument();
  });

  it('mostra a ação de cada membro abaixo do card, fora do link', () => {
    renderWithProviders(
      <CampaignCharacters
        characters={[harvey, jenny]}
        system={GameSystem.CALL_OF_CTHULHU}
        memberAction={(character) =>
          character.isMine ? <button type="button">Sair</button> : null
        }
      />,
    );

    const leave = screen.getByRole('button', { name: 'Sair' });
    expect(screen.getAllByRole('button', { name: 'Sair' })).toHaveLength(1);
    expect(screen.getByRole('link', { name: /Harvey/ })).not.toContainElement(
      leave,
    );
  });
});
