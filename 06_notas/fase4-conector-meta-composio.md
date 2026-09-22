# Conector Meta via Composio — funções de leitura (SPEC-4-001)

Cliente Python organizado por função, sobre a API v3.1 do Composio
(base `https://backend.composio.dev/api/v3.1`, auth `x-api-key`).
Arquivo: `scripts/fase4_meta/composio_meta_client.py` (fonte de verdade operacional).

## Regras da SPEC embutidas no cliente

- **Somente leitura**: `TOOLS_LEITURA` fixa os slugs aprovados (B4-103) — nenhum slug de escrita (create/update/delete) existe no módulo.
- **Credencial**: `COMPOSIO_API_KEY` via ambiente/cofre; nunca em Git ou log. Sem chave → erro explícito (nunca falso sucesso).
- **Retry**: só em 429/5xx/transporte, com backoff curto e teto (RN-4-104) — sem retry infinito.
- **Ausência**: funções retornam o dado cru + erros explícitos; lacuna é visível, nunca zero (RN-4-102).

## Funções (mapa de uso)

| Função | Tool Composio | Para que serve | Entrada mínima |
|---|---|---|---|
| `contas_conectadas()` | — (REST `/connected_accounts`) | Provar conexão ativa do toolkit metaads | — |
| `listar_contas()` | `METAADS_GET_AD_ACCOUNTS` | Contas de anúncios acessíveis (confirma B4-101) | — |
| `listar_campanhas(account_id)` | `METAADS_LIST_CAMPAIGNS` | Campanhas da conta | account_id |
| `listar_anuncios(account_id, campanha_id?)` | `METAADS_LIST_ADS` | Anúncios da conta ou da campanha | account_id |
| `insights_campanha(account_id, campanha_id, ini, fim)` | `METAADS_GET_INSIGHTS` | Métricas na janela aprovada (B4-104) | ids + datas YYYY-MM-DD |
| `criativo(ad_creative_id)` | `METAADS_GET_AD_CREATIVE` | Detalhe do criativo p/ painel | creative_id |

## Fluxo da prova técnica (B4-103, timeboxed)

```python
from composio_meta_client import ComposioMeta
cm = ComposioMeta()  # COMPOSIO_API_KEY no ambiente

st, contas = cm.contas_conectadas()      # 1. conexão ativa?
st, ads   = cm.listar_contas()           # 2. conta de anúncios certa (B4-101)
st, cams  = cm.listar_campanhas('act_…') # 3. amostra de campanhas
st, ins   = cm.insights_campanha('act_…', 'camp_id', '2026-08-18', '2026-09-17')  # 4. janela B4-104
```

## Pendente para a prova

- `COMPOSIO_API_KEY` do projeto (champion fornece; vai para o cofre do Skip como `COMPOSIO_API_KEY`).
- `connected_account_id` da conexão metaads (aparece em `contas_conectadas()`).
- Confirmação por escrito da conta de anúncios (B4-101) e da janela (B4-104).
