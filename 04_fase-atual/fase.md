# Fase 1 — Tarefas gerais

**Status:** 9/10 tasks concluídas.  
**Regra:** nenhuma task altera resultado, limite, critério ou prova da SPEC.

## Tasks

| ID | Leva | Task | Dono | SPEC | Pré-condições | Status |
|---|---:|---|---|---|---|---|
| F1-T01 | 1 | Confirmar plataforma central, conta, papéis, campos e RLS | Responsável técnico | spec-1-001 | Aprovação do cliente | ✅ CONCLUÍDA |
| F1-T02 | 2 | Configurar modelo de lead/oportunidade, pipeline, RLS e histórico | Administrador | spec-1-001 | F1-T01 | ✅ CONCLUÍDA |
| F1-T03 | 5 | Provar modelo, RLS, histórico e bordas de dado ausente | Responsável comercial | spec-1-001 | F1-T02 + F1-T09 | ✅ CONCLUÍDA |
| F1-T04 | 1 | Confirmar formulário, destino, campos e idempotência | Responsável técnico | spec-1-002 | Aprovação do cliente | ✅ CONCLUÍDA |
| F1-T05 | 3 | Configurar captura, validação e upsert idempotente | Responsável técnico | spec-1-002 | F1-T02 + F1-T04 | ✅ CONCLUÍDA |
| F1-T06 | 5 | Provar criação e replay idempotente | Responsável técnico | spec-1-002 | F1-T05 | ✅ CONCLUÍDA |
| F1-T07 | 5 | Provar ausências, schema inválido e permissão | Responsável técnico | spec-1-002 | F1-T05 + F1-T09 | ✅ CONCLUÍDA |
| F1-T08 | 1 | Confirmar fila, retenção, retry, alerta e pausa | Responsável técnico | spec-1-003 | Aprovação do cliente | ✅ CONCLUÍDA |
| F1-T09 | 4 | Configurar fila de recuperação e replay manual | Responsável técnico | spec-1-003 | F1-T02 + F1-T05 + F1-T08 | ✅ CONCLUÍDA |
| F1-T10 | 5 | Provar falha, replay, reconciliação e RLS | Responsável comercial | spec-1-003 | F1-T09 | 🔓 DESBLOQUEADA |
