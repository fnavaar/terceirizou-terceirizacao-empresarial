# Prova — F2-T05 (cenários, acesso por papel, rollback e aceite — Fechamento Fase 2)

Data: 2026-09-03 · Task: F2-T05 · SPEC-2-001 (CA-2-001..005)

## Matriz de evidências

| Critério | Fixture | Resultado observado | ✓ |
|---|---|---|---|
| CA-2-001 (completo recebe estado/score/motivo/ação) | F2T05 completo (prestador sim, segmento carteira, cargo decisor, faturamento) | `qualificado`, score 5, "score acima do limiar", "agendar_reuniao_fechamento" | ✅ |
| CA-2-002 (prestador negativo -> nao_qualificado) | F2T05 negativo (prestador não, comercio) | `nao_qualificado`, sem score, "prestador negativo explicito", "sem_roteamento" | ✅ |
| CA-2-003a (incompleto -> revisão) | F2T05 incompleto (sem segmento/cargo) | `pendente_revisao`, "dados criticos ausentes" | ✅ |
| CA-2-003b (conflito -> revisão) | F2T05 conflito (prestador sim + comercio) | `pendente_revisao`, "conflito prestador x segmento" | ✅ |
| CA-2-003c (segmento não mapeado -> exceção visível) | F2T05 naomapeado (logística) | `excecao`, "segmento nao mapeado" | ✅ |
| CA-2-004 (correção humana auditável) | F2T05 conflito revisado -> qualificado | Histórico gravado: {acao: revisao_humana, ator: Vinicius, decisao: qualificado, anterior: pendente_revisao, versao: 1.0} | ✅ |
| CA-2-005 (acesso por papel) | Usuário comercial de teste (role comercial) | Listar/criar: permitido (list/create públicas); alterar lead de outro responsável: **NEGADO (404)**; fila revisão: exige auth (401 sem token) | ✅ |
| Rollback (SPEC) | F2T05 conflito devolvido à fila | Estado voltou a `pendente_revisao`; **histórico preservado (2 eventos: qualificado + rollback)**; lead de volta na fila | ✅ |

## Acesso por papel — detalhe importante

- O único usuário real é `vinicius@...` (admin). Criei `teste.comercial@terceirizou.com.br` (role comercial) para a prova — **registro de teste, removível**.
- Comportamento observado: ao tentar alterar lead de outro responsável, a API responde **404** (recurso "não encontrado") em vez de 403 — o PocketBase esconde o registro quando a updateRule nega. A alteração é negada (cumpre CA-2-005), mas vale registrar: quem depende de mensagem "sem permissão" precisa saber que vem 404.

## Aceite

Champion (Vinicius) aprovou a prova e o fechamento da Fase 2 em 2026-09-03.
