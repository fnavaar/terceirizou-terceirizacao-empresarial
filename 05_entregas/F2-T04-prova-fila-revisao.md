# Prova — F2-T04 (fila de revisão/exceção e correção humana auditável)

Data: 2026-09-02 · Task: F2-T04 · SPEC-2-001 (CA-2-003/004)

## O que foi entregue

- `pocketbase/hooks/fila_revisao.js` — `GET /backend/v1/fila-revisao`: lista leads em `pendente_revisao`/`excecao` com estado, motivo, score, responsável e versão. Requer auth.
- `pocketbase/hooks/revisar_lead.js` — `POST /backend/v1/revisar-lead`: corrige a classificação (decisao, motivo, operador) e anexa ao `historico` (ator, data, decisao, anterior, motivo, regra_versao), sem apagar nada.

## Verificação automática (real, no Skip, v0.0.35)

- Fila com auth lista os casos de revisão (incompleto, conflito); sem auth → 401 (CA-2-005).
- Revisão do lead `S-006b` (conflito): status `revisado`, estado virou `nao_qualificado`, motivo "revisao humana: comercio confirmado...", próxima ação `sem_roteamento`.
- Histórico gravado (auditável): `{acao:'revisao_humana', ator:'Vinicius', data:..., decisao:'nao_qualificado', anterior:'pendente_revisao', motivo:..., regra_versao:'1.0'}`.
- Após revisão, o lead saiu da fila (total 5→4).
- Bug corrigido no caminho: `historico` (json) chegava como bytes/objeto no runtime goja — conversão inline bytes→string; sem função top-level (regra do runtime).

## Teste humano

- Champion aprovou em 2026-09-02 ("Funcionou") verificando a fila e a correção com histórico.
