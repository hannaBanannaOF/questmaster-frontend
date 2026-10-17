# Design

## Decisões

### Sem avatar no cabeçalho

O avatar não abria nada; o nome da pessoa já aparece na saudação do dashboard. `UserGreeting` e `UserBadge` saem.

### Avisos em cima no tablet e desktop

No canto de baixo eles cobriam ações do fim da página. No celular continuam embaixo, acima da barra inferior; quando a página tem uma barra de botão presa no rodapé (marcada com `data-action-bar`), sobem acima dela via `:has()`.

### Erro fica até fechar

O aviso de erro é a única explicação do que falhou, então não some sozinho. O de sucesso some em 5 s, mas o tempo pausa com mouse ou foco em cima (WCAG 2.2.1).

### "Tentar de novo" no erro geral

O `error.tsx` chama `router.refresh()` e `reset()` na mesma transição: refaz a busca no servidor sem recarregar o navegador.

### Avisos com um modal aberto

O `<dialog>` modal fica na camada de cima e deixa o resto da página inerte: um aviso fora dele não aparece, não é anunciado e não pode ser fechado. Com um modal aberto, a região dos avisos é renderizada dentro dele (portal); no celular, como o modal é uma folha presa embaixo, ela vai para o topo.

### Select depois de um erro

O React não atualiza o `defaultSelected` das opções quando o valor devolvido pela action muda, e o reset do form voltava ao placeholder. O `<select>` remonta quando o valor padrão muda.
