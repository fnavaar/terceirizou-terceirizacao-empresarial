# Índice das SPECs — Fase 4

**Fase:** 4 — Sistema de inteligência de campanhas e operação assistida
**Gerada em:** 2026-09-17 · Run SkillMind transição F3→F4 (fallback serial, ethos-legacy)
**Autorização:** Navaar em 17/09/2026 — Meta com prova timeboxed; painel do follow-up aceito como evolução; scheduler e webhook de bounce adiados.
**Fonte:** `03-Projeto/02-Escopo-Definitivo.md`, Fase 4 + evolução `06_notas/F3-candidata-frontend-leads.md`.

| SPEC | Nome | Tipo | CAs | Bloqueios | Depende de |
|---|---|---|---|---|---|
| SPEC-4-001 | Conector Meta Ads de leitura e origem do lead | conector compartilhado | CA-4-101..104 | B4-101..104 | prova técnica timeboxed |
| SPEC-4-002 | Qualidade por origem, reativação assistida e painel do follow-up | automação de apoio | CA-4-201..205 | B4-201..203 | F1–F3; enriquece com 4-001 quando ativa |
| SPEC-4-003 | Leitura assistida de campanhas e loops L4.1/L4.2 | loops/agentes | CA-4-301..305 | B4-301..304 | SPEC-4-001 + SPEC-4-002 |

## Painel de revisão (registro)

- **Analista de SPECs:** 3/3 SPECs com os 5 blocos de fase 4 (Configuração no Ethos, Meta, Validação, Conectores/Skills, Arranque); resultado observável próprio em cada uma; sem lacuna que obrigue o Ethos a inventar arquitetura/regra/dado/acesso — lacunas viraram bloqueios nomeados B4-1xx/2xx/3xx.
- **Revisor de risco e segurança:** credencial Meta somente em secret manager (B4-102); prova negativa de escrita no Meta (CA-4-302); RLS herdado com prova negativa de acesso cruzado (CA-4-205); descadastro/consentimento como exclusão permanente (B4-202/RN-4-202); logs sanitizados; nenhuma autonomia sem prompt homologado + teto (B4-302/303). Aprovado com ressalvas registradas como bloqueios.
- **Revisor de TDD:** RED/GREEN/REFACTOR presentes nas 3 SPECs com fixtures sintéticas, caminhos de erro obrigatórios e evidência nomeada.
- **Revisor de decomposição (subagente read-only):** veredito ADERENTE COM CORREÇÕES; correções aplicadas (citações CA/B4 nas tasks, matriz sem IDs técnicos, prazos em dias úteis, fallback manual reposto no card).

## Sequência de execução

1. **SPEC-4-001** primeiro (prova técnica do Meta decide se o conector existe ou fica com fallback manual).
2. **SPEC-4-002** em seguida (funciona só com dados internos; enriquece com Meta quando a 4-001 aprovar).
3. **SPEC-4-003** por último (consome 4-001 e 4-002; loops um por vez).

## Bloqueios transversais

| ID | Bloqueio | Dono da decisão |
|---|---|---|
| B4-101 | conta de anúncios Meta correta | champion (Vinicius) |
| B4-102 | credencial somente em secret manager | administrador |
| B4-103 | escopos de leitura homologados | prova técnica + consultor |
| B4-104 | amostra/período/política de espelhamento | champion (Vinicius) |
| B4-201 | critério de elegibilidade da reativação | champion (Vinicius) |
| B4-202 | consentimento/base legal por lead | champion (Vinicius) |
| B4-203 | métrica de qualidade (definição/janela/fórmula) | champion (Vinicius) |
| B4-301 | cadência e janela dos loops | call de setup |
| B4-302 | prompt/skill homologados | call de setup + consultor |
| B4-303 | teto de créditos e condição de pausa | call de setup |
| B4-304 | baseline da qualidade atual | champion (Vinicius) |
