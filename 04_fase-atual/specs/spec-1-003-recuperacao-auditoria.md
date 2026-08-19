# SPEC-1-003 — Recuperação de entradas, auditoria e reconciliação controlada

**Fase:** 1  
**Status:** bloqueada  
**Dono:** Responsável técnico pela operação, com aprovação do administrador e do responsável comercial  
**Origem no escopo:** RQ-003, RQ-004 e RQ-012; AC-001, AC-006 e AC-009; Fase 1  
**Degrau da solução:** recurso nativo da plataforma — usar fila, histórico e alertas nativos do sistema/conector confirmado; construir apenas o mínimo que não existir, sem criar repositório paralelo de dados pessoais.

## Contexto e decisões fechadas

- **Estado atual:** a automação CRM atual falha sem explicar por que novos leads não sobem nem por que follow-up deixa de funcionar; o mapeamento de processos está vazio e a análise alerta que o vídeo correspondente não deve ser tratado como prova de tela.
- **Estado desejado:** toda entrada inválida, duplicada, indisponível ou não autorizada fica visível com motivo seguro, responsável, estado de recuperação e evidência de resolução; a fonte histórica continua preservada até reconciliação.
- **Decisões já fechadas:** falha não é ausência de lead; reprocessamento é controlado; alterações importantes têm histórico; RLS limita leitura/escrita; a planilha não é sobrescrita silenciosamente.
- **Bloqueios:** confirmar capacidade e nome do sistema de fila/log, retenção, responsável operacional, timeout/retry, formato de alerta e conta de teste. Não definir esses parâmetros por suposição.

## Resultado observável

Ao provocar erro de validação, permissão ou disponibilidade, o operador encontra um item de recuperação com referência segura do evento, categoria, horário, tentativa, responsável e próxima ação. Após corrigir a causa, um replay controlado resolve o item sem criar duplicidade e registra a resolução. Uma reconciliação curta compara a fonte anterior com o sistema central sem apagar a fonte.

## Limites e dependências

- **Inclui:** fila/estado de recuperação; erro redigido; responsável e próxima ação; histórico; replay controlado; reconciliação da amostra; pausa e rollback operacional.
- **Fora de escopo:** retry autônomo em produção sem parâmetro aprovado; migração integral; scoring; agenda; follow-up; Meta; loops; correção de campanha; exclusão de dados históricos.
- **Entradas e pré-condições:** SPEC-1-001 e SPEC-1-002 aprovadas para teste; plataforma e conector confirmados; papel operacional; amostra sintética; fonte anterior disponível; regra de retenção e acesso confirmada.
- **Saídas/artefatos:** fila de recuperação; histórico de tentativa; alerta/visão operacional; relatório de reconciliação da amostra; registro de rollback/pause quando usado.
- **Dependências e responsáveis:** técnico define diagnóstico; administrador controla permissões; comercial confirma prioridade e resultado; cliente confirma retenção e responsável substituto.
- **Atores e permissões mínimas:** serviço cria item; técnico lê/reprocessa itens autorizados; administrador configura; comercial consulta impacto do lead sem acessar segredo; marketing não opera a fila.
- **Superfícies/arquivos/configurações afetadas:** fila, logs, alertas e configuração de pausa no sistema confirmado; nenhum payload completo de lead deve ser gravado no workspace.
- **Risco e plano B:** replay sem idempotência duplica oportunidade; manter replay manual pausado e planilha preservada até a prova; se a plataforma não tiver fila, registrar apenas metadados redigidos em superfície aprovada pelo cliente.
- **Rollback ou reversão:** pausar a entrada; manter itens em `manual_review`; desfazer configuração de retry/alerta; reconciliar antes de reabrir; nunca apagar falhas para “limpar” a fila.

## Dados e integrações

| Origem/destino | Fonte de verdade | Campos/contrato | Autenticação/permissão | Timeout/retry/idempotência | Tratamento de erro |
|---|---|---|---|---|---|
| Entrada → fila | Registro do conector/sistema confirmado | `error_id`, `received_at`, `source_event_id` ou hash seguro, categoria, resumo redigido, tentativa, estado, dono, próxima ação, `resolved_at` | Serviço cria; técnico/administrador acessam por papel; sem segredo no item | Parâmetros de timeout/retry dependem do setup; Fase 1 começa com replay manual controlado | Manter item até resolução ou encerramento justificado; não ocultar |
| Fila → sistema central | Registro de evento + sistema central | Referência do evento, destino, resultado, `dedup_key`, antes/depois seguro | Permissão mínima de atualização; replay com aprovação operacional | Requer chave idempotente da SPEC-1-002; sem chave, não reprocessar automaticamente | Colisão vai para `manual_review` |
| Sistema central ↔ fonte histórica | Fonte anterior preservada | Amostra de IDs, data, campos de reconciliação e divergência | Leitura restrita; não copiar dados sem necessidade | Não sobrescrever automaticamente | Divergência gera pendência com dono e ação |

