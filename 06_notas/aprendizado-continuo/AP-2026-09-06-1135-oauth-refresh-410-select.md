# AP-2026-09-06-1135 — OAuth refresh, 410 idempotente e select do PocketBase

- Status: candidato
- Escopo: projeto do cliente
- Task/SPEC: F3-T03 / SPEC-3-001 (borda de agenda)
- Sinal: (1) access token do Google Calendar expira ~1h e o hook precisa renovar via refresh token no próprio fluxo (401 → oauth2.googleapis.com/token → retry 1x) para não criar falso sucesso; (2) DELETE de evento já removido retorna HTTP 410 — tratar como `evento_ja_removido` idempotente em vez de falha; (3) campo Select do PocketBase valida o valor salvo — mapear a ação da API (`cancelar`) para o valor do campo (`cancelado`) antes de `$app.save`, senão 400 `validation_invalid_value`.
- Evidência: 502 `google_calendar_indisponivel_ou_invalido` reproduzido; após refresh e 410, cancelar real → 200; 400 `validation_invalid_value` em `agendamento_situacao` ao salvar `cancelar`; corrigido mapeando para `cancelado`. Commits v0.0.46..49.
- Regra reutilizável: em integrações OAuth no Skip, sempre: renovar token no hook (401 → refresh → 1 retry), tratar 404/410 como idempotente quando semântica for DELETE, e validar o valor do campo select antes de salvar.
- Quando aplicar: qualquer integração externa com OAuth curto + campos select em hooks PocketBase.
- Quando não aplicar: APIs que aceitam idempotência via chave própria ou campos text.
- Confiança: alta — três falhas reais reproduzidas e corrigidas com prova 200.
- Privacidade: sem segredo, dado pessoal ou conteúdo bruto.