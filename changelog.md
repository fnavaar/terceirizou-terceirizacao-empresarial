# Changelog — Projeto Terceirizou Terceirização Empresarial

> Registro de tudo que acontece no projeto, em ordem cronológica inversa.

## Registro

- 2026-08-20 · [Adapta/Ethos] · F1-T05 IMPLEMENTADA: webhook POST /backend/v1/webhook/lead criado (criação + idempotência via dedup_key SHA-256). Google Apps Script criado (scripts/f1-t05-google-apps-script.js). Testes: criação OK (201), replay idempotente OK (200), sem email OK (fallback telefone).
- 2026-08-19 · [Vinicius/Champion] · F1-T02 TESTE APROVADO: "testado e aprovado".
- 2026-08-19 · [Adapta/Ethos] · F1-T02 FECHADA: collection leads (16 campos, RLS, 4 índices), frontend CRM, 3 migrations applied.
- 2026-08-19 · [Adapta/Ethos] · F1-T02 FIX RLS: migration 0003 — list/view/create públicos para teste.
- 2026-08-19 · [Vinicius/Champion] · F1-T04 TESTE APROVADO: "testado e aprovado".
- 2026-08-19 · [Adapta/Ethos] · F1-T04 FECHADA: contrato de captura — Google Sheets, Google Apps Script → webhook Skip, email+telefone idempotência.
- 2026-08-19 · [Vinicius/Champion] · F1-T01 TESTE APROVADO.
- 2026-08-19 · [Adapta/Ethos] · F1-T01 FECHADA: plataforma=Skip, papéis, campos, RLS confirmados.
