# Design

## Decisões

### Menu "⋯" próprio, no padrão do Dropdown do HeroUI

Um `Menu` no design system: botão com `aria-haspopup="menu"` e `aria-expanded`, lista `role="menu"` com itens `menuitem`, setas e Home/End movem o foco, Esc e clique fora fecham e devolvem o foco ao botão. Itens podem ser link ("Abrir ficha") ou ação; o destrutivo vem por último e em vermelho. O botão fica fora do link esticado do card, porque botão dentro de link quebra teclado e leitor de tela.

### Confirmações como Dialog em modo alerta

`Dialog` ganha `alertIcon`: `role="alertdialog"`, ícone no cabeçalho, sem o X (sai por "Cancelar" ou Esc). Um `ConfirmDialog` controlado faz a confirmação e pode ser aberto por um botão (`ConfirmDeleteButton`, em vermelho suave) ou por um item de menu; confirma com o botão `danger` (vermelho cheio) e o mesmo verbo da ação, e fecha sozinho quando a action dá certo sem redirecionar.

### Encerrar com confirmação

"Encerrar" usa o `ConfirmDialog` com `archiveCampaignAction`, que chama a action de status existente com ARCHIVED. Iniciar, pausar e retomar continuam diretos.

### Apelidos na mesa

`dmName` e `playerName` vêm do core como apelidos por campanha. O próprio apelido do jogador é o `playerName` da ficha dele (`isMine`). O lápis abre um Dialog com o form; a action valida (1 a 50, aparado) e chama `PATCH /campaign/{id}/table-name`. Apelido ausente (ficha pronta ou dado antigo) só esconde "de {jogador}".

### Ficha pronta sem PV

O form manda só o nome; o schema mantém PV opcional, que o core já aceita, para quando cada sistema declarar seus recursos.

## Riscos

- Mudar `ConfirmDeleteButton` afeta a exclusão de personagem (mesmo componente); ela ganha o visual novo junto.
