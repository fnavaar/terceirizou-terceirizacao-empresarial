# SPEC-1-001 — Modelo central de lead, oportunidade e pipeline inicial

**Fase:** 1  
**Status:** bloqueada  
**Dono:** Administrador do sistema, com validação do responsável comercial  
**Origem no escopo:** RQ-004, RQ-008 e RQ-012; AC-001 e AC-007; Fase 1  
**Degrau da solução:** recurso nativo da plataforma — reutilizar o CRM/sistema central escolhido pelo cliente, sem criar banco paralelo; a escolha exata da plataforma ainda bloqueia a execução.

## Contexto e decisões fechadas

- **Estado atual:** leads são registrados em planilha e tratados por WhatsApp; o fluxo documenta CRM/Skip e uma automação que funcionou no teste inicial, mas depois deixou de subir novos leads. Fonte: `02-Reuniao/Kickoff Call/03-fluxos_encontrados.md`.
- **Estado desejado:** cada oportunidade fica no sistema central com identificador, dados de origem disponíveis, estágio inicial, responsável, histórico e permissões por papel.
- **Decisões já fechadas:** formulário → sistema central; o sistema central é a fonte operacional; a planilha pode permanecer como transição preservada; scoring, autoagendamento, follow-up automático, Meta API e loops ficam fora da Fase 1.
- **Bloqueios:** confirmar nome exato do sistema central/CRM (Skip ou outra ferramenta), conta/ambiente de teste, capacidade nativa de RLS, responsável substituto e campos obrigatórios. O Ethos não deve escolher isso por inferência.

## Resultado observável

Um operador consegue abrir um lead de teste no sistema central e demonstrar: identificador único, oportunidade associada, estágio `capturado`, responsável, origem disponível, dados do formulário e histórico de criação/alteração. O responsável comercial só acessa sua carteira; marketing consulta apenas os campos autorizados de origem; administrador configura o modelo.

## Limites e dependências

- **Inclui:** modelo de lead e oportunidade; pipeline mínimo; responsável; campos de origem; histórico de criação/alteração; RLS inicial; estados de entrada e encerramento por dado inválido.
- **Fora de escopo:** pontuação e qualificação; agenda; follow-up; alteração de campanha; Meta API; WhatsApp automatizado; loops; migração integral da planilha.
- **Entradas e pré-condições:** sistema e formulário escolhidos; conta não produtiva ou procedimento de teste; papéis confirmados; campos e chave de deduplicação aprovados; fonte anterior preservada.
- **Saídas/artefatos:** configuração do modelo/pipeline no sistema central; registro de lead de teste; evidências de RLS e histórico; inventário dos campos configurados.
- **Dependências e responsáveis:** cliente confirma plataforma, conta, papéis, responsáveis e substitutos; responsável técnico confirma permissões; responsável comercial executa o roteiro de aceite.
- **Atores e permissões mínimas:** formulário/integração cria; responsável comercial lê e atualiza sua carteira; administrador configura e audita; marketing lê origem conforme permissão; nenhum papel operacional exclui fisicamente registros.
- **Superfícies/arquivos/configurações afetadas:** configuração do CRM/sistema central escolhido; não alterar a planilha de transição nem ativar conectores sem o bloqueio resolvido.
- **Risco e plano B:** modelo incorreto ou RLS permissivo pode expor ou perder leads; manter a fonte anterior, pausar a entrada e registrar manualmente eventos até a correção.
- **Rollback ou reversão:** desativar alterações de pipeline/RLS no ambiente de teste, restaurar a configuração anterior documentada e manter os registros já criados para reconciliação; não apagar histórico.

## Dados e integrações

| Origem/destino | Fonte de verdade | Campos/contrato | Autenticação/permissão | Timeout/retry/idempotência | Tratamento de erro |
|---|---|---|---|---|---|
| Sistema central | O sistema central confirmado no setup | `lead_id`, `opportunity_id`, nome, e-mail, telefone, respostas, origem, campanha, anúncio/criativo, `created_at`, `updated_at`, responsável, estágio, `dedup_key` | Conta de serviço ou conector nativo com criação limitada; credencial fora de arquivos e logs | Idempotência será exercitada na SPEC-1-002; não ativar retry antes da prova | Falha não pode virar ausência de lead; registrar erro e encaminhar à SPEC-1-003 |
| Planilha de transição | Fonte histórica preservada | Somente leitura durante a prova; mapeamento não definido até a plataforma ser confirmada | Acesso de leitura do responsável autorizado | Não importar nesta SPEC | Divergência vira pendência de reconciliação, sem sobrescrita silenciosa |

