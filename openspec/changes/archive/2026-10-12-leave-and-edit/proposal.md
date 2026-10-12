# Proposal

## Why

O core 1.5.0 publicou `leave-campaign` e `edit-character`: o jogador pode sair de uma campanha, o mestre pode remover a ficha de um jogador, e a dona pode corrigir o nome e o PV máximo da ficha (o slug acompanha o nome). Hoje o front não oferece nenhuma dessas ações: a única saída de uma campanha é excluir a ficha, e um nome errado fica para sempre.

## What Changes

- **Sair da campanha**: na party, o card de cada ficha do usuário ("Sua ficha") ganha "Sair da campanha", com confirmação. Ao sair, o usuário vai para a ficha, que continua dele e sem campanha, com um toast.
- **Remover da campanha**: o mestre vê "Remover" em cada card da party, com confirmação; a ficha sai da party e continua com o jogador.
- Nenhuma das duas aparece em campanha arquivada.
- **Editar ficha**: a dona vê "Editar" na ficha, que abre um diálogo com nome e PV máximo preenchidos. Ao salvar, a página vai para o slug novo (renomear muda o endereço) e mostra um toast. Baixar o PV máximo abaixo do atual baixa o atual; ficha sem PV ganha PV cheio.

Fora do escopo: o mestre editar a ficha de um jogador ou uma ficha pronta pela ficha. O core permite, mas o detalhe da ficha não diz se o usuário é o mestre da campanha dela; fica para quando o core expuser isso.

## Capabilities

### New Capabilities

Nenhuma.

### Modified Capabilities
- `campaign-lifecycle`: o jogador sai e o mestre remove fichas da party.
- `character-sheet`: a dona edita nome e PV máximo da ficha.

## Impact

- **API consumida**: `DELETE /campaign/{id}/character/{characterId}` e `PATCH /character/{id}` (core 1.5.0).
- **Código**: módulo `campaign` (repositório, use cases, ações, botões nos cards da party), `character` (repositório, use case, ação, schema e diálogo de edição), `ConfirmDeleteButton` com ícone configurável, traduções pt-BR e testes.
- **Dependência**: construído sobre o `campaign-party` (cards da party).
