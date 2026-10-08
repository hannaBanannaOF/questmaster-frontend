# dashboard Specification

## Purpose
Define a home do app: um ponto de partida para quem joga e para quem mestra, com estados para cada combinação de papéis, dados vazios e falhas.

## Requirements

### Requirement: Abas de jogador e mestre
O dashboard SHALL ter as abas "Jogando" e "Mestrando", ambas sempre visíveis, mesmo quando uma delas não tem conteúdo. A aba ativa SHALL vir da URL (`?view=player` ou `?view=dm`).

#### Scenario: Sem aba na URL
- **WHEN** o usuário abre `/` sem `view`
- **THEN** abre "Jogando", exceto quando o usuário só mestra, caso em que abre "Mestrando"

#### Scenario: Aba vazia
- **WHEN** o usuário abre uma aba sem conteúdo
- **THEN** vê um estado vazio com três passos e a ação para começar, e um atalho para a outra aba se ela tiver conteúdo

### Requirement: Aba Jogando
A aba Jogando SHALL destacar a primeira campanha em andamento de outro mestre ("Continuar jogando"), listar até 5 personagens do usuário e indicar próximos passos.

#### Scenario: Personagens fora de campanha
- **WHEN** nenhum personagem do usuário está em campanha
- **THEN** o destaque vira "Pronto pra aventura", explicando como usar o link de convite

#### Scenario: Usuário que não mestra
- **WHEN** o usuário não é DM de nenhuma campanha
- **THEN** "Próximos passos" oferece "Quer mestrar?" com o botão de criar campanha

### Requirement: Aba Mestrando
A aba Mestrando SHALL mostrar a contagem de campanhas por status e a lista das campanhas que o usuário mestra, ordenadas por Jogando, Rascunho, Pausada e Arquivada.

#### Scenario: Usuário que só joga
- **WHEN** o usuário não mestra nenhuma campanha
- **THEN** vê "Você ainda não mestra nenhuma campanha" com os passos criar, convidar e iniciar

### Requirement: Primeiro acesso
Quando as buscas respondem e o usuário não tem campanhas nem personagens, o dashboard SHALL mostrar as boas-vindas com as opções "Vou mestrar" e "Vou jogar", sem abas.

#### Scenario: Conta nova
- **WHEN** um usuário sem dados abre o dashboard
- **THEN** vê "Bem-vindo ao Questmaster" e os botões de criar campanha e criar personagem

### Requirement: Falhas parciais e totais
Campanhas e personagens SHALL ser buscados de forma independente. A falha de uma busca MUST afetar só a seção que depende dela, com "Tentar novamente". Se as duas falharem, o dashboard SHALL mostrar o erro de página inteira.

#### Scenario: Só as campanhas falham
- **WHEN** a busca de campanhas falha e a de personagens responde
- **THEN** aparece "Não foi possível buscar campanhas!" e a lista de personagens continua visível

#### Scenario: Tudo falha
- **WHEN** as duas buscas falham
- **THEN** aparece "Algo deu errado" com "Tentar novamente", sem abas

#### Scenario: Falha não é conta vazia
- **WHEN** alguma busca falha
- **THEN** o dashboard MUST NOT mostrar o primeiro acesso
