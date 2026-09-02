# Changelog — Projeto Terceirizou Terceirização Empresarial

## 2026-09-02

- [champion] Task F2-T03 concluída: classificação determinística e roteamento de casos completo/negativo aplicados no Skip (hooks qualificar_lead_create/update, v0.0.32). Fixtures 6/6 da regra v1; reclassificação via update OK; validado pelo champion via planilha + dados do banco (Teste Humano OK -> qualificado; Teste Humano Nao -> nao_qualificado).
- [Adapta/Ethos] Lacuna de produto registrada (não é SPEC): painel atual (Index.tsx) não tem coluna de qualificação (estado/score/motivo) nem botão para criar lead. Decisão do champion: validar F2-T03 com evidência de dados; lacuna documentada em 06_notas/F3-candidata-frontend-leads.md para o consultor decidir (candidata a F3/frontend).
- [Adapta/Ethos] Aprendizado capturado: campos JSON no runtime goja do Skip chegam como Uint8Array/bytes — converter para string antes do JSON.parse (AP-2026-09-02-1337).
- [Adapta/Ethos] F2-T03 autorizada pelo champion ("Pode implementar"); estado para `implementando`. Implementação: hooks `qualificar_lead_create` (onRecordCreate em leads) e `qualificar_lead_update` (onRecordUpdate, recomputa quando respostas mudam) aplicando a regra v1 da F2-T01 — inline, sem loop de save.

## 2026-09-01

- [champion] Task F2-T02 concluída: modelo de qualificação aplicado via MCP no Skip (migration 0006, v0.0.29); prova real com lead sintético 08r5jllzfeuonp0 (6 campos presentes e persistentes). Aprovado pelo champion ("testado e aprovado").
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
