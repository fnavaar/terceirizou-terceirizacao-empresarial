# SPEC-4-003 — Leitura assistida de campanhas e loops L4.1/L4.2

**Fase:** 4 — Sistema de inteligência de campanhas e operação assistida
**Status:** planejada
**Dono:** marketing revisa recomendações; responsável comercial valida qualidade; champion decide
**Origem no escopo:** `02-Escopo-Definitivo.md`, Fase 4 (registro de hipótese/recomendação/decisão; trilha de auditoria; loops L4.1 Analista de campanhas e L4.2 Monitor de qualidade de leads).
**Degrau da solução:** leitura assistida com limite rígido — os loops produzem fato observado, fonte, período, limitação e recomendação; **nunca** alteram campanha, orçamento ou público; veredito é sempre humano.

## Contexto e decisões fechadas

- **Estado atual:** não existe leitura assistida nem loop; análises de campanha dependem de exportação manual e julgamento ad hoc; não há registro estruturado de hipótese → recomendação → decisão.
- **Estado desejado:** uma análise periódica (L4.1) produz leitura de origem, criativo e qualidade com fonte e período; um monitor (L4.2) sinaliza queda ou diferença de qualificação por origem usando os eventos das fases 1–3; cada saída fica registrada com hipótese, recomendação e decisão humana.
- **Decisões fechadas:** escopo veda IA alterando campanha, orçamento ou público; L4.1 "somente recomendar" com veredito do marketing; L4.2 "não alterar regras sozinho" com veredito do responsável comercial; arranque dos loops exige validar conexão, amostra, baseline, prompt/skill e responsável em call de setup — nenhuma autonomia é ativada por este documento.
- **Bloqueios (B4-301..304):** (B4-301) cadência e janela de análise definidas pelo champion na call de setup; (B4-302) prompt/skill do loop homologados com amostra antes da primeira volta autônoma; (B4-303) teto de créditos e condição de pausa definidos no setup; (B4-304) baseline da qualidade atual registrado antes de o monitor sinalizar queda (sem baseline, sinal é hipótese rotulada).

## Resultado observável

A cada ciclo aprovado, o sistema registra uma leitura assistida: fato observado, fonte, período, limitação e recomendação — vinculada ao dado que a sustenta. O marketing revisa dez recomendações e registra aceita/rejeitada/precisa de mais informação; nenhuma recomendação altera campanha. O monitor de qualidade emite sinal de queda/diferença por origem para o responsável comercial, com baseline e limitação declarados.

## Limites e dependências

- **Inclui:** registro estruturado de hipótese/recomendação/decisão; trilha de auditoria da fonte e período; L4.1 (leitura periódica de campanhas); L4.2 (monitor de qualidade por origem).
- **Fora de escopo:** publicação/edição autônoma de anúncios; alteração de orçamento/público; benchmark externo sem fonte; pesquisa automática no LinkedIn; decisão autônoma de contratação.
- **Entradas:** dados espelhados (SPEC-4-001) e/ou internos (SPEC-4-002); baseline (B4-304); prompt/skill homologados (B4-302).
- **Saídas:** registro de leitura assistida com proveniência; sinal do monitor; decisões humanas registradas.
- **Atores/permissões:** marketing consulta/revisa; responsável comercial valida; champion define cadência/teto; consultor valida critérios; administrador controla acesso.
- **Risco/plano B:** dado incompleto induz decisão errada → mostrar fonte, amostra, período e limitações; recomendação pode ser retirada; loop pausado volta ao modo manual.
- **Rollback:** desativar loop, preservar registros já feitos com marca de proveniência; nenhuma alteração externa para reverter.

## Dados e integrações

| Origem/destino | Fonte de verdade | Campos/contrato | Autenticação/permissão | Timeout/retry/idempotência | Tratamento de erro |
|---|---|---|---|---|---|
| CRM/Meta → L4.1 | registros com proveniência | fato, fonte, período, limitação, recomendação | leitura por papel; sem escrita externa | ciclo idempotente por janela | dado insuficiente → leitura marcada limitada |
| Eventos F1–F3 → L4.2 | CRM | sinal de queda/diferença por origem vs baseline | leitura por papel | sinal idempotente por janela | sem baseline → hipótese rotulada |
| Registros → humano | CRM | hipótese, recomendação, decisão (aceita/rejeitada/mais info) | acesso por papel | registro único por ciclo | sem decisão → pendência visível |

