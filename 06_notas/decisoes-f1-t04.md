# Decisões — F1-T04: Contrato de Captura e Idempotência

> **Task:** F1-T04 · **SPEC:** spec-1-002-captura-idempotencia.md · **Data:** 2026-08-19 · **Champion:** Vinicius (CEO)

## 1. Formulário (Fonte de Dados)

- **Ferramenta:** Google Sheets
- **Planilha 1 — Meta Ads:** https://docs.google.com/spreadsheets/d/1I5F4-NMzkkaStAyVKrO89Dulfi-1POXZHVPZNLRv02A
  - Aba: Leads Meta Ads - Jun.26
  - Colunas: Data/Hora, Nome completo, Email, Telefone, É prestador de serviços?, Segmento, Cargo, Gestão financeira, Maior problema, Motivação, Nome Anúncio, Conjunto de Anúncio, Campanha
- **Planilha 2 — Cora:** https://docs.google.com/spreadsheets/d/1TYe2__HmgLUhqOoudmxm-I2fL94wKSJ8ThmXmbCUXfY
  - Aba: Principal
  - Colunas: data_envio, nome, cnpj_ou_cpf, tipo_empresa, email, telefone, servico_desejado, ramo_atividade, segmento, estado, cidade, preferencia_atendimento, status_atendimento, observação/comentários

## 2. Conector

- **Tipo:** Google Apps Script → webhook Skip
- **Mecanismo:** Google Apps Script dispara ao detectar nova linha na planilha e envia payload HTTP para o endpoint webhook do Skip
- **Direção:** Google Sheets → Skip (unidirecional)
- **Frequência:** Real-time (trigger on edit)

## 3. Evento

- **Trigger:** Nova linha adicionada na planilha
- **Payload:** JSON com campos mapeados da planilha
- **Identificação:** source_event_id = hash SHA-256 da combinação (email + data_envio)

## 4. Mapeamento de Campos

### Meta Ads → Skip

| Coluna Planilha | Campo Skip | Tipo |
|---|---|---|
| Data/Hora | created_at | Data/hora |
| Nome completo | nome | Texto |
| Email | email | E-mail |
| Telefone | telefone | Telefone |
| É prestador de serviços? | respostas.prestador | Texto |
| Qual o segmento? | respostas.segmento | Texto |
| Qual seu cargo? | respostas.cargo | Texto |
| Quem faz gestão financeira? | respostas.gestao_financeira | Texto |
| Maior problema na gestão? | respostas.maior_problema | Texto |
| O que motivou? | respostas.motivacao | Texto |
| Nome do Anúncio | anuncio_criativo | Texto |
| Conjunto de Anúncio | campanha | Texto |
| Campanha | origem | Texto (fixo: meta_ads) |
| — | dedup_key | SHA-256(email + data) |
| — | lead_id | UUID gerado pelo Skip |
| — | opportunity_id | UUID gerado pelo Skip |
| — | estágio | capturado |
| — | responsável | Henrique Tavano (padrão) |

### Cora → Skip

| Coluna Planilha | Campo Skip | Tipo |
|---|---|---|
| data_envio | created_at | Data/hora |
| nome | nome | Texto |
| email | email | E-mail |
| telefone | telefone | Telefone |
| cnpj_ou_cpf | respostas.cnpj_cpf | Texto |
| tipo_empresa | respostas.tipo_empresa | Texto |
| servico_desejado | respostas.servico_desejado | Texto |
| ramo_atividade | respostas.ramo_atividade | Texto |
| segmento | respostas.segmento | Texto |
| estado | respostas.estado | Texto |
| cidade | respostas.cidade | Texto |
| preferencia_atendimento | respostas.preferencia | Texto |
| — | origem | Texto (fixo: cora) |
| — | dedup_key | SHA-256(email + data_envio) |
| — | lead_id | UUID gerado pelo Skip |
| — | opportunity_id | UUID gerado pelo Skip |
| — | estágio | capturado |
| — | responsável | Henrique Tavano (padrão) |

## 5. Chave de Idempotência

- **Primária:** `email`
- **Fallback:** `telefone` (quando email estiver ausente)
- **Sem chave:** estado `aguardando_dados` (conforme RN-1.007)
- **Deduplicação:** SHA-256(email + data_envio) = `dedup_key`

## 6. Consentimento

- **Status:** Coletado pela plataforma de origem
- **Meta Ads:** Checkbox de termos do formulário instantâneo do Facebook
- **Cora:** Indicação direta (parceiro/banco de indicações)
- **Campo explícito na planilha:** Não há
- **Pendência:** Conformidade LGPD — registrar fonte de consentimento em fase futura

---

**Registro:** 2026-08-19 · Champion Vinicius confirmou todas as 6 decisões via chat.
