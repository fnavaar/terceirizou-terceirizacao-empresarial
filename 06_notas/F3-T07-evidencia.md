# F3-T07 — Evidência da prova final (roteiro ponta a ponta, 2026-09-16)

Ambiente: Skip v0.0.55 (hash ea8471e), QA 5/5. Leads sintéticos criados para a prova.

| # | Lead | Cenário | CA | Resultado observado | Status |
|---|------|---------|----|---------------------|--------|
| 1 | f3t07-inelegivel (roieix24tsx3y2a) | sem qualificação (pendente_revisao) | CA-3-101 | disparo → 409 lead_nao_qualificado, chamada_resend=false | ✅ |
| 2 | f3t07-elegivel (iz32sf2lcod6p8g) | qualificado, e-mail válido (champion) | CA-3-102 | t1 → 201 sent (resend 01a0ac22-ca7d); repetição → 200 already_sent, mesmo id | ✅ |
| 3 | f3t07-parada (ak445a14oayo740) | qualificado + parada descadastro | CA-3-103 | parada → 200 parado/nao_contatar; disparo → 409 followup_parado:descadastro | ✅ |
| 4 | f3t07-falha (96ybn28uvvwpdb7) | qualificado, domínio @example.invalid | CA-3-104 (variante) | Resend ACEITOU (201) — bounce é assíncrono; sem erro síncrono | ⚠️ nota |
| 5 | f3t07-falha2 (nnr3hkl33jhhby7) | qualificado, destinatário fora da allowlist do Resend | CA-3-104 | Resend 422 "use our testing email address" → hook 502 resend_indisponivel_ou_invalido + error_log (dono Henrique, pendente) + lead followup_estado=falha, sem envio_id | ✅ |

## CORREÇÃO (2026-09-17) — nota do lead 5 revisada por teste real

O diagnóstico original deste arquivo dizia "contas Resend sem pagamento só enviam para o próprio e-mail do dono da conta". **Estava errado.** Teste real em 17/09 com destinatário externo (oliveiradacosta.vinicius@gmail.com) → HTTP 200, recebido na caixa Gmail (confirmado pelo champion). A regra correta: o 422 rejeita **domínios reservados de teste** (example.com, example.invalid) — destinatários externos reais funcionam no plano Free com o domínio remetente verificado. A CA-3-104 continua provada (422 → 502 sem falso sucesso + fila), mudando apenas a causa raiz. Pendência de negócio do STATUS encerrada.

## Notas da prova

- **Lead 4 (variante):** domínios reservados (.invalid) não são rejeitados de forma síncrona pela API do Resend — aceita o envio e o bounce vem depois (webhook/evento, evolução futura). Não é falha do hook: é o comportamento do provedor.
- **Lead 5 (falha real):** destinatário em domínio reservado de teste → 422 síncrono → hook trata como falha (502 + error_log + lead em falha, sem falso sucesso). CA-3-104 provada pelo caminho real. *(Causa raiz corrigida acima em 17/09.)*
- **Chave:** durante a prova, RESEND_API_KEY foi substituída por chave inválida e restaurada em seguida (o 502 do lead 5 veio do 422 do Resend, não da chave — confirmado: chave real retorna 200 na API direta; chave inválida retorna 401). Runtime Skip carrega secret no boot: troca exige redeploy para propagar (v0.0.55).
- **E-mails reais recebidos pelo champion durante a prova:** lead 2 (D+0 da cadência v1.1) + 1 e-mail de validação pós-prova.