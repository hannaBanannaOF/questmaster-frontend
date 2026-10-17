# Spec Delta

## ADDED Requirements

### Requirement: Página da ficha

A ficha (`/characters/{slug}`) SHALL ter, em uma coluna: "Personagens" (voltar), cabeçalho e bloco da campanha. O cabeçalho SHALL mostrar as iniciais em medalhão grande, o sistema, o nome como único `h1` e quem é a dona: "Sua ficha", "Ficha de {apelido}" (quando o core informar o apelido) ou, para o mestre, "Ficha pronta · ninguém escolheu ainda". Quem edita SHALL ver "Editar" e "Excluir" (vermelho suave) no cabeçalho; os outros veem só leitura.

#### Scenario: Dona abre a própria ficha

- **WHEN** a dona abre a ficha "Eleanor Vance"
- **THEN** vê "Sua ficha", "Editar" e "Excluir"

#### Scenario: Ficha de outra pessoa

- **WHEN** o mestre abre a ficha de um jogador que entrou como Rafa
- **THEN** vê "Ficha de Rafa" e nenhuma ação

#### Scenario: Ficha pronta

- **WHEN** o mestre abre uma ficha pronta que ninguém escolheu
- **THEN** vê "Ficha pronta · ninguém escolheu ainda", "Editar" e "Excluir"

### Requirement: Campanha da ficha

A ficha SHALL ter a seção "Campanha". Em campanha, SHALL mostrar a linha de campanha das listas (selo com o papel de quem vê, status e sistema), que abre a campanha; para a dona, "Sair da campanha" logo abaixo, com a confirmação da página da campanha; para a ficha pronta, a explicação de que ela fica no convite até alguém escolher. Sem campanha, SHALL mostrar um bloco tracejado explicando o convite e que a ficha só entra em campanhas do mesmo sistema. Enquanto o core não informar a campanha, a seção MUST NOT aparecer.

#### Scenario: Ficha em campanha

- **WHEN** a dona abre uma ficha que joga em "Horror em Innsmouth"
- **THEN** vê a linha da campanha com "Jogando" e "Sair da campanha"

#### Scenario: Ficha sem campanha

- **WHEN** a dona abre uma ficha sem campanha
- **THEN** vê "Sem campanha" e como entrar numa mesa pelo convite

#### Scenario: Sair pela ficha

- **WHEN** a dona confirma "Sair da campanha" na ficha
- **THEN** a ficha mostra "Sem campanha" e o toast "Você saiu da campanha"

### Requirement: Ficha não encontrada

Ficha excluída ou sem acesso SHALL mostrar o mesmo estado, "Personagem não encontrado", com "Ver meus personagens", sem revelar se a ficha existe.

#### Scenario: Sem acesso

- **WHEN** o usuário abre a ficha de alguém de fora das suas campanhas
- **THEN** vê "Personagem não encontrado" e "Ver meus personagens"

## MODIFIED Requirements

### Requirement: Só o dono edita

Apenas a dona da ficha SHALL editar o nome ou excluir o personagem; numa ficha pronta que ninguém escolheu, o mestre da campanha SHALL poder fazer o mesmo. Outros usuários MUST ver a ficha em modo leitura.

#### Scenario: Ficha de outro jogador

- **WHEN** o usuário abre a ficha de um personagem que não é seu
- **THEN** vê a ficha sem "Editar" e sem "Excluir"

### Requirement: Exclusão com confirmação

A exclusão de um personagem SHALL exigir uma confirmação que nomeia o personagem, avisa que não dá para desfazer e, se ele estiver numa campanha, diz que a campanha continua sem ele. Depois, o usuário SHALL ir para Personagens com o toast "Personagem excluído".

#### Scenario: Exclusão confirmada

- **WHEN** a dona confirma a exclusão de uma ficha que joga em "Innsmouth"
- **THEN** a confirmação disse que "Innsmouth" continua sem ela, o personagem é removido e aparece o toast "Personagem excluído"

### Requirement: Editar ficha

A dona SHALL editar o nome da ficha num diálogo com o nome atual preenchido; o sistema aparece só para leitura ("não muda depois que a ficha é criada"). O nome é obrigatório. Ao salvar, a página SHALL abrir a ficha no endereço novo, que acompanha o nome, e mostrar o toast "Ficha atualizada".

#### Scenario: Renomear

- **WHEN** a dona renomeia "Maria" para "Jão" e salva
- **THEN** a página vai para `/characters/jao` com o nome novo e o toast "Ficha atualizada"

#### Scenario: Baixar o PV máximo abaixo do atual

- **WHEN** a dona abre "Editar" numa ficha que tinha PV
- **THEN** o diálogo não tem campo de PV: o PV saiu do core

#### Scenario: Ficha sem PV ganha PV

- **WHEN** a dona quer dar PV a uma ficha
- **THEN** não há como: o PV volta com os recursos de cada sistema

#### Scenario: Nome vazio

- **WHEN** a dona apaga o nome e salva
- **THEN** vê "Dê um nome ao personagem." no campo e nada muda

#### Scenario: Falha ao salvar

- **WHEN** a API recusa a edição
- **THEN** o diálogo continua aberto com o toast "Não foi possível atualizar personagem!"

## REMOVED Requirements

### Requirement: Controle de PV

**Reason**: o PV saiu do core (`remove-character-hp`): não é comum a todos os sistemas, e o endpoint de PV não existe mais.
**Migration**: nenhuma no front; os recursos de cada sistema (PV, Sanidade…) entram entre o cabeçalho e a campanha quando cada sistema os declarar.
