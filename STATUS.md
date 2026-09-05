# STATUS — Projeto Terceirizou Terceirização Empresarial

> **Atualizado em:** 2026-09-05 · **Por:** Adapta/ETHOS

## Onde estamos

- **Fase 1:** concluída (10/10).
- **Fase 2:** concluída (5/5).
- **Fase 3:** em andamento — F3-T01 concluída; F3-T02 destravada e validada (CA-3-001/002), aguardando token OAuth do champion + teste humano; F3-T03 bloqueada.
- **Skip:** v0.0.41, hash `4f60fb4` (publicado).

## F3-T02 — Autoagendamento idempotente

Implementado e validado. Causa raiz do bloqueio anterior (renderização) e dois bugs reais corrigidos:

- regex da janela no hook `agendar_lead.js` (`\\d` → `\d`) — sem isso toda requisição válida dava 400;
- frontend chamava `/backend/v1/agendar-lead` relativo ao domínio público (405) — agora usa `pb.baseUrl` (backend interno).

Validação no backend (CA-3-001/002): não qualificado → 409 bloqueado (sem chamada ao Calendar); qualificado em janela válida sem token → 503 `pendente_configuracao` (sem falso sucesso); fora da janela → 409. Produção serve a interface nova (Qualificação/Abrir/Solicitar agendamento).

## Próximo passo

Champion fornecer `GOOGLE_CALENDAR_ACCESS_TOKEN` (OAuth do Google Calendar) para fechar o GREEN do agendamento; depois teste humano na produção. Não iniciar F3-T03 até F3-T02 concluída.
