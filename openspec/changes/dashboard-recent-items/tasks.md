# Tasks

## 1. Dados: ordem recente e último acesso

- [x] 1.1 Adicionar `sort?: 'name' | 'recent'` a `CampaignListFilters` e `CharacterFilters`, repassado pelos mappers como `sort`; verificar com testes de mapper que a query leva `sort=recent` só quando pedido
- [x] 1.2 Adicionar `lastAccessedAt?: Date` a `CampaignSummary` e `CharacterSummary`, convertido de `last_accessed_at` (ausente ou `null` vira `undefined`) e atualizar as fixtures; verificar com testes de mapper para data, `null` e campo ausente

## 2. "Aberta …" e PV nos cards

- [x] 2.1 Criar o helper de último acesso em `shared/presentation` (`Intl.RelativeTimeFormat` com `numeric: 'auto'`, dia do calendário, depois semanas e meses, `now` como argumento) com o texto "Aberta {quando}" em pt-BR; verificar com testes unitários para hoje, ontem, há 4 dias, semanas e meses
- [x] 2.2 Mostrar "Aberta …" no `CampaignCard` e no `CharacterCard` quando houver `lastAccessedAt`; verificar com testes de componente para item aberto e item nunca aberto
- [x] 2.3 Trocar o PV do `CharacterCard` por "atual / máximo PV" com barra proporcional (máximo padrão 100, sem PV não mostra nada); verificar com testes de componente para 3/10, sem máximo e sem PV

## 3. Dashboard com recentes

- [x] 3.1 Atualizar `dashboard.loaders.ts`: campanhas do jogador recentes (limite 5), "Continuar jogando" pela campanha ACTIVE do jogador aberta por último, prévias do mestre e das fichas com `sort=recent`; verificar com `yarn typecheck` e os testes existentes do dashboard
- [x] 3.2 Aba Jogando: seção "Campanhas recentes" com "Ver todas (N)" para `/campaigns?role=player`, e "Personagens recentes" no lugar de "Meus personagens"; verificar com `yarn build` e traduções pt-BR presentes
- [x] 3.3 Aba Mestrando: "Campanhas recentes" no lugar de "Suas campanhas" e contagens zeradas esmaecidas e sem link; verificar com um teste de componente da grade de status (zero sem link, maior que zero com o link filtrado)

## 4. Saudação pelo nome

- [x] 4.1 Título do dashboard com o nome do usuário (sem nome, o nome de usuário; se a busca do usuário falhar, sem nome) e `UserGreeting` com avatar da inicial e nome; verificar com teste de componente do avatar e `yarn build`

## 5. Integração

- [x] 5.1 Rodar `yarn typecheck`, `yarn lint`, `yarn test`, `yarn build` e `openspec validate dashboard-recent-items` sem erros
- [ ] 5.2 Conferir no ambiente de teste, com o core atual, que o dashboard abre em ordem de nome e sem "Aberta …", sem erros
