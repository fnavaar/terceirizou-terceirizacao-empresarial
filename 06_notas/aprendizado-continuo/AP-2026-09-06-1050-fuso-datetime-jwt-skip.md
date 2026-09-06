# AP-2026-09-06-1050 — fuso de datetime no frontend e token JWT do Skip

- Status: candidato
- Escopo: projeto do cliente
- Task/SPEC: F3-T02 / SPEC-3-001 (agendamento Google Calendar)
- Sinal: (1) `toISOString()` devolve UTC e, rotulado como `-03:00`, produz janela de 3h30 em vez de 30 min — backend rejeitou com "janela deve ter exatamente 30 minutos"; (2) após cada deploy do Skip a chave JWT muda e tokens de sessão antigos no navegador viram 401, o frontend genérico mostrou "verifique a configuração"; (3) rotas custom `/backend/v1/*` respondem 405 no domínio público (goskip.app) e só existem no backend interno.
- Evidência: logs do Skip (401 em 13:22 e 13:40; 400 janela em 13:40; 201 scheduled em 13:49 — aceite do champion), CRM com evento `rae53ldt5702595ashoj47ka80` e chave `4hztghz2g3erjzv:reuniao:2026-09-07T11:00:00-03:00`, commit f499de1a (correção do cálculo) e d316e3b (relogin em 401).
- Regra reutilizável: para datetimes com fuso fixo, faça aritmética local manual — nunca `new Date(...).toISOString()` para montar string com offset fixo; trate 401 de sessão como sinal de relogin automático; use `pb.baseUrl` (backend interno) para chamar rotas custom, não o domínio público.
- Quando aplicar: qualquer frontend Skip com campo data/hora + rota custom autenticada.
- Quando não aplicar: APIs que aceitam UTC nativamente ou rotas servidas no domínio público.
- Confiança: alta — dois erros reproduzidos em produção com causa raiz nos logs e correção validada por teste humano.
- Privacidade: sem segredo, dado pessoal ou conteúdo bruto.