# SPEC-3-002 — Follow-up por e-mail via Resend, controlado pelo champion

**Fase:** 3 — Sistema de agendamento, contato e follow-up
**Status:** planejada
**Dono:** champion configura e aprova cadência/conteúdo; responsável técnico implementa somente a configuração aprovada
**Origem no escopo:** `02-Escopo-Definitivo.md`, Fase 3, linhas 160–183; decisão Navaar de 04/09/2026
**Degrau da solução:** automação controlada — e-mails via Resend, sem WhatsApp e sem agente decidir cadência, público ou mensagem.

## Contexto e decisões fechadas

- **Estado atual:** Fase 2 registra elegibilidade, responsável e próxima ação. Não há automação F3 no plano.
- **Estado desejado:** follow-up por e-mail é enviado apenas a leads elegíveis, com cada tentativa, resultado e parada registrados no CRM; exceções voltam ao atendimento humano.
- **Decisões fechadas:** provedor = Resend API; canal WhatsApp não pertence à F3; champion é dono da cadência, modelos, remetente aprovado, destinatários elegíveis e regras de parada.
- **Bloqueios:** não criar chave, domínio, template, agendamento ou enviar e-mail até o champion registrar/aprovar: sequência (quantidade e intervalos), conteúdo/modelos, remetente, público, timezone, limites, política de consentimento/base legal, descadastro e responsáveis por exceção.

## Resultado observável

Em massa sintética autorizada, um lead elegível percorre a cadência configurada pelo champion. Cada envio fica com identificador Resend, template/versão, destinatário mascarado, data, status e próxima ação. Resposta, agendamento, cancelamento, no-show, descadastro, erro permanente ou limite de tentativas interrompem automaticamente os novos envios.

## Limites e dependências

- **Inclui:** contrato mínimo Resend, cofre de segredo, cadência parametrizada pelo champion, disparo idempotente, logs e paradas, webhook/evento de entrega quando habilitado.
- **Fora de escopo:** WhatsApp, envio em massa sem consentimento, criação autônoma de copy/cadência, alteração de campanhas, enriquecimento externo e reativação em massa.
- **Entradas:** lead qualificado/elegível; e-mail válido; consentimento/base legal e origem registrados; configuração ativa do champion; chave Resend em segredo; domínio/remetente verificado.
- **Saídas:** evento de follow-up, versão da cadência/template, status de entrega, motivo de parada, próxima ação e falha visível.
- **Atores/permissões:** champion configura/aprova; responsável trata respostas/falhas; administrador armazena segredo e acesso; marketing não altera atendimento nem destinatário sem permissão.
- **Risco/plano B:** domínio/chave inválidos, bounces, duplicidade, bloqueio de consentimento ou webhook indisponível → pausar sequência, registrar falha sem PII desnecessária e devolver ao responsável humano.
- **Rollback:** desativar cadência, revogar chave no cofre, impedir novos envios e preservar eventos já registrados.

## Dados e integrações

| Origem/destino | Fonte de verdade | Campos/contrato | Autenticação/permissão | Timeout/retry/idempotência | Tratamento de erro |
|---|---|---|---|---|---|
| CRM → Resend | CRM para elegibilidade/parada; Resend para envio | `lead_id`, e-mail, template/versão, sequência, tentativa, `idempotency_key` | chave somente em secret manager; domínio/remetente verificados | `lead_id + cadência + tentativa`; retry só em falha transitória e dentro da regra do champion | bounce/erro permanente pausa e abre tarefa |
| Resend → CRM | Resend para entrega/bounce; CRM para estado | `resend_email_id`, evento, timestamp, razão | assinatura de webhook se configurada; rejeitar evento não verificável | deduplicar por ID de evento | evento desconhecido não altera estado; vai à fila |

| Regra | Condição | Ação/resultado | Exceção |
|---|---|---|---|
| RN-3-101 | configuração de cadência/modelo não aprovada | zero envio | pendência visível ao champion |
| RN-3-102 | lead inelegível, sem e-mail válido, sem consentimento/base legal | zero envio | próxima ação humana |
| RN-3-103 | resposta, agendamento, cancelamento, no-show ou descadastro | pausar definitivamente a cadência | preservar histórico |
| RN-3-104 | tentativa máxima/intervalo | obedecer valores ativos aprovados pelo champion | agente não altera valores |
| RN-3-105 | bounce/erro permanente | pausar e criar exceção | sem retry automático |

## Fluxo e regras

1. Champion registra e aprova versão de cadência e modelos; administrador prova domínio/chave em ambiente teste.
2. Sistema valida elegibilidade e estado de parada antes de cada tentativa.
3. Dispara somente a tentativa prevista pela configuração e grava referência idempotente.
4. Processa resposta/agenda/descadastro/bounce como evento de parada.
5. Expõe falha, atraso ou pendência ao responsável e preserva histórico.

