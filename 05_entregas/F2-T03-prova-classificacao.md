# Prova — F2-T03 (classificação determinística e roteamento)

Data: 2026-09-02 · Task: F2-T03 · SPEC-2-001 (CA-2-001/002)

## O que foi entregue

- `pocketbase/hooks/qualificar_lead_create.js` — classifica o lead na criação (onRecordCreate em `leads`).
- `pocketbase/hooks/qualificar_lead_update.js` — reclassifica quando `respostas` mudam (preserva correção manual de estado).
- Aplicam a regra v1 da F2-T01 (config/regra_qualificacao_v1.json): estados, pesos, limiares, ordem de decisão, motivo e próxima ação. Lógica inline (regra do runtime Skip), sem `$app.save()` no callback (sem loop).

## Verificação automática (real, no Skip)

- Fixtures sintéticas 6/6 da amostra da regra v1, criadas via API real:
  - S-001 completo → `qualificado`, score 5, "agendar_reuniao_fechamento"
  - S-002 sem receita → `pendente_revisao`, score 3
  - S-003 prestador não → `nao_qualificado`, "prestador negativo explicito", sem roteamento
  - S-004 indústria → `nao_qualificado`, "segmento fora do perfil"
  - S-005 incompleto → `pendente_revisao`, "dados criticos ausentes"
  - S-006 conflito → `pendente_revisao`, "conflito prestador x segmento"
- Reclassificação via update: S-002 (sem receita) → recebeu faturamento → `qualificado` score 5.
- Correção de bug encontrado no caminho: campo JSON `respostas` chega como Uint8Array/bytes no runtime goja — conversão bytes→string antes do parse. Sem isso o hook lia "dados críticos ausentes".

## Teste humano

- Leads criados para teste: "Teste Humano OK" (prestador sim → `qualificado`) e "Teste Humano Nao" (prestador não → `nao_qualificado`), conferidos via planilha leads_f2t03_classificacao.csv + dados do banco.
- Aprovado pelo champion em 2026-09-02 (validação via evidência de dados).

## Nota

- O painel (Index.tsx) não exibe os campos de qualificação nem tem botão de criação — lacuna de frontend fora da SPEC, registrada em 06_notas/F3-candidata-frontend-leads.md.
