# SPEC-3-001 — Autoagendamento controlado via Google Calendar

**Fase:** 3 — Sistema de agendamento, contato e follow-up
**Status:** planejada
**Dono:** responsável técnico; champion aprova disponibilidade, tipos de reunião e exceções
**Origem no escopo:** `02-Escopo-Definitivo.md`, Fase 3, linhas 158–185
**Degrau da solução:** integração controlada — automatiza agendamento de lead elegível sem decidir elegibilidade nem operar agenda sem autorização.

## Contexto e decisões fechadas

- **Estado atual:** CRM possui classificação e próxima ação da Fase 2; a F2 foi encerrada pelo champion em 2026-09-03 e validada pelo consultor em 2026-09-04.
- **Estado desejado:** um lead com estado `qualificado` pode receber uma ação/link de agendamento autorizado; reunião, cancelamento e no-show ficam registrados no CRM com próximo estado verificável.
- **Decisões fechadas:** provedor = Google Calendar; WhatsApp está fora desta fase; somente lead elegível entra no fluxo automático; execução depende de autorização OAuth, calendário e política de disponibilidade fornecidos pelo champion.
- **Bloqueios:** não criar nem usar conector, calendário, evento real ou credencial até o champion fornecer autorização OAuth, ID do calendário, duração, janela, fuso, owner e regra de cancelamento/no-show.

## Resultado observável

Com massa sintética e calendário de teste autorizado, um lead qualificado recebe link ou convite para horário disponível; a reunião criada, cancelada ou marcada como no-show atualiza o estado e a próxima ação no CRM. Leads não elegíveis não recebem link.

## Limites e dependências

- **Inclui:** contrato Google Calendar, disponibilidade aprovada, link/evento, sincronização de estados e registro de erro/retry idempotente.
- **Fora de escopo:** WhatsApp, contratação, alteração de campanhas, agendas pessoais sem autorização, remarcação automática e reativação em massa.
- **Entradas e pré-condições:** lead `qualificado`; conta OAuth autorizada; calendário de teste; fuso/owner/duração/janela aprovados; política de cancelamento/no-show registrada pelo champion.
- **Saídas:** referência externa do evento, estado de agendamento, timestamps, responsável, próxima ação e log de falha sem tokens.
- **Atores e permissões:** lead agenda somente em janelas expostas; champion configura regras; responsável trata exceções; administrador autoriza conector; marketing não edita atendimento.
- **Risco e plano B:** OAuth inválido, horário duplicado ou API indisponível → nenhum evento é assumido como criado, abrir falha/tarefa e voltar ao agendamento humano.
- **Rollback:** pausar criação/sincronização; ocultar link; manter eventos e histórico existentes; atendimento humano assume novos casos.

## Dados e integrações

| Origem/destino | Fonte de verdade | Campos/contrato | Autenticação/permissão | Timeout/retry/idempotência | Tratamento de erro |
|---|---|---|---|---|---|
| CRM → Google Calendar | CRM para elegibilidade; Google para disponibilidade/evento | `lead_id`, estado, owner, duração, fuso, `calendar_event_id`, situação | OAuth do calendário autorizado pelo administrador | chave idempotente `lead_id + tipo + janela`; retry só após confirmar ausência do evento | registrar erro seguro e encaminhar ao responsável |
| Google Calendar → CRM | Google para evento/cancelamento; CRM para próxima ação | evento, início/fim, cancelamento/no-show, timestamp | webhook/polling somente se contrato aprovado | deduplicar por `calendar_event_id + updated`; não sobrescrever revisão humana | divergência vira fila de exceção |

| Regra | Condição | Resultado | Exceção |
|---|---|---|---|
| RN-3-001 | `estado_qualificacao = qualificado` | habilitar ação/link de agendamento | qualquer outro estado não recebe link |
| RN-3-002 | configuração do champion ausente | não chamar Google | criar pendência de configuração |
| RN-3-003 | cancelamento/no-show | registrar evento e próxima ação definida pelo champion | não enviar novo contato nesta SPEC |

## Fluxo e regras

1. Validar configuração e autorização do champion em calendário de teste.
2. Confirmar que o lead é qualificado e não tem evento ativo idêntico.
3. Oferecer horário/link ou criar evento somente com contrato aprovado.
4. Registrar referência e estado no CRM.
5. Processar cancelamento/no-show por evento deduplicado; registrar próxima ação ou exceção.

