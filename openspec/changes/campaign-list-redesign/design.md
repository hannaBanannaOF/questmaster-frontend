# Design

## Decisões

### Filtros como links e um form GET

Papel e status são links (estado na URL, voltar do navegador funciona, sem JS). A busca é um `<form method="get">` com os filtros atuais em campos ocultos; enviar volta para a página 1. O botão de limpar do campo é um link para a mesma lista sem `q`.

### "Mostrar mais" sem trocar de página

No celular a lista é um client component que começa com a página da URL e acrescenta as seguintes por uma Server Action (`loadMoreCampaignsAction`), que valida os filtros como qualquer entrada pública. A paginação por links continua no HTML e só aparece a partir de 48rem; o "Mostrar mais" só abaixo disso. Trocar filtro ou página remonta a lista (`key`), então nada acumulado sobra.

### Tamanho da página

A lista de campanhas passa a 12 (múltiplo de 1 e 2 colunas). A de personagens continua em 10 até ser redesenhada.

### Modal e campos no padrão HeroUI

`Dialog` vira o Modal do HeroUI com placement automático: no celular é uma folha presa embaixo, com alça; a partir de 48rem, centralizado. Continua no `<dialog>` nativo (foco preso, Esc, fundo inerte). Campos (`Input`, `Select`, `TextArea`, `Label`, erro) ganham o visual HeroUI e a mensagem de erro com ícone, ligada por `aria-describedby`. Todas as telas que usam esses componentes mudam junto.

### Sistema começa vazio

O select de sistema começa em "Escolha o sistema": cada campanha pode ser de um sistema diferente. O select continua nativo (acessível e funciona sem JS); o glifo do sistema aparece ao lado depois da escolha.

### Depois de criar

A action recebe o `slug` do core, grava o toast como flash e redireciona para `/campaigns/{slug}`.

## Riscos

- Até o core ter `q`, a busca devolve a lista sem filtro.
- O restyle de `Dialog` e campos muda o visual dos formulários das telas ainda não redesenhadas.
