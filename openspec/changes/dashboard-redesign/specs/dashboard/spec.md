# Spec Delta

## MODIFIED Requirements

### Requirement: Abas de jogador e mestre

O dashboard SHALL ter as abas "Jogando" e "Mestrando" quando o usuário joga e mestra, ou quando não dá para saber (a busca de campanhas falhou). Quem só joga ou só mestra MUST NOT ver abas; vê o conteúdo do seu papel e, no fim, um convite discreto para o outro papel. A aba ativa SHALL vir da URL (`?view=player` ou `?view=dm`).

#### Scenario: Sem aba na URL

- **WHEN** o usuário que joga e mestra abre `/` sem `view`
- **THEN** abre "Jogando"

#### Scenario: Só joga

- **WHEN** o usuário tem personagens e não mestra nenhuma campanha
- **THEN** vê o conteúdo de jogador sem abas e, no fim, "Quer mestrar uma mesa?" com "Criar campanha"

#### Scenario: Só mestra

- **WHEN** o usuário mestra campanhas e não tem personagens nem campanhas como jogador
- **THEN** vê o conteúdo de mestre sem abas e, no fim, "Quer jogar também?" com "Criar personagem"

#### Scenario: Aba vazia

- **WHEN** o usuário que não mestra nenhuma campanha abre `/?view=dm`
- **THEN** não há abas e ele vê o conteúdo de jogador, com o convite "Quer mestrar uma mesa?" no fim

### Requirement: Aba Jogando

A aba Jogando SHALL destacar a campanha em andamento de outro mestre aberta por último ("Continuar jogando"), com o sistema, o nome e a ficha do usuário nela, e o botão "Continuar sessão". Abaixo, SHALL mostrar "Personagens" (cards com sistema, iniciais, nome e a campanha da ficha ou "Sem campanha") e "Campanhas" (linhas com o selo do sistema, o papel, o status e a ficha), cada seção com o total ao lado do título, "Ver todos/todas" e, em Personagens, "Novo". Itens SHALL vir na ordem do último acesso. No celular, Personagens SHALL ser um carrossel horizontal; no tablet e desktop, uma grade.

#### Scenario: Destaque pelo último acesso

- **WHEN** o usuário joga em duas campanhas em andamento e abriu "Kingsport" depois de "Innsmouth"
- **THEN** "Continuar jogando" mostra "Kingsport"

#### Scenario: Ficha sem campanha

- **WHEN** uma ficha do usuário não está em nenhuma campanha
- **THEN** o card dela mostra o chip "Sem campanha"

#### Scenario: Campanhas recentes

- **WHEN** o usuário joga em 7 campanhas
- **THEN** "Campanhas" mostra até 5 abertas por último (sem a do destaque), o total 7 ao lado do título e "Ver todas" leva à lista de campanhas filtrada por jogador

#### Scenario: Sem histórico de acesso

- **WHEN** o usuário nunca abriu nenhuma campanha nem ficha, ou a API não informa os acessos
- **THEN** as seções mostram os itens em ordem de nome

#### Scenario: Usuário que não mestra

- **WHEN** o usuário não é DM de nenhuma campanha
- **THEN** no fim da página aparece "Quer mestrar uma mesa?" com "Criar campanha"

#### Scenario: Personagens fora de campanha

- **WHEN** o usuário tem personagens e nenhum está em campanha
- **THEN** no lugar do destaque aparece "Pronto para a aventura", explicando o link de convite, e não há seção Campanhas

### Requirement: Aba Mestrando

A aba Mestrando SHALL destacar a campanha em andamento que o usuário mestra aberta por último ("Continuar mestrando"), com status, número de jogadores e "Abrir campanha". Abaixo, SHALL mostrar "Campanhas" (as que o usuário mestra, com "Nova" e "Ver todas") e "Precisa de você" (campanhas sem jogadores, marcadas para convite). Uma campanha MUST aparecer em uma só dessas seções.

