# Design

## Context

Ver proposal.md (Why). Depois do `campaign-party`, o detalhe da campanha mostra a party com `CharacterCard` em grade (`CampaignCharacters`). O convite (`InviteView`) busca as fichas elegíveis do usuário em `EligibleCharacters` e renderiza o `AcceptInviteForm`, com rádios nativos de nome `character` cujo valor é o slug. O core aceita o slug de uma ficha pronta no mesmo `POST /invite/{hash}/accept`. O `ConfirmDeleteButton` e o `CreateCampaignButton` (diálogo com formulário) já existem.

## Goals / Non-Goals

**Goals:**
- Reaproveitar o card, a grade, o diálogo de criação e a confirmação de exclusão.
- A escolha no convite continua um único grupo de rádios, sem JavaScript.

**Non-Goals:**
- Editar ficha pronta.
- Mostrar fichas prontas para jogadores na página da campanha.

## Decisions

**Fichas prontas no domínio da campanha.** `CampaignDetails` ganha `premadeCharacters: CampaignCharacter[]` (vazio quando ausente), convertidos de `premade_characters` pelo mesmo mapper da party. A criação é um use case do módulo `campaign` (`createPremadeCharacter(campaignId, {name, maxHp})`) porque a rota é da campanha; a exclusão também (`deletePremadeCharacter`, `DELETE /character/{id}`), com uma ação própria que volta para a campanha. Alternativa: reaproveitar `deleteCharacterAction`. Descartada porque ela redireciona para a lista de personagens, onde fichas prontas não aparecem.

**Seção separada da party.** `PremadeCharacters` mostra "Fichas prontas (N)" com a mesma grade. Cada item é o `CharacterCard` (o mestre abre a ficha em modo leitura) e, ao lado e fora do link, o `ConfirmDeleteButton`. Só aparece para o mestre (`canManageCampaign`); o botão "Nova ficha pronta" só quando a campanha aceita convites (`canInviteToCampaign`). Arquivada e sem fichas prontas, a seção não aparece.

**Criação em diálogo.** "Nova ficha pronta" abre um diálogo como o de criar campanha, com nome e PV máximo opcional, validados por um schema próprio (mesmas regras do nome e do PV da criação de ficha). Sucesso fecha o diálogo, mostra o toast e revalida a campanha.

**Convite em dois grupos, uma escolha.** `Invite` ganha `premadeCharacters: CharacterSummary[]` (sistema do convite). `EligibleCharacters` junta as fichas do usuário e as prontas e passa ao `AcceptInviteForm` em dois grupos; o `CharacterPicker` ganha um `<fieldset>` com legenda por grupo, todos os rádios com o mesmo `name`. Alternativa: uma lista única com selo "Pronta". Descartada porque o jogador precisa ver primeiro as próprias fichas.

**409 atualiza o convite.** Quando o accept falha com `HttpError` 409, a ação revalida `/join/{hash}` além de devolver a mensagem, para a ficha escolhida por outro sumir da lista.

## Risks / Trade-offs

- [Mensagem do 409 vem do core em inglês] → Mesmo limite dos outros toasts de erro; o título do toast já é traduzido.
- [Front publicado antes do core] → `premade_characters` ausente vira lista vazia; a seção e o grupo não aparecem e o botão de criar falha com o toast de erro. Publicar depois do core.
