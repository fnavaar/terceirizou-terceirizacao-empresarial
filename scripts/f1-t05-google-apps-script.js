/**
 * Google Apps Script — F1-T05: Captura de Leads via Webhook
 * 
 * Configuração:
 * 1. Abra o Google Apps Script (script.google.com)
 * 2. Cole este código
 * 3. Configure WEBHOOK_URL
 * 4. Crie um trigger periódico ou On edit
 */

const WEBHOOK_URL = 'https://crm-oficial-65bb8.shrd00.internal.goskip.dev/backend/v1/webhook/lead';
const META_ADS_SHEET_ID = '1I5F4-NMzkkaStAyVKrO89Dulfi-1POXZHVPZNLRv02A';
const CORA_SHEET_ID = '1TYe2__HmgLUhqOoudmxm-I2fL94wKSJ8ThmXmbCUXfY';
const META_ADS_TAB = 'Leads Meta Ads - Jun.26';
const CORA_TAB = 'Principal';

function mapMetaAds(row) {
  return {
    nome: row[1] || '', email: row[2] || '', telefone: row[3] || '',
    prestador: row[4] || '', segmento: row[5] || '', cargo: row[6] || '',
    gestao_financeira: row[7] || '', maior_problema: row[8] || '',
    motivacao: row[9] || '', nome_anuncio: row[10] || '',
    conjunto_anuncio: row[11] || '', campanha: row[12] || '',
    origem: 'meta_ads', data_hora: row[0] || '',
  };
}

function mapCora(row) {
  return {
    nome: row[1] || '', email: row[4] || '', telefone: row[5] || '',
    cnpj_cpf: row[2] || '', tipo_empresa: row[3] || '',
    servico_desejado: row[6] || '', ramo_atividade: row[7] || '',
    segmento: row[8] || '', estado: row[9] || '', cidade: row[10] || '',
    preferencia_atendimento: row[11] || '', origem: 'cora', data_envio: row[0] || '',
  };
}

function sendToWebhook(payload) {
  const options = { method: 'post', contentType: 'application/json', payload: JSON.stringify(payload), muteHttpExceptions: true };
  try {
    const response = UrlFetchApp.fetch(WEBHOOK_URL, options);
    return { success: response.getResponseCode() >= 200 && response.getResponseCode() < 300, statusCode: response.getResponseCode(), body: JSON.parse(response.getContentText()) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function processMetaAds() {
  const sheet = SpreadsheetApp.openById(META_ADS_SHEET_ID).getSheetByName(META_ADS_TAB);
  const data = sheet.getDataRange().getValues();
  let ok = 0, err = 0;
  for (let i = 1; i < data.length; i++) {
    if (!data[i][1] || data[i][1].trim() === '') continue;
    const r = sendToWebhook(mapMetaAds(data[i]));
    r.success ? ok++ : err++;
    Utilities.sleep(100);
  }
  Logger.log('Meta Ads: ' + ok + ' ok, ' + err + ' erros');
  return { ok, err };
}

function processCora() {
  const sheet = SpreadsheetApp.openById(CORA_SHEET_ID).getSheetByName(CORA_TAB);
  const data = sheet.getDataRange().getValues();
  let ok = 0, err = 0;
  for (let i = 2; i < data.length; i++) {
    if (!data[i][1] || data[i][1].trim() === '') continue;
    const r = sendToWebhook(mapCora(data[i]));
    r.success ? ok++ : err++;
    Utilities.sleep(100);
  }
  Logger.log('Cora: ' + ok + ' ok, ' + err + ' erros');
  return { ok, err };
}

function processarTodos() {
  const m = processMetaAds();
  const c = processCora();
  Logger.log('Total: ' + (m.ok + c.ok) + ' ok, ' + (m.err + c.err) + ' erros');
}

function testarWebhook() {
  return sendToWebhook({ nome: 'Teste Apps Script', email: 'teste@gas.com', origem: 'manual', data_hora: new Date().toISOString() });
}
