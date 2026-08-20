// pocketbase/migrations/0001_create_leads.js
// F1-T02: Criar collection leads com modelo, pipeline, RLS e histórico

migrate(
  (app) => {
    const collection = new Collection({
      name: 'leads',
      type: 'base',
      listRule:
        "responsavel = @request.auth.id || @request.auth.role = 'admin' || @request.auth.role = 'marketing'",
      viewRule:
        "responsavel = @request.auth.id || @request.auth.role = 'admin' || @request.auth.role = 'marketing'",
      createRule: "@request.auth.role = 'admin' || @request.auth.role = 'integracao'",
      updateRule:
        "responsavel = @request.auth.id || @request.auth.role = 'admin'",
      deleteRule: "@request.auth.role = 'admin'",
      fields: [
        { name: 'lead_id', type: 'text', required: true },
        { name: 'opportunity_id', type: 'text', required: true },
        { name: 'nome', type: 'text', required: true },
        { name: 'email', type: 'text', required: false },
        { name: 'telefone', type: 'text', required: false },
        { name: 'origem', type: 'select', required: true, values: ['meta_ads', 'cora', 'indicacao', 'manual'], maxSelect: 1 },
        { name: 'campanha', type: 'text', required: false },
        { name: 'anuncio_criativo', type: 'text', required: false },
        { name: 'respostas', type: 'json', required: false },
        { name: 'estagio', type: 'select', required: true, values: ['capturado', 'aguardando_dados', 'encerrado_entrada_invalida'], maxSelect: 1, defaultValue: 'capturado' },
        { name: 'responsavel', type: 'text', required: true },
        { name: 'dedup_key', type: 'text', required: true },
        { name: 'source_event_id', type: 'text', required: false },
        { name: 'historico', type: 'json', required: false },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [
        'CREATE UNIQUE INDEX idx_dedup_key_leads ON leads (dedup_key)',
        'CREATE INDEX idx_email_leads ON leads (email)',
        'CREATE INDEX idx_estagio_leads ON leads (estagio)',
        'CREATE INDEX idx_responsavel_leads ON leads (responsavel)',
      ],
    })
    app.save(collection)
    console.log('Collection leads criada com sucesso')
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('leads')
    app.delete(collection)
    console.log('Collection leads removida')
  },
)