| Cenário | Condição | Resultado esperado | Recuperação |
|---|---|---|---|
| Principal | lead qualificado + slot aprovado | evento/link e referência registrados | — |
| Limite | lead não qualificado | nenhuma chamada ao Calendar | registrar bloqueio de elegibilidade |
| Falha | OAuth/API/slot inválido | sem falso sucesso ou evento duplicado | fila + atendimento humano |

## Instruções de execução para o Ethos

1. Ler `04_fase-atual/specs/spec-2-001-qualificacao-pontuacao-roteamento.md`, hooks/migration F2 e esta SPEC.
2. Alterar somente integração e campos explícitos aprovados na task correspondente.
3. Não armazenar token em Git, criar evento de produção, expor agenda privada ou alterar classificação F2.
4. Executar prova RED, GREEN e regressão com calendário/massa sintética autorizados.
5. Parar se OAuth, ID de calendário, fuso, disponibilidade, cancelamento/no-show ou owner não estiverem registrados pelo champion.
6. Estado válido ao parar: CRM continua operável manualmente; nenhuma duplicidade e nenhum token versionado.

## Checklist de execução

- [ ] configuração e acesso autorizados pelo champion
- [ ] lead elegível e não elegível exercitados
- [ ] criação/cancelamento/no-show e idempotência demonstrados
- [ ] falha segura e handoff humano demonstrados
- [ ] evidência e aceite humano anexados

## Critérios de aceite

- [ ] **CA-3-001:** somente lead qualificado recebe ação/link de agendamento; não qualificado não gera chamada ao Calendar.
- [ ] **CA-3-002:** evento/link criado contém referência rastreável no CRM e não duplica sob repetição do mesmo pedido.
- [ ] **CA-3-003:** cancelamento e no-show deixam evento, responsável e próxima ação verificáveis sem apagar histórico.
- [ ] **CA-3-004:** OAuth/API/slot inválido não cria falso sucesso, não expõe token e abre caminho humano/visível.

## TDD da SPEC

| Etapa | Prova | Ação | Resultado esperado | Evidência |
|---|---|---|---|---|
| RED | configuração/OAuth ausente e lead não elegível | fixture + tentativa controlada | integração bloqueada; zero evento | log seguro e estado CRM |
| GREEN | lead qualificado + calendário de teste | criar link/evento e repetir pedido | referência única e estado atualizado | `lead_id`, `calendar_event_id`, log |
| REFACTOR/REGRESSÃO | cancelar/no-show e simular timeout | atualizar evento e repetir callback | histórico preservado, sem duplicidade/falso sucesso | roteiro e aceite do champion |

**Dados/fixtures:** leads sintéticos qualificado/não qualificado; calendário de teste; conta OAuth de teste.
**Caminhos de erro obrigatórios:** credencial inválida, calendário não autorizado, slot indisponível, timeout, callback repetido, lead não elegível.
**Evidência exigida:** recibo da configuração, logs sanitizados, registros CRM, prova de calendário teste e aceite humano.

## Handoff e operação

- **Como demonstrar:** criar um agendamento de lead sintético elegível, repetir o pedido, cancelar/no-show e consultar o histórico.
- **Como operar:** champion mantém disponibilidade e exceções; responsável trata a fila; administrador controla OAuth.
- **Como monitorar:** eventos sem referência, erros OAuth, callback duplicado e agendamentos vencidos.
- **Pendência conhecida:** conector só pode ser implementado após prova de acesso e configuração do champion.

## Tasks vinculadas

| ID | Task | Dono | SPEC | Critério | Recorte da prova | Evidência esperada | Pré-condições | Status |
|---|---|---|---|---|---|---|---|---|
| F3-T01 | Confirmar contrato de agenda e acesso | Champion | 3-001 | CA-3-001/004 | RED configuração ausente | recibo de campos e acesso teste | nenhum | PENDENTE |
| F3-T02 | Implementar agendamento idempotente | Responsável técnico | 3-001 | CA-3-001/002 | GREEN lead elegível/não elegível | logs/refs sintéticos | F3-T01 | BLOQUEADA |
| F3-T03 | Provar bordas de agenda | Responsável técnico + champion | 3-001 | CA-3-003/004 | regressão cancelamento/no-show/timeout | roteiro e aceite | F3-T02 | BLOQUEADA |

## Emendas

| Data | Origem do sinal | Micro-spec/task | Motivo |
|---|---|---|---|
| 2026-09-04 | decisão Navaar | F3-T01 | cadência e decisões de operação ficam sob aprovação do champion |
