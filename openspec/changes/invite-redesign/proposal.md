# Proposta

## Por quê

A página de convite foi redesenhada (canvas "QuestMaster — Telas", página "HeroUI · Convite") e o core passou a exigir o apelido na campanha ao aceitar (`player_name`, `campaign-member-names`): hoje aceitar um convite dá 400.

## O que muda

- **Destaque**: "Você foi convidado para", sistema, nome, "N jogadores · mestrada por {apelido}", descrição e marca d'água, numa coluna de 800px.
- **Escolha**: cards de rádio com iniciais; nada marcado; "Suas fichas" antes das prontas; linha "Criar personagem" quando o usuário não tem fichas; "Ainda sem heróis" sem nenhuma.
- **Apelido**: "Seu apelido na campanha", obrigatório, com o nome da conta; vai como `player_name`.
- **Resumo e botão**: "Escolha uma ficha para continuar" / "Você entra como {apelido}, com {ficha}"; botão `aria-disabled` sem escolha; preso no rodapé no celular.
- **Erros**: sem escolha (mensagem acima das fichas e foco), sem apelido (no campo e foco), ficha pronta pega (toast com o nome, lista atualizada e escolha limpa), outras falhas (toast, escolha mantida).
- **Estados**: mestre ("Esta campanha é sua" com o link), inválido, carregando.
- **Criar personagem pelo convite**: volta para o convite.

Fora do escopo: a posição dos toasts no app todo (fica para as telas globais).

## Capacidades

### Capacidades modificadas

- `campaign-invite`: destaque, escolha, apelido, resumo, erros, estados e o retorno ao convite.

## Impacto

- **Código**: `src/modules/invite` (domínio, repositório, action, view, componentes), `src/modules/character` (criação com retorno ao convite), traduções.
- **API**: aceite manda `player_name` (já exigido). "mestrada por" depende de `questmaster-core/openspec/changes/invite-details-dm-name`; até lá só o número de jogadores aparece.
- **Dependências**: nenhuma.
