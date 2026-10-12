# Design

## Context

Ver proposal.md (Why). O CSS usa CSS Modules com tokens em `src/design/foundations/tokens`; o único breakpoint é `@media (max-width: 640px)` no padding do `AppShell`. O layout raiz (`src/app/layout.tsx`) monta `AppShell` com `Header` (marca, `Nav`, `UserGreeting`). Layouts de conteúdo já são fluidos (flex com `wrap`, grids com `auto-fit`/`auto-fill`), por isso não há rolagem horizontal.

## Goals / Non-Goals

**Goals:**
- Estilos base para o celular, ajustes com `min-width`, sem mudar o desktop.
- Navegação ao alcance do polegar e alvos de toque de 44px.

**Non-Goals:**
- PWA, gestos, tema claro.

## Decisions

**Dois breakpoints, em rem.** `48rem` (tablet) e `64rem` (desktop), documentados em `tokens/layout.css` como comentário, junto com `--bottom-nav-height` e `--touch-target`, e usados literais nas media queries (CSS não aceita variáveis em `@media`). Sempre `min-width`; o `max-width: 640px` do shell vira o padding base do celular com `min-width: 48rem` para o padding atual.

**Barra inferior no celular, cabeçalho no desktop.** O `Nav` ganha ícones (lucide: `LayoutDashboard`, `ScrollText`, `Users`) e uma variante `bottom`. O `AppShell` recebe `bottomNav` e o renderiza fixo no rodapé abaixo de 48rem, com `padding-bottom: env(safe-area-inset-bottom)`; o `main` ganha `padding-bottom` da altura da barra. No cabeçalho, o `Nav` some abaixo de 48rem e a barra some a partir dele (só CSS, sem JS nem detecção de aparelho). Alternativa: menu hambúrguer. Descartada: esconde os três destinos atrás de um toque a mais, e três cabem na barra.

**`viewport-fit=cover`.** O layout exporta `viewport` com `viewportFit: 'cover'` para `env(safe-area-inset-*)` funcionar no iPhone.

**Alvos de toque nos átomos.** `Button`, `NavLink`, abas do `SegmentedNav`, botão do `CopyField` e fechar do `Dialog` ganham `min-height: 2.75rem` (e `min-width` nos só-ícone); a trilha ganha padding vertical no link. O `HpControl` usa `3rem` no celular. Ajuste nos átomos, não em cada tela, para valer em todo lugar.

**Tipografia com `clamp()`.** `--font-size-2xl: clamp(1.5rem, 1.2rem + 1.5vw, 2rem)` e `--font-size-3xl: clamp(2rem, 1.5rem + 2.5vw, 3rem)`; no desktop os valores batem com os atuais. `overflow-wrap: break-word` nos títulos para nomes longos sem quebrar palavras comuns.

**Diálogo e toaster.** O diálogo já usa `min(500px, 100% - 2 × lg)`; passa a `100% - 2 × md` no celular com `max-height: calc(100dvh - 2 × md)` e rolagem no corpo. O toaster ocupa a largura menos as margens no celular e sobe a altura da barra inferior.

**Divisor das ações da campanha.** O `Divider` vertical entre transições e convite fica oculto abaixo de 48rem, quando a linha quebra; o campo do convite ganha `flex: 1 1 100%` no celular.

## Risks / Trade-offs

- [Teste visual não automatizado] → Conferência no navegador a 320, 375, 768 e 1280px em todas as telas, com o script de medição (rolagem horizontal e alvos abaixo de 44px) usado no diagnóstico. Testes de componente cobrem só a marcação nova (ícones e rótulos da barra, página atual).
- [Barra fixa cobre conteúdo ou toasts] → `padding-bottom` no `main` e deslocamento do toaster com a mesma variável de altura.
