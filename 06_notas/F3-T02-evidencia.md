# Evidência F3-T02 — Autoagendamento idempotente

- Skip: v0.0.37, hash `a8d7a8d`
- Migration: `0007_add_agendamento_fields` aplicada
- Endpoint: `POST /backend/v1/agendar-lead`
- Autenticação: `$apis.requireAuth()`
- Elegibilidade: somente `estado_qualificacao = qualificado`
- Janela: 30 minutos; segunda a sexta; 09h–12h e 14h–18h; fuso `America/Sao_Paulo`
- Idempotência: `lead_id + tipo + janela`
- Lead sintético criado: `F3T02-SINTETICO-QUALIFICADO`, registro `4hztghz2g3erjzv`, score 5, estado `qualificado`
- QA: setup, static analysis, build, integrations e test — todos passaram
- Teste humano: falhou porque o frontend não permite acessar o lead nem acionar o agendamento.
- Limite: F3-T03 permanece bloqueada até correção do frontend e aprovação do teste humano da F3-T02.
