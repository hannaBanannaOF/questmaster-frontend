# Spec Delta

## ADDED Requirements

### Requirement: Lista de campanhas

A tela `/campaigns` SHALL mostrar o título "Campanhas" com o total de campanhas do usuário e o botão "Nova campanha" ("Nova" no celular). Cada campanha SHALL aparecer como uma linha com o selo do sistema, o papel do usuário (mestra ou joga), o nome, o status e o sistema. A lista SHALL vir na ordem do último acesso do usuário, 12 por página, em duas colunas só quando cada uma tem pelo menos 440px.

#### Scenario: Usuário com campanhas

- **WHEN** o usuário com 47 campanhas abre `/campaigns`
- **THEN** vê "Campanhas 47" e as 12 abertas por último

#### Scenario: Tablet em pé

- **WHEN** a lista é aberta numa tela de 768px de largura
- **THEN** as campanhas aparecem em uma coluna

### Requirement: Busca e filtros

A lista SHALL ter, nesta ordem: busca pelo nome, papel em abas (Todas, Mestrando, Jogando) e status em botões de um toque (Todos, Jogando, Rascunho, Pausada, Arquivada). Busca, papel, status e página SHALL ficar na URL (`q`, `role`, `status`, `page`), e mudar busca ou filtro SHALL voltar para a página 1. No celular, os botões de status SHALL rolar na horizontal.

#### Scenario: Filtrar por status

- **WHEN** o usuário na página 3 toca em "Pausada"
- **THEN** abre `/campaigns?status=PAUSED`, na página 1

#### Scenario: Buscar pelo nome

- **WHEN** o usuário busca "boston" com o filtro Mestrando ativo
- **THEN** abre `/campaigns?role=dm&q=boston`

### Requirement: Paginação e "Mostrar mais"

A partir de 48rem, a lista SHALL ter a paginação "Mostrando 1–12 de N" com anterior, páginas e próxima; "Anterior" na primeira página e "Próxima" na última MUST NOT ser focáveis nem agir. Abaixo de 48rem, SHALL ter "Mostrar mais", que acrescenta as próximas 12 no fim da lista sem sair do lugar, com o resumo "X de N campanhas" anunciado ao leitor de tela; enquanto carrega, o botão fica em espera, e quando tudo carregou ele sai e fica "Todas as N campanhas".

#### Scenario: Mostrar mais no celular

- **WHEN** o usuário com 47 campanhas toca em "Mostrar mais"
- **THEN** a lista passa a ter 24 campanhas e o resumo diz "24 de 47 campanhas"

#### Scenario: Primeira página

- **WHEN** o usuário está na página 1 no desktop
- **THEN** "Anterior" aparece desativado e não recebe foco

### Requirement: Estados da lista

Enquanto a lista carrega, cabeçalho e filtros SHALL ficar na tela e só a lista SHALL virar esqueleto com linhas da mesma altura. Sem campanhas, SHALL mostrar "Nenhuma campanha ainda" com "Criar campanha" e o aviso de link de convite, sem filtros. Se a busca falhar, SHALL mostrar "Falha crítica" com "Tentar de novo" e "Voltar ao dashboard", sem filtros, e "Nova campanha" continua funcionando. Busca ou filtro sem resultado SHALL dizer o que escondeu e oferecer limpar, MUST NOT oferecer criar. Página além da última SHALL explicar e levar à primeira.

#### Scenario: Busca sem resultado

- **WHEN** a busca por "Yuggoth" não encontra nada
- **THEN** aparece "Nenhuma campanha com “Yuggoth”" e "Limpar busca"

#### Scenario: Filtro sem resultado

- **WHEN** o filtro Mestrando + Pausada não encontra nada
- **THEN** aparece "Nenhuma campanha pausada que você mestra" e "Limpar filtros"

#### Scenario: Busca e filtro sem resultado

- **WHEN** a busca e um filtro juntos não encontram nada
- **THEN** o botão é "Limpar busca e filtros"

#### Scenario: Conta sem campanhas

- **WHEN** o usuário sem campanhas abre `/campaigns`
- **THEN** vê "Nenhuma campanha ainda", "Criar campanha" e o aviso de convite, sem a barra de filtros

### Requirement: Nova campanha

"Nova campanha" SHALL abrir um modal (folha que sobe de baixo no celular, diálogo central a partir de 48rem) com nome, sistema, "Seu apelido na campanha" e descrição opcional. O sistema SHALL começar sem escolha ("Escolha o sistema"). O apelido SHALL ser obrigatório (até 50 caracteres) e vir preenchido com o nome da conta; é como a party vê quem mestra. Erros SHALL aparecer no próprio campo, com borda e fundo de erro e a mensagem com ícone ligada ao campo. Depois de criar, o usuário SHALL ir para a página da campanha nova e ver o toast "Campanha criada".

#### Scenario: Campos vazios

- **WHEN** o usuário envia o form sem nome, sem sistema e com o apelido apagado
- **THEN** vê "Dê um nome à campanha.", "Escolha o sistema da campanha." e "Escolha um apelido." nos campos

#### Scenario: Apelido sugerido

- **WHEN** a usuária Hanna abre "Nova campanha"
- **THEN** o campo "Seu apelido na campanha" já vem com "Hanna"

#### Scenario: Campanha criada

- **WHEN** o usuário cria "Boston Noir"
- **THEN** abre `/campaigns/boston-noir` com o toast de sucesso
