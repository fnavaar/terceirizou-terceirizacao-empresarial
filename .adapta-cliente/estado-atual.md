# Estado atual — Adapta Cliente

- task_id: F3-T02
- champion: Vinicius (CEO)
- spec: 04_fase-atual/specs/spec-3-001-agendamento-google-calendar.md
- etapa: aguardando_teste_humano
- autorizacao_implementacao: confirmada + 2026-09-05 — "pode seguir o plano"
- teste_humano: pendente — GREEN automatizado passou; causa raiz do erro na interface corrigida (401 token de sessão após deploy → frontend refaz login em 401, v0.0.43); falta champion validar na produção
- verificacao_automatica: passou — CA-3-001/002 provados no backend; QA Skip v0.0.43
- aprendizado: capturado: validar renderização final e rotas custom no domínio público (405), não só bundle/DOM; token de sessão do browser invalida após deploy (chave JWT) — 401 mascarado como "verifique a configuração"
- ultima_acao: identificou 401 nos logs (token expirado), frontend corrigido para relogar em 401 e mostrar erro real; publicou v0.0.43
- proxima_acao: champion recarregar a página (Ctrl+F5/deslogar+logar) e repetir o agendamento; se aparecer "Solicitação enviada", validar evento no calendário e aprovar
- atualizado_em: 2026-09-06T13:40:00-03:00
