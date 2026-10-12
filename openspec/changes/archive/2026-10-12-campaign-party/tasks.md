# Tasks

## 1. Dados da party

- [x] 1.1 Adicionar `slug?`, `currentHp?`, `maxHp?` e `isMine` a `CampaignCharacter`, convertidos de `slug`, `current_hp`, `max_hp` e `is_mine` (ausente vira `false`) no mapper e no DTO; verificar com testes de mapper para os campos presentes e ausentes

## 2. Cards da party

- [x] 2.1 Adicionar a prop opcional `tag` ao `CharacterCard`; verificar com teste de componente que o selo aparece quando passado
- [x] 2.2 Reescrever `CampaignCharacters` para mostrar a party em grade com o `CharacterCard` (sistema da campanha, selo "Sua ficha" quando `isMine`) e o card antigo para personagens sem `slug`; verificar com testes de componente para a party, o selo e o personagem sem `slug`

## 3. Estado vazio do mestre

- [x] 3.1 Em `CampaignDetailsView`, mostrar "Personagens (0)" com "Ninguém entrou ainda" e o `InviteLinkControl` quando não há jogadores e `canInviteToCampaign`; nada quando a campanha está arquivada; verificar com `yarn build` e traduções pt-BR presentes

## 4. Sem permissão vira "não encontrado"

- [x] 4.1 Tratar `HttpError` 403 como "não encontrado" em `getCampaignBySlug` e `getCharacterBySlug`; verificar com teste unitário de um helper compartilhado (`isNotFoundOrForbidden`) para 404, 403 e outros erros

## 5. Integração

- [x] 5.1 Rodar `yarn typecheck`, `yarn lint`, `yarn test`, `yarn build` e `openspec validate campaign-party` sem erros
- [ ] 5.2 Com o core publicando `campaign-party-details`: conferir a party com links e PV, "Sua ficha", o estado vazio do mestre e a ficha de campanha alheia mostrando "Personagem não encontrado"
