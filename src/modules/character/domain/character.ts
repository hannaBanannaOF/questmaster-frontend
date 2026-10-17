import type { CampaignStatus } from '@/src/modules/campaign/domain';
import type { GameSystem } from '@/src/modules/rpg/domain';

/** Campanha em que a ficha está, só o necessário para mostrar e linkar. */
export interface CharacterCampaignRef {
  slug: string;
  name: string;
}

export interface CharacterSummary {
  slug: string;
  name: string;
  system: GameSystem;
  /** `null`: a ficha não está em campanha; ausente: a API não informou. */
  campaign?: CharacterCampaignRef | null;
  /** Última vez que o usuário abriu a ficha; ausente se nunca abriu. */
  lastAccessedAt?: Date;
}

/** Campanha da ficha vista no detalhe, com o papel de quem vê. */
export interface CharacterDetailsCampaign extends CharacterCampaignRef {
  id: number;
  status: CampaignStatus;
  /** Quem vê a ficha mestra a campanha dela. */
  isDm: boolean;
  /** Apelido de quem mestra. */
  dmName?: string;
}

export interface CharacterDetails extends Omit<CharacterSummary, 'campaign'> {
  id: number;
  /** O usuário logado é o jogador dono da ficha. */
  isPlayer: boolean;
  /** `null`: sem campanha; ausente: core anterior a character-details-context. */
  campaign?: CharacterDetailsCampaign | null;
  /** Apelido de quem joga com a ficha, na campanha dela. */
  playerName?: string;
  /** Ficha pronta que ninguém escolheu ainda. */
  isPremade?: boolean;
}

/**
 * Edita (nome) e exclui a ficha: a dona, ou o mestre numa ficha pronta que
 * ninguém escolheu (a mesma regra do core).
 */
export function canEditCharacter(
  character: Pick<CharacterDetails, 'isPlayer' | 'isPremade' | 'campaign'>,
) {
  return (
    character.isPlayer ||
    Boolean(character.isPremade && character.campaign?.isDm)
  );
}
