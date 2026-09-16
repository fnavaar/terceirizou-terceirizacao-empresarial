# STATUS — Projeto Terceirizou Terceirização Empresarial

> **Atualizado em:** 2026-09-16 · **Por:** Adapta/ETHOS

## Onde estamos

- **Fase 1:** concluída (10/10).
- **Fase 2:** concluída (5/5).
- **Fase 3:** em andamento — F3-T01 a F3-T04 concluídas (4/7); **F3-T05 é a próxima elegível** (implementar sequência de e-mail idempotente); F3-T06/F3-T07 bloqueadas.
- **Skip:** v0.0.49, hash `b5f5272` (publicado).

## F3-T04 — Cadência/modelos do follow-up + Resend sandbox (CONCLUÍDA 2026-09-16)

Configuração do champion registrada e sandbox do Resend provado nos dois caminhos. Teste humano aprovado.

- **Config:** `config/cadencia_followup_v1.json` v1.1, status `aprovado` — 3 e-mails (D+0/D+1/D+2, intervalo 1 dia, fuso America/Sao_Paulo), remetente `financeiro@terceirizou.com.br`, público somente leads qualificados, base legal LGPD interesse legítimo, responsável por exceções Henrique Tavano, paradas definidas (resposta, agendamento, cancelamento, no_show, descadastro, bounce_permanente, limite_cadencia).
- **Modelos:** 3 textos aprovados como versão final pelo champion em 2026-09-16 (rascunhos gerados no estilo do champion, variáveis `{{nome}}` e `{{link_agenda}}`).
- **Sandbox Resend:** chave `RESEND_API_KEY` salva somente no cofre de secrets do Skip. Prova RED: envio antes da verificação DNS → HTTP 403 "domain is not verified", sem falso sucesso (CA-3-104). Prova GREEN: após o champion verificar `terceirizou.com.br` no Resend, envio de teste → HTTP 200 (ID `1757d405-938c-4fd5-a97e-f8c7c46a6d82`); champion confirmou recebimento na caixa `vinicius@terceirizou.com.br` **sem cair no spam**.

## Próximo passo

F3-T05 (implementar sequência de e-mail idempotente) é a próxima elegível — código de envio real usando a config aprovada e a chave no cofre do Skip.