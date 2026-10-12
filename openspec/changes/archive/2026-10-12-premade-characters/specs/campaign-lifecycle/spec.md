# Spec Delta

## ADDED Requirements

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