| Cenário | Dado/condição | Resultado esperado | Recuperação |
|---|---|---|---|
| Principal | configuração aprovada + lead elegível | uma tentativa autorizada registrada | — |
| Limite | resposta/agenda/descadastro | nenhuma próxima tentativa | estado terminal + handoff |
| Falha | chave, domínio, timeout ou bounce | nenhum falso sucesso/duplicidade | pausar + fila humana |

## Instruções de execução para o Ethos

1. Ler esta SPEC, a SPEC 3-001 e os artefatos F2 que definem elegibilidade.
2. Alterar apenas os campos/eventos e o conector explicitamente aprovados pelo champion.
3. Não criar cadência, texto, remetente, lista, chave, domínio, envio real ou integração WhatsApp por inferência.
4. Executar RED, GREEN e regressão em ambiente de teste, com fixtures sintéticas e destinatário permitido.
5. Parar se consentimento/base legal, configuração do champion, segredo, domínio, webhook ou parâmetro de parada estiver ausente.
6. Estado válido ao parar: nenhum e-mail enviado; CRM/manual continuam operáveis; segredo fora do Git.

## Checklist de execução

- [ ] champion aprovou parâmetros e modelos
- [ ] segredo/domínio/resend de teste validados
- [ ] elegibilidade e parada verificadas antes de enviar
- [ ] duplicidade, bounce, descadastro e timeout exercitados
- [ ] log/aceite humano anexados

## Critérios de aceite

- [ ] **CA-3-101:** sem configuração aprovada, inelegibilidade ou ausência de consentimento/base legal, nenhum e-mail é enviado.
- [ ] **CA-3-102:** tentativa autorizada é enviada uma única vez, com referência Resend e versão de cadência/template registradas no CRM.
- [ ] **CA-3-103:** resposta, agendamento, cancelamento, no-show, descadastro, bounce permanente e limite da cadência param novos envios e preservam histórico.
- [ ] **CA-3-104:** chave não é versionada; falha de API/domínio/webhook não cria falso sucesso e fica visível ao responsável.

## TDD da SPEC

| Etapa | Prova | Ação | Resultado esperado | Evidência |
|---|---|---|---|---|
| RED | configurar lead inelegível, sem consentimento e configuração ausente | executar scheduler/ação de teste | zero chamada Resend e pendência registrada | log/contagem CRM |
| GREEN | champion aprova uma cadência e fixture elegível | enviar tentativa de teste e repetir a execução | um `resend_email_id`, sem duplicidade | registro CRM + sandbox Resend |
| REFACTOR/REGRESSÃO | resposta/agenda/descadastro/bounce/timeout | receber evento ou simular retorno | parada, histórico e exceção corretos | roteiro, logs sanitizados e aceite |

**Dados/fixtures:** leads sintéticos elegível/inelegível/sem consentimento, destinatário de teste aprovado, domínio sandbox e templates aprovados pelo champion.
**Caminhos de erro obrigatórios:** token ausente, domínio não verificado, timeout, 4xx/5xx, bounce, webhook duplicado/não assinado, descadastro e resposta.
**Evidência exigida:** recibo de configuração do champion, prova sandbox, logs sanitizados, referência Resend, estados CRM e aceite humano.

## Handoff e operação

- **Como demonstrar:** aprovar uma cadência de teste, processar lead sintético, repetir a tarefa e disparar um evento de parada; conferir histórico/nenhum duplicado.
- **Como operar:** champion revisa cadência, mensagens e limites; responsável trata respostas/exceções; administrador mantém domínio/segredo.
- **Como monitorar:** tentativas vencidas, sequência sem config, bounces, falhas de API e taxa de eventos sem correlação.
- **Pendência conhecida:** não há cadência, modelo ou base legal registrados; F3-T04 é condição para qualquer envio.

## Tasks vinculadas

| ID | Task | Dono | SPEC | Critério | Recorte da prova | Evidência esperada | Pré-condições | Status |
|---|---|---|---|---|---|---|---|---|
| F3-T04 | Registrar configuração do champion e validar Resend sandbox | Champion | 3-002 | CA-3-101/104 | RED sem configuração/consentimento | recibo aprovado e sandbox | nenhum | PENDENTE |
| F3-T05 | Implementar sequência idempotente por e-mail | Responsável técnico | 3-002 | CA-3-101/102 | GREEN uma tentativa repetida | CRM + sandbox Resend | F3-T04 | BLOQUEADA |
| F3-T06 | Implementar eventos de parada e exceções | Responsável técnico | 3-002 | CA-3-103/104 | regressão resposta/bounce/timeout | log e estados | F3-T05; integração de agenda se houver evento | BLOQUEADA |
| F3-T07 | Provar a cadência F3 e obter aceite | Champion | 3-002 | CA-3-101..104 | roteiro ponta a ponta sintético | recibo + aceite | F3-T06 | BLOQUEADA |

## Emendas

| Data | Origem do sinal | Micro-spec/task | Motivo |
|---|---|---|---|
| 2026-09-04 | decisão Navaar | F3-T04 | champion é responsável por definir e aprovar cadência, modelos e regras de parada |
