# Changelog — Projeto Terceirizou Terceirização Empresarial

> Registro de tudo que acontece no projeto, em ordem cronológica inversa.

- 2026-10-19 · [Adapta/Consultor] · F4 `b7c2faea` IMPLEMENTADA (autorização de Navaar): `PainelQualidadeCampanha.tsx` — comparação de quantidade (recebidos/agendados/convertidos) e qualidade por campanha, read-only, fonte/período declarados, vazio ≠ zero (RN-4-204); coluna de qualificados exibe pendência B4-203 até aprovação da métrica pelo champion. QA no Skip pendente: projeto 51268 fora da visibilidade do conector ("Project not found" em 19/10). Aguardando teste humano do champion.
- 2026-10-19 · [Adapta/Consultor] · Prazos da F4 reprogramados (autorização de Navaar; 30/09/2026 vencido): nova janela 06/11–04/12/2026; IDs de 2bbfc9b9/c798e86f reconciliados da Jornada canônica do Drive; estado 2/8 sincronizado com o Drive (achado EF-01).
- 2026-09-22 · [Vinicius/Champion] · F4 `cd704a1c` TESTE HUMANO APROVADO: "testei no preview e funcionou".
- 2026-09-22 · [Adapta/Ethos] · F4 `cd704a1c` CONCLUÍDA: interface nova passou a ler leads reais via PocketBase e exibir campanha/anúncio Meta, status e proveniência; 50 leads avaliados, 44 espelhados, 6 sem dado Meta, 0 divergentes; implementação Skip v0.0.79 (`b2e260c`), fechamento documental final v0.0.86 (`bf6640a`), todos QA 5/5; commit de implementação `91f36b3`.
- 2026-09-22 · [Adapta/Ethos] · F4 `cd704a1c` espelho Meta técnico validado: leitura de 76 anúncios, 12 conjuntos e 6 campanhas; idempotência confirmada e zero escrita no Meta.
- 2026-09-17 · [Adapta/Ethos] · F3-T05-CORREÇÃO RESEND implementada no hook `followup_lead.js`: remetente Terceirizou preservado; adicionados `User-Agent`, `Idempotency-Key` estável por lead/cadência/tentativa e tratamento sanitizado de erro de transporte. QA aprovado no Skip v0.0.62 / 7a3d748; aguardando teste humano.

## Registro

- 2026-08-25 · [Vinicius/Champion] · F1-T10 TESTE APROVADO: "Tudo certo.. Pode seguir."
- 2026-08-25 · [Adapta/Ethos] · F1-T10 FECHADA: CA-1-009 a CA-1-012 comprovados; RLS do error_log corrigido pela migration 0005; Fase 1 encerrada com 10/10 tasks.
- 2026-08-25 · [Adapta/Ethos] · QA final Skip aprovado na versão v0.0.26 / 94fe26d.
- 2026-08-25 · [Adapta/Ethos] · F1-T10 corrigida: leitura anônima da fila bloqueada; relatório final registrado.
- 2026-08-25 · [Adapta/Ethos] · Auditoria Skip/GitHub: F1-T10 não possuía evidência; status corrigido para pendente.
- 2026-08-21 · [Vinicius/Champion] · F1-T09 TESTE APROVADO.
- 2026-08-21 · [Adapta/Ethos] · F1-T09 FECHADA: replay manual e fila de recuperação.
- 2026-08-21 · [Vinicius/Champion] · F1-T08 TESTE APROVADO.
- 2026-08-21 · [Adapta/Ethos] · F1-T08 FECHADA: error_log, logging e política de recuperação.
- 2026-08-21 · [Vinicius/Champion] · F1-T07 TESTE APROVADO.
- 2026-08-21 · [Adapta/Ethos] · F1-T07 FECHADA: validação e ausência de falso sucesso.
- 2026-08-21 · [Vinicius/Champion] · F1-T06 TESTE APROVADO.
- 2026-08-20 · [Vinicius/Champion] · F1-T05 TESTE APROVADO.
- 2026-08-19 · [Vinicius/Champion] · F1-T02 TESTE APROVADO.
- 2026-08-19 · [Vinicius/Champion] · F1-T04 TESTE APROVADO.
- 2026-08-19 · [Vinicius/Champion] · F1-T01 TESTE APROVADO.
