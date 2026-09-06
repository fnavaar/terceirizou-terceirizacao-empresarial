# Estado atual — Adapta Cliente

- task_id: F3-T02
- champion: Vinicius (CEO)
- spec: 04_fase-atual/specs/spec-3-001-agendamento-google-calendar.md
- etapa: aguardando_teste_humano
- autorizacao_implementacao: confirmada + 2026-09-05 — "pode seguir o plano"
- teste_humano: pendente — GREEN automatizado passou; causa raiz #1 corrigida (401 token de sessão após deploy → frontend refaz login em 401, v0.0.43); causa raiz #2 corrigida (cálculo do fim em UTC rotulado -03:00 → diferença 3h30 → "janela deve ter exatamente 30 minutos"; corrigido para cálculo aritmético no fuso, v0.0.44)
- verificacao_automatica: passou — CA-3-001/002 provados no backend; QA Skip v0.0.43/v0.0.44
- aprendizado: capturado: (1) validar renderização final e rotas custom no domínio público (405), não só bundle/DOM; (2) token de sessão do browser invalida após deploy (chave JWT) — 401 mascarado como "verifique a configuração"; (3) `toISOString()` devolve UTC — não usar para montar datetimes com fuso fixo, fazer aritmética local
- ultima_acao: corrigiu cálculo do fim do agendamento (fuso -03:00 mantido) e publicou v0.0.44
- proxima_acao: champion recarregar a página (Ctrl+F5) e repetir o agendamento 07/09 11:00; se aparecer "Solicitação enviada", validar evento no calendário e aprovar
- atualizado_em: 2026-09-06T13:45:00-03:00
