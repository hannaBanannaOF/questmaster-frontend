# Proposal

## Why

O dashboard hoje mostra as campanhas e fichas em ordem alfabética, então o que aparece primeiro não é o que o usuário está jogando agora, e a aba Jogando nem lista as campanhas de que ele participa (só destaca uma). O core aprovou o `track-recent-access` (`sort=recent` e `last_accessed_at` nas listas), que permite um dashboard guiado pelo uso real, em qualquer dispositivo. A revisão da página "Revisão · Dashboard" do canvas também apontou ajustes pequenos (PV sem máximo, contagens zeradas clicáveis, saudação repetida).

## What Changes

- **Aba Jogando**: "Continuar jogando" passa a ser a campanha em andamento aberta por último; nova seção "Campanhas recentes" (até 5, com "Ver todas (N)"); "Meus personagens" vira "Personagens recentes".
- **Aba Mestrando**: "Suas campanhas" vira "Campanhas recentes", na ordem de acesso. Contagens zeradas ficam esmaecidas e sem link.
- **"Aberta …" nos cards**: cards de campanha e de ficha, no dashboard e nas listas, mostram quando o usuário abriu o item pela última vez ("Aberta ontem"); item nunca aberto não mostra nada. As listas `/campaigns` e `/characters` continuam em ordem alfabética.
- **PV nos cards de ficha**: "9 / 12 PV" com uma barra, em vez de só "9 PV".
- **Saudação**: o título do dashboard leva o nome do usuário ("Bem-vindo de volta, Hanna") e o cabeçalho do app mostra avatar com a inicial e o nome, sem repetir "Olá".
- Funciona antes de o core publicar o `track-recent-access`: o core atual ignora `sort` e não manda `last_accessed_at`, então o dashboard fica em ordem de nome e sem "Aberta …" até lá, sem erro.

Fora do escopo: seletor de ordem nas listas (decidido: listas em A–Z), campanha da ficha no card (depende do core) e "Pedem atenção" para o mestre.

## Capabilities

### New Capabilities

Nenhuma.

### Modified Capabilities
- `dashboard`: abas Jogando e Mestrando passam a usar itens recentes, com a seção nova de campanhas, contagens zeradas sem link e a saudação pelo nome.
- `ui-feedback`: cards de campanha e de ficha mostram o último acesso em todas as telas.
- `character-sheet`: o PV nos cards de ficha mostra o máximo e uma barra.

## Impact

- **API consumida**: `sort=recent` e `last_accessed_at` em `GET /campaign` e `GET /character` (aditivo; tolerado pelo core atual).
- **Código**: módulos `campaign` e `character` (domínio, filtros, mapper, card), `dashboard` (loaders, painéis, view), `user` (saudação no cabeçalho), traduções pt-BR e testes.
- **Specs**: `dashboard`, `ui-feedback`, `character-sheet`.
