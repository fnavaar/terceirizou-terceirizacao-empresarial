# SPEC-1-002 — Captura do formulário, mapeamento e idempotência

**Fase:** 1  
**Status:** bloqueada  
**Dono:** Responsável técnico pela entrada, com validação do administrador do sistema  
**Origem no escopo:** RQ-001 e RQ-003; AC-001, AC-002 e AC-006; Fase 1  
**Degrau da solução:** recurso nativo da plataforma/conector já existente — reutilizar a entrada e o CRM confirmados pelo cliente; não construir integração customizada antes de confirmar as superfícies.

## Contexto e decisões fechadas

- **Estado atual:** o formulário alimenta planilha; uma automação no Skip subiu leads no teste inicial, mas depois falhou. O formulário ajustado contém perguntas de qualificação, porém Fase 1 apenas registra respostas e não pontua.
- **Estado desejado:** um evento novo do formulário cria ou atualiza uma oportunidade no sistema central, preservando respostas e origem disponível; reprocessar o mesmo evento não cria outra oportunidade.
- **Decisões já fechadas:** formulário → sistema central; dados ausentes permanecem ausentes; a fonte anterior é preservada até a prova; nenhuma API do Meta, agenda, WhatsApp automático ou scoring nesta SPEC.
- **Bloqueios:** confirmar ferramenta/endereço do formulário, sistema central, conector autorizado, conta de teste, nome do evento e chave de idempotência/deduplicação. Sem isso, qualquer implementação obrigaria o Ethos a inventar arquitetura ou regra.

## Resultado observável

Um lead sintético submetido no formulário aparece uma única vez no sistema central com nome, contatos fornecidos, respostas, origem/campanha/criativo quando presentes, horário de submissão, responsável inicial e vínculo ao evento de entrada. Reenviar o mesmo evento atualiza o registro existente ou registra a repetição no histórico, sem criar nova oportunidade.

## Limites e dependências

- **Inclui:** contrato de entrada; mapeamento de campos; validação; criação/atualização; chave de idempotência; deduplicação; preservação de origem; fila de erro da SPEC-1-003.
- **Fora de escopo:** qualificação/scoring; mensagens; agenda; enriquecimento; importação em massa; Meta API; qualquer alteração de campanha.
- **Entradas e pré-condições:** formulário e sistema confirmados; lista de campos exportada; evento sintético; credencial/conector mínimo; política de dados e consentimento confirmada.
- **Saídas/artefatos:** mapa de campos aprovado; registro de evento/processamento; registro central; log redigido de sucesso, repetição e erro; evidência de fonte.
- **Dependências e responsáveis:** cliente confirma ferramentas e campos; responsável técnico confirma autenticação e limites; administrador confirma destino e permissões; responsável comercial valida o lead de teste.
- **Atores e permissões mínimas:** formulário/integração cria ou atualiza somente os campos de entrada; administrador configura; operador não edita o evento bruto; marketing só consulta origem autorizada.
- **Superfícies/arquivos/configurações afetadas:** configuração do formulário, conector autorizado e sistema central confirmado; não armazenar credenciais no workspace nem modificar produção sem gate.
- **Risco e plano B:** evento perdido, repetido ou mal mapeado pode gerar oportunidade duplicada ou lead perdido; pausar o conector e manter a planilha/fonte anterior para reconciliação.
- **Rollback ou reversão:** desativar a rota de entrada, manter eventos com erro em fila, corrigir o mapa em teste e reprocessar somente após a prova de idempotência; não apagar eventos nem oportunidades.

## Dados e integrações

| Origem/destino | Fonte de verdade | Campos/contrato | Autenticação/permissão | Timeout/retry/idempotência | Tratamento de erro |
|---|---|---|---|---|---|
| Formulário → entrada | Formulário confirmado no setup | `source_event_id` se fornecido; nome; e-mail; telefone; respostas; origem; campanha; anúncio/criativo; `submitted_at`; consentimento quando aplicável | Conta/conector autorizado; segredo em cofre/gerenciador, nunca em arquivo ou log | Timeout e retries dependem do conector confirmado; não ativar retry autônomo antes da prova | Validar schema; rejeição gera evento de erro redigido na SPEC-1-003 |
| Entrada → sistema central | Sistema central confirmado no setup | `lead_id`, `opportunity_id`, campos mapeados, `source_event_id`, `dedup_key`, `ingestion_status`, `received_at` | Permissão mínima de criação/atualização; sem delete | Preferir `source_event_id`; se ausente, aplicar somente a chave de deduplicação aprovada; repetição vira atualização/auditoria | Não converter timeout em sucesso; registrar `retryable`/`manual_review` |
| Origem/campanha/criativo | Valor fornecido pelo formulário ou ausência explícita | UTM/source/campaign/ad/creative; sem inventar valor | Leitura conforme papel | Não preencher `0` ou “orgânico” quando ausente | Mostrar ausente e preservar evento |

