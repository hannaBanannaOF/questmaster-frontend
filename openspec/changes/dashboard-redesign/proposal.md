# Proposta

## Por quê

O dashboard foi redesenhado (canvas "QuestMaster — Telas", página "HeroUI · Dashboard"): visual com tokens no padrão do HeroUI v3, identidade do sistema de RPG (glifo + cor + nome), destaque "Continuar jogando/mestrando", fichas com a campanha em que estão e estados para cada combinação de papéis, carregamento e falhas. A tela atual tem blocos que o design removeu (contagem por status, "Próximos passos", banner de troca de aba) e não mostra a campanha de cada ficha.

## O que muda

- **Visual**: tokens de cor/superfície do HeroUI v3 (`--surface`, `--accent`, `--default`, `--muted`…) nos dois temas, com os valores do QuestMaster; componentes novos no design system (Avatar, Chip, Alert, Tabs como links, contador de seção).
- **Jogando**: destaque "Continuar jogando" com a ficha do usuário; seções "Personagens" (cards com sistema, iniciais e campanha ou "Sem campanha") e "Campanhas" (linhas com selo do sistema e papel); "Pronto para a aventura" quando nenhuma ficha está em mesa.
- **Mestrando**: destaque "Continuar mestrando" (campanha em andamento aberta por último), "Campanhas" e "Precisa de você" (campanhas sem jogadores; cada uma aparece uma vez só).
- **Abas só para quem tem os dois papéis**. Quem só joga ou só mestra vê a tela sem abas e um convite discreto para o outro papel no fim.
- **Erros**: falha parcial vira Alert no lugar da seção, com "Tentar de novo"; falha total vira "Falha crítica" (d20 mostrando 1). Carregamento com esqueleto no formato da tela.
- **ViewModel (MVVM)**: as regras de que estado mostrar saem das views para uma função pura testável (`buildDashboardViewModel`); as views só desenham.
- Removidos do dashboard: contagem por status, "Próximos passos", banner de troca de aba, PV.

Fora do escopo: cabeçalho e barra inferior do app (página "HeroUI · Globais"), demais telas.

## Capacidades

### Capacidades modificadas

- `dashboard`: abas condicionais, novo conteúdo das abas, erros e carregamento.

## Impacto

- **Código**: `src/design` (tokens e componentes novos), `src/modules/dashboard` (view model, views, componentes), `src/modules/character` (campanha da ficha no resumo), `src/app/loading.tsx`, traduções `dashboard.json`.
- **API**: pede ao core `campaign` no item da lista de personagens e o filtro `without_players` na lista de campanhas (`questmaster-core/openspec/changes/dashboard-list-fields`). Até lá, a ficha sem o campo não mostra a linha de campanha e "Precisa de você" sai da prévia das campanhas do mestre.
- **Dependências**: nenhuma nova. HeroUI v3 exige Tailwind v4 e reset global, o que mudaria todas as telas legadas de uma vez; os componentes seguem a anatomia e os tokens do HeroUI, em CSS Modules.
