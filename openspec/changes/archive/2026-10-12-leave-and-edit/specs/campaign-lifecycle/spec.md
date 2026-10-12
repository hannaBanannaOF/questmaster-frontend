# Spec Delta

## ADDED Requirements

### Requirement: Sair e remover da campanha
Enquanto a campanha não está arquivada, cada ficha do usuário na party SHALL ter "Sair da campanha" e o mestre SHALL ver "Remover" em cada ficha da party, ambos com confirmação que nomeia a ficha. A ficha continua com o jogador, sem campanha. Em campanha arquivada as duas ações MUST NOT aparecer.

#### Scenario: Jogador sai da campanha
- **WHEN** o jogador confirma "Sair da campanha" no card da sua ficha
- **THEN** vai para a ficha, que não está mais na campanha, e vê o toast "Você saiu da campanha"

#### Scenario: Mestre remove um jogador
- **WHEN** o DM confirma "Remover" no card de uma ficha
- **THEN** continua na campanha, a ficha sai da party e aparece o toast de ficha removida

#### Scenario: Ficha de outro jogador
- **WHEN** um jogador vê a party
- **THEN** só os cards com "Sua ficha" têm "Sair da campanha" e nenhum tem "Remover"

#### Scenario: Campanha arquivada
- **WHEN** o DM ou um jogador abre uma campanha arquivada
- **THEN** nenhum card da party tem "Sair da campanha" ou "Remover"

#### Scenario: Falha ao sair ou remover
- **WHEN** a API recusa a saída ou a remoção
- **THEN** o usuário vê o toast de erro e a party continua igual