| Regra de negócio | Condição | Ação/resultado | Exceção | Fonte |
|---|---|---|---|---|
| RN-1.005 | Evento contém chave idempotente válida | Processar uma vez; repetição não cria nova oportunidade | Colisão entre eventos diferentes vai para revisão | Escopo F1, itens 102–125 |
| RN-1.006 | E-mail ou telefone presente | Criar/atualizar conforme a chave aprovada e marcar campos ausentes | Dois registros conflitantes exigem revisão; não mesclar silenciosamente | Escopo F1, item 119 |
| RN-1.007 | Ambos e-mail e telefone ausentes | Não descartar o evento; encaminhar à política de `aguardando_dados` ou fila definida no setup | A escolha da representação no CRM é bloqueio de execução | Escopo F1, itens 119 e 123 |
| RN-1.008 | Origem/campanha/criativo não fornecido | Persistir como ausente | Nunca usar zero ou valor inventado | Regras globais, item 93 |
| RN-1.009 | Evento inválido ou conector indisponível | Registrar erro seguro e manter recuperação | Não criar falso sucesso nem duplicar em retry | Regras globais, item 92 |

## Fluxo e regras

1. Confirmar formulário, destino, campos, consentimento, conta de teste e chave de idempotência; parar se faltar qualquer confirmação.
2. Receber o evento sem registrar payload completo em logs.
3. Validar tipos, tamanho, campos permitidos e origem; separar ausente de vazio/zero.
4. Determinar a chave de idempotência aprovada e consultar o destino.
5. Criar uma oportunidade nova ou atualizar a existente, mantendo `source_event_id`, origem e respostas.
6. Registrar status de processamento, ator/serviço, horário e referência segura do evento.
7. Em falha, não confirmar sucesso ao formulário; encaminhar para a fila da SPEC-1-003.

| Cenário | Dado/condição | Resultado esperado | Caminho de erro/recuperação |
|---|---|---|---|
| Principal | Evento sintético válido e inédito | Um registro central com os campos mapeados e referência do evento | Falha de validação interrompe antes da escrita e gera erro seguro |
| Repetição | Mesmo `source_event_id` reenviado | Nenhuma nova oportunidade; histórico registra repetição/atualização idempotente | Se o destino não suportar upsert, pausar e encaminhar para revisão técnica |
| Limite | E-mail ou telefone ausente | Evento não é perdido; estado/fila conforme política aprovada | Não escolher chave alternativa por inferência |
| Origem ausente | Sem UTM/campanha/criativo | Campos permanecem ausentes e o registro continua rastreável pelo evento | Não atribuir campanha ou origem inventada |
| Falha | Timeout, 4xx/5xx ou credencial inválida | Sem confirmação falsa; erro redigido na fila | Pausar/reprocessar manualmente após diagnóstico e prova |

## Instruções de execução para o Ethos

1. **Ler antes de alterar:** `03-Projeto/02-Escopo-Definitivo.md` seção Fase 1; `02-Reuniao/Kickoff Call/03-fluxos_encontrados.md`; `02-Reuniao/Kickoff Call/04-decisoes_pendencias.md`; SPEC-1-001 e SPEC-1-003.
2. **Alterar somente:** mapa de campos, rota autorizada de entrada e operação de upsert no ambiente de teste.
3. **Não alterar:** scoring, campanhas, mensagens, produção, credenciais, fonte histórica ou ferramentas não confirmadas.
4. **Executar nesta ordem:** inventariar ferramentas; aprovar contrato; testar schema; testar evento novo; repetir evento; testar bordas; anexar evidências.
5. **Parar e pedir validação quando:** não houver evento identificável, chave aprovada, permissão mínima, consentimento, destino confirmado ou fallback de erro; também parar diante de qualquer duplicidade.
6. **Estado válido ao parar:** evento preservado, erro redigido, fonte anterior intacta, conector pausado se necessário e nenhuma nova tentativa cega.

## Checklist de execução

- [ ] Formulário, destino, evento, campos e conta de teste confirmados.
- [ ] Contrato de autenticação, consentimento e escopos mínimos aprovado.
- [ ] Chave de idempotência/deduplicação definida e testável.
- [ ] Mapa de campos aprovado, incluindo ausentes e origem.
- [ ] Evento novo cria uma oportunidade.
- [ ] Mesmo evento não cria duplicata.
- [ ] Erro, timeout e permissão inválida entram em fila visível.
- [ ] Credenciais não aparecem em arquivo, captura ou log.
- [ ] Evidências e handoff registrados.

