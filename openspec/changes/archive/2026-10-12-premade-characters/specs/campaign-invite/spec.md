# Spec Delta

## MODIFIED Requirements

### Requirement: Fichas elegíveis
A escolha SHALL listar, em "Suas fichas", os personagens do usuário que são do mesmo sistema da campanha e ainda não estão em nenhuma campanha e, em "Fichas prontas do mestre", as fichas prontas da campanha que ninguém escolheu. As duas listas SHALL formar uma única escolha. Um grupo sem fichas MUST NOT aparecer.

#### Scenario: Nenhuma ficha elegível
- **WHEN** o usuário não tem personagens elegíveis e a campanha não tem fichas prontas
- **THEN** vê o estado vazio "Ainda sem heróis", sem o botão de entrar

#### Scenario: Só fichas prontas
- **WHEN** o usuário não tem personagens elegíveis e a campanha tem fichas prontas
- **THEN** vê só o grupo "Fichas prontas do mestre" e o botão de entrar

#### Scenario: Fichas próprias e prontas
- **WHEN** o usuário tem personagens elegíveis e a campanha tem fichas prontas
- **THEN** vê "Suas fichas" antes de "Fichas prontas do mestre" e escolhe um personagem de qualquer grupo

## ADDED Requirements

### Requirement: Ficha pronta escolhida por outro jogador
Quando outro jogador escolheu a mesma ficha pronta antes, a entrada SHALL falhar com o toast de falha e a página SHALL atualizar a escolha sem essa ficha.

#### Scenario: Dois jogadores, mesma ficha
- **WHEN** o usuário envia uma ficha pronta que outro jogador acabou de escolher
- **THEN** vê "Não foi possível se juntar a campanha!" e a ficha não aparece mais na escolha
