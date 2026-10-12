# Spec Delta

## ADDED Requirements

### Requirement: PV nos cards de ficha
Os cards de ficha SHALL mostrar o PV atual e o máximo ("9 / 12 PV") com uma barra proporcional. Sem PV máximo definido, o máximo assumido SHALL ser 100, como no controle de PV. Ficha sem PV atual MUST NOT mostrar PV nem barra.

#### Scenario: Ficha ferida
- **WHEN** uma ficha tem 3 de 10 PV
- **THEN** o card mostra "3 / 10 PV" e a barra preenchida em 30%

#### Scenario: Ficha sem PV máximo
- **WHEN** uma ficha tem 40 PV atuais e nenhum máximo
- **THEN** o card mostra "40 / 100 PV"
