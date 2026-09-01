// pocketbase/migrations/0006_add_qualificacao_fields.js
// F2-T02: Adicionar campos de qualificação, pontuação e roteamento à collection leads.
//
// ADITIVA — não altera dados existentes, apenas acrescenta campos:
//   estado_qualificacao  text (resultado da regra v1)
//   score                number (pontuação total)
//   score_componentes    json  (componentes nomeados p/ decisão explicável)
//   regra_versao         text  (versão da regra usada na decisão)
//   motivo_decisao       text  (motivo legível)
//   proxima_acao         text  (ação recomendada)
//
// Rollback: remove apenas estes campos (não toca nas outras colunas).

migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId('leads')

    // Evita duplicar se a migration rodar mais de uma vez
    const nomes = new Set(collection.fields.map((f) => f.name))
    const novos = [
      { name: 'estado_qualificacao', type: 'text', required: false },
      { name: 'score', type: 'number', required: false },
      { name: 'score_componentes', type: 'json', required: false },
      { name: 'regra_versao', type: 'text', required: false },
      { name: 'motivo_decisao', type: 'text', required: false },
      { name: 'proxima_acao', type: 'text', required: false },
    ]
    for (const f of novos) {
      if (!nomes.has(f.name)) {
        collection.fields.add(f)
      }
    }
    app.save(collection)
    console.log('Migration 0006 aplicada: campos de qualificação adicionados a leads')
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('leads')
    const remover = ['estado_qualificacao', 'score', 'score_componentes', 'regra_versao', 'motivo_decisao', 'proxima_acao']
    const nomes = new Set(remover)
    const novos = collection.fields.filter((f) => !nomes.has(f.name))
    collection.fields = novos
    app.save(collection)
    console.log('Migration 0006 revertida: campos de qualificação removidos')
  },
)
