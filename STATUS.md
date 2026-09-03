# STATUS — Projeto Terceirizou Terceirização Empresarial

> **Atualizado em:** 2026-09-02 · **Por:** Adapta/ETHOS

## Onde estamos

- **Fase atual:** 2 — qualificação, pontuação e roteamento.
- **Fase 1:** arquivada no histórico do repositório (10/10 tasks concluídas).
- **F2-T01:** ✅ CONCLUÍDA e aprovada pelo champion — versão 1 da regra registrada e validada (6/6 casos sintéticos PASS).
- **F2-T02:** ✅ CONCLUÍDA e aprovada pelo champion — modelo de qualificação aplicado no Skip via MCP (migration 0006, v0.0.29), prova real com lead sintético, 6 campos presentes e persistentes.
- **F2-T03:** ✅ CONCLUÍDA e aprovada pelo champion — classificação determinística e roteamento (hooks qualificar_lead_create/update, v0.0.32); fixtures 6/6, reclassificação via update OK; validada via planilha + dados do banco.
- **F2-T04:** ✅ CONCLUÍDA e aprovada pelo champion — fila de revisão/exceção e correção humana auditável (endpoints fila-revisao e revisar-lead, v0.0.35); histórico com ator/data/motivo/versão; sem-auth 401.
- **Próxima task elegível:** F2-T05 — provar cenários, acesso por papel, rollback e aceite do champion. (A iniciar somente após validação do consultor.)
- **Publicação:** material da Fase 2 sincronizado no repositório do cliente.

## Entregue em F2-T04

- Endpoints `GET /backend/v1/fila-revisao` e `POST /backend/v1/revisar-lead` aplicados no Skip Cloud (v0.0.35).
- Fila lista pendente_revisao/excecao com motivo/score/responsável; correção humana grava histórico com ator, data, decisão, anterior, motivo e versão da regra; sem-auth 401; fila remaneja após revisão.
- Validação humana: champion confirmou "Funcionou" (2026-09-02).

## Lacunas registradas (para consultor)

- Painel (Index.tsx) não exibe coluna de qualificação (estado/score/motivo) nem tem botão para criar lead. Fora da SPEC-2-001; documentado em 06_notas/F3-candidata-frontend-leads.md (candidata a F3/frontend).

## Próximo passo

Aguardar validação do consultor e iniciar F2-T05 (prova de cenários, acesso por papel, rollback e aceite do champion) para fechar a Fase 2.