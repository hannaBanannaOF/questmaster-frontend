import type {
  CampaignDetails,
  CampaignSummary,
} from '@/src/modules/campaign/domain';
import { CampaignStatus } from '@/src/modules/campaign/domain';
import type {
  CharacterDetails,
  CharacterSummary,
} from '@/src/modules/character/domain';
import { GameSystem } from '@/src/modules/rpg/domain';

// Builders com valores padrão: cada teste só declara o que importa para ele

export const aCampaign = (
  overrides: Partial<CampaignSummary> = {},
): CampaignSummary => ({
  slug: 'mascaras-de-nyarlathotep',
  name: 'Máscaras de Nyarlathotep',
  system: GameSystem.CALL_OF_CTHULHU,
  status: CampaignStatus.DRAFT,
  isDm: true,
  playerCount: 0,
  myCharacters: [],
  ...overrides,
});

export const aCampaignDetails = (
  overrides: Partial<CampaignDetails> = {},
): CampaignDetails => ({
  slug: 'mascaras-de-nyarlathotep',
  name: 'Máscaras de Nyarlathotep',
  system: GameSystem.CALL_OF_CTHULHU,
  status: CampaignStatus.DRAFT,
  isDm: true,
  playerCount: 0,
  id: 1,
  characters: [],
  premadeCharacters: [],
  ...overrides,
});

export const aCharacter = (
  overrides: Partial<CharacterSummary> = {},
): CharacterSummary => ({
  slug: 'harvey-walters',
  name: 'Harvey Walters',
  system: GameSystem.CALL_OF_CTHULHU,
  ...overrides,
});

export const aCharacterDetails = (
  overrides: Partial<CharacterDetails> = {},
): CharacterDetails => ({
  slug: 'harvey-walters',
  name: 'Harvey Walters',
  system: GameSystem.CALL_OF_CTHULHU,
  id: 1,
  isPlayer: true,
  ...overrides,
});
