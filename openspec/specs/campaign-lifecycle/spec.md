# campaign-lifecycle Specification

## Purpose
Define o ciclo de vida de uma campanha e o que o mestre (DM) e os jogadores podem fazer em cada etapa.

## Requirements

### Requirement: Status da campanha
Toda campanha SHALL estar em exatamente um dos status: Rascunho (DRAFT), Jogando (ACTIVE), Pausada (PAUSED) ou Arquivada (ARCHIVED). Uma campanha nova SHALL começar como Rascunho.

#### Scenario: Campanha recém-criada
- **WHEN** o usuário cria uma campanha
- **THEN** ela aparece com o status Rascunho e o usuário como DM

### Requirement: Transições permitidas
O sistema SHALL permitir apenas as transições Rascunho → Jogando, Jogando → Pausada, Jogando → Arquivada, Pausada → Jogando e Pausada → Arquivada. Arquivada é final e MUST NOT ter transições.

#### Scenario: Ações por status
- **WHEN** o DM abre uma campanha em Rascunho
- **THEN** vê apenas a ação "Iniciar"
- **WHEN** o DM abre uma campanha Jogando
- **THEN** vê "Pausar" e "Encerrar"
- **WHEN** o DM abre uma campanha Pausada
- **THEN** vê "Resumir" e "Arquivar"
- **WHEN** o DM abre uma campanha Arquivada
- **THEN** não vê nenhuma ação de status

#### Scenario: Transição inválida
- **WHEN** a API recusa uma mudança de status
- **THEN** o sistema mostra um toast de erro "Não foi possível atualizar campanha!" com o motivo

### Requirement: Só o DM gerencia
Ações de status, convite e exclusão SHALL aparecer apenas para o DM da campanha. Jogadores MUST ver a campanha em modo leitura.

#### Scenario: Jogador abre a campanha
- **WHEN** um jogador que não é DM abre o detalhe da campanha
- **THEN** vê nome, sistema, status, descrição e personagens, sem ações

### Requirement: Exclusão restrita
O DM SHALL poder excluir uma campanha apenas em Rascunho ou Arquivada, sempre após confirmação num diálogo.

#### Scenario: Campanha em andamento
- **WHEN** a campanha está Jogando ou Pausada
- **THEN** o botão "Excluir" não aparece

### Requirement: Convites até a campanha ser arquivada
O DM SHALL poder criar e copiar o link de convite em Rascunho, Jogando ou Pausada: uma campanha pausada continua aceitando jogadores. Em Arquivada o controle de convite MUST NOT aparecer, e o core recusa criar ou aceitar convites.

#### Scenario: Campanha pausada
- **WHEN** o DM abre uma campanha Pausada
- **THEN** o controle de convite continua disponível

#### Scenario: Campanha arquivada
- **WHEN** o DM abre uma campanha Arquivada
- **THEN** o controle de convite não aparece

#### Scenario: Primeiro convite
- **WHEN** o DM clica em "Criar convite" numa campanha sem convite
- **THEN** o link é gerado, passa a ser exibido com o botão "Copiar" e aparece o toast "Convite criado!"

### Requirement: Personagens da campanha
O detalhe da campanha SHALL mostrar a party sob o título "Personagens (N)", em grade, com um card por personagem: nome, sistema, PV atual e máximo com barra, e link para a ficha. As fichas do próprio usuário SHALL levar o selo "Sua ficha"; as dos outros abrem em modo leitura. Quando a campanha não tem jogadores e ainda aceita convites, o mestre SHALL ver "Personagens (0)" com "Ninguém entrou ainda" e o controle de convite (criar ou copiar). Campanha arquivada sem jogadores MUST NOT mostrar a seção.

#### Scenario: Mestre vê a party
- **WHEN** o DM abre uma campanha com quatro personagens
- **THEN** vê "Personagens (4)" com um card por personagem, cada um com "atual / máximo PV" e barra, e cada card leva à ficha

#### Scenario: Jogador vê a própria ficha marcada
- **WHEN** um jogador abre uma campanha em que joga com uma ficha
- **THEN** o card da ficha dele tem o selo "Sua ficha" e os outros não

#### Scenario: Campanha sem jogadores, com convite
- **WHEN** o DM abre uma campanha em Rascunho sem jogadores e com convite criado
- **THEN** vê "Personagens (0)", "Ninguém entrou ainda" e o botão de copiar o convite

#### Scenario: Campanha sem jogadores, sem convite
- **WHEN** o DM abre uma campanha em Rascunho sem jogadores e sem convite
- **THEN** vê "Ninguém entrou ainda" com o botão "Criar convite"

#### Scenario: Campanha sem jogadores
- **WHEN** a campanha não tem jogadores e não aceita mais convites (Arquivada)
- **THEN** a seção de personagens não aparece

### Requirement: Fichas prontas do mestre
O detalhe da campanha SHALL mostrar ao mestre, abaixo da party, a seção "Fichas prontas (N)" com as fichas que ele criou e nenhum jogador escolheu, em grade, cada uma com o card de ficha e o botão de excluir com confirmação. Enquanto a campanha aceita convites, o mestre SHALL ver "Nova ficha pronta", que cria uma ficha com nome e PV máximo opcional, no sistema da campanha. Jogadores MUST NOT ver a seção. Campanha arquivada sem fichas prontas MUST NOT mostrar a seção.

#### Scenario: Mestre cria uma ficha pronta
- **WHEN** o DM cria a ficha pronta "Harvey" com PV máximo 12 numa campanha em Rascunho
- **THEN** vê o toast de sucesso e "Harvey" com "12 / 12 PV" em "Fichas prontas (1)"

#### Scenario: Nome obrigatório
- **WHEN** o DM envia o formulário de ficha pronta sem nome
- **THEN** vê o erro de nome obrigatório e nenhuma ficha é criada

#### Scenario: Mestre exclui uma ficha pronta
- **WHEN** o DM exclui uma ficha pronta e confirma
- **THEN** a ficha some da seção

#### Scenario: Jogador não vê fichas prontas
- **WHEN** um jogador abre uma campanha que tem fichas prontas
- **THEN** a seção "Fichas prontas" não aparece

#### Scenario: Ficha escolhida sai da seção
- **WHEN** um jogador entra na campanha com uma ficha pronta
- **THEN** a ficha aparece na party e não em "Fichas prontas"
