# Tasks

## 1. Dados

- [x] 1.1 Adicionar `premadeCharacters` a `CampaignDetails` e `premadeCharacters` a `Invite`, convertidos de `premade_characters` (ausente vira lista vazia) nos mappers e DTOs; verificar com testes de mapper para presente e ausente
- [x] 1.2 Adicionar `createPremadeCharacter` ao repositório e aos use cases da campanha (`POST /campaign/{id}/character`); verificar com teste de use case

## 2. Fichas prontas na campanha

- [x] 2.1 Criar a ação e o diálogo "Nova ficha pronta" (nome e PV máximo, schema validado, toast e revalidação); verificar com testes do schema e do formulário
- [x] 2.2 Criar `PremadeCharacters` (grade com `CharacterCard` e `ConfirmDeleteButton` ao lado) e mostrá-la em `CampaignDetailsView` só para o mestre, com o botão de criar só quando `canInviteToCampaign`; verificar com testes de componente e `yarn build`

## 3. Escolha no convite

- [x] 3.1 Mostrar as fichas do usuário e as prontas em dois grupos no `CharacterPicker` (mesmo `name`), com o estado vazio só quando não há nenhuma; verificar com testes de componente para os dois grupos, só prontas e nenhuma
- [ ] 3.2 Revalidar `/join/{hash}` quando o accept falha com 409; verificar no navegador (o projeto não testa Server Actions)

## 4. Integração

- [x] 4.1 Rodar `yarn typecheck`, `yarn lint`, `yarn test`, `yarn build` e `openspec validate premade-characters` sem erros
- [ ] 4.2 Com o core publicando `premade-characters`: criar e excluir ficha pronta como mestre, e conferir que o convite a oferece e que, escolhida, ela vai para a party
