# Tasks

## 1. Base

- [x] 1.1 Documentar os breakpoints (`tokens/layout.css`, com a altura da barra e o alvo de toque), inverter o padding do `AppShell` para `min-width` e exportar `viewport` com `viewportFit: 'cover'`; verificar com `yarn build`
- [x] 1.2 Tipografia fluida com `clamp()` nos tamanhos de título e `overflow-wrap` nos títulos; verificar no navegador a 375 e 1280px

## 2. Navegação

- [x] 2.1 Ícones no `Nav` e a variante de barra inferior; `AppShell` com `bottomNav` fixo abaixo de 48rem, área segura e `padding-bottom` no conteúdo; cabeçalho sem navegação abaixo de 48rem; verificar com teste de componente (rótulos, ícones e página atual) e no navegador a 375 e 768px

## 3. Toque e componentes

- [x] 3.1 Alvos de 44px em `Button`, `NavLink`, `SegmentedNav`, `CopyField`, fechar do `Dialog` e trilha; 48px nos botões de PV no celular; verificar com o script de medição em todas as telas
- [ ] 3.2 Diálogo e toaster no celular (largura, rolagem interna, acima da barra); divisor e campo de convite nas ações da campanha; verificar no navegador

## 4. Integração

- [x] 4.1 Rodar `yarn typecheck`, `yarn lint`, `yarn test`, `yarn build` e `openspec validate mobile-first` sem erros
- [x] 4.2 Conferir todas as telas a 320, 375, 768 e 1280px: sem rolagem horizontal, nenhum alvo abaixo de 44px, desktop igual ao de hoje
