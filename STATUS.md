# STATUS — Projeto Terceirizou Terceirização Empresarial

> **Atualizado em:** 2026-09-05 · **Por:** Adapta/ETHOS

## Onde estamos

- **Fase 1:** concluída (10/10).
- **Fase 2:** concluída (5/5).
- **Fase 3:** em andamento — F3-T01 concluída; F3-T02 corrigida e publicada; aguardando teste humano; F3-T03 bloqueada.
- **Skip:** v0.0.39, hash `54bb544`.
- **Produção:** publicada em 2026-09-05 19:35 (ref `54bb544`).
- **Calendário:** `financeiro@terceirizou.com.br`, owner/primary, `America/Sao_Paulo`.

## F3-T02 — Pronto para teste

A versão corrigida foi publicada na produção. A tela agora:

- exibe a coluna **Qualificação**;
- oferece o botão **Abrir** para cada lead;
- abre o detalhe com estado, score, motivo e próxima ação;
- mostra a ação **Solicitar agendamento** somente para lead qualificado;
- envia o horário no fuso `America/Sao_Paulo`;
- envia o token da sessão ao endpoint.

O lead sintético `F3T02-SINTETICO-QUALIFICADO` está visível na primeira linha, com `qualificado (5)`.

## QA

- Skip v0.0.39: setup, static analysis, build, integrations e test — todos passaram.
- Produção publicada e confirmada no domínio público.

## Próximo passo

Teste humano do lead `F3T02-SINTETICO-QUALIFICADO`. F3-T03 não foi iniciada.
