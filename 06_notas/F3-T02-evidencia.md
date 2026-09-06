# Evidência F3-T02 — Autoagendamento idempotente

- Skip: v0.0.41, hash `4f60fb4` (publicado)
- Migration: `0007_add_agendamento_fields` aplicada
- Endpoint: `POST /backend/v1/agendar-lead` (auth exigida)
- Frontend: coluna de qualificação, botão Abrir, detalhe do lead e ação Solicitar agendamento
- Elegibilidade: ação aparece somente para `estado_qualificacao = qualificado`
- Janela: 30 minutos; segunda a sexta; 09h–12h e 14h–18h; fuso `America/Sao_Paulo`
- Idempotência: `lead_id + tipo + janela`
- Lead sintético: `F3T02-SINTETICO-QUALIFICADO`, registro `4hztghz2g3erjzv`, score 5

## GREEN — prova real com calendário (2026-09-06)

- Conta/calendário autorizado: `financeiro@terceirizou.com.br` (owner, primary)
- OAuth: Client ID `200696676882-...apps.googleusercontent.com`; Google Calendar API habilitada no projeto `200696676882`
- Secrets configuradas no Skip Cloud: `GOOGLE_CALENDAR_ACCESS_TOKEN`, `GOOGLE_CALENDAR_REFRESH_TOKEN`, `GOOGLE_CALENDAR_CLIENT_ID`, `GOOGLE_CALENDAR_CLIENT_SECRET` (nenhum token no Git)
- 1ª chamada `POST /backend/v1/agendar-lead` com lead qualificado, 07/09 10:00–10:30 `America/Sao_Paulo` → **201 `scheduled`**, `calendar_event_id: kdjet4js6i2ptoiq1pb92out68`
- Evento confirmado no Google Calendar: `Reunião Terceirizou — Lead Sintetico F3-T02 Qualificado`, criado 2026-09-06T12:58:30Z, attendee `f3t02.qualificado@example.invalid`
- Estado CRM: `estado_agendamento: agendado`, `agendamento_owner: Henrique Tavano`, `agendamento_proxima_acao: aguardar_reuniao`, `agendamento_idempotency_key: 4hztghz2g3erjzv:reuniao:2026-09-07T10:00:00-03:00`
- 2ª chamada (mesmo pedido) → **200 `already_scheduled`**, mesmo `calendar_event_id` (idempotência CA-3-002) — sem duplicar
- Lead não qualificado → **409 `bloqueado`**, `motivo: lead nao qualificado`, `chamada_calendar: false` (CA-3-001)
- Sem token de acesso no Git; renovação via refresh token + client configurados como secrets

## Pendência

- Teste humano do champion (roteiro de validação na interface e no calendário) — o GREEN automatizado já passou; falta a aprovação humana.
