# F3 candidata — Frontend do CRM (leads)

> Nota aberta para decisão do consultor. Fora da SPEC-2-001 (Fase 2 é backend).

## Lacuna observada (2026-09-02, validando F2-T03)

- O painel atual (`src/pages/Index.tsx`) lista leads numa tabela (nome, e-mail, telefone, origem, estágio, responsável) mas **não mostra os campos de qualificação** (estado_qualificacao, score, motivo, próxima ação) e **não tem botão para criar lead**.
- Impacto: a Fase 2 classifica os leads corretamente no banco, mas quem usa o painel não vê a classificação nem consegue inserir/editar leads pela interface.

## Por que virar F3 (candidata)

- Sem exibir o estado, a revisão humana (CA-2-003/004, F2-T04) perde o canal visual de trabalho: o operador precisaria abrir o admin PocketBase.
- Sem criar lead pela tela, o cadastro manual depende de API/admin.

## Recorte sugerido (se aprovada)

- Adicionar colunas Estado/Score/Motivo (e filtro por estado) na tabela.
- Botão "Novo Lead" com formulário mínimo (nome, contato, origem, respostas) usando os campos do schema atual.
- Exibir/editar os campos de qualificação para a revisão humana (integra com F2-T04).

## Decisão

- Pendente — aguardando consultor para incluir (ou não) como F3.
