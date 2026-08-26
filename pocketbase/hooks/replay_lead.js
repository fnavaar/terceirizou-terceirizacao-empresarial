// pocketbase/hooks/replay_lead.js
// F1-T09: Endpoint de replay controlado para reprocessar itens da fila de recuperação
// POST /backend/v1/replay/lead
// Exige: motivo, operador e dedup_key (chave idempotente). Processa uma vez.

routerAdd(
  'POST',
  '/backend/v1/replay/lead',
  (e) => {
    const body = e.requestInfo().body
    if (!body || !body.motivo || !body.operador || !body.dedup_key) {
      return e.json(400, { error: 'Replay exige motivo, operador e dedup_key' })
    }

    const dedupKey = body.dedup_key
    const existing = $app.findRecordsByFilter('leads', 'dedup_key = {:dk}', '-created', 1, 0, { dk: dedupKey })

    if (existing && existing.length > 0) {
      const record = existing[0]
      var hist = []
      var raw = record.get('historico')
      if (raw) {
        if (typeof raw === 'string') { try { hist = JSON.parse(raw) } catch (_) {} }
        else if (Array.isArray(raw)) { hist = raw }
      }
      hist.push({
        acao: 'replay',
        ator: body.operador,
        data: new Date().toISOString(),
        detalhes: 'Replay solicitado por ' + body.operador + ' — motivo: ' + body.motivo + ' (idempotente, sem nova oportunidade)',
      })
      record.set('historico', JSON.stringify(hist))
      $app.save(record)
      console.log('Replay idempotente — lead já existia, histórico atualizado: ' + dedupKey)
      return e.json(200, { status: 'already_exists', lead_id: record.get('lead_id'), dedup_key: dedupKey, mensagem: 'Replay idempotente — sem nova oportunidade' })
    }

    const errorId = body.error_id || ''
    let payloadResumido = {}
    if (errorId) {
      const errs = $app.findRecordsByFilter('error_log', 'error_id = {:id}', '-created', 1, 0, { id: errorId })
      if (errs && errs.length > 0) {
        const rawPayload = errs[0].get('payload_resumido')
        if (rawPayload) {
          if (typeof rawPayload === 'string') { try { payloadResumido = JSON.parse(rawPayload) } catch (_) {} }
          else { payloadResumido = rawPayload }
        }
      }
    }

    try {
      const col = $app.findCollectionByNameOrId('leads')
      const record = new Record(col)
      record.set('lead_id', $security.randomString(12))
      record.set('opportunity_id', $security.randomString(12))
      record.set('nome', body.nome || 'Lead recuperado')
      record.set('email', body.email || '')
      record.set('telefone', body.telefone || '')
      record.set('origem', body.origem || 'manual')
      record.set('campanha', body.campanha || '')
      record.set('anuncio_criativo', body.anuncio_criativo || '')
      record.set('respostas', JSON.stringify(body.respostas || {}))
      record.set('estagio', 'capturado')
      record.set('responsavel', body.responsavel || 'Henrique Tavano')
      record.set('dedup_key', dedupKey)
      record.set('source_event_id', body.source_event_id || $security.randomString(16))
      record.set('historico', JSON.stringify([{ acao: 'replay', ator: body.operador, data: new Date().toISOString(), detalhes: 'Lead recuperado via replay por ' + body.operador + ' — motivo: ' + body.motivo }]))
      $app.save(record)

      if (errorId) {
        const errs = $app.findRecordsByFilter('error_log', 'error_id = {:id}', '-created', 1, 0, { id: errorId })
        if (errs && errs.length > 0) {
          errs[0].set('estado', 'resolvido')
          errs[0].set('resolvido_em', new Date().toISOString())
          errs[0].set('resolvido_por', body.operador)
          errs[0].set('resultado', 'Replay concluído — lead criado sem duplicidade')
          $app.save(errs[0])
        }
      }

      console.log('Lead recuperado via replay: ' + dedupKey + ' por ' + body.operador)
      return e.json(201, { status: 'created', lead_id: record.get('lead_id'), opportunity_id: record.get('opportunity_id'), dedup_key: dedupKey })
    } catch (err) {
      return e.json(500, { error: 'Falha ao recuperar lead: ' + err.message })
    }
  },
)