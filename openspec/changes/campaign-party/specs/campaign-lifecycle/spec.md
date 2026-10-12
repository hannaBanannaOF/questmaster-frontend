# Spec Delta

## MODIFIED Requirements

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
