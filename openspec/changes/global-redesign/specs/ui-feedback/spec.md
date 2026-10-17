# Delta

## ADDED Requirements

### Requirement: Cabeçalho e navegação

Toda tela SHALL ter o cabeçalho com o selo do d20 e "Questmaster", que leva ao dashboard. No tablet e no desktop a navegação (Dashboard, Campanhas, Personagens, com ícone e rótulo) SHALL ficar no cabeçalho; no celular ela SHALL ficar numa barra inferior fixa. O item da tela atual SHALL ser marcado com `aria-current="page"`. O cabeçalho MUST NOT mostrar avatar.

#### Scenario: Celular

- **WHEN** o usuário abre a lista de campanhas no celular
- **THEN** o cabeçalho mostra só o selo e o nome, e a barra inferior marca "Campanhas"

#### Scenario: Página inexistente

- **WHEN** o usuário abre um endereço que não existe
- **THEN** nenhum item da navegação fica marcado

## MODIFIED Requirements

### Requirement: Avisos de ação

Resultados de ações (criar, excluir, atualizar, convidar, entrar) SHALL ser comunicados por toasts com ícone, título curto e uma linha do que fazer. O de sucesso SHALL sumir sozinho após 5 segundos, com o tempo pausado enquanto o mouse ou o foco está nele. O de erro SHALL ficar até o usuário fechá-lo, com um botão "Fechar aviso" de 44px. No tablet e no desktop os toasts SHALL aparecer no canto superior direito, abaixo do cabeçalho; no celular, acima da barra inferior, e acima da barra de botão presa no rodapé quando houver. O mais novo SHALL ficar mais perto da borda.

#### Scenario: Erro ao excluir

- **WHEN** a exclusão de uma campanha falha
- **THEN** aparece um toast de erro que só some quando o usuário o fecha

#### Scenario: Erro num modal

- **WHEN** a criação de uma campanha falha com o modal aberto
- **THEN** o toast de erro aparece por cima do modal e pode ser fechado, com os campos preenchidos mantidos

#### Scenario: Convite no celular

- **WHEN** um aviso aparece na tela de convite no celular
- **THEN** ele fica acima do botão "Juntar-se à campanha", sem cobri-lo

### Requirement: Erro de página

Uma falha ao carregar uma página SHALL mostrar "Falha crítica" com o d20 mostrando 1, "Algo deu errado", a explicação de que o que já foi salvo continua salvo, o botão "Tentar de novo" e o link "Ir para o dashboard", mantendo o cabeçalho do app.

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

#### Scenario: Endereço inexistente

- **WHEN** o usuário abre um endereço que não existe no app
- **THEN** vê "Página não encontrada" com "Ir para o dashboard"
