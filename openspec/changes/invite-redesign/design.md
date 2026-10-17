# Design

## Decisões

### Rádios nativos em cards

Cada card é um `<label>` com o rádio nativo cobrindo o card (visualmente escondido): funciona sem JS e as setas andam pelo grupo. O client component só acompanha a escolha e o apelido para o resumo e o `aria-disabled`; quem valida é a Server Action.

### Botão `aria-disabled`, não `disabled`

Sem escolha o botão continua focável e enviável: a action responde com a mensagem do app e o foco vai para a escolha. Assim leitor de tela e teclado não ficam presos num botão morto.

### Ficha pronta pega (409)

A action devolve um erro de campo próprio (`character: invite.character.taken`, com o nome da ficha em `values`), revalida o convite e limpa a escolha. O form mostra o toast com o nome em vez da mensagem crua da API.

### Voltar ao convite depois de criar personagem

"Criar personagem" no convite abre o mesmo modal com um campo oculto `returnTo=/join/{hash}`. A action de criar só aceita esse formato (hash UUID), senão vai para a ficha nova como hoje.

### Nome sugerido

O apelido começa com o nome da conta (`getDisplayName`), como na criação de campanha; o core nunca lê nomes do provedor de identidade.
