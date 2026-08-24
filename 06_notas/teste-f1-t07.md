# Relatório de Teste — F1-T07: Ausências, Validação e Bordas

> **Task:** F1-T07 · **SPEC:** spec-1-002-captura-idempotencia.md · **Data:** 2026-08-21 · **Champion:** Vinicius (CEO)

## CA-1-007: Campos ausentes preservados, nenhum valor inventado

| Cenário | Payload | Resultado HTTP | body | Status |
|---|---|---|---|---|
| Origem ausente | `{"nome":"Sem Origem","email":"...","data_hora":"..."}` | 201 created | origem default=manual | ✅ |
| Nome ausente (obrigatório) | `{"email":"...","origem":"manual"}` | 400 | "Campo obrigatório ausente: nome" | ✅ |
| Payload vazio | `{}` | 400 | "Campo obrigatório ausente: nome" | ✅ |
| Origem inválida | `{"origem":"facebook"}` | 400 | "Origem inválida: facebook" | ✅ |
| Body não-JSON | `nao-e-json` | 400 | erro genérico PocketBase | ✅ |

**✅ CA-1-007 PASSOU** — validação rejeita dados inválidos, não cria registro com falso sucesso.

---

## CA-1-008: Erro não produz falso sucesso

| Cenário | Resultado Esperado | Resultado Obtido |
|---|---|---|
| Campo obrigatório ausente | Erro 400, nenhum registro criado | 400 "Campo obrigatório ausente" ✅ |
| Origem inválida | Erro 400, nenhum registro criado | 400 "Origem inválida" ✅ |
| Body inválido | Erro 400, nenhum registro criado | 400 PocketBase error ✅ |
| IDs gerados pelo servidor | lead_id, opportunity_id, dedup_key únicos | Todos gerados corretamente ✅ |

**✅ CA-1-008 PASSOU** — nenhum falso sucesso, erros retornam HTTP 400.

---

## Nota sobre fila de recuperação

A SPEC-1-003 prevê que erros entrem em fila de recuperação. Na implementação atual (webhook direto), erros são retornados ao chamador (Google Apps Script). A fila de recuperação será configurada na F1-T08/F1-T09.

---

## Conclusão

Ambos os critérios de aceite da F1-T07 foram atendidos no contexto atual:
- CA-1-007: validação rejeita dados inválidos, não inventa valores
- CA-1-008: erros retornam HTTP 400, nenhum falso sucesso

**Teste executado pelo Ethos em 2026-08-21.**
