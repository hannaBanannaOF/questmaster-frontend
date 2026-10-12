# Tasks

## 1. Sair e remover da campanha

- [x] 1.1 Adicionar `removeCharacter` ao repositório e aos use cases da campanha (`DELETE /campaign/{id}/character/{characterId}`) e as regras `canLeaveCampaign`/`canRemoveFromCampaign`; verificar com testes de use case e de domínio
- [x] 1.2 Adicionar `icon` opcional ao `ConfirmDeleteButton`; verificar com o teste existente
- [x] 1.3 Criar `leaveCampaignAction` e `removeFromCampaignAction` (flash e redirecionamento) e os botões abaixo dos cards da party; verificar com testes de componente para jogador, DM e campanha arquivada

## 2. Editar ficha

- [x] 2.1 Adicionar `edit` ao repositório e aos use cases do personagem (`PATCH /character/{id}`, devolve o slug) e o schema de edição; verificar com testes de use case e schema
- [x] 2.2 Criar `editCharacterAction` e o diálogo "Editar" na ficha, só para a dona; verificar com teste de componente do formulário

## 3. Integração

- [x] 3.1 Rodar `yarn typecheck`, `yarn lint`, `yarn test`, `yarn build` e `openspec validate leave-and-edit` sem erros
- [ ] 3.2 Com o core 1.5.0: editar e renomear uma ficha (endereço novo); sair e remover precisam de um segundo usuário na campanha
