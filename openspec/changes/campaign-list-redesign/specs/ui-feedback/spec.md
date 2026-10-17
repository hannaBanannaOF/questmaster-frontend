# Spec Delta

## MODIFIED Requirements

### Requirement: Carregamento de listas

Telas de lista ainda não redesenhadas (personagens, fichas do convite) SHALL carregar com o Loader (ícone de dados animado e mensagem). A lista de campanhas e o dashboard SHALL carregar com um esqueleto no formato das linhas reais, mantendo cabeçalho e filtros na tela.

#### Scenario: Abrindo a lista de campanhas

- **WHEN** a lista de campanhas está carregando
- **THEN** cabeçalho e filtros aparecem e a lista vira linhas de esqueleto, anunciando "Carregando campanhas…" ao leitor de tela

### Requirement: Paginação de listas

A lista de campanhas SHALL mostrar 12 itens por página e a de personagens 10, com páginas numeradas na URL (`?page=N`) e o resumo "Mostrando X–Y de N". Os filtros (busca, papel e status nas campanhas, "Sem campanha" nos personagens) SHALL ficar na URL, e trocar um filtro SHALL voltar para a página 1. O paginador MUST NOT aparecer quando tudo cabe numa página. Na lista de campanhas abaixo de 48rem, "Mostrar mais" SHALL substituir o paginador.

#### Scenario: Muitas páginas

- **WHEN** a lista tem mais páginas do que cabem no paginador
- **THEN** ele mostra a primeira, a última e as vizinhas da atual, com reticências entre elas

#### Scenario: Filtro sem resultado

- **WHEN** nenhum item bate com os filtros
- **THEN** aparece um estado vazio específico do filtro, com o caminho para limpar os filtros

#### Scenario: Página além do fim

- **WHEN** o usuário abre uma página maior que a última
- **THEN** vê "Essa página não existe" com o link para a primeira página

### Requirement: Último acesso nos cards

Os cards de ficha ainda não redesenhados SHALL mostrar quando o usuário abriu o item pela última vez, em tempo relativo ("Aberta hoje", "Aberta ontem", "Aberta há 4 dias"). As linhas de campanha (dashboard e lista) MUST NOT mostrar essa linha: o último acesso define a ordem. Item que o usuário nunca abriu, ou sem essa informação da API, MUST NOT mostrar a linha.

#### Scenario: Item aberto ontem

- **WHEN** o usuário abriu uma ficha ontem
- **THEN** o card dela na lista de personagens mostra "Aberta ontem"

#### Scenario: Item nunca aberto

- **WHEN** o usuário nunca abriu uma ficha
- **THEN** o card dela não mostra "Aberta …"

#### Scenario: Lista continua em ordem alfabética

- **WHEN** o usuário abre `/campaigns`
- **THEN** as campanhas aparecem na ordem do último acesso; as nunca abertas vêm depois, em ordem de nome
