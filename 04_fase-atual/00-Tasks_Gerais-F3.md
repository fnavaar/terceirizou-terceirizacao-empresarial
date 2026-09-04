# Fase 3 — Tasks gerais

**Status:** planejada para execução controlada; no máximo uma task por vez, com teste humano e recibo antes da próxima.
**Decisões fechadas:** Google Calendar para autoagendamento; WhatsApp fora da Fase 3; Resend API para follow-up por e-mail; champion define/aprova cadência, modelos, remetente, elegibilidade e regras de parada.
**Limite:** nenhuma credencial, conector, evento real ou e-mail real é criado sem autorização, consentimento/base legal e prova em ambiente de teste.

| ID | Leva | Task | Dono | SPEC | Critério binário | Recorte da prova | Evidência esperada | Pré-condições | Ponto de parada | Status |
|---|---:|---|---|---|---|---|---|---|---|---|
| F3-T01 | 1 | Confirmar contrato do Google Calendar e acesso de teste | Champion | SPEC-3-001 § Contexto/Dados/TDD RED | CA-3-001, CA-3-004 | RED: configuração/OAuth ausente + lead inelegível não chamam Calendar | recibo de calendário, OAuth, ID, fuso, duração, janela, owner e regras de cancelamento/no-show | nenhuma | parar sem autorização OAuth, calendário teste ou regras do champion | PENDENTE |
| F3-T02 | 2 | Implementar autoagendamento idempotente para lead elegível | Responsável técnico | SPEC-3-001 § Fluxo/TDD GREEN | CA-3-001, CA-3-002 | GREEN: lead sintético elegível cria link/evento; repetição não duplica | `lead_id`, referência de evento e log sanitizado | F3-T01 | parar se exigir evento/agenda de produção ou novo dado não aprovado | BLOQUEADA |
| F3-T03 | 3 | Provar cancelamento, no-show e falha de agenda | Responsável técnico | SPEC-3-001 § Cenários/TDD REGRESSÃO | CA-3-003, CA-3-004 | cancelamento/no-show/timeout/callback repetido | histórico, fila/erro e aceite do champion | F3-T02 | manter aberta se houver falso sucesso, token exposto ou duplicidade | BLOQUEADA |
| F3-T04 | 1 | Champion registra cadência, modelos e controles; validar Resend sandbox | Champion | SPEC-3-002 § Contexto/Dados/TDD RED | CA-3-101, CA-3-104 | RED: sem config/consentimento gera zero envio | recibo de cadência/modelos/remetente/base legal, domínio e sandbox | nenhuma | parar se faltar consentimento/base legal, chave em cofre ou domínio validado | PENDENTE |
| F3-T05 | 2 | Implementar sequência de e-mail idempotente | Responsável técnico | SPEC-3-002 § Fluxo/TDD GREEN | CA-3-101, CA-3-102 | GREEN: fixture elegível gera uma tentativa mesmo sob repetição | referência Resend, versão e eventos CRM | F3-T04 | parar se houver envio real, segredo em Git ou parâmetro não aprovado | BLOQUEADA |
| F3-T06 | 3 | Implementar paradas, eventos e exceções do follow-up | Responsável técnico | SPEC-3-002 § Regras/TDD REGRESSÃO | CA-3-103, CA-3-104 | resposta/agendamento/cancelamento/no-show/descadastro/bounce/timeout | logs sanitizados, estados e fila humana | F3-T05; F3-T03 para evento de agenda integrado | parar se a parada não impedir novo envio ou apagar histórico | BLOQUEADA |
| F3-T07 | 4 | Provar jornada F3 em massa sintética e obter aceite | Champion | SPEC-3-001/002 § Handoff/TDD | CA-3-001..004; CA-3-101..104 | agenda + uma tentativa + evento de parada + erro controlado | roteiro, recibos, logs e aceite humano | F3-T03; F3-T06 | manter aberta se qualquer CA falhar | BLOQUEADA |

## Regra operacional

F3-T01 e F3-T04 são preparações independentes, porém o agente executa **somente uma task por vez**. A recomendação de ordem é F3-T01, depois F3-T04. Nenhuma task de implementação começa sem as respectivas configurações aprovadas pelo champion.