| Regra | Condição | Ação/resultado | Exceção |
|---|---|---|---|
| RN-4-301 | recomendação sem fonte/período/limitação | não é publicada ao revisor | volta ao loop como lacuna |
| RN-4-302 | qualquer sugestão de alteração de campanha/orçamento/público | bloqueada por construção | registro do bloqueio |
| RN-4-303 | sem baseline (B4-304) | sinal do monitor sai rotulado como hipótese | nunca como alerta de fato |
| RN-4-304 | loop sem prompt homologado (B4-302) ou teto (B4-303) | não executa volta autônoma | pendência visível |
| RN-4-305 | decisão humana não registrada | recomendação permanece aberta | nenhuma consequência automática |

## Fluxo e regras

1. Call de setup valida conexão, amostra, baseline, prompt/skill, responsável, cadência e teto (B4-301..304).
2. L4.1 executa ciclo: lê dados com proveniência, produz leitura com fato/fonte/período/limitação/recomendação.
3. L4.2 compara qualidade por origem contra baseline e emite sinal (ou hipótese rotulada).
4. Marketing revisa as recomendações e registra aceita/rejeitada/precisa de mais informação.
5. Nenhuma alteração externa acontece em qualquer ponto do fluxo.

| Cenário | Dado/condição | Resultado esperado | Recuperação |
|---|---|---|---|
| Principal | setup validado + dados com proveniência | leitura registrada e revisada | — |
| Limite | sem baseline | sinal rotulado como hipótese | — |
| Falha | fonte indisponível/dado vazio | leitura limitada com lacuna declarada | pausa do ciclo |

## Instruções de execução para o Ethos

1. Ler esta SPEC, SPEC-4-001 e SPEC-4-002.
2. Configurar cada loop **um por vez**: primeiro L4.1, depois L4.2 — nunca dois loops na mesma task.
3. Não executar volta autônoma sem prompt homologado, teto e condição de pausa registrados.
4. Não gerar recomendação sem fonte/período/limitação; não sugerir alteração de campanha/orçamento/público em nenhuma hipótese.
5. Estado válido ao parar: registros com proveniência; decisões pendentes visíveis; loops pausáveis.

## Checklist de execução

- [ ] cadência/janela aprovadas no setup (B4-301)
- [ ] prompt/skill homologados com amostra (B4-302)
- [ ] teto de créditos e pausa definidos (B4-303)
- [ ] baseline registrado (B4-304)
- [ ] prova de bloqueio de alteração de campanha executada

## Critérios de aceite

- [ ] **CA-4-301:** cada leitura assistida registra fato observado, fonte, período, limitação e recomendação vinculados ao dado de origem.
- [ ] **CA-4-302:** nenhuma recomendação altera campanha, orçamento ou público — bloqueio demonstrado por prova negativa.
- [ ] **CA-4-303:** o monitor sinaliza queda/diferença por origem somente contra baseline registrado; sem baseline, sai rotulado como hipótese.
- [ ] **CA-4-304:** decisões humanas (aceita/rejeitada/mais informação) ficam registradas por recomendação, com autor e data.
- [ ] **CA-4-305:** trilha de auditoria permite reconstruir fonte e período de qualquer leitura passada.

## TDD da SPEC

| Etapa | Prova | Ação | Resultado esperado | Evidência |
|---|---|---|---|---|
| RED | prompt/teto/baseline ausentes | tentar volta autônoma | zero execução autônoma, pendência visível | estado dos loops |
| GREEN | setup validado + amostra com proveniência | executar ciclo L4.1 e sinal L4.2 | leitura completa registrada; sinal correto vs baseline | registros + roteiro |
| REFACTOR/REGRESSÃO | recomendação sem fonte; sugestão de alteração; dado vazio | exercitar caminhos proibidos | bloqueio por construção; leitura limitada declarada | logs + prova negativa |

**Dados/fixtures:** amostra com proveniência conhecida, baseline sintético, recomendação propositalmente sem fonte, sinal com e sem baseline.
**Caminhos de erro obrigatórios:** fonte indisponível, dado vazio, prompt não homologado, teto estourado, decisão ausente.
**Evidência exigida:** recibo do setup (B4-301..304), registros das leituras, provas negativas de alteração externa, aceites humanos.

