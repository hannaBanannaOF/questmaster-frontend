# Design

## Decisões

### Mesmas peças do detalhe da campanha

O template `DetailPage` do design system troca o legado e passa a ser usado pelas duas telas: `DetailPage` (voltar), `DetailHero` (destaque com marca d'água e ações), `DetailTitle`, `DetailActions` e `DetailSection`. Confirmações e a linha de campanha reaproveitam `ConfirmDialog`, `ConfirmDeleteButton` e `CampaignRow`.

### Campanha montada a partir do detalhe

A linha de campanha usa `CampaignRow` com um `CampaignSummary` montado do `campaign` do detalhe (o sistema é o da ficha; `isDm` dá o selo). "Sair da campanha" usa `leaveCampaignAction`, que já leva de volta à ficha com o toast.

### Quem edita

`canEditCharacter`: a dona, ou o mestre numa ficha pronta. Sem o contexto novo do core, cai para `isPlayer` como hoje.

### Sem PV

Saem `currentHp`/`maxHp` do domínio de personagem, `HpControl`, `updateHp` e o PV máximo da edição. O seletor de fichas do convite deixa de mostrar PV.
