# Spec Delta

## ADDED Requirements

### Requirement: Cabeçalho da campanha

O detalhe da campanha SHALL ter, em uma coluna e nesta ordem: "Campanhas" (voltar), cabeçalho, convite, Party e Fichas prontas. O cabeçalho SHALL mostrar o selo do sistema com o papel do usuário no canto, o nome do sistema, "Você mestra como {apelido}" ou "Você joga como {apelido}", o nome da campanha como único `h1`, o status, o tamanho da party (com "mestrada por {apelido}" para jogadores) e a descrição. Fora da arquivada, um lápis de 44px ao lado do apelido SHALL abrir "Seu apelido", que muda o apelido do usuário só nesta campanha (obrigatório, até 50 caracteres; vazio mostra "Escolha um apelido.") e avisa "Apelido atualizado". As ações de status SHALL ficar no cabeçalho: à direita a partir de 48rem, dividindo a linha no celular. Campanha arquivada SHALL mostrar a nota "Encerrada: dá para consultar, mas ninguém mais entra."

#### Scenario: Mestre abre a campanha

- **WHEN** o DM abre uma campanha Jogando com 4 jogadores
- **THEN** vê o selo com a coroa, "Você mestra como {apelido}", "Jogando", "4 jogadores", "Pausar" e "Encerrar"

#### Scenario: Jogador abre a campanha

- **WHEN** um jogador que entrou como Lena abre uma campanha mestrada por Ana
- **THEN** vê "Você joga como Lena", "3 jogadores · mestrada por Ana" e nenhuma ação de status

#### Scenario: Mudar o apelido

- **WHEN** a mestra troca o apelido para "Ana" no lápis do cabeçalho
- **THEN** vê "Você mestra como Ana" e o toast "Apelido atualizado"

#### Scenario: Apelido na campanha arquivada

- **WHEN** um membro abre uma campanha arquivada
- **THEN** o apelido aparece sem o lápis

### Requirement: Campanha não encontrada

Link errado, campanha excluída ou sem acesso SHALL mostrar o mesmo estado, "Campanha não encontrada", com "Ver minhas campanhas", sem revelar se a campanha existe.

#### Scenario: Sem acesso

- **WHEN** o usuário abre uma campanha da qual não participa
- **THEN** vê "Campanha não encontrada" e "Ver minhas campanhas"

## MODIFIED Requirements

### Requirement: Transições permitidas

O sistema SHALL permitir apenas as transições Rascunho → Jogando, Jogando → Pausada, Jogando → Arquivada, Pausada → Jogando e Pausada → Arquivada. Arquivada é final e MUST NOT ter transições. No cabeçalho, Rascunho SHALL mostrar "Iniciar" e "Excluir"; Jogando, "Pausar" e "Encerrar"; Pausada, "Retomar" e "Encerrar"; Arquivada, só "Excluir". "Encerrar" e "Excluir" SHALL ser vermelho suave e pedir confirmação; iniciar, pausar e retomar mudam o status na hora.

#### Scenario: Ações por status

- **WHEN** o DM abre uma campanha em Rascunho
- **THEN** vê "Iniciar" e "Excluir"
- **WHEN** o DM abre uma campanha Jogando
- **THEN** vê "Pausar" e "Encerrar"
- **WHEN** o DM abre uma campanha Pausada
- **THEN** vê "Retomar" e "Encerrar"
- **WHEN** o DM abre uma campanha Arquivada
- **THEN** vê só "Excluir"

#### Scenario: Transição inválida

- **WHEN** a API recusa uma mudança de status
- **THEN** o sistema mostra um toast de erro "Não foi possível atualizar campanha!" com o motivo e nada muda

#### Scenario: Encerrar

- **WHEN** o DM confirma "Encerrar campanha"
- **THEN** a campanha fica Arquivada, o convite some e as ações viram só "Excluir"

### Requirement: Convites até a campanha ser arquivada

O DM SHALL ver o bloco "Convite" com o link e "Copiar link" em Rascunho com convite, Jogando e Pausada: uma campanha pausada continua aceitando jogadores. Copiar SHALL trocar o botão por "Copiado" com check por 2 segundos, anunciado ao leitor de tela, sem toast. Em Arquivada o bloco MUST NOT aparecer, e o core recusa criar ou aceitar convites. Sem convite, o vazio da party SHALL oferecer "Criar convite".

#### Scenario: Campanha pausada

- **WHEN** o DM abre uma campanha Pausada
- **THEN** o bloco de convite continua disponível

#### Scenario: Campanha arquivada

- **WHEN** o DM abre uma campanha Arquivada
- **THEN** o bloco de convite não aparece

#### Scenario: Primeiro convite

- **WHEN** o DM clica em "Criar convite" numa campanha sem convite
- **THEN** aparece o bloco de convite com o link e o toast "Convite criado"

