# Changelog — Projeto Terceirizou Terceirização Empresarial

> Registro de tudo que acontece no projeto, em ordem cronológica inversa (mais recente no topo).
> Formato: `- AAAA-MM-DD · [quem] · o que aconteceu`
> **Dúvidas para o consultor** entram como: `- AAAA-MM-DD · [quem] · DÚVIDA: …` — ele responde
> na próxima sincronização.

## Registro

- 2026-08-21 · [Adapta/Ethos] · F1-T05 IMPLEMENTADA: script de polling (Google Sheets → CRM) configurado e testado. Cron a cada 10 minutos (id: 91e08561a5b65e5d). Teste manual OK: 70 linhas processadas. Commit: 3c243c333.
- 2026-08-21 · [Vinicius/Champion] · F1-T04 TESTE APROVADO: "Sim, confirmado, e pode concluir."
- 2026-08-21 · [Adapta/Ethos] · F1-T04 CONCLUÍDA: todos os CA passaram — CA-1-005 (criação), CA-1-006 (idempotência), CA-1-007 (ausentes), CA-1-008 (validação). Leads de teste removidos. Commit: a9ecd2edb.
- 2026-08-21 · [Adapta/Ethos] · F1-T04 CONTRATO DOCUMENTADO: mapa de campos completo em 04_fase-atual/specs/contrato-f1-t004.md — 3 fontes (Cora + 2 abas Meta Ads), mapeamento para 16 campos CRM, chave idempotência email+telefone, fixture sintética definida.
- 2026-08-21 · [Vinicius/Champion] · F1-T04 DECISÕES CONFIRMADAS: conector = Google Sheets MCP (leitura direta), polling = 10 minutos, chave idempotência = email primário + telefone fallback.
- 2026-08-19 · [Vinicius/Champion] · F1-T02 TESTE APROVADO: "testado e aprovado".
- 2026-08-19 · [Adapta/Ethos] · F1-T02 FECHADA: revalidação OK — collection leads criada (16 campos, RLS, índices), frontend CRM funcional, admin+lead seed, fix RLS (migration 0003). Preview: https://crm-oficial-65bb8--preview.goskip.app.
- 2026-08-19 · [Adapta/Ethos] · F1-T02 FIX RLS: migration 0003 — list/view/create tornados públicos para teste; campo 'role' adicionado ao users; admin atualizado com role=admin.
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