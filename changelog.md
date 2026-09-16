## 2026-09-16

- [Adapta/Ethos] F3-T04 CONCLUÍDA. Config `cadencia_followup_v1.json` v1.1 aprovada: 3 e-mails (D+0/D+1/D+2), remetente `financeiro@terceirizou.com.br`, público qualificado, LGPD interesse legítimo, exceções com Henrique Tavano, paradas definidas. Modelos: 3 textos rascunhados no estilo do champion e aprovados como versão final (variáveis `{{nome}}` e `{{link_agenda}}`).
- [Adapta/Ethos] F3-T04: sandbox Resend provado nos dois caminhos. RED: envio antes da verificação DNS → 403 "terceirizou.com.br domain is not verified", sem falso sucesso (CA-3-104). GREEN: após o champion verificar o domínio no painel Resend, envio de teste → HTTP 200, ID `1757d405-938c-4fd5-a97e-f8c7c46a6d82`. Teste humano: champion confirmou recebimento em `vinicius@terceirizou.com.br` sem spam. Chave `RESEND_API_KEY` apenas no cofre de secrets do Skip, nunca no Git.
- [champion] Aprovação dos 3 textos como versão final (2026-09-16, chat). Fase 3: 4/7. Próxima elegível: F3-T05 (sequência de e-mail idempotente).

## 2026-09-06