# Spec Delta

## MODIFIED Requirements

### Requirement: Aba Jogando
A aba Jogando SHALL destacar a campanha em andamento de outro mestre aberta por último pelo usuário ("Continuar jogando"), com as fichas do usuário nela. Abaixo, SHALL listar até 5 "Campanhas recentes" de que o usuário participa como jogador e até 5 "Personagens recentes", ambas na ordem do último acesso do usuário, com "Ver todas (N)" e "Ver todos (N)" quando houver mais, e indicar próximos passos. Itens que o usuário nunca abriu SHALL vir depois dos abertos, em ordem de nome.

#### Scenario: Destaque pelo último acesso
- **WHEN** o usuário joga em duas campanhas em andamento e abriu "Kingsport" depois de "Innsmouth"
- **THEN** "Continuar jogando" mostra "Kingsport"

#### Scenario: Campanhas recentes
- **WHEN** o usuário joga em 7 campanhas
- **THEN** "Campanhas recentes" mostra as 5 abertas por último e "Ver todas (7)" leva à lista de campanhas filtrada por jogador

#### Scenario: Sem histórico de acesso
- **WHEN** o usuário nunca abriu nenhuma campanha nem ficha, ou a API não informa os acessos
- **THEN** as seções mostram os itens em ordem de nome, sem "Aberta …"

#### Scenario: Personagens fora de campanha
- **WHEN** nenhum personagem do usuário está em campanha
- **THEN** o destaque vira "Pronto pra aventura", explicando como usar o link de convite

#### Scenario: Usuário que não mestra
- **WHEN** o usuário não é DM de nenhuma campanha
- **THEN** "Próximos passos" oferece "Quer mestrar?" com o botão de criar campanha

### Requirement: Aba Mestrando
A aba Mestrando SHALL mostrar a contagem de campanhas por status, na ordem Jogando, Rascunho, Pausada e Arquivada, e até 5 "Campanhas recentes" que o usuário mestra, na ordem do último acesso, com "Ver todas (N)" quando houver mais. Cada contagem maior que zero SHALL levar à lista de campanhas filtrada por mestre e por aquele status; contagens zeradas SHALL aparecer esmaecidas e MUST NOT ser links.

#### Scenario: Atalho pelo status
- **WHEN** o DM clica na contagem de campanhas Pausadas
- **THEN** abre `/campaigns?role=dm&status=PAUSED`

#### Scenario: Status sem campanhas
- **WHEN** o DM não tem campanhas Pausadas
- **THEN** a contagem "Pausada 0" aparece esmaecida e não é clicável

#### Scenario: Usuário que só joga
- **WHEN** o usuário não mestra nenhuma campanha
- **THEN** vê "Você ainda não mestra nenhuma campanha" com os passos criar, convidar e iniciar

## ADDED Requirements

### Requirement: Saudação pelo nome
O título do dashboard SHALL cumprimentar o usuário pelo nome ("Bem-vindo de volta, Hanna"), e o cabeçalho do app SHALL mostrar um avatar com a inicial e o nome, sem repetir a saudação. Sem nome cadastrado, SHALL usar o nome de usuário.

#### Scenario: Usuário com nome
- **WHEN** a usuária Hanna abre o dashboard
- **THEN** o título é "Bem-vindo de volta, Hanna" e o cabeçalho mostra "H" e "Hanna"

#### Scenario: Usuário sem nome
- **WHEN** o usuário só tem o nome de usuário "hbanana"
- **THEN** o título é "Bem-vindo de volta, hbanana"
