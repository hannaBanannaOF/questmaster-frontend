# Proposal

## Why

Hoje o jogador só entra numa campanha com uma ficha que ele mesmo criou, do sistema da campanha e fora de outra campanha. Quem não tem ficha precisa criar uma antes de aceitar o convite, e o mestre não consegue deixar personagens prontos para one-shots, jogadores novos ou mesas de evento. O core propôs o `premade-characters`: o mestre cria fichas dentro da campanha, sem jogador, e o convite passa a oferecê-las.

## What Changes

- **Fichas prontas na campanha**: o mestre vê, abaixo da party, a seção "Fichas prontas (N)" com as fichas que criou e ninguém escolheu ainda, cada uma com link para a ficha e o botão de excluir. O botão "Nova ficha pronta" abre um formulário com nome e PV máximo; o sistema é o da campanha. Os jogadores não veem a seção.
- **Escolha no convite**: a página do convite mostra as fichas prontas da campanha junto das fichas do próprio jogador, em dois grupos ("Suas fichas" e "Fichas prontas do mestre"), na mesma escolha de um personagem. O estado vazio "Ainda sem heróis" só aparece quando não há nenhuma das duas.
- **Ficha escolhida por outro**: se outro jogador pegou a mesma ficha pronta antes, o jogador vê o toast de falha e a página atualiza sem a ficha.

Fora do escopo: editar nome ou PV máximo de uma ficha pronta (nenhuma ficha permite hoje) e reservar uma ficha para um jogador específico.

## Capabilities

### New Capabilities

Nenhuma.

### Modified Capabilities
- `campaign-lifecycle`: a campanha ganha a seção de fichas prontas do mestre.
- `campaign-invite`: a escolha de personagem inclui as fichas prontas da campanha.

## Impact

- **API consumida**: `POST /campaign/{id}/character`; `premade_characters` em `GET /campaign/{id}` e `GET /invite/{hash}`; `DELETE /character/{id}` pelo mestre; 409 ao aceitar (core `premade-characters`).
- **Código**: módulo `campaign` (domínio, DTO, mapper, repositório, use case, ação e seção de fichas prontas), `invite` (domínio, mapper, escolha em grupos, 409), traduções pt-BR e testes.
- **Dependência**: precisa do `premade-characters` publicado no core e do `campaign-party` do front (a seção usa o mesmo `CharacterCard` e a mesma grade).
