# Design

## Context

Ver proposal.md (Why). O detalhe da campanha (`CampaignDetailsView`) mostra `CampaignCharacters` só quando `playerCount > 0`, com `CampaignCharacter` = `{ id, name }`. O `CharacterCard` (módulo `character`) já mostra nome, sistema, "atual / máximo PV" com barra e "Aberta …", sempre como link para a ficha. Os loaders de detalhe (`getCampaignBySlug`, `getCharacterBySlug`) só convertem `NotFoundError` em `notFound()`; um 403 do core vira `HttpError` e cai na tela de erro genérica. O `InviteLinkControl` já cria e copia o convite e é usado no cabeçalho do detalhe.

## Goals / Non-Goals

**Goals:**
- Reaproveitar o card de ficha e o controle de convite, sem componentes paralelos.
- Funcionar, sem quebrar, antes de o core publicar `campaign-party-details`.

**Non-Goals:**
- Edição de PV pelo mestre na tela da campanha.
- Tratar 403 globalmente no cliente HTTP.

## Decisions

**`CampaignCharacter` ganha os campos do card, opcionais.** `{ id, name, slug?, currentHp?, maxHp?, isMine }`, convertidos de `slug`, `current_hp`, `max_hp` e `is_mine` no mapper (`is_mine` ausente vira `false`). O sistema é o da campanha, por regra do convite, então não vem por personagem.

**A seção usa o `CharacterCard`.** `CampaignCharacters` converte cada personagem em `CharacterSummary` e renderiza o `CharacterCard`, importado pelo caminho do componente (o barrel do módulo `character` carrega loaders `server-only`). O card ganha uma prop opcional `tag` para o selo "Sua ficha". Alternativa: um card de party próprio no módulo `campaign`. Descartada porque duplicaria PV, barra e link, que precisam ficar iguais às listas.

**Sem `slug`, card sem link.** Antes de o core publicar, os personagens chegam sem `slug`; a seção mostra o card antigo (só o nome) para esses, em vez de um link quebrado.

**Estado vazio na view, não na seção.** `CampaignDetailsView` decide: com jogadores, a party; sem jogadores e `canInviteToCampaign` (DM e campanha não arquivada), o estado vazio com o mesmo `InviteLinkControl` do cabeçalho; caso contrário, nada. O jogador nunca cai no vazio, porque a própria ficha dele está na campanha.

**403 vira "não encontrado" nos loaders de detalhe.** Os dois loaders tratam `HttpError` com status 403 como `NotFoundError`. Alternativa: o cliente HTTP lançar `NotFoundError` para 403. Descartada porque as Server Actions também recebem 403 (ex.: mudar status sem ser DM) e precisam continuar mostrando o motivo no toast.

## Risks / Trade-offs

- [Grade em vez de lista destoa das outras telas] → Desenho aprovado no canvas; com 4 a 6 personagens a grade ocupa menos altura. Se ficar estranho em telas estreitas, a grade cai para uma coluna (`auto-fill`, mínimo 20rem).
- [Front publicado antes do core] → Cards sem link e com PV sem máximo assumido de 100; corrige sozinho quando o core publicar.
