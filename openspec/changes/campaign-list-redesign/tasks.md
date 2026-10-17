# Tasks

## 1. Design system

- [x] 1.1 `SearchField`, `ToggleLink` (botão de um toque como link com `aria-current`), `Pagination` no visual HeroUI (anterior/próxima desativados fora de alcance) e estado de lista (`ListState`); verificar com teste da paginação
- [x] 1.2 `Dialog` como Modal HeroUI (folha no celular, central a partir de 48rem) e campos no visual HeroUI com erro com ícone

## 2. Dados

- [x] 2.1 `q` nos parâmetros da URL, nos filtros e na query do core; 12 por página e ordem recente; verificar com teste dos parâmetros e do mapper
- [x] 2.2 Criar devolve o `slug`; a action redireciona com flash; action de carregar mais valida a entrada

## 3. Tela

- [x] 3.1 Cabeçalho, barra de filtros, lista em linhas, paginação e "Mostrar mais"
- [x] 3.2 Estados: carregando, vazia, erro, sem resultado (texto pelo que escondeu), página inexistente
- [x] 3.3 Form de nova campanha com sistema vazio e erros no campo
- [x] 3.4 Traduções

## 4. Integração

- [x] 4.1 `yarn typecheck`, `yarn lint`, `yarn test`, `yarn build`, `openspec validate`
- [ ] 4.2 Conferir no navegador a 375, 768 e 1280px
