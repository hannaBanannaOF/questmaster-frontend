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

### Requirement: Convites só quando cabem jogadores
O DM SHALL poder criar e copiar o link de convite apenas em Rascunho ou Jogando. Em Pausada ou Arquivada o controle de convite MUST NOT aparecer.

#### Scenario: Primeiro convite
- **WHEN** o DM clica em "Criar convite" numa campanha sem convite
- **THEN** o link é gerado, passa a ser exibido com o botão "Copiar" e aparece o toast "Convite criado!"

### Requirement: Personagens da campanha
O detalhe da campanha SHALL listar os personagens da party sob o título "Personagens (N)" quando houver pelo menos um jogador.

#### Scenario: Campanha sem jogadores
- **WHEN** a campanha não tem jogadores
- **THEN** a seção de personagens não aparece
