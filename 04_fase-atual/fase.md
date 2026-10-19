# Fase 4 — Tarefas

<!-- fase-format:2 -->

- [x] Confirmar com o Cliente o acesso de leitura à conta do Meta e anexar a resposta @Izabel !22/09/2026 #aculturamento [interno] <!-- id:e4c77e80-e32f-4479-8f42-709d520aa28b -->
  > SPEC-4-001 · B4-101 · Conta de anúncios confirmada; credencial em secret manager.
- [x] Trazer para o CRM a origem, a campanha e o anúncio de cada lead @Cliente !24/09/2026 [interno] <!-- id:cd704a1c-72c3-48e2-85b3-369d9d25175d -->
  > SPEC-4-001 · CA-4-101/102/103/104 · 50 leads avaliados, 44 espelhados, 6 sem dado Meta, 0 divergentes; aceite humano do champion em 22/09/2026.
- [/] Criar uma tela que compare quantidade e qualidade de leads por campanha @Cliente !06/11/2026 [interno] <!-- id:b7c2faea-89da-40ea-a6cf-969a1cc557a9 -->
  > SPEC-4-002 · CA-4-201 · Exibir campanha/origem, período, leads recebidos, qualificados, agendados e convertidos. Métrica de qualidade exige aprovação do champion.
  > Implementação entregue em 19/10/2026 (PainelQualidadeCampanha.tsx, autorização de Navaar): consulta read-only com fonte/período declarados e vazio ≠ zero (RN-4-204); gate B4-203 embutido no painel. Pendente: QA no Skip (projeto 51268 fora da visibilidade do conector em 19/10) e teste humano do champion.
- [ ] Criar uma lista de leads antigos que podem receber uma nova abordagem @Cliente !13/11/2026 [interno] <!-- id:5ef4b7cd-7240-4480-a420-c9dcfb2f2944 -->
  > SPEC-4-002 · CA-4-202/203 · Nenhum contato sem aprovação humana do lote.
- [ ] Configurar uma análise que sugira aprendizados sobre campanhas sem alterar orçamento ou público @Cliente !27/11/2026 [interno] <!-- id:1a38ea22-f8ba-4c9c-a7aa-985c9df0aa0a -->
  > SPEC-4-002 · CA-4-301/302/305 · Loop somente recomendando, sem escrever no Meta.
- [ ] Revisar dez recomendações de campanha e registrar quais serão usadas @"Felipe Navaar" !30/11/2026 #aculturamento [interno] <!-- id:82524cff-7200-4428-a3cb-ede0586a79f4 -->
- [ ] Exibir qualificação e follow-up na tela do lead @Cliente !20/11/2026 [interno] <!-- id:2bbfc9b9-ece5-4899-9c42-e12dca28b629 -->
- [ ] Monitorar queda de qualidade por origem com baseline @Cliente !04/12/2026 [interno] <!-- id:c798e86f-cd84-4551-a2f7-ad743e9ea7be -->

**Status da fase:** 2/8 concluídas (e4c77e80, cd704a1c — 22/09/2026, com aceite humano do champion). Próxima task elegível: `b7c2faea`, em execução desde 19/10/2026. Prazos reprogramados em 19/10/2026 (autorização de Navaar; prazo original 30/09/2026 vencido): nova janela 06/11–04/12/2026.
