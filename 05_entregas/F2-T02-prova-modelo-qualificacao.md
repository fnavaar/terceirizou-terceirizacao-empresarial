# Prova — F2-T02 (modelo de qualificação)

Data: 2026-09-01 · Task: F2-T02 · SPEC-2-001

## O que foi entregue

- Migration `0006_add_qualificacao_fields.js` (aditiva): adiciona à collection `leads`:
  `estado_qualificacao`, `score`, `score_componentes`, `regra_versao`, `motivo_decisao`,
  `proxima_acao`. Rollback definido (remove só esses campos).
- Validação local: sintaxe JS OK (`node --check`); simulação do schema comprova que os 6
  campos são adicionados e o rollback restaura o schema original.

## Prova no ambiente real (Skip)

Aditivo confirmado como necessário. Tentativa de aplicar os campos via API: o endpoint de
schema não é exposto (403/404 mesmo com role admin). Criação de lead sintético com os campos
novos **antes** do deploy da migration:

- POST /api/collections/leads/records → HTTP 200, lead criado (`jw7x4pa4751n99k`)
- Leitura de volta: `estado_qualificacao`, `score`, `score_componentes`, `regra_versao`,
  `motivo_decisao`, `proxima_acao` → **AUSENTES** (schema atual não os tem)

## Dependência para validação final

A migration 0006 precisa ser aplicada no deploy do Skip (fluxo do projeto, como 0001–0005).
Após o deploy, repetir a prova: criar lead sintético com os 6 campos e ler de volta — todos
presentes e persistentes.
