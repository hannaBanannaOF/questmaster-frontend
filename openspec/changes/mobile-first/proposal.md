# Proposal

## Why

O QuestMaster vai ser usado na mesa, no celular: abrir a ficha, ajustar o PV, mandar o convite. Hoje o CSS foi escrito para o desktop e só reduz o padding abaixo de 640px. Numa tela de 375px, medido em todas as telas do app:

- o cabeçalho quebra em três linhas (marca, navegação partida no meio, usuário) e ocupa 208px, um quarto da tela;
- os alvos de toque ficam abaixo de 44px: navegação (38px), botões (40px), "Copiar" (37px), trilha de navegação (22px) e os botões de PV (32px), justamente o controle mais usado durante o jogo;
- títulos de página ocupam duas linhas, e o divisor vertical das ações da campanha sobra sozinho quando a linha quebra.

Não há rolagem horizontal em nenhuma tela, então a base está sã: falta inverter o ponto de partida.

## What Changes

- **CSS mobile-first**: os estilos base passam a ser os do celular, e telas maiores ganham ajustes com `min-width` (48rem para tablet, 64rem para desktop). O único `max-width` atual (padding do shell) é invertido.
- **Navegação no celular**: abaixo de 48rem, o cabeçalho vira uma barra compacta (marca e avatar) e a navegação vai para uma barra inferior fixa com Dashboard, Campanhas e Personagens (ícone e rótulo), respeitando a área segura do aparelho. A partir de 48rem, o cabeçalho atual continua igual.
- **Alvos de toque de 44px**: botões, links da navegação, abas, "Copiar", fechar do diálogo e trilha de navegação. Os botões de PV ficam com 48px no celular.
- **Tipografia fluida**: os tamanhos de título usam `clamp()`, menores no celular e iguais aos atuais no desktop.
- **Diálogos e toasts no celular**: diálogos ocupam a largura da tela com margem de 16px e rolam por dentro; toasts ocupam a largura e ficam acima da barra inferior.
- **Ajustes de tela**: o divisor vertical das ações da campanha some quando as ações quebram de linha; o campo do convite ocupa a largura disponível.

Fora do escopo: PWA (instalar na tela inicial, offline), gestos (arrastar para mudar PV) e tema claro.

## Capabilities

### New Capabilities
- `responsive-layout`: Como o app se adapta do celular ao desktop: navegação, alvos de toque, tipografia, diálogos e toasts.

### Modified Capabilities

Nenhuma.

## Impact

- **Código**: tokens (breakpoints documentados, tipografia fluida), átomos e moléculas do design system (botão, abas, navegação, trilha, campo de cópia), organismos (cabeçalho, diálogo, toaster), template do shell (barra inferior), controle de PV, ações da campanha e `viewport` do layout (`viewport-fit=cover` para a área segura).
- **Sem mudança de API** nem de comportamento no desktop, a não ser alvos de toque um pouco maiores.
