# Proposta

## Por quê

A ficha foi redesenhada (canvas "QuestMaster — Telas", página "HeroUI · Personagem") na linguagem do detalhe da campanha. E o core tirou o PV (`remove-character-hp`): o endpoint de PV não existe mais e a edição só aceita o nome, então a ficha atual quebra ao mexer no PV.

## O que muda

- **Cabeçalho**: medalhão com iniciais, sistema, nome, "Sua ficha" / "Ficha de {apelido}" / "Ficha pronta · ninguém escolheu ainda", marca d'água; "Editar" + "Excluir" para quem edita.
- **Campanha**: linha de campanha das listas com "Sair da campanha" para a dona; bloco tracejado "Sem campanha"; explicação na ficha pronta.
- **Editar**: só o nome; o sistema aparece só para leitura.
- **Excluir**: AlertDialog que cita a campanha, quando houver.
- **Estados**: carregando com esqueleto da página, não encontrada.
- **Sai o PV**: controle de PV, PV máximo na edição, use case e action de PV e os campos de PV do domínio de personagem.

Fora do escopo: recursos por sistema, retrato da ficha.

## Capacidades

### Capacidades modificadas

- `character-sheet`: página da ficha, campanha da ficha, edição só do nome, exclusão que cita a campanha, não encontrada; sai o controle de PV.

## Impacto

- **Código**: `src/modules/character` (domínio sem PV, repositório, actions, view, cabeçalho, bloco da campanha, form de edição), `src/app/characters/[slug]`, traduções.
- **API**: campanha, apelido do dono e ficha pronta no detalhe dependem de `questmaster-core/openspec/changes/character-details-context`; até lá a seção Campanha não aparece e o cabeçalho mostra só "Sua ficha" para a dona.
- **Dependências**: nenhuma.
