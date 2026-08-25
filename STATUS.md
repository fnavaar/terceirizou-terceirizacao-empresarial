# STATUS — Projeto Terceirizou Terceirização Empresarial

> **Atualizado em:** 2026-08-25 · **Por:** Auditoria Adapta/ETHOS

## Onde estamos

- **Fase atual:** 1 — Sistema central de captura, dados e pipeline
- **Skip:** CRM Oficial, projectId 51268, v0.0.22, QA aprovado
- **Preview:** https://crm-oficial-65bb8--preview.goskip.app
- **Produção:** não publicada
- **Tasks executadas com evidência:** 9/10
- **Task pendente:** F1-T10 — prova final de falha, replay, reconciliação e RLS

## Inventário real do Skip

- **Migrations aplicadas:** 0001_create_leads, 0002_seed_admin_and_test_lead, 0003_fix_rls_and_role, 0004_create_error_log
- **Collections:** users, leads, error_log
- **Hooks:** webhook_lead.js e replay_lead.js
- **Frontend:** Index.tsx, FilaRecuperacao.tsx e rotas `/` e `/fila`
- **F1-T10 no código:** não encontrada. Não há relatório, migration, hook, página ou evidência de reconciliação da F1-T10.

## Status por task

| Task | Status real | Evidência |
|---|---|---|
| F1-T01 | ✅ Executada | Decisões no handoff GitHub |
| F1-T02 | ✅ Executada | Migrations + collection + frontend no Skip |
| F1-T03 | ✅ Executada | Teste de modelo/RLS no handoff GitHub |
| F1-T04 | ✅ Executada | Contrato no handoff GitHub |
| F1-T05 | ✅ Executada | `webhook_lead.js` no Skip |
| F1-T06 | ✅ Executada | Testes de criação/replay |
| F1-T07 | ✅ Executada | Testes de validação/erro |
| F1-T08 | ✅ Executada | `error_log` + política |
| F1-T09 | ✅ Executada | `replay_lead.js` + `/fila` |
| F1-T10 | 🟡 Pendente | Prova final ainda não feita |

## Próxima ação

Executar uma única task: F1-T10, após análise e autorização do champion.
