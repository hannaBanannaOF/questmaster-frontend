# Spec Delta

## ADDED Requirements

### Requirement: Lista de personagens

A tela `/characters` SHALL ter a mesma estrutura da lista de campanhas: "Personagens" com o total, "Novo personagem" (só o ícone no celular), busca pelo nome, filtro Todos / Sem campanha em abas, lista e paginação. Cada ficha SHALL aparecer no card do dashboard: sistema no topo, iniciais, nome e a campanha da ficha ou "Sem campanha", sem PV; o card inteiro abre a ficha. A grade SHALL ter cards de pelo menos 220px (2 por linha no celular, com as iniciais acima do nome). A lista SHALL vir na ordem do último acesso, 12 por página; busca, filtro e página SHALL ficar na URL (`q`, `without_campaign`, `page`), e mudar busca ou filtro SHALL voltar para a página 1.

#### Scenario: Usuário com fichas

- **WHEN** o usuário com 14 fichas abre `/characters`
- **THEN** vê "Personagens 14" e as 12 abertas por último

#### Scenario: Buscar pelo nome

- **WHEN** o usuário busca "eleanor" com o filtro "Sem campanha"
- **THEN** abre `/characters?q=eleanor&without_campaign=true`

### Requirement: Paginação e "Mostrar mais" dos personagens

A partir de 48rem, a lista SHALL ter a paginação "Mostrando 1–12 de N"; abaixo disso, "Mostrar mais", que acrescenta as próximas 12 no fim, com "X de N personagens" anunciado ao leitor de tela.

#### Scenario: Mostrar mais no celular

- **WHEN** o usuário com 14 fichas toca em "Mostrar mais"
- **THEN** a lista passa a ter 14 fichas e o resumo diz "Todos os 14 personagens"

### Requirement: Estados da lista de personagens

Enquanto carrega, cabeçalho e filtros SHALL ficar na tela e só a grade SHALL virar esqueleto. Sem fichas, SHALL mostrar "Nenhum personagem ainda" com "Criar personagem" e o próximo passo (o convite), sem filtros. Se a busca falhar, SHALL mostrar "Falha crítica" com "Tentar de novo" e "Voltar ao dashboard", sem filtros, e "Novo personagem" continua funcionando. "Sem campanha" vazio SHALL dizer que todas as fichas estão em campanhas e oferecer "Ver todos"; busca sem resultado SHALL dizer o termo e oferecer limpar; nenhum dos dois MUST oferecer criar. Página além da última SHALL explicar e levar à primeira.

#### Scenario: Todas em campanhas

- **WHEN** o filtro "Sem campanha" não encontra nada
- **THEN** aparece "Todas as suas fichas estão em campanhas" e "Ver todos"

#### Scenario: Busca sem resultado

- **WHEN** a busca por "Yog" não encontra nada
- **THEN** aparece "Nenhum personagem com “Yog”" e "Limpar busca"

#### Scenario: Conta sem fichas

- **WHEN** o usuário sem fichas abre `/characters`
- **THEN** vê "Nenhum personagem ainda" e "Criar personagem", sem a barra de filtros