| Regra de negócio | Condição | Ação/resultado | Exceção | Fonte |
|---|---|---|---|---|
| RN-1.010 | Falha de entrada | Criar item redigido na fila e manter referência do evento | Falha ao criar fila exige alerta operacional e pausa da entrada | Escopo F1, itens 113 e 123 |
| RN-1.011 | Replay solicitado | Exigir motivo, operador e chave idempotente; processar uma vez | Sem chave ou com colisão, somente revisão manual | Regras globais, item 88 |
| RN-1.012 | Item resolvido | Registrar resultado, horário, operador e vínculo ao registro central | Não marcar resolvido sem evidência | Critério F1, item 125 |
| RN-1.013 | Divergência com fonte anterior | Registrar diferença e responsável; não apagar a fonte | Dado conflitante bloqueia reconciliação automática | AC-009 e risco de escopo |
| RN-1.014 | Log ou alerta contém PII/segredo | Redigir ou omitir valor; preservar somente referência segura | Exposição interrompe a prova e exige revogação/rotação | Regras de privacidade e segurança |

## Fluxo e regras

1. Confirmar plataforma, fila, retenção, papéis, responsável, alerta, timeout/retry e ambiente de teste.
2. Provocar uma falha sintética de validação e uma falha controlada de permissão/disponibilidade.
3. Verificar item de recuperação redigido, estado, responsável, próxima ação e alerta.
4. Corrigir a causa e executar replay manual com motivo e operador.
5. Verificar idempotência, resolução e histórico.
6. Reconciliar uma amostra contra a fonte anterior e registrar divergências.
7. Se qualquer falha não for visível ou o replay puder duplicar, pausar a entrada e parar.

| Cenário | Dado/condição | Resultado esperado | Caminho de erro/recuperação |
|---|---|---|---|
| Principal | Evento inválido sintético | Item `manual_review`/estado equivalente, motivo seguro, dono e próxima ação | Corrigir e reprocessar somente com aprovação |
| Retry | Evento com destino indisponível | Falha visível sem falso sucesso; parâmetros de retry conforme setup | Pausar ou aguardar política aprovada; não repetir indefinidamente |
| Replay | Causa corrigida e chave idempotente válida | Registro central resolvido sem nova oportunidade | Colisão bloqueia replay e chama revisão técnica |
| Reconciliação | Amostra da planilha e sistema central | IDs e divergências documentados; planilha intacta | Divergência tem dono e prazo antes da abertura da entrada |
| Segurança | Usuário não autorizado consulta fila ou log | Acesso negado, sem vazamento de PII/segredo | Administrador revê RLS e registra incidente se houver exposição |

## Instruções de execução para o Ethos

1. **Ler antes de alterar:** `03-Projeto/02-Escopo-Definitivo.md` seção Fase 1; `03-Projeto/02-Plano_de_acao/matriz-de-rastreabilidade.md`; SPEC-1-001; SPEC-1-002; `04-Mapeamento-Processos/02-Processos_mapeados/01-Otimização processo Comercial.md`.
2. **Alterar somente:** fila, logs redigidos, alertas, pausa e replay controlado na conta de teste confirmada.
3. **Não alterar:** fonte histórica, produção, credenciais, dados reais, scoring, agenda, campanhas ou políticas de retenção sem aprovação.
4. **Executar nesta ordem:** confirmar parâmetros; provar falha; conferir fila; corrigir; replay; reconciliar; anexar evidências.
5. **Parar e pedir validação quando:** não houver responsável, alerta, retenção, chave idempotente, RLS, registro seguro ou rollback; qualquer log contiver segredo/PII não necessário.
6. **Estado válido ao parar:** entrada pausada se necessário, itens preservados, fonte anterior intacta, sem replay cego e com próximo dono explícito.

## Checklist de execução

