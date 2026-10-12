# Proposal

## Why

A seção "Personagens (N)" do detalhe da campanha mostra só o nome de cada personagem num card que não leva a lugar nenhum. O mestre não vê como está a party e ninguém consegue abrir a ficha de outro membro a partir da campanha. O core propôs o `campaign-party-details` (`slug`, `max_hp` e `is_mine` em cada personagem do detalhe, e acesso às fichas restrito aos membros da campanha), que permite transformar a seção num painel da mesa. A revisão da página "Revisão · Campanha" do canvas desenhou o resultado.

## What Changes

- **Party como cards de ficha**: cada personagem do detalhe da campanha vira o card de ficha já usado nas listas, clicável, com "atual / máximo PV" e barra, em grade. As fichas do próprio usuário levam o selo "Sua ficha"; as dos outros abrem em modo leitura, que já existe.
- **Campanha sem jogadores**: em vez de esconder a seção, o mestre vê "Personagens (0)" com "Ninguém entrou ainda" e o controle de convite (criar ou copiar). Campanha arquivada sem jogadores continua sem a seção, porque não aceita convites.
- **Sem permissão é "não encontrado"**: quando o core recusa ver uma campanha ou uma ficha (403), o front mostra a tela de "não encontrado" de cada uma, em vez do erro genérico. Corrige o comportamento atual da campanha, que já contraria a spec, e cobre o novo 403 das fichas.

Fora do escopo: nome do jogador dono de cada ficha (o core não guarda usuários) e o mestre ajustar o PV pela tela da campanha (o core já permite; fica para outra mudança).

## Capabilities

### New Capabilities

Nenhuma.

### Modified Capabilities
- `campaign-lifecycle`: a seção de personagens da campanha passa a ser a party em cards, com o estado vazio do mestre.
- `ui-feedback`: "Recurso não encontrado" cobre explicitamente a ficha que o usuário não pode ver.

## Impact

- **API consumida**: `slug`, `max_hp` e `is_mine` nos personagens de `GET /campaign/{id}`; 403 em `GET /character/{id}` para quem não é membro (core `campaign-party-details`).
- **Código**: módulo `campaign` (domínio, DTO, mapper, seção de personagens, detalhe), `character` (card com selo, loader de detalhe), loaders de detalhe tratando 403, traduções pt-BR e testes.
- **Dependência**: precisa do `campaign-party-details` publicado no core para os links e o PV máximo; antes disso, `slug` ausente impede o link (ver design).
