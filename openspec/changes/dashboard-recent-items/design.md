# Design

## Context

Ver proposal.md (Why). O dashboard já busca prévias pequenas em paralelo (`dashboard.loaders.ts`): contagens por status, 5 campanhas do mestre, 1 campanha em andamento e 5 fichas. As listas passam por `getCampaigns`/`getCharacters` com filtros e página; o core recebe a query montada pelos mappers de infra. O core atual lê só os parâmetros que conhece (ignora `sort`) e ainda não manda `last_accessed_at`. O cabeçalho já carrega o usuário (`getCurrentUser`, com `cache()`), e os cards de campanha e de ficha são Server Components compartilhados entre dashboard e listas.

## Goals / Non-Goals

**Goals:**
- Dashboard em ordem de último acesso, sem chamadas a mais além da seção nova de campanhas do jogador.
- Funcionar igual, só sem "Aberta …", enquanto o core não publica o `track-recent-access`.

**Non-Goals:**
- Guardar acessos no navegador (cookie ou `localStorage`).
- Ordenação escolhida pelo usuário nas listas.

## Decisions

**`sort` entra como filtro das listas.** `CampaignListFilters` e `CharacterFilters` ganham `sort?: 'name' | 'recent'`, repassado pelos mappers como `sort`. Só o dashboard pede `recent`; as listas omitem o parâmetro e ficam no padrão do core (nome). Alternativa: um método `listRecent` no repositório. Descartada porque duplicaria a paginação e os filtros que já existem.

**`lastAccessedAt` é opcional no domínio.** `CampaignSummary` e `CharacterSummary` ganham `lastAccessedAt?: Date`, convertido de `last_accessed_at` no mapper. Ausente ou `null` vira `undefined`, que é exatamente o caso do core atual, então nada quebra antes da publicação.

**Formatação própria do "Aberta …".** O `relativeTime` do next-intl usa `numeric: 'always'` ("há 1 dia") e não aceita mudar isso. Um helper puro em `shared/presentation` usa `Intl.RelativeTimeFormat` com `numeric: 'auto'` e granularidade de dia do calendário: hoje, ontem, há N dias, depois semanas e meses. Recebe `now` como argumento, para ser testável.

**Seção nova e destaque reaproveitam a busca de campanhas do jogador.** O dashboard troca a busca "1 campanha em andamento" por duas: `role=player&sort=recent&limit=5` (Campanhas recentes) e `role=player&status=ACTIVE&sort=recent&limit=1` (Continuar jogando). Alternativa: tirar o destaque da primeira ACTIVE da lista recente. Descartada porque a campanha em andamento aberta por último pode não estar entre as 5 mais recentes de todos os status.

**Saudação pelo nome reaproveita o usuário do cabeçalho.** O `DashboardView` chama `getCurrentUser()`, deduplicado pelo `cache()` com o cabeçalho. Se a busca do usuário falhar, o título fica "Bem-vindo de volta", sem nome, e o dashboard não quebra. O `UserGreeting` passa a mostrar avatar (inicial) e nome, no lugar de "Olá, …".

**Contagem zerada sem link.** O card de status com contagem zero vira um `Card` comum, esmaecido e sem `CardLink`, mantendo o layout da grade.

## Risks / Trade-offs

- [Horário do servidor decide "hoje" e "ontem"] → O texto é calculado na renderização, no fuso do servidor. Aceitável para a POC; se o usuário reclamar perto da meia-noite, passar o fuso do usuário.
- [Antes do core, "Campanhas recentes" está em ordem de nome] → Comportamento descrito na spec ("Sem histórico de acesso"); muda sozinho quando o core publicar.
- [Uma chamada a mais no dashboard] → É uma prévia de 5 itens, em paralelo com as outras.