## Critérios de aceite

- [ ] **CA-1-005:** evento sintético válido cria exatamente uma oportunidade com todos os campos fornecidos e referência rastreável da entrada.
- [ ] **CA-1-006:** reprocessamento do mesmo evento não cria nova oportunidade e deixa evidência de idempotência.
- [ ] **CA-1-007:** campos de origem ausentes permanecem ausentes; nenhum valor é inventado ou convertido em zero.
- [ ] **CA-1-008:** erro de validação, timeout ou permissão não produz falso sucesso e aparece na fila de recuperação sem payload sensível em log.

## TDD da SPEC

| Etapa | Prova | Comando/ação | Resultado esperado | Evidência |
|---|---|---|---|---|
| RED | Baseline da entrada atual | Submeter lead sintético e repetir no fluxo atual; comparar planilha, CRM e registros de WhatsApp | Falha ou inconsistência reproduzível em pelo menos um CA; registrar sem corrigir ainda | Captura/log redigido e horário do evento |
| GREEN | Evento novo e replay | Enviar fixture sintética válida duas vezes com o mesmo identificador de evento | Uma oportunidade, campos preservados, repetição auditada; CA-1-005 e CA-1-006 passam | IDs, contagem antes/depois e log redigido |
| REFACTOR/REGRESSÃO | Bordas de schema e indisponibilidade | Enviar campo ausente, origem ausente, schema inválido, credencial inválida e timeout controlado | CA-1-007 e CA-1-008 passam; caso principal continua idempotente | Matriz de entradas, fila e evidências negativas |

**Dados/fixtures:** somente leads sintéticos; fixtures `novo-valido`, `replay-do-mesmo-evento`, `sem-origem`, `sem-contato`, `schema-invalido` e `permissao-negada`; nenhum segredo ou dado real.  
**Caminhos de erro obrigatórios:** schema inválido, contato ausente, origem ausente, colisão, repetição, timeout, credencial inválida e destino indisponível.  
**Evidência exigida:** mapa de campos, contrato aprovado, IDs/contagens, logs redigidos, fila de erros e confirmação do responsável técnico.

## Handoff e operação

- **Como demonstrar:** submeter um lead sintético, mostrar o registro, reenviar o mesmo evento e mostrar que a contagem de oportunidades não aumentou.
- **Como operar depois:** responsável técnico monitora falhas; administrador pausa/reprocessa após diagnóstico; responsável comercial valida o estado.
- **Como monitorar:** eventos sem destino, repetição, erro por campo, timeout, fila crescente e divergência entre fonte e destino.
- **Pendência conhecida:** ferramenta do formulário, CRM, conector, chave de idempotência, política para ausência de contato e permissões ainda precisam ser confirmados.

## Tasks vinculadas

| ID | Task | Dono | SPEC | Critério | Recorte da prova | Evidência esperada | Pré-condições | Status |
|---|---|---|---|---|---|---|---|---|
| F1-T04 | Confirmar contrato do formulário, destino, campos e idempotência | Responsável técnico do cliente | SPEC-1-002 | Origem, destino, evento, campos, consentimento e chave testável aprovados | `## Contexto e decisões fechadas` — Bloqueios; `## Dados e integrações` | Mapa de campos e exemplo sintético | Aprovação do cliente e contas de teste | PENDENTE |
| F1-T05 | Configurar captura, validação, mapeamento e upsert | Responsável técnico | SPEC-1-002 | Evento válido cria/atualiza destino sem segredo/payload completo em log | `## Fluxo e regras` — passos 2–6 | Mapa aplicado, ID e log redigido | F1-T01, F1-T02 e F1-T04 | BLOQUEADA |
| F1-T06 | Provar criação e replay idempotente | Responsável técnico | SPEC-1-002 | CA-1-005 e CA-1-006 passam | `## Critérios de aceite`; `## TDD da SPEC` — GREEN | IDs, contagem antes/depois e histórico | F1-T05; chave aprovada | BLOQUEADA |
| F1-T07 | Provar ausências, origem, schema, timeout e permissão inválida | Responsável técnico | SPEC-1-002 | CA-1-007 e CA-1-008 passam | Cenários Limite/Origem ausente/Falha; TDD — REFACTOR/REGRESSÃO | Matriz de cenários, fila e logs redigidos | F1-T05; F1-T09; chave aprovada | BLOQUEADA |

## Emendas

<!-- Append-only (D19): mudanças aprovadas depois da geração. A história não é reescrita. -->

| Data | Origem do sinal | Micro-spec/task | Motivo |
|---|---|---|---|
| | | | |
