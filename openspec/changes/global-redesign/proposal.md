# Proposta

## Por quê

As partes que aparecem em todas as telas (cabeçalho, barra inferior do celular, avisos, página não encontrada e erro geral) foram redesenhadas no canvas "QuestMaster — Telas", página "HeroUI · Globais". Hoje elas ainda usam o visual legado e os avisos no canto de baixo cobrem ações do fim da página, como "Juntar-se à campanha".

## O que muda

- **Cabeçalho**: selo com o d20 e "Questmaster", sem subtítulo e sem avatar (no app ele não abre nada); navegação com ícone e rótulo, item atual marcado.
- **Barra inferior (celular)**: ícone numa pílula de destaque no item atual.
- **Avisos**: ícone, título e uma linha. Sucesso some em 5 s (pausa com mouse ou foco em cima); erro fica até fechar, com botão de 44px. Tablet e desktop no canto superior direito, abaixo do cabeçalho; celular acima da barra inferior, e acima da barra de botão quando houver. O mais novo fica mais perto da borda.
- **Textos dos avisos**: "Não deu para [ação]" + "Verifique a conexão e tente de novo.", sem ponto de exclamação; o texto da API (em inglês) nunca vai para a tela. Um aviso igual a um aberto o substitui.
- **Página não encontrada**: mesmo estado das outras telas, com "Ir para o dashboard".
- **Avisos com um modal aberto**: aparecem por cima dele (antes ficavam escondidos atrás) e podem ser fechados.
- **Erro geral**: "Falha crítica" com o d20 mostrando 1, "Tentar de novo" (sem recarregar) e "Ir para o dashboard"; diz que o que já foi salvo continua salvo.

Fora do escopo: troca de tema (o app não tem o controle).

## Capacidades

### Capacidades modificadas

- `ui-feedback`: cabeçalho e navegação, avisos, erro de página e página não encontrada.

## Impacto

- **Código**: `src/design` (Header, Brand, Nav, NavLink, AppShell, Toaster), `src/app` (layout, error, not-found), `src/modules/shared` (CriticalFailure, RetryButton), `src/modules/user` (o avatar sai do cabeçalho), Select (mantém o valor depois de um erro), traduções.
- **API**: nenhuma.
- **Dependências**: nenhuma.
