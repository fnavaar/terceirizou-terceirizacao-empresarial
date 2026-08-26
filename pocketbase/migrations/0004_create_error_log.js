// pocketbase/migrations/0004_create_error_log.js
// F1-T08: Criar collection error_log para fila de recuperação

migrate(
  (app) => {
    const collection = new Collection({
      name: 'error_log',
      type: 'base',
      listRule: "@request.auth.role = 'admin'",
      viewRule: "@request.auth.role = 'admin'",
      createRule: "@request.auth.role = 'admin' || @request.auth.role = 'integracao'",
      updateRule: "@request.auth.role = 'admin'",
      deleteRule: "@request.auth.role = 'admin'",
      fields: [
        { name: 'error_id', type: 'text', required: true },
        { name: 'received_at', type: 'text', required: true },
        { name: 'source_event_id', type: 'text', required: false },
        {
          name: 'categoria',
          type: 'select',
          required: true,
          values: ['validacao', 'permissao', 'disponibilidade', 'schema', 'timeout', 'outro'],
          maxSelect: 1,
        },
        { name: 'resumo', type: 'text', required: true },
        { name: 'payload_resumido', type: 'json', required: false },
        { name: 'tentativa', type: 'number', required: false },
        {
          name: 'estado',
          type: 'select',
          required: true,
          values: ['manual_review', 'resolvido', 'encerrado'],
          maxSelect: 1,
          defaultValue: 'manual_review',
        },
        { name: 'dono', type: 'text', required: true },
        { name: 'proxima_acao', type: 'text', required: false },
        { name: 'resolvido_em', type: 'text', required: false },
        { name: 'resolvido_por', type: 'text', required: false },
        { name: 'resultado', type: 'text', required: false },
        { name: 'historico', type: 'json', required: false },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [
        'CREATE UNIQUE INDEX idx_error_id ON error_log (error_id)',
        'CREATE INDEX idx_error_estado ON error_log (estado)',
        'CREATE INDEX idx_error_categoria ON error_log (categoria)',
      ],
    })
    app.save(collection)
    console.log('Collection error_log criada com sucesso')
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('error_log')
    app.delete(collection)
    console.log('Collection error_log removida')
  },
)