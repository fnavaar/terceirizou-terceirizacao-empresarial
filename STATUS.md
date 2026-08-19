# STATUS — Projeto Terceirizou Terceirização Empresarial

> **Atualizado em:** 2026-08-19 · **Por:** Adapta (F1-T01 concluída)
> O painel do projeto: fase atual, progresso e o que precisa de atenção.

## Onde estamos

- **Fase atual:** 1 — Sistema central de captura, dados e pipeline · aberta em 2026-08-19
- **Objetivo desta fase:** demonstrar um lead sintético capturado no sistema central com identificador, origem disponível, respostas, estágio, responsável, histórico e reprocessamento sem duplicidade.
- **No prazo?** em risco — configuração do modelo e testes ainda precisam de execução.

## Progresso da fase

- **Tasks:** 1/10 (10%)
- **Próxima task do champion:** F1-T04 — confirmar formulário, destino, evento, campos, consentimento, conector e chave de idempotência/deduplicação.

| Task | Status | Descrição |
|---|---|---|
| F1-T01 | ✅ CONCLUÍDA | Plataforma, conta, papéis, campos e RLS confirmados |
| F1-T02 | 🔒 BLOQUEADA | Configurar modelo, pipeline, responsável, RLS e histórico |
| F1-T03 | 🔒 BLOQUEADA | Provar modelo, RLS, histórico e bordas |
| F1-T04 | 🟡 PENDENTE | Confirmar formulário, captura e idempotência |
| F1-T05 | 🔒 BLOQUEADA | Configurar captura e upsert idempotente |
| F1-T06 | 🔒 BLOQUEADA | Provar criação e replay idempotente |
| F1-T07 | 🔒 BLOQUEADA | Provar ausências e falhas |
| F1-T08 | 🟡 PENDENTE | Confirmar fila, retenção, retry e recuperação |
| F1-T09 | 🔒 BLOQUEADA | Configurar fila de recuperação |
| F1-T10 | 🔒 BLOQUEADA | Provar falha, replay e reconciliação |

## Travas restantes

| Trava | Desde | Quem resolve | Ação em curso |
|---|---|---|---|
| Formulário, evento, conector e chave de idempotência não fechados | 2026-08-19 | Terceirizou + Adapta | F1-T04 — aguardando decisão do champion |
| Retenção, retry, alerta, fila, RLS e pausa não fechados | 2026-08-19 | Terceirizou + Adapta | F1-T08 — aguardando decisão do champion |

## Entregas concluídas

| Fase | O que foi entregue | Fechada em |
|---|---|---|
| F1-T01 | Decisões de plataforma, papéis, campos e RLS registradas por escrito | 2026-08-19 |

## Próxima reunião

F1-T04 — confirmar formulário de captura, campos, conector e chave de idempotência.