#### Scenario: Campanha sem jogadores

- **WHEN** o DM tem uma campanha em que ninguém entrou
- **THEN** ela aparece em "Precisa de você" com "ninguém entrou · Convidar" e não aparece em "Campanhas"

#### Scenario: Sem campanha em andamento

- **WHEN** nenhuma campanha do DM está em andamento
- **THEN** não há destaque e as seções começam no topo do painel

#### Scenario: Atalho pelo status

- **WHEN** o DM quer ver só as campanhas de um status
- **THEN** "Ver todas" leva a `/campaigns?role=dm`, onde o status é filtrado

#### Scenario: Status sem campanhas

- **WHEN** o DM abre a aba Mestrando
- **THEN** o dashboard MUST NOT mostrar contagens por status (inclusive as zeradas)

#### Scenario: Usuário que só joga

- **WHEN** o usuário não mestra nenhuma campanha
- **THEN** não há aba Mestrando e o convite "Quer mestrar uma mesa?" aparece no fim

### Requirement: Primeiro acesso

Quando as buscas respondem e o usuário não tem campanhas nem personagens, o dashboard SHALL mostrar "Boas-vindas, {nome}" com duas escolhas de mesmo peso, "Vou jogar" e "Vou mestrar", cada uma com dois passos e o botão de criar, e o aviso "Recebeu um link de convite?", sem abas.

#### Scenario: Conta nova

- **WHEN** um usuário sem dados abre o dashboard
- **THEN** vê as escolhas "Vou jogar" (Criar personagem) e "Vou mestrar" (Criar campanha)

### Requirement: Falhas parciais e totais

Campanhas e personagens SHALL ser buscados de forma independente. A falha de uma busca MUST afetar só a seção que depende dela: a seção fica no lugar com um Alert de erro e "Tentar de novo". Sem campanhas, o destaque não aparece. Se as duas falharem, o dashboard SHALL mostrar "Falha crítica" com "Tentar de novo" e "Abrir personagens", sem abas.

#### Scenario: Só as campanhas falham

- **WHEN** a busca de campanhas falha e a de personagens responde
- **THEN** a seção Campanhas mostra "Não conseguimos carregar suas campanhas." e Personagens continua visível

#### Scenario: Campanhas falham na aba Mestrando

- **WHEN** a busca de campanhas falha e o usuário abre "Mestrando"
- **THEN** o painel mostra "Não conseguimos carregar suas campanhas" com "Tentar de novo" e "Ir para Jogando"

#### Scenario: Tudo falha

- **WHEN** as duas buscas falham
- **THEN** aparece "Falha crítica: Não conseguimos carregar seu dashboard", sem abas

#### Scenario: Falha não é conta vazia

- **WHEN** alguma busca falha
- **THEN** o dashboard MUST NOT mostrar o primeiro acesso

### Requirement: Saudação pelo nome

O título do dashboard SHALL cumprimentar o usuário pelo nome ("Olá, Hanna"; no primeiro acesso, "Boas-vindas, Hanna") com o subtítulo "Sua mesa te espera.". Sem nome cadastrado, SHALL usar o nome de usuário.

#### Scenario: Usuário com nome

- **WHEN** a usuária Hanna abre o dashboard
- **THEN** o título é "Olá, Hanna"

#### Scenario: Usuário sem nome

- **WHEN** o usuário só tem o nome de usuário "hbanana"
- **THEN** o título é "Olá, hbanana"

## ADDED Requirements

### Requirement: Carregamento com a forma da tela

Enquanto os dados chegam, o dashboard SHALL mostrar um esqueleto com a forma da tela (título, destaque, grade de personagens e linhas de campanha) com um brilho único, parado quando o usuário pede menos movimento, e anunciar "Carregando seu dashboard…" a leitores de tela.

#### Scenario: Primeira carga

- **WHEN** o usuário abre `/` e os dados ainda não chegaram
- **THEN** vê o esqueleto e o leitor de tela anuncia o carregamento
