# STATUS — Projeto Terceirizou Terceirização Empresarial

> **Atualizado em:** 2026-09-16 · **Por:** Adapta/ETHOS

## Onde estamos

- **Fase 1:** concluída (10/10).
- **Fase 2:** concluída (5/5).
- **Fase 3:** em andamento — F3-T01 a F3-T05 concluídas (5/7); **F3-T06 é a próxima elegível** (paradas, eventos e exceções do follow-up); F3-T07 bloqueada.
- **Skip:** v0.0.52, hash `d270f04` (QA 5/5).

## F3-T05 — Sequência de e-mail idempotente (CONCLUÍDA 2026-09-16)

Disparo idempotente do follow-up via Resend, com os modelos aprovados na F3-T04. Teste humano aprovado pelo champion.

- **Migration 0009:** campos aditivos em `leads` — `followup_estado`, `followup_idempotency_key`, `followup_ultimo_envio_id`, `followup_tentativa`, `followup_proxima_acao`, `followup_historico` (json append-only), com rollback.
- **Hook `followup_lead.js`:** `POST /backend/v1/followup-lead` — valida config aprovada (RN-3-101), qualificação + e-mail válido + base legal (RN-3-102); envia somente os modelos aprovados da cadência v1.1; idempotência por `lead_id + cadencia + tentativa` (repetir sem body repete a tentativa atual — avançar é papel do scheduler da F3-T06 com tentativa explícita); falha Resend → 502 sem falso sucesso + `error_log`, sem chave exposta (CA-3-104); histórico com destinatário mascarado.
- **Provas:** RED-1 (409 lead_nao_qualificado), RED-2 (409 email_invalido_ou_ausente), GREEN t1 (201 sent), repetição (200 already_sent, mesmo resend_email_id), 3ª chamada (already_sent), scheduler t2 explícita (201 id novo; repetição already_sent), histórico append-only com 2 entradas.
- **Correções durante a task:** (1) constantes no escopo de módulo não são visíveis ao handler no runtime Skip — movidas para dentro do callback (v0.0.51); (2) default que auto-avançava a tentativa quebrava a idempotência — corrigido para repetir a atual (v0.0.52).

## Próximo passo

F3-T06 (paradas, eventos e exceções do follow-up) é a próxima elegível — exige novo pedido do champion.