| Regra de negócio | Condição | Ação/resultado | Exceção | Fonte |
|---|---|---|---|---|
| RN-1.001 | Novo evento válido | Criar um `lead_id`, uma oportunidade e estágio `capturado` | Sem chave suficiente, encaminhar para revisão; não duplicar | Escopo F1, itens 102–125 |
| RN-1.002 | Oportunidade existente | Atualizar somente campos permitidos e registrar histórico | Conflito de identidade vai para revisão manual | Escopo F1, regras globais |
| RN-1.003 | Responsável comercial consulta | Retornar apenas a carteira autorizada | Administrador pode revisar toda a base | Escopo F1, item 115 |
| RN-1.004 | Dado obrigatório ausente | Usar estado de pendência definido no setup e preservar o evento | Se o sistema não suportar o estado, usar fila da SPEC-1-003 | Escopo F1, item 119 |

## Fluxo e regras

1. Confirmar plataforma, conta de teste, papéis, campos e chave de deduplicação no setup; parar se qualquer item estiver ausente.
2. Criar o modelo de lead/oportunidade e os estados mínimos `capturado`, `aguardando_dados` e `encerrado_entrada_invalida`, sem criar estados de scoring.
3. Configurar responsável, permissões e histórico de alterações.
4. Criar um lead de teste pela rota de entrada definida na SPEC-1-002.
5. Verificar registro único, carteira do responsável, leitura limitada de marketing e trilha de auditoria.
6. Se alguma prova falhar, pausar a entrada e encaminhar o evento para a fila da SPEC-1-003.

| Cenário | Dado/condição | Resultado esperado | Caminho de erro/recuperação |
|---|---|---|---|
| Principal | Lead de teste válido | Um lead e uma oportunidade com estágio `capturado`, responsável e histórico | Corrigir configuração em ambiente de teste antes de novo evento |
| Limite | E-mail ou telefone ausente | Estado `aguardando_dados` ou fila de revisão, conforme decisão registrada | Não descartar nem marcar ausente como zero |
| Falha | Plataforma sem permissão ou indisponível | Nenhum falso sucesso; evento e erro ficam visíveis na fila | Pausar entrada, manter fonte anterior e reprocessar só após diagnóstico |
| Segurança | Responsável tenta abrir lead de outra carteira | Acesso negado e tentativa registrada conforme capacidade da plataforma | Administrador revisa RLS; não conceder acesso amplo como contorno |

## Instruções de execução para o Ethos

1. **Ler antes de alterar:** `03-Projeto/02-Escopo-Definitivo.md` seção Fase 1; `03-Projeto/02-Plano_de_acao/matriz-de-rastreabilidade.md`; `03-Projeto/03-Setup-Ethos/00-INDICE.md`; SPEC-1-002 e SPEC-1-003.
2. **Alterar somente:** modelo, pipeline, permissões e auditoria no ambiente explicitamente confirmado.
3. **Não alterar:** produção, planilha de transição, scoring, agenda, follow-up, Meta, WhatsApp ou loops.
4. **Executar nesta ordem:** confirmar pré-condições; configurar modelo; configurar estados; configurar papéis; executar testes; anexar evidências.
5. **Parar e pedir validação quando:** a plataforma, conta, papel, campo, chave de deduplicação ou permissão não estiverem confirmados; houver ação em produção; uma falha puder duplicar ou expor dados.
6. **Estado válido ao parar:** fonte anterior preservada, entrada pausada se necessário, nenhum registro excluído e falhas visíveis para recuperação.

## Checklist de execução

- [ ] Plataforma, conta de teste, papéis, responsáveis e substitutos confirmados.
- [ ] Modelo de lead/oportunidade e campos mínimos configurados sem banco paralelo.
- [ ] Estados iniciais e transições permitidas documentados.
- [ ] RLS demonstrado para responsável, marketing e administrador.
- [ ] Histórico de criação/alteração demonstrado.
- [ ] Entrada nova, dado ausente e falha exercitados.
- [ ] Evidências anexadas ao recibo da task futura.
- [ ] Handoff e rollback confirmados pelo dono.

