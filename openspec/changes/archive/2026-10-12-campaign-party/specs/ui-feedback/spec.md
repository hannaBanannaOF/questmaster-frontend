# Spec Delta

## MODIFIED Requirements

### Requirement: Recurso não encontrado
Campanha, personagem, convite ou página inexistente SHALL mostrar uma mensagem específica e um caminho de volta. Campanha ou personagem que o usuário não tem permissão de ver SHALL mostrar a mesma tela de "não encontrado", sem revelar que o item existe.

#### Scenario: Campanha excluída
- **WHEN** o usuário abre uma campanha que não existe ou que não pode ver
- **THEN** vê "Campanha não encontrada" com "Voltar para campanhas"

#### Scenario: Ficha de campanha alheia
- **WHEN** o usuário abre a ficha de um personagem de uma campanha da qual não participa
- **THEN** vê "Personagem não encontrado" com "Voltar para personagens"
