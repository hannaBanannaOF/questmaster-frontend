# Design

## Context

Ver proposal.md (Why). A party (`CampaignCharacters`) renderiza cada personagem com o `CharacterCard`, que é um link inteiro; as fichas prontas já põem o `ConfirmDeleteButton` ao lado, fora do link (`PremadeCharacters`). O `ConfirmDeleteButton` tem o ícone de lixeira fixo. A ficha (`CharacterDetailsView`) mostra "Excluir" e o controle de PV quando `canEditCharacter` (`isPlayer`). O detalhe da ficha do core não traz a campanha nem se o usuário é o mestre dela.

## Goals / Non-Goals

**Goals:**
- Reaproveitar o card, a confirmação e o padrão de diálogo de formulário.

**Non-Goals:**
- Edição pelo mestre na ficha (falta dado no core).

## Decisions

**Ações no módulo da campanha.** A rota é da campanha, então `removeCharacter(campaignId, characterId)` entra no repositório e nos use cases de `campaign`, como as fichas prontas. Duas ações: `leaveCampaignAction(campaignId, characterId, characterSlug)` redireciona para `/characters/{slug}` com flash (o jogador pode ter perdido o acesso à campanha, se era sua única ficha); `removeFromCampaignAction(campaignId, campaignSlug, characterId)` volta para a campanha com flash. Os slugs só montam caminhos internos.

**Botões abaixo do card.** `CampaignCharacters` recebe `canRemove` (DM e não arquivada) e `canLeave` (não arquivada) e põe o botão abaixo de cada card, como nas fichas prontas: "Sair da campanha" só nos cards `isMine`, "Remover" em todos para o DM. As regras ficam em funções de domínio (`canRemoveFromCampaign`, `canLeaveCampaign`).

**Ícone configurável na confirmação.** `ConfirmDeleteButton` ganha `icon` opcional (padrão lixeira); "Sair da campanha" usa `LogOut` e "Remover" usa `UserMinus`. Alternativa: um componente novo de confirmação. Descartada porque o comportamento é o mesmo.

**Edição no módulo do personagem.** `edit(id, {name, maxHp})` no repositório devolve o slug novo; a ação valida com um schema próprio (nome obrigatório, PV máximo opcional), manda `max_hp` só quando preenchido e redireciona para `/characters/{slugNovo}` com o flash "Ficha atualizada!". O diálogo `CharacterEditForm` segue o `CampaignCreateForm` (estado da ação, erros por campo, toast de erro) com os valores atuais como padrão.

## Risks / Trade-offs

- [O mestre não edita pela ficha, embora o core permita] → Registrado como fora do escopo; precisa do core expor no detalhe se o usuário é o mestre da campanha.
- [Outras abas com o slug antigo] → Caem em "Personagem não encontrado" depois do rename; a ficha é encontrada de novo pelas listas.
