# AP-2026-09-02-1720 — Campo JSON no runtime goja: bytes e array não-array

- Status: candidato
- Escopo: projeto do cliente
- Task/SPEC: F2-T04 / SPEC-2-001
- Sinal: ao ler `historico` (json) no hook, o valor chegou como Uint8Array/bytes (len 0 em alguns casos) e um `hist.push(...)` em objeto não-array gravou `[0]` — histórico corrompido.
- Evidência: logs mostraram `rawHist tipo= object len= 0` e `hist depois len= 1 | ultimo= 0`; após converter bytes→string e forçar `Array.isArray`, o histórico gravou corretamente o objeto de auditoria (v0.0.35).
- Regra reutilizável: em hooks do Skip, SEMPRE normalizar campo json lido do banco: se for bytes (object com length e elementos numéricos) → converter para string; depois JSON.parse; garantir `Array.isArray` antes de usar `.push`; nunca confiar em `Array.isArray(Uint8Array)` (é false). Tudo inline no callback.
- Quando aplicar: hooks onRecord*/routerAdd que leiam/manipulem campos json (listas) no Skip.
- Quando não aplicar: REST API (devolve objeto/string normal).
- Confiança: alta — causa confirmada por log e correção validada em runtime.
- Privacidade: sem segredo, dado pessoal ou conteúdo bruto.
