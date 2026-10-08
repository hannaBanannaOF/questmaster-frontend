# campaign-invite Specification

## Purpose
Define como um jogador entra numa campanha a partir do link de convite gerado pelo DM.

## Requirements

### Requirement: Página do convite
O link `/join/<hash>` SHALL mostrar a campanha que está convidando: nome, sistema, número de jogadores e descrição, seguidos da escolha de personagem.

#### Scenario: Convite válido
- **WHEN** o usuário abre um link de convite válido
- **THEN** vê "Você foi convidado para" com os dados da campanha e "Escolha seu personagem"

#### Scenario: Convite inválido ou expirado
- **WHEN** o hash não existe ou o convite expirou
- **THEN** vê "Convite não encontrado" com o botão "Voltar ao início"

### Requirement: Fichas elegíveis
A escolha SHALL listar apenas personagens do usuário que são do mesmo sistema da campanha e ainda não estão em nenhuma campanha.

#### Scenario: Nenhuma ficha elegível
- **WHEN** o usuário não tem personagens elegíveis
- **THEN** vê o estado vazio "Ainda sem heróis", sem o botão de entrar

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
