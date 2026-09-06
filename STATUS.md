# STATUS — Projeto Terceirizou Terceirização Empresarial

> **Atualizado em:** 2026-09-06 · **Por:** Adapta/ETHOS

## Onde estamos

- **Fase 1:** concluída (10/10).
- **Fase 2:** concluída (5/5).
- **Fase 3:** em andamento — F3-T01, F3-T02 e F3-T03 concluídas (teste humano aprovado); F3-T04 PENDENTE (próxima elegível — config Resend); F3-T05/F3-T06/F3-T07 bloqueadas.
- **Skip:** v0.0.49, hash `b5f5272` (publicado).

## F3-T03 — Borda de agenda (CONCLUÍDA 2026-09-06)

Cancelamento, no-show e falha de agenda provados com evento real (lead sintético). Teste humano aprovado pelo champion: cancelou, tentou reagendar (idempotente) e marcou no-show — tudo 200, histórico assinado no CRM.

- `POST /backend/v1/agendar-borda` com ações `cancelar` e `no_show`; campo `agendamento_situacao` (ativo/cancelado/no_show).
- Cancelar → DELETE no Google Calendar (com renovação de token via refresh + tratamento 410 como evento já removido), `situacao=cancelado`, `proxima_acao=reagendar`.
- No-show → evento mantido, `situacao=no_show`, `proxima_acao=contato_humano`.
- Falha OAuth/API → 502 sem falso sucesso + registro em `error_log` (fila humana), sem token exposto.
- Histórico sempre append (nunca apaga).

## Próximo passo

F3-T04 (champion registra cadência/modelos do follow-up e valida Resend sandbox) é a próxima elegível — depende de decisões do champion (cadência, modelos, remetente, base legal).