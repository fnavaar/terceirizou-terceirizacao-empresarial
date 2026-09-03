# STATUS — Projeto Terceirizou Terceirização Empresarial

> **Atualizado em:** 2026-09-03 · **Por:** Adapta/ETHOS

## Onde estamos

- **Fase atual:** 2 — qualificação, pontuação e roteamento. **5/5 tasks concluídas.**
- **Fase 1:** arquivada no histórico do repositório (10/10 tasks concluídas).
- **F2-T01 a F2-T05:** ✅ todas CONCLUÍDAS e aprovadas pelo champion.
- **Status da Fase 2:** completa e aguardando **validação do consultor** para encerramento formal.
- **Publicação:** material da Fase 2 sincronizado no repositório do cliente.

## Entregas consolidadas

- **Regra v1** (F2-T01): config/regra_qualificacao_v1.json + validador 6/6.
- **Modelo** (F2-T02): migration 0006, 6 campos de qualificação em `leads` (v0.0.29).
- **Classificação** (F2-T03): hooks qualificar_lead_create/update (v0.0.32) — regra v1 na criação e reclassificação.
- **Fila + correção** (F2-T04): endpoints fila-revisao e revisar-lead com histórico auditável (v0.0.35).
- **Prova final** (F2-T05): matriz de evidências CA-2-001..005, acesso por papel e rollback.

## Lacunas registradas (para consultor)

- Painel (Index.tsx) não exibe coluna de qualificação nem tem botão para criar lead. Fora da SPEC-2-001; documentado em 06_notas/F3-candidata-frontend-leads.md (candidata a F3/frontend).

## Próximo passo

Aguardar validação do consultor para encerrar a Fase 2 e decidir sobre a F3 (frontend) / próximas fases.