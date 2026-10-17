# Spec Delta

## MODIFIED Requirements

### Requirement: Criação de personagem

O usuário SHALL criar um personagem informando nome (obrigatório, até 255 caracteres) e sistema de jogo (obrigatório, começando sem escolha, com a ajuda de que a ficha só entra em campanhas do mesmo sistema). PV não faz parte da criação: não é comum a todos os sistemas. Erros de validação MUST aparecer junto do campo, ligados a ele. Ao criar, o usuário SHALL ir para a ficha nova e ver o toast "Personagem criado".

#### Scenario: Campos inválidos

- **WHEN** o usuário envia sem nome ou sem sistema
- **THEN** cada campo inválido mostra sua mensagem ("Dê um nome ao personagem.", "Escolha o sistema do personagem.") e o modal continua aberto

#### Scenario: Criação concluída

- **WHEN** o formulário é válido
- **THEN** o modal fecha, abre a ficha nova e aparece o toast "Personagem criado"

### Requirement: PV nos cards de ficha

Os cards de ficha (dashboard, lista de personagens, campanha) MUST NOT mostrar PV: ele saiu do core comum. O PV continua só na página da ficha enquanto ela não for redesenhada.

#### Scenario: Ficha ferida

- **WHEN** uma ficha tem 3 de 10 PV
- **THEN** o card dela na lista não mostra PV nem barra

#### Scenario: Ficha sem PV máximo

- **WHEN** uma ficha tem 40 PV atuais e nenhum máximo
- **THEN** o card dela na lista não mostra PV
