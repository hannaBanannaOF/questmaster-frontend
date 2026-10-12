# Spec Delta

## MODIFIED Requirements

### Requirement: Só o dono edita
Apenas o jogador dono da ficha SHALL alterar o PV, editar o nome e o PV máximo ou excluir o personagem. Outros usuários MUST ver a ficha em modo leitura.

#### Scenario: Ficha de outro jogador
- **WHEN** o usuário abre a ficha de um personagem que não é seu
- **THEN** vê o PV sem os botões de ajuste, sem "Editar" e sem "Excluir"

## ADDED Requirements

### Requirement: Editar ficha
A dona SHALL editar o nome e o PV máximo da ficha num diálogo com os valores atuais preenchidos. O nome é obrigatório e o PV máximo, quando preenchido, é um inteiro maior que zero. Ao salvar, a página SHALL abrir a ficha no endereço novo, que acompanha o nome, e mostrar o toast "Ficha atualizada!".

#### Scenario: Renomear
- **WHEN** a dona renomeia "Maria" para "Jão" e salva
- **THEN** a página vai para `/characters/jao` com o nome novo e o toast "Ficha atualizada!"

#### Scenario: Baixar o PV máximo abaixo do atual
- **WHEN** a dona muda o PV máximo para 8 numa ficha com 10 / 12 PV
- **THEN** a ficha mostra 8 / 8 PV

#### Scenario: Ficha sem PV ganha PV
- **WHEN** a dona preenche o PV máximo 12 numa ficha sem PV
- **THEN** a ficha mostra 12 / 12 PV

#### Scenario: Nome vazio
- **WHEN** a dona apaga o nome e salva
- **THEN** vê o erro de nome obrigatório e nada muda

#### Scenario: Falha ao salvar
- **WHEN** a API recusa a edição
- **THEN** o diálogo continua aberto com o toast "Não foi possível atualizar personagem!"
