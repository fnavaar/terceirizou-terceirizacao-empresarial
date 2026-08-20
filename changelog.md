# Changelog — Projeto Terceirizou Terceirização Empresarial

> Registro de tudo que acontece no projeto, em ordem cronológica inversa (mais recente no topo).
> Formato: `- AAAA-MM-DD · [quem] · o que aconteceu`
> **Dúvidas para o consultor** entram como: `- AAAA-MM-DD · [quem] · DÚVIDA: …` — ele responde
> na próxima sincronização.

## Registro

- 2026-08-19 · [Adapta/Ethos] · F1-T02 IMPLEMENTADA: collection leads criada no Skip (16 campos, 5 regras RLS, 4 índices). Migration 0001 (schema) + 0002 (seed admin + lead teste) aplicadas com sucesso.
- 2026-08-19 · [Vinicius/Champion] · F1-T02 autorizada: "Pode criar a collection leads no Skip, configurar RLS e criar o lead de teste?".
- 2026-08-19 · [Vinicius/Champion] · F1-T04 TESTE APROVADO: "testado e aprovado".
- 2026-08-19 · [Adapta/Ethos] · F1-T04 FECHADA: revalidação OK — decisoes-f1-t04.md com contrato completo, STATUS.md e changelog.md atualizados, estado concluida.
- 2026-08-19 · [Vinicius/Champion] · F1-T04 autorizada com decisões: Google Sheets como fonte, Google Apps Script → webhook Skip como conector, email+telefone como chave de idempotência, consentimento pela plataforma de origem.
- 2026-08-19 · [Adapta/Ethos] · F1-T04 CONCLUÍDA: contrato de captura registrado — 2 planilhas (Meta Ads + Cora), mapeamento completo de 13+14 colunas, dedup por email primário + telefone fallback. Arquivo: 06_notas/decisoes-f1-t04.md.
- 2026-08-19 · [Vinicius/Champion] · F1-T01 TESTE APROVADO: "Testei a task F1-T01 no preview conforme o roteiro. Resultado: funcionou."
- 2026-08-19 · [Adapta/Ethos] · F1-T01 FECHADA: revalidação OK — arquivo decisoes-f1-t01.md existe com 5 decisões, STATUS.md e changelog.md atualizados, estado-atual.md em concluida.
- 2026-08-19 · [Vinicius/Champion] · F1-T01 autorizada: "Autorizo implementar somente a task F1-T01".
- 2026-08-19 · [Adapta/Ethos] · F1-T01 CONCLUÍDA: decisões registradas — Skip como plataforma central, Henrique Tavano (comercial/marketing), Vinicius (admin), 14 campos obrigatórios, RLS via PocketBase scopeFilter. Arquivo: 06_notas/decisoes-f1-t01.md.
- 2026-08-19 · [consultor Adapta] · Pasta operacional da Fase 1 criada em modo de teste a partir do template público; manifesto e hashes gerados.
- 2026-08-19 · [consultor Adapta] · O pacote preserva 3 tasks PENDENTE e 7 BLOQUEADA; nenhuma task foi declarada concluída e nenhum dado produtivo foi utilizado.
- 2026-08-19 · [consultor Adapta] · DÚVIDA: confirmar plataforma central/CRM, campos, permissões, chave de idempotência, política de recuperação e responsável nominal antes do aceite produtivo.
