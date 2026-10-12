# Spec Delta

## ADDED Requirements

### Requirement: Pensado primeiro para o celular
Toda tela SHALL funcionar a partir de 320px de largura sem rolagem horizontal, com os estilos base pensados para o celular e ajustes para telas a partir de 48rem (tablet) e 64rem (desktop).

#### Scenario: Celular pequeno
- **WHEN** o usuário abre qualquer tela do app numa largura de 320px
- **THEN** a página não rola na horizontal e nenhum conteúdo fica cortado

#### Scenario: Desktop
- **WHEN** o usuário abre o app numa largura de 1280px
- **THEN** o layout é o mesmo de hoje: cabeçalho com a navegação e conteúdo centralizado até 1200px

### Requirement: Navegação no celular
Abaixo de 48rem, o cabeçalho SHALL mostrar só a marca e o usuário, e a navegação principal SHALL ficar numa barra inferior fixa com Dashboard, Campanhas e Personagens, cada um com ícone e rótulo, marcando a página atual e respeitando a área segura do aparelho. O conteúdo MUST NOT ficar escondido atrás da barra. A partir de 48rem, a navegação SHALL voltar para o cabeçalho.

#### Scenario: Navegar no celular
- **WHEN** o usuário abre o app num celular
- **THEN** vê a barra inferior com os três destinos e o atual marcado, e o cabeçalho numa linha só

#### Scenario: Fim da página
- **WHEN** o usuário rola até o fim de uma página no celular
- **THEN** o último conteúdo aparece inteiro acima da barra inferior

#### Scenario: Tablet ou maior
- **WHEN** o usuário abre o app numa largura de 768px ou mais
- **THEN** a navegação está no cabeçalho e não há barra inferior

### Requirement: Alvos de toque
Todo controle interativo (botões, links de navegação, abas, paginação, campo de cópia, fechar do diálogo, trilha de navegação) SHALL ter pelo menos 44 × 44px de área de toque. Os botões de aumentar e diminuir PV SHALL ter pelo menos 48 × 48px no celular.

#### Scenario: Ajustar PV na mesa
- **WHEN** a dona abre a ficha no celular
- **THEN** os botões de PV têm pelo menos 48px e ficam afastados o bastante para não tocar no errado

### Requirement: Títulos no celular
Os tamanhos de título SHALL diminuir no celular de forma contínua até os tamanhos atuais no desktop, sem quebrar palavras.

#### Scenario: Saudação do dashboard
- **WHEN** o usuário abre o dashboard numa largura de 375px
- **THEN** o título usa um tamanho menor que no desktop e nenhuma palavra é quebrada no meio

### Requirement: Diálogos e toasts no celular
No celular, os diálogos SHALL ocupar a largura da tela com margem de 16px e rolar por dentro quando o conteúdo passar da altura; os toasts SHALL ocupar a largura da tela e aparecer acima da barra inferior.

#### Scenario: Formulário longo
- **WHEN** o usuário abre "Nova campanha" num celular com o teclado aberto
- **THEN** o diálogo rola por dentro e o botão de enviar continua alcançável

#### Scenario: Toast no celular
- **WHEN** um toast aparece no celular
- **THEN** ele ocupa a largura da tela e fica acima da barra inferior, sem cobri-la
