# Tasks

## 1. Peças compartilhadas

- [x] 1.1 Estilos e componentes de coleção (cabeçalho com total, barra de filtros, lista, paginação × "Mostrar mais", esqueleto) fora do módulo de campanha; Campanhas passa a usá-los sem mudar de visual
- [x] 1.2 `useLoadMore` no `shared`; verificar com teste do hook

## 2. Dados

- [x] 2.1 `q` nos parâmetros, filtros e query do core; 12 por página e ordem recente; verificar com teste dos parâmetros
- [x] 2.2 Criar personagem sem PV, devolvendo o `slug`; a action redireciona com flash; action de carregar mais

## 3. Tela

- [x] 3.1 Cabeçalho, busca, abas, grade de cards (iniciais acima do nome em cards estreitos), paginação e "Mostrar mais"
- [x] 3.2 Estados: carregando, vazia, erro, "Sem campanha" vazio, busca sem resultado, página inexistente
- [x] 3.3 Form de novo personagem sem PV, sistema vazio com ajuda
- [x] 3.4 Traduções

## 4. Integração

- [x] 4.1 `yarn typecheck`, `yarn lint`, `yarn test`, `yarn build`, `openspec validate`
- [ ] 4.2 Conferir no navegador a 375, 768 e 1280px
