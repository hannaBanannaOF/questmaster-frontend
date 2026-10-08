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
Campanha, personagem, convite ou página inexistente SHALL mostrar uma mensagem específica e um caminho de volta.

#### Scenario: Campanha excluída
- **WHEN** o usuário abre uma campanha que não existe ou que não pode ver
- **THEN** vê "Campanha não encontrada" com "Voltar para campanhas"

### Requirement: Avisos de ação
Resultados de ações (criar, excluir, atualizar, convidar, entrar) SHALL ser comunicados por toasts no canto inferior direito, de sucesso ou de erro, que somem sozinhos após 5 segundos.

#### Scenario: Erro ao excluir
- **WHEN** a exclusão de uma campanha falha
- **THEN** aparece um toast de erro com o título "Não foi possível excluir campanha!"
