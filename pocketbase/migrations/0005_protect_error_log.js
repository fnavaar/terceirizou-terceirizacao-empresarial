// pocketbase/migrations/0005_protect_error_log.js
// F1-T10: Proteger error_log — anônimo não lê, somente admin acessa

migrate(
  (app) => {
    const errorLog = app.findCollectionByNameOrId('error_log')
    errorLog.listRule = "@request.auth.role = 'admin'"
    errorLog.viewRule = "@request.auth.role = 'admin'"
    errorLog.createRule = "@request.auth.role = 'admin' || @request.auth.role = 'integracao'"
    errorLog.updateRule = "@request.auth.role = 'admin'"
    errorLog.deleteRule = "@request.auth.role = 'admin'"
    app.save(errorLog)
    console.log('error_log protegido — somente admin acessa')
  },
  (app) => {
    const errorLog = app.findCollectionByNameOrId('error_log')
    errorLog.listRule = ''
    errorLog.viewRule = ''
    errorLog.createRule = ''
    errorLog.updateRule = ''
    errorLog.deleteRule = ''
    app.save(errorLog)
  },
)