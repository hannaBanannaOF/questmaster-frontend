# Spec Delta

## ADDED Requirements

### Requirement: Último acesso nos cards
Os cards de campanha e de ficha SHALL mostrar quando o usuário abriu o item pela última vez, em tempo relativo ("Aberta hoje", "Aberta ontem", "Aberta há 4 dias"), em todas as telas onde aparecem, inclusive nas listas, que continuam em ordem alfabética. Item que o usuário nunca abriu, ou sem essa informação da API, MUST NOT mostrar a linha.

#### Scenario: Item aberto ontem
- **WHEN** o usuário abriu uma campanha ontem
- **THEN** o card dela mostra "Aberta ontem", no dashboard e na lista de campanhas

#### Scenario: Item nunca aberto
- **WHEN** o usuário nunca abriu uma ficha
- **THEN** o card dela não mostra "Aberta …"

#### Scenario: Lista continua em ordem alfabética
- **WHEN** o usuário abre `/campaigns`
- **THEN** as campanhas aparecem em ordem de nome, cada uma com seu "Aberta …" quando houver
