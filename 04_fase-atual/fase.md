# Fase 2 — Qualificação, pontuação e roteamento

**Status:** liberada para planejamento e execução controlada.
**Objetivo:** classificar leads recebidos da Fase 1 com pontuação explicável, motivo, responsável, próxima ação e revisão humana.

## Demonstração visível

Uma amostra de leads é classificada como `qualificado`, `nao_qualificado`, `pendente_revisao` ou `excecao`; cada decisão mostra sua regra, motivo, responsável e próxima ação.

## Tasks

| ID | Leva | Task | Dono | SPEC | Critério binário | Recorte da prova | Evidência esperada | Pré-condições | Ponto de parada | Status |
|---|---:|---|---|---|---|---|---|---|---|---|
| F2-T01 | 1 | Confirmar versão inicial da regra, pesos, limiares, carteira, SLA e responsáveis | Consultor + responsável comercial | SPEC-2-001 | Registro aprovado de cada parâmetro e versão de regra | Configuração em amostra sintética | Registro datado da versão 1 | Acesso ao ambiente e amostra sintética | Regra comercial ambígua | ✅ CONCLUÍDA 2026-08-31 |
| F2-T02 | 2 | Modelar estados, decisão, pontuação explicável, histórico e versão de regra | Responsável técnico | SPEC-2-001 | Lead sintético armazena estado, componentes, versão, motivo, responsável e próxima ação | Modelo de um lead completo | Registro e histórico auditável | F2-T01 | Exigir fonte externa ou regra não aprovada | ✅ CONCLUÍDA 2026-09-02 |
| F2-T03 | 3 | Implementar classificação determinística e roteamento de casos completo/negativo | Responsável técnico | SPEC-2-001 | Casos completo e prestador negativo atendem CA-2-001/002 | Fixtures completo e negativo | Estados, motivos e destinos registrados | F2-T02 | Regra não aplicável sem inferência | BLOQUEADA |
| F2-T04 | 4 | Implementar fila de revisão/exceção e correção humana auditável | Responsável técnico + comercial | SPEC-2-001 | Casos incompleto/conflito e correção humana atendem CA-2-003/004 | Fixtures incompleto, conflito e correção | Histórico com ator, horário e versão | F2-T02 | Revisão apagar histórico | BLOQUEADA |
| F2-T05 | 5 | Provar cenários, acesso por papel, rollback e aceite do champion | Responsável comercial | SPEC-2-001 | CA-2-001..005 comprovados com fixtures sintéticas e teste humano | Roteiro de regressão e acesso negativo | Matriz de evidências e aceite humano | F2-T03 + F2-T04 | Cenário ou teste humano falhar | BLOQUEADA |

## Fora desta fase

- Decisão autônoma de contratação.
- Enriquecimento de dados externo.
- Alteração de campanhas.
- Integrações novas não aprovadas.

## Regra de avanço

F2-T02 é a próxima task elegível somente após F2-T01 aprovada pelo champion e validada pelo consultor. Não iniciar a próxima task sem teste humano explícito da anterior.