## Configuração no Ethos

- **Tipo:** loop (dois, configurados um por vez)
- **Sistemas das fases 1–3 usados:** F1–F3 (eventos e estados); SPEC-4-001 (dados Meta); SPEC-4-002 (qualidade por origem)
- **Agente responsável:** assistente principal do cliente (L4.1/L4.2 como agentes especializados sem autonomia de escrita)

### Meta

- **Nome curto:** L4.1 Analista de campanhas / L4.2 Monitor de qualidade
- **O que atingir:** leitura periódica de origem/criativo/qualidade; sinal de queda por origem — ambos somente recomendando
- **Prazo do ciclo:** cadência definida na call de setup (B4-301)
- **Valor estimado:** [opcional e com fonte]

### Validação

- **Como saber que foi atingido:** ciclos registrados com proveniência; recomendações revisadas com decisão humana; sinal coerente com baseline
- **Modo:** assistente mede | humano valida
- **Fonte independente:** registros do sistema × decisões registradas
- **Baseline / alvo / unidade:** baseline da qualidade (B4-304); 0 alteração externa
- **Cadência:** B4-301
- **Responsável pelo veredito:** marketing (L4.1), responsável comercial (L4.2), champion (parâmetros)

### Conectores e skills

| Item | Tipo | Uso | Permissão/entrada | Saída | Plano B |
|---|---|---|---|---|---|
| Dados espelhados/internos | fonte | leitura assistida | leitura por papel | leitura registrada | análise manual |
| Loop L4.1 | agente | leitura periódica | prompt homologado + teto | recomendação | modo manual |
| Loop L4.2 | agente | sinal de qualidade | baseline + prompt homologado | sinal/hipótese | modo manual |

### Arranque

- **Instruções permanentes:** somente recomendar; nunca alterar campanha/orçamento/público; sem fonte/período não há recomendação; sem baseline sinal é hipótese.
- **Primeiras tarefas:** call de setup (B4-301..304); primeira volta controlada do L4.1 com amostra.
- **Autonomia:** não (volta controlada); autonomia só após homologação registrada do prompt e teto
- **Limites e aprovações:** B4-301..304; veredito humano em toda recomendação.
- **Teto de créditos:** B4-303
- **Condição de pausa/recuperação:** teto estourado, fonte indisponível ou recomendação sem proveniência pausam o loop e abrem exceção humana.

## Prova específica

Ciclo controlado: baseline conhecido → execução do L4.1 em amostra → sinal do L4.2 → revisão humana das recomendações → veredito e aprendizado. Provar falha de fonte, dado vazio/duplicado, tentativa de alteração externa (bloqueio) e retomada segura do loop pausado.

## Handoff e operação

- **Como demonstrar:** executar um ciclo controlado do L4.1, mostrar a leitura com proveniência, revisar uma recomendação e registrar a decisão.
- **Como operar:** marketing revisa; responsável comercial acompanha sinais; champion revisa cadência/teto.
- **Como monitorar:** ciclos sem decisão, recomendações sem fonte, teto de créditos, sinais de queda.
- **Pendência conhecida:** setup (B4-301..304) é condição para a primeira volta autônoma; sem ele, os loops permanecem em modo controlado.

## Tasks vinculadas

| ID | Task | Dono | SPEC | Critério | Recorte da prova | Evidência esperada | Pré-condições | Status |
|---|---|---|---|---|---|---|---|---|
| 1a38ea22 | Configurar uma análise que sugira aprendizados sobre campanhas | Cliente | 4-003 | CA-4-301/302/305 | RED sem setup + GREEN ciclo controlado L4.1 | registros + prova negativa de alteração | 5ef4b7cd | BLOQUEADA |
| 82524cff | Revisar dez recomendações de campanha e registrar quais serão usadas | Felipe Navaar | 4-003 | CA-4-304 | revisão humana com decisão registrada | decisões com autor/data | 1a38ea22 | BLOQUEADA |
| id pendente | Monitorar queda de qualidade por origem com baseline | Cliente | 4-003 | CA-4-303 | sinal com/sem baseline | registros do monitor | 1a38ea22 | BLOQUEADA · aguarda UUID |