## Critérios de aceite

- [ ] **CA-1-001:** um lead de teste possui exatamente um identificador, uma oportunidade, estágio `capturado`, responsável e histórico de criação.
- [ ] **CA-1-002:** responsável comercial não consegue ler ou editar lead fora da carteira; administrador consegue auditar; marketing vê somente origem autorizada.
- [ ] **CA-1-003:** dado ausente e falha de entrada resultam em estado/fila visível, sem descarte silencioso e sem preencher zero.
- [ ] **CA-1-004:** alterações de estágio, responsável e dados-chave exibem ator e horário no histórico.

## TDD da SPEC

| Etapa | Prova | Comando/ação | Resultado esperado | Evidência |
|---|---|---|---|---|
| RED | Baseline do fluxo atual | Executar um lead de teste no fluxo documentado de planilha/CRM e conferir os CA-1-001 a CA-1-004 | Pelo menos um critério não é demonstrável de forma consistente; registrar o estado antes | Roteiro datado e captura/log do baseline |
| GREEN | Modelo e pipeline configurados | Na conta de teste, criar lead válido, consultar com cada papel e alterar estágio/responsável | CA-1-001, CA-1-002 e CA-1-004 passam; registro único e acesso conforme papel | Capturas, exportação segura ou log sem segredo |
| REFACTOR/REGRESSÃO | Bordas e recuperação | Repetir com campo ausente, acesso cruzado e falha controlada; verificar fila e fonte preservada | CA-1-003 passa e os testes anteriores continuam passando | Matriz de cenários e evidências negativas |

**Dados/fixtures:** lead sintético de teste, com e-mail/telefone fictícios e origem `teste-f1`; contas de teste por papel; nenhum dado real necessário.  
**Caminhos de erro obrigatórios:** campo ausente, duplicidade encaminhada pela SPEC-1-002, permissão negada, plataforma indisponível e rollback.  
**Evidência exigida:** roteiro, capturas/logs redigidos, identificador do registro de teste, matriz de papéis e confirmação do responsável comercial.

## Handoff e operação

- **Como demonstrar:** abrir o lead sintético, mostrar ID, estágio, responsável, origem, histórico e as três visões de acesso.
- **Como operar depois:** administrador mantém papéis; responsável comercial mantém carteira; falhas seguem a SPEC-1-003.
- **Como monitorar:** registros sem responsável, estados inválidos, falhas de permissão e alterações sem histórico.
- **Pendência conhecida:** plataforma, conta, papéis, campos e chave de deduplicação precisam ser confirmados antes da execução.

## Tasks vinculadas

| ID | Task | Dono | SPEC | Critério | Recorte da prova | Evidência esperada | Pré-condições | Status |
|---|---|---|---|---|---|---|---|---|
| F1-T01 | Confirmar plataforma central, conta, papéis, campos e RLS | Responsável técnico do cliente | SPEC-1-001 | Plataforma, conta, papéis, campos e RLS confirmados por escrito | `## Contexto e decisões fechadas` — Bloqueios; passos 1 e 5 das instruções | Registro de decisão, inventário de campos/papéis e responsável | Aprovação do cliente e acesso ao setup | PENDENTE |
| F1-T02 | Configurar modelo, pipeline, responsável, RLS e histórico | Administrador do sistema | SPEC-1-001 | Modelo e pipeline deixam lead sintético com ID, estado, responsável, papéis e histórico | `## Fluxo e regras` — passos 2–5; `## Dados e integrações` | Inventário de configuração, ID e histórico redigido | F1-T01; ambiente de teste | BLOQUEADA |
| F1-T03 | Provar modelo, RLS, histórico e bordas de dado ausente | Responsável comercial | SPEC-1-001 | CA-1-001 a CA-1-004 passam | `## Critérios de aceite`; `## TDD da SPEC` — GREEN/REGRESSÃO | Matriz de acesso, capturas/logs e histórico | F1-T02 e F1-T09; fixture sintética | BLOQUEADA |

## Emendas

<!-- Append-only (D19): mudanças aprovadas depois da geração. A história não é reescrita. -->

| Data | Origem do sinal | Micro-spec/task | Motivo |
|---|---|---|---|
| | | | |
