# SPEC-4-001 — Conector Meta Ads de leitura e origem do lead

**Fase:** 4 — Sistema de inteligência de campanhas e operação assistida
**Status:** planejada
**Dono:** administrador armazena credencial e prova acesso; responsável técnico implementa; marketing consome
**Origem no escopo:** `02-Escopo-Definitivo.md`, Fase 4, seção "Sistema de inteligência de campanhas e operação assistida"; decisão Navaar de 17/09/2026 (formulário de transição): incluir Meta Ads com prova técnica timeboxed.
**Degrau da solução:** conector compartilhado de leitura — espelha dados de campanha/anúncio/origem do Meta para dentro do CRM; nenhuma escrita no Meta, nenhuma alteração de campanha, orçamento ou público.

## Contexto e decisões fechadas

- **Estado atual:** a Fase 1 captura a origem declarada pelo lead no formulário; a Fase 2 classifica e a Fase 3 faz follow-up. Nenhum dado de campanha/anúncio do Meta entra no CRM; não há integração com a Meta.
- **Estado desejado:** quando autorizado, o sistema relaciona dados do Meta (campanha, anúncio/criativo, origem) com a qualidade e a conversão dos leads já registrados; a ausência de acesso vira lacuna visível, nunca inferência.
- **Decisões fechadas:** Navaar decidiu em 17/09/2026 incluir o Meta Ads na F4 **condicionado a prova técnica timeboxed**; a Meta API é decisão humana explícita no escopo — disponibilidade, limites, escopos e fallback permanecem pendentes até a prova; nenhum conector é tratado como disponível até confirmação.
- **Bloqueios (B4-101..104):** não criar app, token, permissão ou consulta até: (B4-101) conta de anúncios correta confirmada pelo champion por escrito; (B4-102) credencial/token armazenada somente em secret manager, nunca em Git ou log; (B4-103) escopos de leitura homologados na prova técnica; (B4-104) política de amostra/período definida pelo champion (quais campanhas e janelas são comparáveis).

## Resultado observável

Um lead do CRM exibe, quando existir correspondência, a campanha/anúncio/origem de origem vindos do Meta com fonte e período declarados; leads sem correspondência ficam marcados como "sem dado Meta", nunca como zero. A prova técnica documenta acesso, escopos, limites e fallback — ou registra por que o conector não pode existir ainda.

## Limites e dependências

- **Inclui:** prova técnica timeboxed de acesso; contrato mínimo de leitura (campanha, anúncio, origem, período); espelhamento idempotente no CRM; marcação explícita de ausência de dado; log sanitizado.
- **Fora de escopo:** publicação/edição de anúncios, alteração de orçamento/público, benchmark externo, enriquecimento por LinkedIn, leitura de métricas de performance além do necessário para relacionar origem (candidata a evolução).
- **Entradas:** credencial Meta em secret manager; conta de anúncios confirmada; janela/amostra aprovadas pelo champion.
- **Saídas:** registro de origem/campanha/anúncio por lead com proveniência (fonte, período, data de carga); relatório da prova técnica; lacunas visíveis.
- **Atores/permissões:** administrador gerencia credencial; marketing consulta; responsável comercial valida qualidade; nenhuma persona escreve no Meta.
- **Risco/plano B:** API indisponível, escopo negado, conta errada ou dado inconsistente → registrar lacuna, usar exportação manual aprovada como fallback declarado, nunca inferir.
- **Rollback:** revogar token, desativar espelhamento, preservar registros já carregados com marca de proveniência.

## Dados e integrações

| Origem/destino | Fonte de verdade | Campos/contrato | Autenticação/permissão | Timeout/retry/idempotência | Tratamento de erro |
|---|---|---|---|---|---|
| Meta → CRM | Meta para dados de campanha; CRM para lead | `lead_id`, `campanha`, `anuncio/criativo`, `origem`, `periodo`, `data_carga` | token de leitura somente em secret manager; escopos homologados na prova | chave `lead_id + campanha + periodo`; reprocessar não duplica | falha de API registra lacuna visível; sem falso sucesso |
| CRM → painel de origem | CRM | proveniência por registro | acesso por papel já existente (RLS F1) | leitura pura | campo vazio ≠ zero; exibir "sem dado Meta" |

| Regra | Condição | Ação/resultado | Exceção |
|---|---|---|---|
| RN-4-101 | sem prova técnica aprovada ou credencial válida | zero ingestão; conector inativo | pendência visível ao administrador |
| RN-4-102 | lead sem correspondência no Meta | marcado "sem dado Meta" | nunca vira zero nem inferência |
| RN-4-103 | dado inconsistente entre origem declarada e Meta | registra divergência com fonte/período | não sobrescreve dado original sem decisão humana |
| RN-4-104 | falha de API/timeout | pausa espelhamento e registra | sem retry infinito; sem falso sucesso |

## Fluxo e regras

1. Administrador confirma conta (B4-101) e armazena credencial no cofre (B4-102).
2. Prova técnica timeboxed: autentica, lista escopos, lê amostra aprovada (B4-103/B4-104), registra limites e fallback.
3. Se a prova falhar: registrar lacuna e fallback (exportação manual aprovada) — o conector fica inativo, não improvisado.
4. Se aprovada: espelhar campanha/anúncio/origem por lead com proveniência completa, idempotente por chave.
5. Expor divergências e ausências como lacuna visível.

| Cenário | Dado/condição | Resultado esperado | Recuperação |
|---|---|---|---|
| Principal | credencial válida + amostra aprovada | leads com origem Meta e proveniência | — |
| Limite | lead sem correspondência | "sem dado Meta" explícito | — |
| Falha | token inválido/API fora | zero ingestão, lacuna registrada | pausar + fallback manual |

