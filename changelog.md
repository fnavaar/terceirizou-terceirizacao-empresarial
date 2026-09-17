## 2026-09-17

- [Adapta/Ethos] Checagem de sanidade do disparo de e-mails (pedido do champion): envio direto via Resend → HTTP 200 (ID 01a0b047) e teste de entrega → HTTP 200 (ID 01a0b049, assunto "[TESTE 17/09 13:52]"). Champion confirmou chegada na caixa principal, sem spam. CRM auditado: 5 leads com follow-up registrado, 4 envios no histórico (Fase 3), nenhum disparo fantasma; fila de exceção íntegra.
- [Adapta/Ethos] Achado operacional: chave RESEND_API_KEY é send-only (401 em leitura de lista de e-mails) — auditoria de disparos fica pelo registro no CRM (resend_email_id por envio); rastreabilidade de entrega (abertura/bounce) exige chave com leitura ou webhooks. Pendência de negócio mantida: conta Resend sem meio de pagamento só envia para o e-mail do dono (lead real externo → 422). Fase 4 segue aguardando SPEC do consultor.

## 2026-09-16