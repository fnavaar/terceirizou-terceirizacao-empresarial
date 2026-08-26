# SPEC-2-001 — Qualificação, pontuação e roteamento de leads

**Fase:** 2
**Degrau:** Sistematizar → Automatizar regras determinísticas.

## Resultado

O sistema classifica uma amostra de leads da Fase 1 com estado, pontuação explicável, motivo, responsável e próxima ação. A revisão humana pode corrigir a decisão sem apagar o histórico.

## Regras e limites

Estados: `pendente_revisao`, `qualificado`, `nao_qualificado`, `excecao`. Resposta negativa para prestador encerra o fluxo padrão como `nao_qualificado`; resposta incompleta, conflito ou segmento não mapeado vai para revisão ou exceção. Pesos, limiares, carteira e SLA serão confirmados em F2-T01 — não são inferidos pelo sistema.

Não integrar fontes externas, não enriquecer dados, não contratar automaticamente e não alterar campanhas nesta fase.

## Critérios de aceite

- **CA-2-001:** lead completo recebe estado, pontuação explicável, motivo, responsável e próxima ação.
- **CA-2-002:** prestador negativo resulta em `nao_qualificado`, com motivo e sem roteamento padrão.
- **CA-2-003:** resposta incompleta, conflito ou segmento não mapeado gera revisão/exceção visível, sem descarte.
- **CA-2-004:** revisor humano corrige a classificação; histórico preserva ator, horário, versão de regra e motivo.
- **CA-2-005:** consulta e alteração respeitam carteira/papel configurados.

## TDD

| Etapa | Cenário | Resultado esperado |
|---|---|---|
| RED | Casos completo, negativo, incompleto e conflito antes da regra | Lacuna registrada e classificação não demonstrável |
| GREEN | Regra aprovada aplicada aos quatro casos | CA-2-001 a CA-2-003 passam |
| REFACTOR/REGRESSÃO | Correção humana e acesso por papel | CA-2-004 e CA-2-005 passam sem apagar histórico |

## Rollback

Pausar a versão de regra, devolver novos casos à fila de revisão e restaurar versão anterior sem excluir histórico.
