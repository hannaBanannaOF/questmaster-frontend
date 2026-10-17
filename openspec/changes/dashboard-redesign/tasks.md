# Tasks

## 1. Design system

- [x] 1.1 Tokens do HeroUI v3 (superfícies, `default`, `accent`, `success`/`warning`/`danger` soft, `muted`, `segment`, sombra) nos dois temas e cor do sistema CoC separada do verde de status
- [x] 1.2 Átomos `Avatar` (iniciais) e `Chip` (soft, com bolinha); molécula `Alert`; `Tabs` (links) e `SectionHeader` com contador; verificar com teste de componente onde há lógica

## 2. Dados

- [x] 2.1 `CharacterSummary.campaign` opcional (`null` = sem campanha, ausente = API antiga) no mapper; verificar com teste do mapper
- [x] 2.2 Loader: campanha em andamento do mestre para "Continuar mestrando"; totais vêm das prévias (sai a busca de contagens e a de fichas sem campanha)

## 3. Dashboard

- [x] 3.1 `buildDashboardViewModel` com todos os estados; verificar com teste unitário da tabela de estados
- [x] 3.2 Views e componentes: destaque, card de ficha, linha de campanha, seções, escolhas do primeiro acesso, convite ao outro papel, erros
- [x] 3.3 `loading.tsx` com esqueleto no formato da tela
- [x] 3.4 Traduções

## 4. Integração

- [x] 4.1 `yarn typecheck`, `yarn lint`, `yarn test`, `yarn build`
- [ ] 4.2 Conferir no navegador a 375, 768 e 1280px nos dois temas
