## 2026-09-16

- [Adapta/Ethos] F3-T04 CONCLUÍDA. Config `cadencia_followup_v1.json` v1.1 aprovada: 3 e-mails (D+0/D+1/D+2), remetente `financeiro@terceirizou@terceirizou.com.br`, público qualificado, LGPD interesse legítimo, exceções com Henrique Tavano, paradas definidas.
- [Adapta/Ethos] F3-T04: sandbox Resend provado nos dois caminhos (RED 403 domínio não verificado / GREEN 200 após verificação DNS). Teste humano: champion confirmou recebimento sem spam.
- [champion] Aprovação dos 3 textos como versão final (2026-09-16, chat). Fase 3: 4/7.
- [Adapta/Ethos] F3-T05 implementada (v0.0.50..52): migration 0009 (6 campos followup_*) + hook `followup_lead.js`. Correções: v0.0.51 — constantes de escopo de módulo não visíveis ao handler no runtime Skip; v0.0.52 — default que auto-avançava a tentativa quebrava a idempotência (repetir repete a atual; avançar é papel do scheduler).
- [champion] Teste humano F3-T05 aprovado: "testei e funcionou" (2026-09-16 18:15, chat). Fase 3: 5/7.
- [Adapta/Ethos] F3-T06 implementada (v0.0.53..54): migration 0010 (`followup_parada`) + hook `followup_parada.js` + gate no disparo (409 followup_parado:<motivo>) + migration 0011 (categoria `bounce` no error_log — descoberta na prova: select sem o valor fazia create falhar em silêncio).
- [Adapta/Ethos] F3-T06 provas: parada inválida 400; resposta 200 parado; repetição already_stopped; disparo com parada 409 zero Resend (default e tentativa explícita); limpar → retoma; bounce → parado + error_log categoria bounce dono Henrique; histórico append-only 9 entradas.
- [champion] Teste humano F3-T06 aprovado: "Testei e funcionou, pode concluir a F3-T06" (2026-09-16 18:29, chat) — parada agendamento ("lead pediu reunião") gravada, disparo bloqueado, histórico preservado. Fase 3: 6/7. Última: F3-T07 (prova final em massa sintética).

## 2026-09-06