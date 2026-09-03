# STATUS — Projeto Terceirizou Terceirização Empresarial

> **Atualizado em:** 2026-09-03 · **Por:** Adapta/ETHOS

## Onde estamos

- **Fase 1:** concluída (10/10).
- **Fase 2 — qualificação, pontuação e roteamento:** ✅ ENCERRADA pelo champion (5/5) — 2026-09-03.
- **Fase 3:** não iniciada — aguardando SPEC publicada pelo consultor.
- **Publicação:** material sincronizado no repositório do cliente.

## Entregas consolidadas (Fase 2)

- **Regra v1** (F2-T01): config/regra_qualificacao_v1.json + validador 6/6.
- **Modelo** (F2-T02): migration 0006, 6 campos de qualificação em `leads` (v0.0.29).
- **Classificação** (F2-T03): hooks qualificar_lead_create/update (v0.0.32).
- **Fila + correção** (F2-T04): endpoints fila-revisao e revisar-lead com histórico auditável (v0.0.35).
- **Prova final** (F2-T05): matriz de evidências CA-2-001..005, acesso por papel e rollback.

## Lacunas / pendências

- **Validação formal do consultor** para conferência do encerramento da Fase 2 (champion encerrou em 2026-09-03).
- **F3 candidata (frontend):** painel (Index.tsx) não exibe coluna de qualificação nem botão de criar lead. Fora da SPEC-2-001; documentado em `06_notas/F3-candidata-frontend-leads.md` — aguardando decisão do consultor para virar SPEC.

## Próximo passo

Aguardar o consultor publicar a SPEC da Fase 3 (ou aprovar a candidata de frontend) para iniciar o planejamento.