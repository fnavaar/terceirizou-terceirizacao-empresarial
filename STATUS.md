# STATUS — Projeto Terceirizou Terceirização Empresarial

> **Atualizado em:** 2026-09-16 · **Por:** Adapta/ETHOS

## Onde estamos

- **Fase 1:** concluída (10/10).
- **Fase 2:** concluída (5/5).
- **Fase 3:** em andamento — F3-T01 a F3-T06 concluídas (6/7); **F3-T07 é a última** (prova da jornada F3 em massa sintética + aceite); F3-T07 bloqueada até novo pedido do champion.
- **Skip:** v0.0.54, hash `f9cdb6a` (QA 5/5).

## F3-T06 — Paradas, eventos e exceções do follow-up (CONCLUÍDA 2026-09-16)

Paradas da cadência provadas com o lead sintético. Teste humano aprovado pelo champion: parada `agendamento` ("lead pediu reunião") gravada, disparo bloqueado com 409, histórico preservado.

- **Migration 0010:** campo `followup_parada` em `leads` (resposta/agendamento/cancelamento/no_show/descadastro/bounce_permanente), com rollback.
- **Hook `followup_parada.js`:** `POST /backend/v1/followup-parada` — registra parada (idempotente, `already_stopped`), histórico append-only, `limpar=true` para rollback operacional com registro no histórico; `bounce_permanente` cria registro em `error_log` (fila humana, dono Henrique Tavano).
- **Migration 0011:** categoria `bounce` adicionada ao select `categoria` do `error_log` — descoberta na prova (create falhava em silêncio com catch vazio; corrigido e reprovado).
- **Gate no disparo (`followup_lead.js`):** com parada ativa, `followup-lead` devolve 409 `followup_parado:<motivo>`, zero chamada Resend (CA-3-103).
- **Provas:** parada inválida 400; resposta 200 parado; repetição already_stopped; disparo com parada 409 (default e tentativa explícita); limpar → cadência retoma (already_sent intacto); bounce → parado + error_log categoria bounce; histórico append-only 9 entradas sem nada apagado.

## Próximo passo

F3-T07 (provar a jornada F3 em massa sintética e obter aceite) é a última da fase — exige novo pedido do champion.