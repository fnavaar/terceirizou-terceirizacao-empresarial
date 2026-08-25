# STATUS — Projeto Terceirizou Terceirização Empresarial

> **Atualizado em:** 2026-08-25 · **Por:** Auditoria Adapta/ETHOS

## Onde estamos

- **Fase atual:** 1 — Sistema central de captura, dados e pipeline
- **Skip:** CRM Oficial, projectId 51268, v0.0.26, QA aprovado
- **Preview:** https://crm-oficial-65bb8--preview.goskip.app
- **Produção:** não publicada
- **Tasks concluídas:** 9/10
- **Task ativa:** F1-T10 — aguardando aprovação humana final

## Prova F1-T10

- CA-1-009: ✅ falha visível na fila
- CA-1-010: ✅ replay controlado sem duplicidade
- CA-1-011: ✅ reconciliação da amostra sem alterar fonte
- CA-1-012: ✅ anônimo não lê fila; autenticado acessa

## Inventário real do Skip

- **Migrations aplicadas:** 0001_create_leads, 0002_seed_admin_and_test_lead, 0003_fix_rls_and_role, 0004_create_error_log, 0005_fix_error_log_rls
- **Collections:** users, leads, error_log
- **Hooks:** webhook_lead.js e replay_lead.js
- **Frontend:** Index.tsx, FilaRecuperacao.tsx e rotas `/` e `/fila`

## Próxima ação

Aguardar aprovação humana da F1-T10. Depois: concluir a F1-T10 e publicar produção somente após a conclusão dos gates.
