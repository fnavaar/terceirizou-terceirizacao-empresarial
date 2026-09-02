# AP-2026-09-02-0810-migracao-skip-via-mcp.md — Aplicar migration no Skip diretamente via MCP

- Status: candidato
- Escopo: projeto do cliente
- Task/SPEC: F2-T02 / SPEC-2-001
- Sinal: schema do Skip não é alterável por REST (403/404 mesmo com role admin), e a migration
  0006 pendente travou a F2-T02 em "aguardando deploy".
- Evidência: migration aplicada por `skip_file_write` + `skip_project_apply_changes` (v0.0.29,
  QA verde) e validada com lead sintético via API (08r5jllzfeuonp0, 6 campos presentes).
- Regra reutilizável: para alterar schema/campos do CRM Oficial, usar o fluxo MCP do Skip
  (projeto 51268) — escrever `pocketbase/migrations/NNNN_*.js` com typed constructors e rodar
  `skip_project_apply_changes`; validar com `skip_cloud_list_migrations` +
  `skip_cloud_get_collection_details`. Não depender de deploy manual.
- Quando aplicar: qualquer task que exija mudança de coleção/campos/RLS do projeto Skip.
- Quando não aplicar: mudanças de comportamento em runtime (hooks) — usar arquivos de hook e
  o mesmo fluxo de apply.
- Confiança: alta — mecanismo exercitado de ponta a ponta com prova observável.
- Privacidade: sem segredo, dado pessoal ou conteúdo bruto.
