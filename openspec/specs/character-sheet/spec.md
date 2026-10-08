# character-sheet Specification

## Purpose
Define a ficha de personagem: criação, pontos de vida (PV) e quem pode alterá-la.

## Requirements

### Requirement: Criação de personagem
O usuário SHALL criar um personagem informando nome (obrigatório, até 255 caracteres), pontos de vida (inteiro maior que 0) e sistema de jogo (obrigatório). Erros de validação MUST aparecer junto do campo.

#### Scenario: Campos inválidos
- **WHEN** o usuário envia sem nome, com PV 0 ou sem sistema
- **THEN** cada campo inválido mostra sua mensagem e o modal continua aberto

#### Scenario: Criação concluída
- **WHEN** o formulário é válido
- **THEN** o modal fecha e aparece o toast "Novo personagem!"

### Requirement: Controle de PV
O dono da ficha SHALL ajustar o PV com botões de diminuir e aumentar, com o valor sempre entre 0 e o PV máximo. Sem PV máximo definido, o máximo assumido SHALL ser 100.

#### Scenario: Cliques em sequência
- **WHEN** o dono clica várias vezes seguidas
- **THEN** o valor muda na hora e é salvo uma única vez, 500 ms depois do último clique, com a barra indicando que está salvando

#### Scenario: Falha ao salvar
- **WHEN** a API recusa o novo PV
- **THEN** o valor volta ao último salvo e aparece o toast "Não foi possível atualizar personagem!"

### Requirement: Só o dono edita
Apenas o jogador dono da ficha SHALL alterar o PV ou excluir o personagem. Outros usuários MUST ver a ficha em modo leitura.

#### Scenario: Ficha de outro jogador
- **WHEN** o usuário abre a ficha de um personagem que não é seu
- **THEN** vê o PV sem os botões de ajuste e sem "Excluir"

### Requirement: Exclusão com confirmação
A exclusão de um personagem SHALL exigir confirmação num diálogo que nomeia o personagem e avisa que a ação não pode ser desfeita.

#### Scenario: Exclusão confirmada
- **WHEN** o dono confirma a exclusão
- **THEN** o personagem é removido e aparece o toast "Personagem excluido!"
