# Relatório de Teste — F1-T06: Prova de Criação e Replay Idempotente

> **Task:** F1-T06 · **SPEC:** spec-1-002-captura-idempotencia.md · **Data:** 2026-08-20 · **Champion:** Vinicius (CEO)

## CA-1-005: Evento válido cria exatamente uma oportunidade

**Critério:** evento sintético válido cria exatamente uma oportunidade com todos os campos fornecidos e referência rastreável da entrada.

**Teste:**
```
POST /backend/v1/webhook/lead
Payload: {
  "nome": "CA1-005 Prova",
  "email": "ca1005@prova.com",
  "telefone": "(48) 91111-0005",
  "origem": "meta_ads",
  "campanha": "Prova F1-T06",
  "data_hora": "2026-08-20T19:00:00Z"
}
```

**Resultado:**
- HTTP 201 Created
- lead_id: `o3sCn44A39ib`
- opportunity_id: `o3hvpGqsqx8z`
- dedup_key: `4cfd205d...`
- status: `created`

**✅ CA-1-005 PASSOU**

---

## CA-1-006: Replay não cria nova oportunidade

**Critério:** reprocessamento do mesmo evento não cria nova oportunidade e deixa evidência de idempotência.

**Teste:**
```
POST /backend/v1/webhook/lead
Mesmo payload do CA-1-005
```

**Resultado:**
- HTTP 200 OK
- lead_id: `o3sCn44A39ib` (MESMO)
- dedup_key: `4cfd205d...` (MESMO)
- status: `updated`
- Histórico: entrada "atualizacao via replay idempotente" adicionada

**✅ CA-1-006 PASSOU**

---

## Validação Cruzada

| Verificação | Resultado |
|---|---|
| Mesmo lead_id após replay | SIM ✅ |
| Mesmo dedup_key após replay | SIM ✅ |
| Nenhum registro duplicado criado | SIM ✅ |
| Histórico registrou atualização | SIM ✅ |
| Referência do evento preservada | SIM ✅ |

---

## Conclusão

Ambos os critérios de aceite da F1-T06 foram atendidos:
- CA-1-005: criação funciona e gera IDs únicos
- CA-1-006: replay idempotente não duplica, apenas atualiza

**Teste aprovado pelo champion em 2026-08-20.**
