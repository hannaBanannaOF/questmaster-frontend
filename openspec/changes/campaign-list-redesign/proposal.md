# Proposta

## Por quê

A lista de campanhas foi redesenhada (canvas "QuestMaster — Telas", página "HeroUI · Campanhas") na mesma linguagem do dashboard: linhas de campanha com o selo do sistema e o papel, busca pelo nome, filtros de um toque, paginação no padrão do HeroUI e, no celular, "Mostrar mais". O modal "Nova campanha" também mudou: folha que sobe de baixo no celular, sistema começando sem escolha e erros ligados ao campo.

## O que muda

- **Cabeçalho**: "Campanhas" com o total e "Nova campanha" ("Nova" no celular).
- **Filtros na URL**: busca pelo nome (`q`), papel em abas (Todas / Mestrando / Jogando) e status em botões de um toque (Todos, Jogando, Rascunho, Pausada, Arquivada). Mudar qualquer um volta para a página 1.
- **Lista**: `CampaignRow` (a mesma do dashboard), 12 por página, mais recentes primeiro, 2 colunas só quando cada uma tem pelo menos 440px.
- **Paginação**: "Mostrando 1–12 de 47" + anterior, páginas, próxima (tablet e desktop); "Mostrar mais" acrescentando 12 no fim, com "12 de 47 campanhas" (celular).
- **Estados**: carregando (só a lista vira esqueleto), vazia (d20 genérico, "Criar campanha" e o aviso de convite, sem filtros), erro ("Falha crítica", sem filtros), busca/filtro sem resultado (texto conforme o que escondeu), página que não existe.
- **Nova campanha**: modal do HeroUI (folha no celular, central no resto), sistema começa vazio, campos e erros no padrão HeroUI. Depois de criar, vai para a página da campanha nova com o toast "Campanha criada".
- O `Dialog` e os campos de formulário do design system passam para o visual HeroUI; vale para todos os modais e formulários do app.

Fora do escopo: detalhe da campanha e as demais telas.

## Capacidades

### Capacidades novas

- `campaign-list`: a lista de campanhas, seus filtros, paginação, estados e a criação.

### Capacidades modificadas

- `ui-feedback`: carregamento com esqueleto na lista de campanhas, 12 por página e "Mostrar mais" no celular, linhas de campanha sem "Aberta …" e em ordem de acesso.

## Impacto

- **Código**: `src/modules/campaign/presentation` (view, filtros, resultados, form, action de criar e de carregar mais), `src/design` (Dialog, campos, SearchField, ToggleLink, Pagination), `src/app/campaigns/loading.tsx`, traduções.
- **API**: a busca usa `q` (core `campaign-list-search`). A criação manda `dm_name` (core `campaign-member-names`, obrigatório) e devolve o `slug`.
- **Dependências**: nenhuma.
