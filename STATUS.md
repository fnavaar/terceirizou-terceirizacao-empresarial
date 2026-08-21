# STATUS — Projeto Terceirizou Terceirização Empresarial

> **Atualizado em:** 2026-08-21 · **Por:** Adapta (F1-T05 implementada)
> O painel do projeto: fase atual, progresso e o que precisa de atenção.

## Onde estamos

- **Fase atual:** 1 — Sistema central de captura, dados e pipeline · aberta em 2026-08-19
- **Objetivo desta fase:** demonstrar um lead sintético capturado no sistema central com identificador, origem disponível, respostas, estágio, responsável, histórico e reprocessamento sem duplicidade.
- **No prazo?** em andamento — F1-T05 implementada, aguardando teste humano.

## Progresso da fase

- **Tasks:** 5/10 (50%) — F1-T01, F1-T02, F1-T04 concluídas; F1-T05 implementada
- **Próxima task do champion:** F1-T05 — validar polling e upsert idempotente

| Task | Status | Descrição |
|---|---|---|
| F1-T01 | ✅ CONCLUÍDA | Plataforma, conta, papéis, campos e RLS confirmados |
| F1-T02 | ✅ CONCLUÍDA | Collection leads criada — teste humano aprovado |
| F1-T03 | 🔒 BLOQUEADA | Provar modelo, RLS, histórico e bordas |
| F1-T04 | ✅ CONCLUÍDA | Contrato de campos documentado — teste humano aprovado |
| F1-T05 | 🟡 EM TESTE | Script de polling implementado — aguardando teste humano |
| F1-T06 | 🔒 BLOQUEADA | Provar criação e replay idempotente |
| F1-T07 | 🔒 BLOQUEADA | Provar ausências e falhas |
| F1-T08 | 🟡 PENDENTE | Confirmar fila, retenção, retry e recuperação |
| F1-T09 | 🔒 BLOQUEADA | Configurar fila de recuperação |
| F1-T10 | 🔒 BLOQUEADA | Provar falha, replay e reconciliação |

## Travas restantes

| Trava | Desde | Quem resolve | Ação em curso |
|---|---|---|---|
| Retenção, retry, alerta, fila e pausa não fechados | 2026-08-19 | Terceirizou + Adapta | F1-T08 — aguardando decisão do champion |

## Entregas concluídas

| Fase | O que foi entregue | Fechada em |
|---|---|---|
| F1-T01 | Decisões de plataforma, papéis, campos e RLS registradas por escrito | 2026-08-19 |
| F1-T02 | Collection leads criada com RLS público para teste | 2026-08-19 |
| F1-T04 | Contrato de campos, mapeamento e chave de idempotência documentados | 2026-08-21 |

## Entregas em teste

| Fase | O que foi entregue | Aguardando |
|---|---|---|
| F1-T05 | Script de polling (Google Sheets → CRM) configurado e testado | Teste humano do champion |

## Próxima reunião

F1-T05 — validar se novos leads aparecem no CRM após polling.