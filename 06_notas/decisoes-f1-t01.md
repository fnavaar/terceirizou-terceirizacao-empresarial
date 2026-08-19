# Decisões — F1-T01: Confirmação da Plataforma Central

> **Task:** F1-T01 · **SPEC:** spec-1-001-modelo-pipeline.md · **Data:** 2026-08-19 · **Champion:** Vinicius (CEO)

## 1. Plataforma Central

- **Decisão:** Skip (Skip Cloud)
- **Projeto:** CRM Oficial (projectId 51268)
- **Hostname:** crm-oficial-65bb8
- **Backend:** PocketBase (https://crm-oficial-65bb8.shrd00.internal.goskip.dev)
- **Ambiente:** Conta de teste (preview + produção após publish)

## 2. Papéis e Responsáveis

| Papel | Responsável | Permissões (conforme SPEC) |
|---|---|---|
| Responsável comercial | Henrique Tavano | Lê e edita sua carteira; cria leads |
| Administrador do projeto | Vinicius | Configura, audita e gerencia papéis |
| Marketing | Henrique Tavano | Lê campos de origem conforme permissão |

## 3. Campos Obrigatórios

Todos os 14 campos da SPEC são obrigatórios:

| # | Campo | Tipo |
|---|---|---|
| 1 | lead_id | UUID/identificador único |
| 2 | opportunity_id | UUID/identificador único |
| 3 | nome | Texto |
| 4 | e-mail | E-mail |
| 5 | telefone | Telefone |
| 6 | respostas | Texto/JSON |
| 7 | origem | Texto (ex: formulário, indicação) |
| 8 | campanha | Texto |
| 9 | anúncio/criativo | Texto |
| 10 | created_at | Data/hora |
| 11 | updated_at | Data/hora |
| 12 | responsável | Referência ao papel |
| 13 | estágio | Enum (capturado, aguardando_dados, encerrado_entrada_invalida) |
| 14 | dedup_key | Texto/SHA (chave de deduplicação) |

## 4. Capacidade de RLS

- **Confirmado:** Skip (PocketBase) suporta RLS via scopeFilter (filtro por usuário autenticado)
- **Observação:** Não é RLS nativo de banco relacional, mas funciona via hooks e filtros de API do PocketBase

## 5. Fonte de Transição

- A planilha de transição (Google Sheets) permanece como fonte histórica preservada
- Somente leitura durante a transição
- Nenhuma sobrescrita silenciosa

---

**Registro:** 2026-08-19 · Champion Vinicius confirmou todas as 5 decisões via chat.
