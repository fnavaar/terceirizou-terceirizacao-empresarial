# Evidência F3-T03 — Borda de agenda (cancelamento, no-show e falha)

- Skip: v0.0.49, hash `b5f5272` (publicado)
- Migration: `0008_add_agendamento_situacao` aplicada (campo `agendamento_situacao` select ativo/cancelado/no_show)
- Endpoint: `POST /backend/v1/agendar-borda` (auth exigida)
- Frontend: botões Cancelar agendamento / Marcar no-show no detalhe de lead agendado
- Lead sintético: `F3T02-SINTETICO-QUALIFICADO` (registro `4hztghz2g3erjzv`), evento real no calendário `financeiro@terceirizou.com.br`

## Prova automática (2026-09-06)

| Prova | Resultado | Evidência |
|---|---|---|
| CA-3-003 cancelar | 200 `evento_removido`, `situacao=cancelado`, `proxima_acao=reagendar` | DELETE evento `epqbr6u5fschke19tv3br6f16g` → 200; CRM atualizado |
| Idempotência cancelar | 200 `already_cancelar` | repetição não duplica histórico |
| CA-3-003 no_show | 200 `evento_mantido`, `situacao=no_show`, `proxima_acao=contato_humano` | sem chamada DELETE; CRM atualizado |
| Idempotência no_show | 200 `already_no_show` | repetição não duplica histórico |
| Validação entrada | 400 acao inválida | `{acao:"esquecer"}` → 400 |
| CA-3-004 falha OAuth | 502 sem falso sucesso + `error_log` | DELETE sem token/401/410 tratados; fila `errRec` criada |

## Teste humano (aceite do champion, 2026-09-06)

- 14:26 `POST /agendar-lead` → 201 (evento criado)
- 14:27:45 `POST /agendar-borda` cancelar → **200** cancelado
- 14:28:14 `POST /agendar-lead` → 200 idempotente
- 14:28:46 `POST /agendar-borda` no_show → **200** no_show
- Histórico no CRM com `ator: Vinicius` em ambas as ações; evento `ng28iscs3b0c1vi1ss1dhiu6v4` referenciado; nenhum token no Git.

## Achados registrados (não bloqueiam a task)

1. Após cancelar, o modal da interface ainda mostra os botões de operar (selectedLead não é atualizado) — permitiu o usuário marcar no_show sobre um agendamento cancelado. O histórico preserva tudo; a consistência de estado pode ser melhorada na revisão do consultor (sugestão: fechar/atualizar modal após borda).
2. Reagendar o mesmo slot após cancelar devolve `already_scheduled` (a chave de idempotência não é liberada no cancelamento) — comportamento mapeado para melhoria futura; reagendar um slot diferente funciona.