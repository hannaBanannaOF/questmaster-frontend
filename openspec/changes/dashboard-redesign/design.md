# Design

## Contexto

O design (HeroUI v3) define cada estado em três larguras: celular (375), tablet (768) e desktop (1280). As decisões anotadas no canvas valem como requisitos visuais: alvos ≥ 44px, contraste ≥ 4,5:1 nos dois temas, um `h1` por tela, sistema sempre como glifo + cor + nome.

## Decisões

### Componentes próprios com a anatomia do HeroUI, sem instalar a lib

HeroUI v3 depende de Tailwind v4 e traz reset e tokens globais. Instalar agora mudaria as telas ainda não redesenhadas. Os tokens do HeroUI (`--surface`, `--default`, `--accent-soft`…) entram em `foundations/tokens/colors.css` ao lado dos atuais, e os componentes novos seguem a API e os estilos do HeroUI (variantes `primary`, `secondary`, `tertiary`, `ghost`; Chip `soft`; Alert `danger`). Quando todas as telas migrarem, trocar pela lib é mecânico.

### Abas continuam links (`?view=`)

O estado da aba fica na URL e a página é Server Component. Visualmente viram o Tabs "primary" do HeroUI (fundo `--default`, aba ativa em `--segment`).

### ViewModel puro

`buildDashboardViewModel({ campaigns, characters, idleCharacters, view })` devolve uma união discriminada:

- `unavailable`: as duas buscas falharam.
- `welcome`: buscas ok e nenhum papel.
- `board`: `tabs` (só com os dois papéis), `active`, e o painel ativo (`player` ou `dm`) com o que cada seção mostra ou `error`.

As views recebem o VM e não decidem estado. Teste unitário cobre a tabela de estados.

### Sem campanhas, o destaque some

O destaque vem das campanhas; se a busca falha, a aba Jogando mostra Personagens e o Alert de campanhas. Na aba Mestrando, a falha das campanhas ocupa o painel ("Falha crítica" local com "Ir para Jogando").

### Papéis com uma busca falha

Se as campanhas falharam, não dá para saber se o usuário mestra: mostra as abas (como hoje) para não esconder o caminho. Se só os personagens falharam e o usuário não tem campanhas como jogador, mostra Jogando com o Alert de personagens.

### "Precisa de você" usa o filtro `without_players` do core

Uma busca própria (`role=dm&without_players=true`) traz as campanhas e o total certo; o destaque sai dela para cada campanha aparecer uma vez só.

## Riscos

- Tokens novos convivem com os antigos: telas legadas não mudam, mas o dashboard fica visualmente à frente até as outras migrarem.
