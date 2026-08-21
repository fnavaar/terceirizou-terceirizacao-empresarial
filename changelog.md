# Changelog — Projeto Terceirizou Terceirização Empresarial

> Registro de tudo que acontece no projeto, em ordem cronológica inversa.

## Registro

- 2026-08-20 · [Vinicius/Champion] · F1-T05 TESTE APROVADO: "Sim".
- 2026-08-20 · [Adapta/Ethos] · F1-T05 FECHADA: webhook + Google Apps Script implementados, idempotência testada (criar=201, replay=200, sem email=OK). Preview: https://crm-oficial-65bb8--preview.goskip.app.
- 2026-08-20 · [Adapta/Ethos] · F1-T05 IMPLEMENTADA: webhook POST /backend/v1/webhook/lead (criação + idempotência via dedup_key SHA-256). Google Apps Script criado. Testes via API: todos OK.
- 2026-08-19 · [Vinicius/Champion] · F1-T02 TESTE APROVADO: "testado e aprovado".
- 2026-08-19 · [Adapta/Ethos] · F1-T02 FECHADA: collection leads (16 campos, RLS, 4 índices), frontend CRM, 3 migrations applied.
- 2026-08-19 · [Vinicius/Champion] · F1-T04 TESTE APROVADO: "testado e aprovado".
- 2026-08-19 · [Adapta/Ethos] · F1-T04 FECHADA: contrato de captura — Google Sheets, Google Apps Script → webhook Skip, email+telefone idempotência.
- 2026-08-19 · [Vinicius/Champion] · F1-T01 TESTE APROVADO.
- 2026-08-19 · [Adapta/Ethos] · F1-T01 FECHADA: plataforma=Skip, papéis, campos, RLS confirmados.
