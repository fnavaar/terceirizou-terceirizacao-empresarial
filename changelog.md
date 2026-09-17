# Changelog — Terceirizou Terceirização Empresarial

## 2026-09-17

- [Adapta/Ethos] Checagem de sanidade do disparo de e-mails (pedido do champion): envio direto via Resend → HTTP 200 (ID 01a0b047) e teste de entrega → HTTP 200 (ID 01a0b049, assunto "[TESTE 17/09 13:52]"). Champion confirmou chegada na caixa principal, sem spam. CRM auditado: 5 leads com follow-up registrado, 4 envios no histórico (Fase 3), nenhum disparo fantasma; fila de exceção íntegra.
- [Adapta/Ethos] Achado operacional: chave RESEND_API_KEY é send-only (401 em leitura de lista de e-mails) — auditoria de disparos fica pelo registro no CRM (resend_email_id por envio); rastreabilidade de entrega (abertura/bounce) exige chave com leitura ou webhooks.
- [Adapta/Ethos] **CORREÇÃO do diagnóstico da F3-T07 (pendência de negócio RESOLVIDA):** teste real com destinatário externo (oliveiradacosta.vinicius@gmail.com) → HTTP 200, recebido na caixa Gmail confirmado pelo champion. O 422 da prova final rejeitava o domínio RESERVADO de teste (example.com), não destinatários externos. Com o domínio terceirizou.com.br verificado, a cadência funciona para leads reais no plano Free (3.000/mês, 100/dia) — cartão não é destravamento, vira decisão de limite de volume. Pendência encerrada.
- [Adapta/SkillMind] **Transição F3→F4 executada** (autorização de Navaar via formulário): Meta Ads na F4 com prova técnica timeboxed; evolução aceita = painel visual do follow-up; adiados = scheduler D+1/D+2 e webhook de bounce; regularização estrutural junto com a publicação; champion @Vinicius, prazo 30/09/2026.
- [Adapta/SkillMind] **Fase 4 liberada neste repositório:** Jornada F4 promovida ao canônico `04_fase-atual/fase.md` (8 tasks: 6 UUIDs preservados + 2 novas aguardando sincronizador; validador fase-format:2 PASS); SPEC-4-001/002/003 publicadas em `04_fase-atual/specs/`; Tasks Gerais F4 reconciliadas; Fase 3 arquivada em `05_entregas/fase-3/` (Jornada F3 preservada no histórico em `04-fase-atual/fase-3.md`); handoff-manifest atualizado para phase=4; check-fase-3 APROVADO no plano (digest HEAD `bab9454`).
- [Adapta/SkillMind] Revisão de decomposição read-only: ADERENTE COM CORREÇÕES — correções aplicadas (citações CA/B4 nas tasks, matriz sem IDs técnicos, prazos em dias úteis, fallback manual reposto).

## 2026-09-16

- [Ethos] F3-T07 CONCLUÍDA e FASE 3 ENCERRADA 7/7 — aceite final do champion registrado ("aceito a fase", 18:56).
- [Ethos] F3-T06 CONCLUÍDA: teste humano aprovado, paradas provadas (hook followup_parada + categoria bounce, migrations 0010/0011, v0.0.54).
- [Ethos] F3-T05 CONCLUÍDA: teste humano aprovado, provas RED/GREEN/scheduler registradas.
