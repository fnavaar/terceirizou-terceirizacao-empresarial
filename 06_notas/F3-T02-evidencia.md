# Evidência F3-T02 — Autoagendamento idempotente

- Skip: v0.0.37, hash `a8d7a8d`
- Migration: `0007_add_agendamento_fields` aplicada
- Endpoint: `POST /backend/v1/agendar-lead`
- Autenticação: `$apis.requireAuth()`
- Elegibilidade: somente `estado_qualificacao = qualificado`
- Janela: 30 minutos; segunda a sexta; 09h–12h e 14h–18h; fuso `America/Sao_Paulo`
- Idempotência: `lead_id + tipo + janela`
- Sem token no cofre: HTTP 503, estado `pendente_configuracao`, sem chamada ao Calendar
- QA: setup, static analysis, build, integrations e test — todos passaram
- Limite: criação real do evento depende de `GOOGLE_CALENDAR_ACCESS_TOKEN` em cofre e teste humano controlado; nenhum evento foi criado nesta implementação.
