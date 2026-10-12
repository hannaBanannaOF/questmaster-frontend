# campaign-invite Specification

## Purpose
Define como um jogador entra numa campanha a partir do link de convite gerado pelo DM.

## Requirements

### Requirement: Página do convite
O link `/join/<hash>` SHALL mostrar a campanha que está convidando: nome, sistema, número de jogadores e descrição, seguidos da escolha de personagem.

#### Scenario: Convite válido
- **WHEN** o usuário abre um link de convite válido
- **THEN** vê "Você foi convidado para" com os dados da campanha e "Escolha seu personagem"

#### Scenario: Campanha sem jogadores
- **WHEN** a campanha do convite ainda não tem jogadores
- **THEN** o número de jogadores aparece como "Nenhum jogador ainda"

#### Scenario: Convite inválido ou expirado
- **WHEN** o hash não existe, não tem o formato de um convite ou o convite expirou
- **THEN** vê "Convite não encontrado" com o botão "Voltar ao início"

### Requirement: Convite aberto pelo mestre
Quando o mestre da campanha abre o próprio convite, a página SHALL mostrar os dados da campanha e, no lugar da escolha de ficha, o aviso "Você é o mestre desta campanha" com o link para ela. O mestre MUST NOT ver o formulário de entrar.

#### Scenario: Mestre confere o link
- **WHEN** o DM abre o link de convite da própria campanha
- **THEN** vê o aviso e "Ir para a campanha", sem a lista de fichas

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

### Requirement: Entrar na campanha
O usuário SHALL escolher exatamente um personagem para entrar. A escolha MUST funcionar sem JavaScript (rádios nativos).

#### Scenario: Sem escolha
- **WHEN** o usuário envia sem escolher um personagem
- **THEN** vê "Escolha um personagem para entrar na campanha."

#### Scenario: Entrada aceita
- **WHEN** o usuário escolhe um personagem e clica em "Juntar-se a campanha"
- **THEN** entra na campanha e vê o toast "Convite aceito!"

#### Scenario: Falha ao entrar
- **WHEN** a API recusa a entrada
- **THEN** o sistema mostra o toast "Não foi possível se juntar a campanha!"

### Requirement: Ficha pronta escolhida por outro jogador
Quando outro jogador escolheu a mesma ficha pronta antes, a entrada SHALL falhar com o toast de falha e a página SHALL atualizar a escolha sem essa ficha.

#### Scenario: Dois jogadores, mesma ficha
- **WHEN** o usuário envia uma ficha pronta que outro jogador acabou de escolher
- **THEN** vê "Não foi possível se juntar a campanha!" e a ficha não aparece mais na escolha
