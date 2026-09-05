# Evidência F3-T02 — Autoagendamento idempotente

- Skip: v0.0.39, hash `54bb544`
- Migration: `0007_add_agendamento_fields` aplicada
- Endpoint: `POST /backend/v1/agendar-lead`
- Frontend: coluna de qualificação, botão Abrir, detalhe do lead e ação Solicitar agendamento
- Autenticação: token da sessão enviado no header Authorization
- Elegibilidade: ação aparece somente para `estado_qualificacao = qualificado`
- Janela: 30 minutos; segunda a sexta; 09h–12h e 14h–18h; fuso `America/Sao_Paulo`
- Idempotência: `lead_id + tipo + janela`
- Lead sintético: `F3T02-SINTETICO-QUALIFICADO`, registro `4hztghz2g3erjzv`, score 5
- QA: setup, static analysis, build, integrations e test — todos passaram
- Teste humano: pendente; nenhum evento real criado porque o token Google ainda não está no cofre
