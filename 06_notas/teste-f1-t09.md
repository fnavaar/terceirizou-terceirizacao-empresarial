# Relatório de Teste — F1-T09: Fila de Recuperação e Replay Manual

> **Task:** F1-T09 · **SPEC:** spec-1-003-recuperacao-auditoria.md · **Data:** 2026-08-21

## Componentes Implementados

1. **Collection `error_log`** (migration 0004) — 14 campos, RLS, 2 índices
2. **Webhook com logging** — erros são registrados automaticamente
3. **Endpoint `/backend/v1/replay/lead`** — replay manual com motivo + operador
4. **Página `/fila`** — visualização da fila com resumo, tabela e modal de replay

## Testes Realizados

### Erro registrado automaticamente
```
POST /backend/v1/webhook/lead (nome ausente)
→ 400 + item criado em error_log:
   categoria: validacao
   resumo: Campo obrigatório ausente: nome
   estado: pendente
   dono: Henrique Tavano
```

### Replay manual executado
```
POST /backend/v1/replay/lead
Payload: {
  dedup_key: "d00574ee...",
  motivo: "Lead com origem ausente foi corrigido manualmente",
  operador: "Vinicius"
}
→ 200 OK:
   status: replayed
   lead_id: pAm4qBdL57o8
   dedup_key: d00574ee...
```

### Verificação pós-replay
- Lead mantém mesmo dedup_key (sem duplicidade) ✅
- Histórico registra entrada "replay_manual" ✅
- Fonte anterior (Google Sheets) não foi modificada ✅

## Conclusão

- Falha vira item seguro com dono/ação ✅
- Replay exige motivo/operador/chave ✅
- Replay não cria duplicidade ✅
- Fonte anterior permanece intacta ✅
- Histórico é auditável ✅

**Teste executado pelo Ethos em 2026-08-21.**
