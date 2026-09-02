# Prova — F2-T02 (modelo de qualificação)

Data: 2026-09-01/02 · Task: F2-T02 · SPEC-2-001

## O que foi entregue

- Migration `0006_add_qualificacao_fields.js` (aditiva): adiciona à collection `leads`:
  `estado_qualificacao`, `score`, `score_componentes`, `regra_versao`, `motivo_decisao`,
  `proxima_acao`. Rollback definido (remove só esses campos).
- Validação local: sintaxe JS OK (`node --check`); simulação do schema comprova que os 6
  campos são adicionados e o rollback restaura o schema original.

## Prova no ambiente real (Skip) — aplicação direta via MCP

A migration foi aplicada **diretamente via MCP do Skip** (sem deploy manual):
`skip_file_write` + `skip_project_apply_changes` — versão v0.0.29, QA completo verde.

- `skip_cloud_list_migrations` → 0006_add_qualificacao_fields **applied** (2026-09-01T22:21Z).
- `skip_cloud_get_collection_details(leads)` → os 6 campos presentes no schema.
- Prova ponta a ponta via API:
  - POST /api/collections/leads/records com todos os campos → HTTP 200, lead criado
    (`08r5jllzfeuonp0`, dedup_key `f2t02-sintetico`).
  - Leitura de volta: estado_qualificacao=qualificado, score=5,
    score_componentes={carta, receita_recente, decisor, receita_recente_valor},
    regra_versao=v1, motivo_decisao preenchido, proxima_acao=agendar_reuniao_fechamento
    → **TODOS presentes e persistentes**.

## Teste humano

Aprovado pelo champion (Vinicius) em 2026-09-02: "testado e aprovado".
