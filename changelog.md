# Changelog — Projeto Terceirizou Terceirização Empresarial

## 2026-08-31

- [champion] F2-T01 concluída: regra v1 aprovada e validada — config/regra_qualificacao_v1.json + scripts/validar_regra_qualificacao_v1.py (6/6 PASS sintéticos; revalidação do zero OK; sem segredos/PII). Aprovação humana registrada.
- [Adapta/Ethos] Abrida F2-T01 (confirmar regra v1, pesos, limiares, carteira, SLA e responsáveis). Análise com baseline real (86 leads; 45 meta_ads, 36 cora, 5 manual; 44 sem segmento; 0 prestador negativo explícito). Proposta de regra v1 apresentada; aguardando autorização do champion.
- [Adapta/Ethos] Automação ETHOS migrada para a planilha própria de leads Meta Ads (1GiZZj...); leitura validada (1 lead novo criado, demais ignorados por dedup).
- [Adapta/Ethos] Apps Script F1-T05 atualizado: META_ADS_SHEET_ID → planilha própria (1GiZZj...), WEBHOOK_URL → domínio público goskip.app. Aviso: publico do webhook responde 405 até a rota ser publicada no Skip.

## 2026-08-26

- Fase 2 liberada por autorização explícita do consultor.
- Publicadas SPEC-2-001 e tasks F2-T01 a F2-T05.
- F2-T01 é a única task elegível; não há implementação iniciada nesta fase.
