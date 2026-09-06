# STATUS — Projeto Terceirizou Terceirização Empresarial

> **Atualizado em:** 2026-09-06 · **Por:** Adapta/ETHOS

## Onde estamos

- **Fase 1:** concluída (10/10).
- **Fase 2:** concluída (5/5).
- **Fase 3:** em andamento — F3-T01 concluída; F3-T02 concluída com teste humano aprovado pelo champion; F3-T03 PENDENTE (próxima elegível — cancelamento/no-show/falha de agenda); F3-T04 PENDENTE (config Resend).
- **Skip:** v0.0.44, hash `cce2a45` (publicado).

## F3-T02 — Autoagendamento idempotente (CONCLUÍDA 2026-09-06)

Teste humano aprovado pelo champion em 2026-09-06 ("deu certo"): lead sintético qualificado agendado para 07/09 11:00–11:30 (America/Sao_Paulo), evento `rae53ldt5702595ashoj47ka80` criado no calendário da financeiro@terceirizou.com.br, CRM com `estado_agendamento=agendado`, owner Henrique Tavano, próxima ação `aguardar_reuniao`, chave de idempotência `4hztghz2g3erjzv:reuniao:2026-09-07T11:00:00-03:00`. Repetição do pedido → `already_scheduled` (CA-3-002).

Bugs corrigidos no caminho (todos com causa raiz nos logs):
- token de sessão do navegador invalidava após deploy (chave JWT muda) → 401 mascarado como "verifique a configuração"; frontend agora refaz login em 401 (v0.0.43).
- cálculo do fim do agendamento usava `toISOString()` (UTC) rotulado como -03:00 → diferença real de 3h30 → "janela deve ter exatamente 30 minutos"; corrigido cálculo aritmético no fuso (v0.0.44).
- rota custom `/backend/v1/*` não é servida no domínio público (405) — frontend usa `pb.baseUrl` (backend interno).

## Próximo passo

F3-T03 (provar cancelamento, no-show e falha de agenda) é a próxima task elegível — depende apenas de novo pedido do champion para abrir a análise.