- [ ] Plataforma, fila, conta de teste, papéis, responsável e substituto confirmados.
- [ ] Retenção, timeout, retry, alerta e condição de pausa documentados.
- [ ] Falha inválida cria item seguro e visível.
- [ ] Falha de permissão/disponibilidade é distinguível de lead ausente.
- [ ] Replay exige motivo, operador e chave idempotente.
- [ ] Replay não cria duplicidade.
- [ ] Resolução e histórico são auditáveis.
- [ ] Reconciliação preserva a fonte anterior.
- [ ] Logs/capturas não expõem segredo ou PII desnecessário.

## Critérios de aceite

- [ ] **CA-1-009:** falha sintética aparece na fila com referência segura, categoria, horário, responsável e próxima ação.
- [ ] **CA-1-010:** após correção, replay controlado resolve o evento sem criar segunda oportunidade e registra operador/motivo.
- [ ] **CA-1-011:** reconciliação de amostra registra correspondências e divergências sem modificar a fonte anterior.
- [ ] **CA-1-012:** usuário sem permissão não lê fila, log ou dados fora do papel; nenhuma evidência entregue contém segredo ou PII desnecessário.

## TDD da SPEC

| Etapa | Prova | Comando/ação | Resultado esperado | Evidência |
|---|---|---|---|---|
| RED | Baseline de falha atual | Provocar erro sintético na automação existente e verificar se há motivo, dono, recuperação e prova de não duplicidade | Pelo menos um CA falha ou não é demonstrável; registrar a lacuna | Captura/log redigido do baseline |
| GREEN | Fila, pausa e replay controlado | Gerar falha inválida, corrigir causa, executar replay com evento sintético e conferir central | CA-1-009 e CA-1-010 passam; fila registra ciclo completo | Item de fila, IDs, histórico e contagem antes/depois |
| REFACTOR/REGRESSÃO | Reconciliação e acesso negativo | Comparar amostra com fonte anterior e testar acesso de papéis não autorizados | CA-1-011 e CA-1-012 passam; provas anteriores permanecem válidas | Relatório de reconciliação, matriz RLS e evidências redigidas |

**Dados/fixtures:** eventos sintéticos inválidos, destino indisponível controlado, conta sem permissão, amostra fictícia da fonte anterior e lead sintético; nenhum segredo ou dado real.  
**Caminhos de erro obrigatórios:** fila indisponível, timeout, retry, replay sem chave, colisão, acesso negado, log sensível e divergência de reconciliação.  
**Evidência exigida:** itens de fila, alertas, histórico, contagens antes/depois, relatório de reconciliação, matriz de acesso e aceite do responsável.

## Handoff e operação

- **Como demonstrar:** gerar erro sintético, localizar a fila, corrigir, reprocessar uma vez e mostrar resolução sem duplicidade.
- **Como operar depois:** técnico trata diagnóstico; administrador controla acesso e pausa; comercial confirma impacto e prioridade.
- **Como monitorar:** fila aberta, idade do item, falhas por categoria, replay, divergência e tentativas de acesso negado.
- **Pendência conhecida:** capacidades da plataforma, parâmetros operacionais, responsável, retenção e política de retry aguardam confirmação do setup.

## Tasks vinculadas

| ID | Task | Dono | SPEC | Critério | Recorte da prova | Evidência esperada | Pré-condições | Status |
|---|---|---|---|---|---|---|---|---|
| F1-T08 | Confirmar política de fila, retenção, retry, alerta, RLS e pausa | Responsável técnico do cliente | SPEC-1-003 | Política de recuperação e responsáveis confirmados por escrito | `## Contexto e decisões fechadas` — Bloqueios; `## Dados e integrações` | Política, responsáveis, matriz de acesso e ambiente de teste | Aprovação do cliente e capacidades reais da plataforma | PENDENTE |
| F1-T09 | Configurar fila, erro redigido, pausa e replay manual | Responsável técnico | SPEC-1-003 | Falha vira item seguro; replay exige motivo/operador/chave; fonte permanece preservada para reconciliação | `## Fluxo e regras` — passos 2–5 | Item, alerta, histórico e configuração de pausa | F1-T02, F1-T05 e F1-T08 | BLOQUEADA |
| F1-T10 | Provar falha, replay, reconciliação e RLS para handoff | Responsável comercial | SPEC-1-003 | CA-1-009 a CA-1-012 passam | `## Critérios de aceite`; `## TDD da SPEC` — GREEN/REGRESSÃO | Fila, contagens, relatório, matriz RLS e aceite | F1-T09; fixtures sintéticas | BLOQUEADA |

## Emendas

<!-- Append-only (D19): mudanças aprovadas depois da geração. A história não é reescrita. -->

| Data | Origem do sinal | Micro-spec/task | Motivo |
|---|---|---|---|
| | | | |
