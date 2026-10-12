# ui-feedback Specification

## Purpose
Define padrões de interface para carregamento, erros, recursos não encontrados e avisos, válidos em todas as telas.

## Requirements

### Requirement: Carregamento de listas
Toda tela cujo conteúdo é uma lista (campanhas, personagens, dashboard, fichas do convite) SHALL carregar com o Loader (ícone de dados animado e mensagem). Telas de lista MUST NOT usar skeleton, porque o tamanho da lista não é previsível.

#### Scenario: Abrindo a lista de campanhas
- **WHEN** a lista de campanhas está carregando
- **THEN** aparece o Loader com "Buscando campanhas..."

### Requirement: Carregamento de páginas de detalhe
Páginas de detalhe com layout fixo (campanha, personagem) SHALL carregar com um skeleton que imita o layout final, para não haver salto ao carregar.

#### Scenario: Abrindo um personagem
- **WHEN** o detalhe do personagem está carregando
- **THEN** aparece o skeleton da trilha de navegação e do card principal

### Requirement: Erro de página
Uma falha ao carregar uma página SHALL mostrar "Algo deu errado" com o botão "Tentar novamente", mantendo o cabeçalho do app.

#### Scenario: API fora do ar
- **WHEN** os dados de uma página não carregam
- **THEN** o usuário vê o erro e pode tentar de novo sem recarregar o navegador

### Requirement: Recurso não encontrado
Campanha, personagem, convite ou página inexistente SHALL mostrar uma mensagem específica e um caminho de volta. Campanha ou personagem que o usuário não tem permissão de ver SHALL mostrar a mesma tela de "não encontrado", sem revelar que o item existe.

#### Scenario: Campanha excluída
- **WHEN** o usuário abre uma campanha que não existe ou que não pode ver
- **THEN** vê "Campanha não encontrada" com "Voltar para campanhas"

#### Scenario: Ficha de campanha alheia
- **WHEN** o usuário abre a ficha de um personagem de uma campanha da qual não participa
- **THEN** vê "Personagem não encontrado" com "Voltar para personagens"

### Requirement: Avisos de ação
Resultados de ações (criar, excluir, atualizar, convidar, entrar) SHALL ser comunicados por toasts no canto inferior direito, de sucesso ou de erro, que somem sozinhos após 5 segundos.

#### Scenario: Erro ao excluir
- **WHEN** a exclusão de uma campanha falha
- **THEN** aparece um toast de erro com o título "Não foi possível excluir campanha!"

### Requirement: Paginação de listas
As listas de campanhas e de personagens SHALL mostrar 10 itens por página, com páginas numeradas na URL (`?page=N`) e o resumo "Mostrando X–Y de N". Os filtros (papel e status nas campanhas, "Sem campanha" nos personagens) SHALL ficar na URL, e trocar um filtro SHALL voltar para a página 1. O paginador MUST NOT aparecer quando tudo cabe numa página. Enquanto a nova página carrega, o Loader SHALL ocupar o lugar da lista, mantendo cabeçalho e filtros.

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
Os cards de campanha e de ficha SHALL mostrar quando o usuário abriu o item pela última vez, em tempo relativo ("Aberta hoje", "Aberta ontem", "Aberta há 4 dias"), em todas as telas onde aparecem, inclusive nas listas, que continuam em ordem alfabética. Item que o usuário nunca abriu, ou sem essa informação da API, MUST NOT mostrar a linha.

#### Scenario: Item aberto ontem
- **WHEN** o usuário abriu uma campanha ontem
- **THEN** o card dela mostra "Aberta ontem", no dashboard e na lista de campanhas

#### Scenario: Item nunca aberto
- **WHEN** o usuário nunca abriu uma ficha
- **THEN** o card dela não mostra "Aberta …"

#### Scenario: Lista continua em ordem alfabética
- **WHEN** o usuário abre `/campaigns`
- **THEN** as campanhas aparecem em ordem de nome, cada uma com seu "Aberta …" quando houver
