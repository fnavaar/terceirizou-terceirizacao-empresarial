# Política de Recuperação — F1-T08

> **Task:** F1-T08 · **SPEC:** spec-1-003-recuperacao-auditoria.md · **Data:** 2026-08-21 · **Champion:** Vinicius (CEO)

## 1. Sistema de Fila/Log

- **Plataforma:** PocketBase (Skip Cloud)
- **Collection:** `error_log` (migration 0004)
- **Campos:** error_id, received_at, source_event_id, categoria, resumo, payload_resumido, tentativa, estado, dono, proxima_acao, resolvido_em, resolvido_por, resultado, historico, created, updated
- **Categorias:** validacao, permissao, timeout, duplicidade, schema_invalido, desconhecido
- **Estados:** pendente → em_analise → resolvido/encerrado

## 2. Retenção

- **Logs de erro:** 90 dias (após isso, arquivar manualmente)
- **Leads:** permanentes (não excluídos)
- **Fonte histórica (Google Sheets):** preservada indefinidamente

## 3. Timeout/Retry

- **Timeout do webhook:** 30 segundos (configurável no Google Apps Script)
- **Retry automático:** NÃO (Fase 1 começa com replay manual controlado)
- **Replay manual:** via endpoint ou admin panel, com motivo + operador

## 4. Alerta

- **Logs visíveis:** collection `error_log` acessível no frontend
- **Resumo diário:** cron pode enviar e-mail de resumo (configurável)
- **Critério de alerta:** 3 erros consecutivos do mesmo tipo → pausar entrada + notificar admin

## 5. Responsáveis

- **Operacional:** Henrique Tavano (trata erros, diagnostica)
- **Substituto:** Vinicius (admin, cobre ausência)
- **Marketing:** não opera a fila

## 6. Condição de Pausa

- **Trigger:** 3 erros consecutivos do mesmo tipo (ex: 3 validações falhando)
- **Ação:** pausar entrada de novos leads + alerta admin
- **Retomada:** manual, após correção da causa raiz

## 7. RLS para Fila

| Ação | Regra |
|---|---|
| list/view | público (teste) |
| create | público (webhook) |
| update | admin |
| delete | admin |

## 8. Rollback

- Pausar entrada (desativar Google Apps Script)
- Manter itens em `pendente`/`em_analise`
- Nunca apagar falhas para "limpar" a fila
- Reconciliar antes de reabrir

---

**Aprovado pelo champion em 2026-08-21.**
