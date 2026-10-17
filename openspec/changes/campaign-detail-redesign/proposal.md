# Proposta

## Por quê

O detalhe da campanha foi redesenhado (canvas "QuestMaster — Telas", página "HeroUI · Campanha") na linguagem do dashboard e da lista: cabeçalho como destaque com o selo do sistema, ações de status no próprio cabeçalho, convite em bloco próprio, party e fichas prontas no card de personagem sem PV, ações por um menu "⋯" e confirmações no padrão AlertDialog do HeroUI.

## O que muda

- **Cabeçalho**: selo + papel, "Você mestra/joga", nome, status, party, descrição e marca d'água; ações de status por status (Iniciar/Excluir, Pausar/Encerrar, Retomar/Encerrar, Excluir); "Encerrar" passa a pedir confirmação.
- **Convite**: bloco "Convite" com o link e "Copiar link" ("Copiado" por 2 s); sem convite, "Criar convite" no vazio da party.
- **Party e Fichas prontas**: card com iniciais e nome (link esticado), "de {jogador}", "Sua ficha", "Ninguém escolheu ainda"; menu "⋯" (Dropdown) com "Abrir ficha" e a ação destrutiva; card tracejado "Nova ficha pronta"; form só com nome.
- **Confirmações**: AlertDialog (ícone, título com o nome, uma frase de consequência, "Cancelar" + ação em vermelho cheio).
- **Estados**: carregando com esqueleto da página, não encontrada.

Fora do escopo: ficha de personagem, convite e telas globais.

## Capacidades

### Capacidades modificadas

- `campaign-lifecycle`: cabeçalho, ações de status, convite, party, fichas prontas, menus e confirmações; não encontrada.

## Impacto

- **Código**: `src/modules/campaign/presentation` (view, cabeçalho, party, fichas prontas, menu de ações, confirmações), `src/modules/invite/presentation` (bloco de convite), `src/design` (Dialog em modo alerta, Button `danger`/`danger-soft`, Dropdown, CopyField), traduções.
- **API**: apelidos na mesa do core (`campaign-member-names`, `table-name-endpoint`): `dm_name` e `player_name` no detalhe e `PATCH /campaign/{id}/table-name` para o próprio apelido. A ficha pronta é criada só com o nome (PV saiu do core em `remove-character-hp`).
- **Dependências**: nenhuma.
