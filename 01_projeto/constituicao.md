# Constituição do projeto — Terceirizou Terceirização Empresarial

> Regras estáveis deste projeto. Valem em todas as fases e só mudam por decisão registrada da
> consultoria (emenda datada na seção final). Mantida pela consultoria — dúvida vira registro
> no `changelog.md`, não edição. (Conceito adaptado do Spec Kit, decisão D18.)

## Papéis

- **Champion:** responsável comercial ou técnico designado pela Terceirizou — executa as tasks da fase atual e valida com evidência; o nome nominal ainda será confirmado.
- **Consultor Adapta:** Navarro (Adapta) — define escopo, SPECs e critérios; fecha as fases. O contato não está registrado neste pacote.
- **Agente Ethos:** guia a execução dentro destas regras; não legisla sobre escopo. Nenhum loop ou autonomia foi ativado neste handoff.

## Stack e ferramentas permitidas

- Formulário de captação, planilha de leads no Google Drive e sistema central/CRM; a ferramenta atual precisa ser confirmada no setup e o Skip aparece como referência nas atas.
- Instagram/Meta Ads como origem de campanha; Meta API somente se acesso, campos, limites e fallback forem aprovados.
- WhatsApp humano para exceções e calendário para autoagendamento somente após validação de acesso, consentimento e capacidade.
- Fixtures sintéticas e ambientes de teste; nenhuma credencial ou dado real deve entrar neste repositório.
- Dependência ou ferramenta nova só entra por decisão do consultor — registre `DÚVIDA:` antes.

## O que o champion pode e não pode tocar

- **Pode:** fixtures sintéticas, evidências redigidas e configurações do ambiente de teste explicitamente liberadas para a Fase 1.
- **Não pode:** alterar SPECs, `fase.md` (além de marcar tasks), `01_projeto/`, sistemas de produção, credenciais, campanhas, mensagens reais ou qualquer conector não confirmado.

## A SPEC é lei

Toda implementação segue o critério de aceite e o TDD da SPEC — nem menos (critério reprovado),
nem mais (**o aceite é teto**: código além do aceite é superfície não verificada, D17). O que
não está na SPEC da fase não se implementa: vira `DÚVIDA:` para o consultor decidir.

## Linha vermelha (nunca simplificar)

Validação de entrada em fronteira de confiança; tratamento de erro que evita perda de dados;
segurança; acessibilidade; LGPD/dados pessoais. Corte nessas áreas reprova a task — sem exceção
e sem julgamento de mérito (D17).

## Dívida deliberada

Simplificação intencional leva marca no ponto exato da decisão:
`adapta-divida: <teto atual>; <upgrade quando gatilho>`. O consultor acompanha essas marcas na
sincronização — é o combinado do método.

## Emendas

| Data | O que mudou | Decisão/motivo |
|---|---|---|
| | | |
