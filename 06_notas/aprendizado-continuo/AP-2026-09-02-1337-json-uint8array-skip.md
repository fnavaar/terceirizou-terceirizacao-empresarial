# AP-2026-09-02-1337 — Campo JSON no runtime goja do Skip chega como Uint8Array

- Status: candidato
- Escopo: projeto do cliente
- Task/SPEC: F2-T03 / SPEC-2-001
- Sinal: hook de classificação lia `respostas` (campo json) e caía sempre em "dados críticos ausentes", mesmo com o payload correto gravado.
- Evidência: logs do Skip mostraram `respostas raw = [123,34,99,...]` (array de bytes do JSON); após converter bytes→string→JSON.parse, as fixtures 6/6 passaram (v0.0.32).
- Regra reutilizável: em hooks do Skip, `record.get('campo_json')` pode retornar Uint8Array/array de números — converter para string (String.fromCharCode) antes de `JSON.parse`, e nunca usar `JSON.stringify` nesse valor (corrompe).
- Quando aplicar: qualquer hook onRecord*/routerAdd que leia campo json do PocketBase no Skip.
- Quando não aplicar: leitura em migrações ou fora do runtime goja (REST devolve string/objeto normal).
- Confiança: alta — causa confirmada por log e correção validada com fixtures reais.
- Privacidade: sem segredo, dado pessoal ou conteúdo bruto.
