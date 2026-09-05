# STATUS — Projeto Terceirizou Terceirização Empresarial

> **Atualizado em:** 2026-09-05 · **Por:** Adapta/ETHOS

## Onde estamos

- **Fase 1:** concluída (10/10).
- **Fase 2:** concluída (5/5).
- **Fase 3:** em andamento — F3-T01 concluída; F3-T02 implementada e aguardando teste humano (2/7 em execução, 1/7 concluída).
- **Skip:** v0.0.37, hash `a8d7a8d`.
- **Calendário:** `financeiro@terceirizou.com.br`, owner/primary, `America/Sao_Paulo`.

## F3-T02 implementada

- Migration `0007_add_agendamento_fields.js` aplicada.
- Endpoint autenticado `POST /backend/v1/agendar-lead` criado.
- Somente `estado_qualificacao = qualificado` pode avançar.
- Janela validada: 30 minutos, segunda a sexta, 09h–12h e 14h–18h.
- Idempotência por `lead_id + tipo + janela`.
- Sem token Google no cofre: retorna 503 seguro, registra pendência e não cria evento.
- Com token: chamada ao Calendar registra referência do evento no CRM.
- Fuso validado explicitamente como `America/Sao_Paulo`.

## QA

- Setup: passou.
- Static analysis: passou.
- Build: passou.
- Integrações: passou.
- Testes: passou.

## Próximo passo

Teste humano controlado da F3-T02. F3-T03 não foi iniciada.
