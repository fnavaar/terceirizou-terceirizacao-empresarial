# Tasks Gerais — Fase 4 (inteligência de campanhas e operação assistida)

**Atualizada em:** 2026-09-22 · Run transição F3→F4 · Champion: Vinicius · Prazo da fase: 30/09/2026
**Fonte canônica dos cards:** `00.tasks_per_fase/fase_4.md` (fase-format:2)

| ID (Jornada) | Task | Responsável | SPEC | Critério | Pré-condições | Prazo | Estado |
|---|---|---|---|---|---|---|---|
| e4c77e80 | Confirmar com o Cliente o acesso de leitura à conta do Meta | Izabel | SPEC-4-001 | B4-101 | nenhum | 22/09/2026 | `[x]` ✅ CONCLUÍDA 2026-09-22 — conta confirmada por escrito pelo champion no chat: "Conta de Ads - terceirizou", ID `act_629165959070277`; credencial no cofre do Skip (`COMPOSIO_API`, 21/09) — B4-101/102 satisfeitos |
| cd704a1c | Trazer para o CRM a origem, a campanha e o anúncio de cada lead | Cliente | SPEC-4-001 | CA-4-101/102/103/104 | e4c77e80 | 24/09/2026 | `[ ]` EM ANÁLISE |
| b7c2faea | Criar uma tela que compare quantidade e qualidade de leads por campanha | Cliente | SPEC-4-002 | CA-4-201 | cd704a1c (ou fallback interno) | 25/09/2026 | `[ ]` |
| 5ef4b7cd | Criar uma lista de leads antigos que podem receber uma nova abordagem | Cliente | SPEC-4-002 | CA-4-202/203 | b7c2faea | 28/09/2026 | `[ ]` |
| 1a38ea22 | Configurar uma análise que sugira aprendizados sobre campanhas | Cliente | SPEC-4-003 | CA-4-301/302/305 | 5ef4b7cd | 29/09/2026 | `[ ]` |
| 82524cff | Revisar dez recomendações de campanha e registrar quais serão usadas | Felipe Navaar | SPEC-4-003 | CA-4-304 | 1a38ea22 | 30/09/2026 | `[ ]` |
| id pendente | Exibir qualificação e follow-up na tela do lead | Cliente | SPEC-4-002 | CA-4-204/205 | b7c2faea | 25/09/2026 | `[ ]` aguarda UUID |
| id pendente | Monitorar queda de qualidade por origem com baseline | Cliente | SPEC-4-003 | CA-4-303 | 1a38ea22 | 30/09/2026 | `[ ]` aguarda UUID |

## Bloqueios humanos

- B4-101 ✅ (22/09): conta confirmada por escrito — act_629165959070277.
- B4-102 ✅ (21/09): credencial no cofre do Skip (`COMPOSIO_API`), fora do Git.
- B4-103: escopos de leitura — prova técnica timeboxed pendente (cd704a1c).
- B4-104: política de amostra/período — sugestão de 30 dias apresentada; aguarda confirmação formal do champion antes da ingestão.
- B4-201..203 (SPEC-4-002): critério de reativação, consentimento, métrica de qualidade — champion Vinicius.
- B4-301..304 (SPEC-4-003): cadência, prompt homologado, teto, baseline — call de setup.

## Regra de avanço

Uma task por vez; teste humano ao fim de cada task antes da próxima. Nenhuma ingestão Meta sem prova técnica aprovada; nenhum contato de reativação sem aprovação humana do lote; loops executam volta autônoma só após setup homologado.