### Requirement: Personagens da campanha

O detalhe da campanha SHALL mostrar a seção "Party" com o total ao lado, em grade de cards de pelo menos 220px (2 por linha no celular), sem o sistema em cada card e sem PV. Cada card SHALL ter as iniciais, o nome (o card inteiro abre a ficha) e, para o mestre, "de {jogador}" quando o core informar. Só as fichas do próprio usuário SHALL levar o selo "Sua ficha". Quando a campanha não tem jogadores e ainda aceita convites, a seção SHALL mostrar "Ninguém entrou ainda" e, sem convite, "Criar convite". Campanha arquivada sem jogadores MUST NOT mostrar a seção.

#### Scenario: Mestre vê a party

- **WHEN** o DM abre uma campanha com quatro personagens
- **THEN** vê "Party 4" com um card por personagem, cada um levando à ficha

#### Scenario: Jogador vê a própria ficha marcada

- **WHEN** um jogador abre uma campanha em que joga com uma ficha
- **THEN** o card da ficha dele tem o selo "Sua ficha" e os outros não

#### Scenario: Campanha sem jogadores, com convite

- **WHEN** o DM abre uma campanha em Rascunho sem jogadores e com convite criado
- **THEN** vê o bloco de convite e "Ninguém entrou ainda" na Party

#### Scenario: Campanha sem jogadores, sem convite

- **WHEN** o DM abre uma campanha em Rascunho sem jogadores e sem convite
- **THEN** vê "Ninguém entrou ainda" com o botão "Criar convite"

#### Scenario: Campanha sem jogadores

- **WHEN** a campanha não tem jogadores e não aceita mais convites (Arquivada)
- **THEN** a seção Party não aparece

### Requirement: Fichas prontas do mestre

O detalhe da campanha SHALL mostrar ao mestre, abaixo da party, a seção "Fichas prontas" com o total, a ajuda "Só você vê esta seção" e as fichas sem jogador, cada uma com "Ninguém escolheu ainda". Enquanto a campanha aceita convites, a grade SHALL terminar no card tracejado "Nova ficha pronta", que cria uma ficha só com o nome, no sistema da campanha (informado no form). Jogadores MUST NOT ver a seção. Campanha arquivada sem fichas prontas MUST NOT mostrar a seção.

#### Scenario: Mestre cria uma ficha pronta

- **WHEN** o DM cria a ficha pronta "Harvey" numa campanha em Rascunho
- **THEN** vê o toast de sucesso e "Harvey" em "Fichas prontas"

#### Scenario: Nome obrigatório

- **WHEN** o DM envia o formulário de ficha pronta sem nome
- **THEN** vê "Dê um nome à ficha." no campo e nenhuma ficha é criada

#### Scenario: Mestre exclui uma ficha pronta

- **WHEN** o DM escolhe "Excluir ficha pronta" no menu da ficha e confirma
- **THEN** a ficha some da seção

#### Scenario: Jogador não vê fichas prontas

- **WHEN** um jogador abre uma campanha que tem fichas prontas
- **THEN** a seção "Fichas prontas" não aparece

#### Scenario: Ficha escolhida sai da seção

- **WHEN** um jogador entra na campanha com uma ficha pronta
- **THEN** a ficha aparece na party e não em "Fichas prontas"

### Requirement: Sair e remover da campanha

Enquanto a campanha não está arquivada, o card de cada ficha da party SHALL ter um menu "⋯", separado do link do card: para o mestre, "Abrir ficha" e "Remover da campanha"; na ficha do próprio jogador, "Abrir ficha" e "Sair da campanha". A ação destrutiva SHALL vir por último, em vermelho, com uma confirmação que nomeia a ficha e diz que ela continua com o jogador. Em campanha arquivada os menus MUST NOT aparecer.

#### Scenario: Jogador sai da campanha

- **WHEN** o jogador confirma "Sair da campanha" no menu da sua ficha
- **THEN** vai para a ficha, que não está mais na campanha, e vê o toast "Você saiu da campanha"

#### Scenario: Mestre remove um jogador

- **WHEN** o DM confirma "Remover da campanha" no menu de uma ficha
- **THEN** continua na campanha, a ficha sai da party e aparece o toast de ficha removida

#### Scenario: Ficha de outro jogador

- **WHEN** um jogador vê a party
- **THEN** só o card com "Sua ficha" tem menu, e nenhum menu tem "Remover da campanha"

#### Scenario: Campanha arquivada

- **WHEN** o DM ou um jogador abre uma campanha arquivada
- **THEN** nenhum card da party tem menu

#### Scenario: Falha ao sair ou remover

- **WHEN** a API recusa a saída ou a remoção
- **THEN** o usuário vê o toast de erro e a party continua igual
