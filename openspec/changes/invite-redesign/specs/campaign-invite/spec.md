# Spec Delta

## MODIFIED Requirements

### Requirement: Página do convite

O link `/join/<hash>` SHALL mostrar, numa coluna estreita, o destaque da campanha que está convidando: "Você foi convidado para", o sistema, o nome como único `h1`, "N jogadores · mestrada por {apelido}" (o apelido quando o core informar) e a descrição, seguidos da escolha de personagem e do apelido.

#### Scenario: Convite válido

- **WHEN** o usuário abre um link de convite válido
- **THEN** vê "Você foi convidado para" com os dados da campanha, "Escolha seu personagem" e "Como a party vai te chamar"

#### Scenario: Campanha sem jogadores

- **WHEN** a campanha do convite ainda não tem jogadores
- **THEN** o número de jogadores aparece como "Nenhum jogador ainda"

#### Scenario: Convite inválido ou expirado

- **WHEN** o hash não existe, não tem o formato de um convite ou o convite expirou
- **THEN** vê "Convite não encontrado", que pede um link novo a quem mestra, com "Voltar ao início"

### Requirement: Convite aberto pelo mestre

Quando o mestre da campanha abre o próprio convite, a página SHALL mostrar o destaque da campanha e, no lugar da escolha, "Esta campanha é sua" com o link para copiar e "Ir para a campanha". O mestre MUST NOT ver o formulário de entrar nem o apelido.

#### Scenario: Mestre confere o link

- **WHEN** o DM abre o link de convite da própria campanha
- **THEN** vê "Esta campanha é sua", "Copiar link" e "Ir para a campanha", sem a lista de fichas

### Requirement: Fichas elegíveis

A escolha SHALL listar, em "Suas fichas", os personagens do usuário que são do mesmo sistema da campanha e ainda não estão em nenhuma campanha e, em "Fichas prontas do mestre", as fichas prontas da campanha que ninguém escolheu, como cards com iniciais, nome e um rádio. As duas listas SHALL formar uma única escolha, e nada SHALL vir marcado. Sem fichas próprias, as prontas vêm primeiro e "Suas fichas" vira uma linha com "Criar personagem". Sem fichas prontas, o grupo MUST NOT aparecer. Criar personagem pelo convite SHALL voltar para o convite, com a ficha nova na lista.

#### Scenario: Nenhuma ficha elegível

- **WHEN** o usuário não tem personagens elegíveis e a campanha não tem fichas prontas
- **THEN** vê "Ainda sem heróis" com "Criar personagem", sem o botão de entrar nem o apelido

#### Scenario: Só fichas prontas

- **WHEN** o usuário não tem personagens elegíveis e a campanha tem fichas prontas
- **THEN** vê "Fichas prontas do mestre", a linha "Suas fichas · Você ainda não tem fichas de {sistema}." com "Criar personagem" e o botão de entrar

#### Scenario: Fichas próprias e prontas

- **WHEN** o usuário tem personagens elegíveis e a campanha tem fichas prontas
- **THEN** vê "Suas fichas" antes de "Fichas prontas do mestre" e escolhe um personagem de qualquer grupo

#### Scenario: Criar personagem pelo convite

- **WHEN** o usuário cria um personagem a partir do convite
- **THEN** volta para o convite e a ficha nova aparece em "Suas fichas", sem estar marcada

### Requirement: Entrar na campanha

O usuário SHALL escolher exatamente um personagem e dar o apelido na campanha ("Seu apelido na campanha", obrigatório, até 50 caracteres, já preenchido com o nome da conta). A escolha MUST funcionar sem JavaScript (rádios nativos). Ao lado do botão, um resumo anunciado ao leitor de tela SHALL dizer "Escolha uma ficha para continuar" ou "Você entra como {apelido}, com {ficha}"; sem escolha, o botão fica `aria-disabled`, mas continua focável. No celular, o botão e o resumo SHALL ficar presos no rodapé, acima da barra de navegação.

#### Scenario: Sem escolha

- **WHEN** o usuário envia sem escolher um personagem
- **THEN** vê "Escolha uma ficha para entrar na campanha." acima das fichas e o foco vai para a escolha

#### Scenario: Sem apelido

- **WHEN** o usuário apaga o apelido e envia
- **THEN** vê "Escolha um apelido." no campo e o foco vai para ele

#### Scenario: Entrada aceita

- **WHEN** o usuário escolhe Jack Brady, mantém o apelido "Hanna" e clica em "Juntar-se à campanha"
- **THEN** entra na campanha como "Hanna" e vê o toast "Você entrou na campanha"

#### Scenario: Falha ao entrar

- **WHEN** a API recusa a entrada por outro motivo
- **THEN** o sistema mostra o toast "Não deu para entrar na campanha" e a escolha continua marcada

### Requirement: Ficha pronta escolhida por outro jogador

Quando outro jogador escolheu a mesma ficha pronta antes, a entrada SHALL falhar com um toast que nomeia a ficha e diz que outra pessoa entrou com ela, e a página SHALL atualizar a escolha sem essa ficha e sem nada marcado.

#### Scenario: Dois jogadores, mesma ficha

- **WHEN** o usuário envia a ficha pronta "Roland Banks", que outro jogador acabou de escolher
- **THEN** vê o toast dizendo que outra pessoa entrou com "Roland Banks" e a ficha não aparece mais na escolha

## ADDED Requirements

### Requirement: Carregamento do convite

Enquanto o convite carrega, a página SHALL mostrar um esqueleto com a forma do destaque e dos cards de ficha, anunciando o carregamento ao leitor de tela.

#### Scenario: Abrindo o convite

- **WHEN** o usuário abre um link de convite e os dados ainda não chegaram
- **THEN** vê o esqueleto do destaque e das fichas