## Instruções de execução para o Ethos

1. Ler esta SPEC e os artefatos F1 que definem origem do lead.
2. Executar somente a prova técnica com credencial já autorizada; não criar app/token/permissão por inferência.
3. Não escrever no Meta em nenhuma hipótese; não alterar campanha, orçamento ou público.
4. Parar se conta, escopo, amostra ou política de período estiverem ausentes.
5. Estado válido ao parar: nenhuma ingestão sem prova; segredo fora do Git; lacunas visíveis.

## Checklist de execução

- [ ] conta de anúncios confirmada por escrito (B4-101)
- [ ] credencial no cofre, fora do Git (B4-102)
- [ ] escopos homologados na prova (B4-103)
- [ ] amostra/período aprovados (B4-104)
- [ ] divergência e ausência exercitadas com prova negativa

## Critérios de aceite

- [ ] **CA-4-101:** sem prova técnica aprovada, nenhuma ingestão acontece e a pendência fica visível.
- [ ] **CA-4-102:** com prova aprovada, cada lead espelhado exibe campanha/anúncio/origem com fonte, período e data de carga.
- [ ] **CA-4-103:** lead sem correspondência exibe "sem dado Meta" (nunca zero); divergência origem×Meta fica registrada sem sobrescrever o original.
- [ ] **CA-4-104:** credencial não aparece em Git, log ou tela; falha de API não cria falso sucesso nem duplicidade.

## TDD da SPEC

| Etapa | Prova | Ação | Resultado esperado | Evidência |
|---|---|---|---|---|
| RED | credencial ausente/inválida e conta não confirmada | executar espelhamento de teste | zero ingestão, pendência visível | log de execução + estado CRM |
| GREEN | prova técnica aprovada + fixture de amostra aprovada | espelhar amostra e repetir | dados com proveniência, sem duplicidade na repetição | registro CRM + recibo da prova |
| REFACTOR/REGRESSÃO | lead sem correspondência + divergência + falha de API simulada | exercitar os três caminhos | "sem dado Meta", divergência registrada, pausa sem falso sucesso | roteiro + logs sanitizados |

**Dados/fixtures:** leads sintéticos com/sem correspondência, divergência proposital, amostra Meta aprovada pelo champion.
**Caminhos de erro obrigatórios:** token ausente, escopo negado, timeout, 4xx/5xx, conta errada, dado inconsistente.
**Evidência exigida:** recibo da prova técnica (timeboxed), logs sanitizados, estados CRM, aceite humano da prova.

## Configuração no Ethos

- **Tipo:** conector compartilhado
- **Sistemas das fases 1–3 usados:** F1 (origem do lead, RLS, secret manager), F2 (estado de qualificação para relacionar qualidade)
- **Agente responsável:** assistente principal do cliente; nenhuma autonomia de escrita externa

### Meta

- **Nome curto:** Espelho Meta
- **O que atingir:** origem de campanha/anúncio relacionada aos leads com proveniência verificável
- **Prazo do ciclo:** definido na Jornada F4
- **Valor estimado:** [opcional e com fonte]

### Validação

- **Como saber que foi atingido:** amostra espelhada com proveniência e prova negativa de ausência/divergência
- **Modo:** assistente mede | humano valida
- **Fonte independente:** registros do CRM × sandbox/conta Meta aprovada
- **Baseline / alvo / unidade:** 100% da amostra com proveniência; 0 ingestão sem prova
- **Cadência:** única na configuração; espelhamento conforme política B4-104
- **Responsável pelo veredito:** champion (Vinicius) com validação do consultor

### Conectores e skills

| Item | Tipo | Uso | Permissão/entrada | Saída | Plano B |
|---|---|---|---|---|---|
| Meta API (leitura) | conector externo | espelhar campanha/anúncio/origem | token em secret manager, escopos homologados | registros com proveniência | exportação manual aprovada |

### Arranque

- **Instruções permanentes:** nunca escrever no Meta; ausência é lacuna, nunca zero; segredo só no cofre.
- **Primeiras tarefas:** prova técnica timeboxed com amostra aprovada.
- **Autonomia:** não
- **Limites e aprovações:** B4-101..104; nenhuma ingestão sem prova aprovada.
- **Teto de créditos:** definido no setup
- **Condição de pausa/recuperação:** falha de API ou divergência em massa pausa o espelhamento e abre exceção humana.

## Prova específica

Ciclo controlado: baseline (amostra aprovada), execução do espelhamento, conferência de proveniência e idempotência, veredito do champion, aprendizado registrado. Provar também falha de conector (token revogado), lead sem correspondência e retomada segura sem duplicidade.

## Handoff e operação

- **Como demonstrar:** espelhar a amostra aprovada, repetir a execução e mostrar proveniência + ausência tratada.
- **Como operar:** administrador mantém credencial; marketing consulta; responsável comercial valida qualidade.
- **Como monitorar:** falhas de API, divergências, registros sem proveniência.
- **Pendência conhecida:** conta/escopos/amostra dependem do champion (B4-101..104); sem prova, o conector permanece inativo.

## Tasks vinculadas

| ID | Task | Dono | SPEC | Critério | Recorte da prova | Evidência esperada | Pré-condições | Status |
|---|---|---|---|---|---|---|---|---|
| e4c77e80 | Confirmar com o Cliente o acesso de leitura à conta do Meta | Izabel | 4-001 | B4-101 | confirmação documental da conta | resposta anexada | nenhum | ELEGÍVEL |
| cd704a1c | Trazer para o CRM a origem, a campanha e o anúncio de cada lead | Cliente | 4-001 | CA-4-101/102/103/104 | RED sem prova + GREEN amostra idempotente | registros com proveniência + recibo da prova | e4c77e80 | BLOQUEADA |
