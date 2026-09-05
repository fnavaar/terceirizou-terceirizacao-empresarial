# STATUS — Projeto Terceirizou Terceirização Empresarial

> **Atualizado em:** 2026-09-05 · **Por:** Adapta/ETHOS

## Onde estamos

- **Fase 1:** concluída (10/10).
- **Fase 2:** concluída (5/5).
- **Fase 3:** em andamento — F3-T01 concluída; F3-T02 implementada, mas bloqueada na publicação pública; F3-T03 bloqueada.
- **Skip working tree/build:** v0.0.40, hash `c199a88`, QA completo aprovado.
- **Preview:** serve o bundle novo `index-9SQRI9c-.js`, com Qualificação, Abrir e Solicitar agendamento.
- **Produção:** HTML continua apontando para `index-C2yGw00y.js`, bundle antigo sem essas funções.

## Bloqueio de infraestrutura

A produção registra `publishedRef: c199a88` e timestamp atualizado, mas o domínio público continua servindo o artefato antigo. A divergência foi confirmada por `curl` diretamente no HTML público, inclusive com query strings de cache-busting e após nova publicação.

Conclusão: o CRM **não está apto para teste em produção**. Não orientar o champion a testar até a URL pública entregar o mesmo bundle do preview.

## Próximo passo

Corrigir a promoção/entrega do artefato no Skip ou abrir suporte da plataforma. Critério de desbloqueio: `https://crm-oficial-65bb8.goskip.app` deve apontar para bundle contendo `Qualificação`, `Abrir` e `agendar-lead`.
