# STATUS — Projeto Terceirizou Terceirização Empresarial

> **Atualizado em:** 2026-09-17 · **Por:** Adapta/Ethos

## Onde estamos

- **Fase 1:** concluída (10/10).
- **Fase 2:** concluída (5/5).
- **Fase 3:** ✅ **ENCERRADA pelo champion em 2026-09-16 — 7/7 tasks** (aceite final "aceito a fase"). Arquivada em `05_entregas/fase-3/`.
- **Fase 4:** ✅ **LIBERADA em 2026-09-17** — SPEC-4-001 (conector Meta de leitura), SPEC-4-002 (qualidade por origem, reativação e painel do follow-up), SPEC-4-003 (loops L4.1/L4.2); 8 tasks na Jornada (`04_fase-atual/fase.md`); Champion Vinicius, prazo 30/09/2026.
- **Check-fase-3:** APROVADO em 2026-09-17 (digest do estado encerrado: HEAD `bab9454`).
- **Skip:** v0.0.55, hash `ea8471e` (QA 5/5).
- **Próxima task elegível:** somente a primeira da F4 (confirmar acesso de leitura à conta do Meta — @Izabel, 22/09); as demais bloqueadas por dependência, prova e teste humano.

## Pendências de negócio

- ~~Meio de pagamento na conta Resend~~ — **RESOLVIDA 2026-09-17:** teste real com destinatário externo (Gmail) confirmou que a cadência funciona para leads reais no plano Free com o domínio verificado. O 422 da prova F3-T07 era o domínio reservado example.com, não restrição de conta. Cartão no Resend vira decisão de limite de volume (Free: 3.000/mês, 100/dia), não de destravamento.

## O que a Fase 3 entregou

- Autoagendamento idempotente no Google Calendar (janelas aprovadas, cancelamento, no-show, falha segura).
- Follow-up por e-mail via Resend com a cadência/modelos aprovados pelo champion (v1.1), disparo idempotente, paradas automáticas (resposta/agendamento/cancelamento/no_show/descadastro/bounce), fila humana de exceções e histórico append-only com destinatário mascarado.
- LGPD: base legal interesse legítimo registrada; descadastro tratado como parada definitiva (nao_contatar).
- Sanidade do disparo validada em 17/09: entrega na caixa principal confirmada pelo champion; CRM com 4 envios íntegros da fase, nenhum disparo fantasma.

## O que a Fase 4 vai entregar (planejado)

- Origem de campanha/anúncio do Meta relacionada aos leads com proveniência (condicionada a prova técnica timeboxed; sem prova, conector inativo com exportação manual).
- Tela de qualidade por origem/campanha (vazio ≠ zero) e fila de reativação assistida (nenhum contato sem aprovação humana do lote).
- Painel visual do follow-up na tela do lead (evolução aceita em 17/09).
- Loops L4.1 (analista de campanhas) e L4.2 (monitor de qualidade) somente recomendando — nunca alteram campanha, orçamento ou público.

## Bloqueios humanos da F4

- B4-101..104: conta Meta, credencial no cofre, escopos, amostra/período (champion + prova técnica).
- B4-201..203: critério de reativação, consentimento, métrica de qualidade (champion).
- B4-301..304: cadência, prompt homologado, teto, baseline dos loops (call de setup).
