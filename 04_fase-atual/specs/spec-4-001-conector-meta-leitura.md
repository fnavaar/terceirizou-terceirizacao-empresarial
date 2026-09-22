# SPEC-4-001 — Conector Meta Ads de leitura e origem do lead

**Fase:** 4 — Sistema de inteligência de campanhas e operação assistida  
**Status:** concluída para `cd704a1c` após prova técnica e aceite humano em 22/09/2026  
**Dono:** administrador armazena credencial e prova acesso; responsável técnico implementa; marketing consome  
**Degrau da solução:** conector compartilhado de leitura — espelha dados de campanha/anúncio/origem do Meta para dentro do CRM; nenhuma escrita no Meta.

## Resultado observável

Um lead do CRM exibe, quando existir correspondência, campanha/anúncio/origem vindos do Meta com fonte e período declarados; leads sem correspondência ficam marcados como `sem dado Meta`, nunca como zero.

## Critérios de aceite

- [x] **CA-4-101:** RED com credencial inválida/ausente comprovou zero ingestão e pendência visível.
- [x] **CA-4-102:** GREEN com prova aprovada: 50 leads avaliados, 44 espelhados com campanha/anúncio/origem e proveniência.
- [x] **CA-4-103:** 6 leads sem correspondência exibidos como `sem dado Meta`; 0 divergentes; dado original preservado.
- [x] **CA-4-104:** credencial fora de Git/log/tela; duas rodadas idempotentes sem duplicidade; nenhuma escrita no Meta.

## Evidência

- 76 anúncios, 12 conjuntos e 6 campanhas lidos na prova técnica.
- Implementação do espelho Meta: commit `e37b38d`.
- Interface real no preview: `src/components/dashboard/MetaLeadsRealCard.tsx` e `src/pages/Index.tsx`.
- QA Skip 5/5 nas versões do ciclo.
- Aceite do champion em 22/09/2026: "testei no preview e funcionou".

## Tasks vinculadas

| ID | Task | Status |
|---|---|---|
| e4c77e80 | Confirmar acesso de leitura à conta Meta | ✅ CONCLUÍDA (22/09/2026) |
| cd704a1c | Trazer origem, campanha e anúncio para o CRM | ✅ CONCLUÍDA (22/09/2026) |
