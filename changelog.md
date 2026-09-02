# Changelog — Projeto Terceirizou Terceirização Empresarial

## 2026-09-02

- [champion] Task F2-T02 concluída: modelo de qualificação aplicado via MCP no Skip (migration 0006, v0.0.29); prova real com lead sintético 08r5jllzfeuonp0 (6 campos presentes e persistentes). Aprovado pelo champion ("testado e aprovado").
- [Adapta/Ethos] F2-T03 autorizada pelo champion ("Pode implementar"); estado para `implementando`. Implementação: hooks `qualificar_lead_create` (onRecordCreate em leads) e `qualificar_lead_update` (onRecordUpdate, recomputa quando respostas mudam) aplicando a regra v1 da F2-T01 — inline, sem loop de save.
- [Adapta/Ethos] F2-T03 implementada e verificada no Skip (v0.0.32): hooks qualificar_lead_create/update aplicados; fixtures sintéticas 6/6 (regra v1: completo->qualificado score5, sem receita->pendente score3, prestador nao->nao_qualificado, industria->nao_qualificado, incompleto->pendente, conflito->pendente); reclassificação via update OK (sem receita->com receita virou qualificado). Corrigida leitura de `respostas` (Uint8Array->string no runtime goja).

## 2026-09-01

- [champion] F2-T01 validada pelo consultor (declarado pelo champion). F2-T02 aberta para análise.
- [Adapta/Ethos] F2-T02 analisada: modelar estados, decisão, pontuação explicável, histórico e versão de regra. Apresentado plano (migration 0006 aditiva + fixture sintética sem PII + prova via API) e parado aguardando autorização do champion.
- [Adapta/Ethos] F2-T02 aplicada via MCP do Skip (migration 0006, v0.0.29, sem deploy manual); lead sintético 08r5jllzfeuonp0 validou os campos; GitHub sincronizado (a12d9cc).

## 2026-08-31

- [champion] F2-T01 concluída: regra v1 aprovada e validada — config/regra_qualificacao_v1.json + scripts/validar_regra_qualificacao_v1.py (6/6 PASS sintéticos; revalidação do zero OK; sem segredos/PII). Aprovação humana registrada.
- [Adapta/Ethos] Abrida F2-T01 (confirmar regra v1, pesos, limiares, carteira, SLA e responsáveis). Análise com baseline real (86 leads; 45 meta_ads, 36 cora, 5 manual; 44 sem segmento; 0 prestador negativo explícito). Proposta de regra v1 apresentada; aguardando autorização do champion.
- [Adapta/Ethos] Automação ETHOS migrada para a planilha própria de leads Meta Ads (1GiZZj...); leitura validada (1 lead novo criado, demais ignorados por dedup).
- [Adapta/Ethos] Apps Script F1-T05 atualizado: META_ADS_SHEET_ID → planilha própria (1GiZZj...), WEBHOOK_URL → domínio público goskip.app. Aviso: publico do webhook responde 405 até a rota ser publicada no Skip.

## 2026-08-26

- Fase 2 liberada por autorização explícita do consultor.
- Publicadas SPEC-2-001 e tasks F2-T01 a F2-T05.
- F2-T01 é a única task elegível; não há implementação iniciada nesta fase.
