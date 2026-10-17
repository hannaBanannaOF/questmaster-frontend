# Proposta

## Por quê

A lista de personagens foi redesenhada (canvas "QuestMaster — Telas", página "HeroUI · Personagens") com a mesma estrutura da lista de campanhas e o card de ficha do dashboard. A criação também mudou: sem PV, sistema começando vazio e, ao criar, a pessoa vai para a ficha nova.

## O que muda

- **Lista**: total no título, busca pelo nome, Todos / Sem campanha em abas, cards de ficha (sistema, iniciais, nome, campanha ou "Sem campanha") em grade de 220px+, 12 por página, ordem recente, paginação no tablet/desktop e "Mostrar mais" no celular.
- **Estados**: carregando (só a grade em esqueleto), vazia, erro ("Falha crítica"), "Sem campanha" vazio, busca sem resultado, página inexistente.
- **Novo personagem**: só nome e sistema; erros no campo; ao criar, vai para a ficha com o toast "Personagem criado".
- **Peças compartilhadas com Campanhas**: cabeçalho com total, lista com paginação e "Mostrar mais" (`useLoadMore`) e esqueleto de lista saem do módulo de campanha para o design system e o módulo `shared`.

Fora do escopo: a página da ficha (próxima tela).

## Capacidades

### Capacidades novas

- `character-list`: lista de personagens, busca, filtro, paginação e estados.

### Capacidades modificadas

- `character-sheet`: criação sem PV, com redirecionamento; cards sem PV.

## Impacto

- **Código**: `src/modules/character/presentation` (view, filtros, resultados, form, actions), `src/modules/campaign/presentation` (passa a usar as peças compartilhadas), `src/design` (cabeçalho de coleção e esqueleto), `src/modules/shared` (`useLoadMore`), traduções.
- **API**: a busca usa `q`, que o core ainda não tem (`questmaster-core/openspec/changes/character-list-search`); até lá a lista volta sem filtro. A criação já aceita PV opcional e devolve o `slug`.
- **Dependências**: nenhuma.
