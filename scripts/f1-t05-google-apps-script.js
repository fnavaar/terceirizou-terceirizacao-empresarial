/**
 * Google Apps Script — Captura de Leads Terceirizou (Meta Ads + Cora)
 *
 * Versão 2026-08-31 — planilha Meta Ads migrada para propriedade da Terceirizou.
 *
 * COMO INSTALAR:
 * 1. Abra https://script.google.com e crie um projeto novo (ou use o atual).
 * 2. Cole todo este código no editor de script.
 * 3. ANTES DE EXECUTAR: publique a rota do webhook no Skip (ver "PASSO 1" abaixo).
 * 4. Execute manualmente a função testarWebhook() para validar a conexão.
 * 5. Crie um trigger: Relógio > A cada 10 minutos (ou Empilhar > Ao editar).
 *
 * PASSO 1 — ROTA PÚBLICA DO WEBHOOK NO SKIP (obrigatório):
 *   O domínio público (goskip.app) hoje responde 405 para POST /backend/v1/webhook/lead,
 *   porque a rota custom do PocketBase só responde no domínio interno. É preciso publicar/
 *   expor a rota do backend no projeto Skip (CRM Oficial, projectId 51268) para que o
 *   Google Apps Script consiga alcançá-la de fora. Sem isso o script falha com 405.
 *
 * PASSO 2 — COLE O ID DA PLANILHA NOVA:
 *   Abaixo, META_ADS_SHEET_ID já aponta para a planilha de propriedade da Terceirizou:
 *   "Leads Terceirizou - Meta Ads (Make) - PROPRIEDADE TERCEIRIZOU"
 *   https://docs.google.com/spreadsheets/d/1GiZZjYkBNz_i6r_0cg2D9N6FulB4rJftFctzh4WxeEk
 */

// === CONFIGURAÇÃO ===
// URL do webhook. Use o domínio PÚBLICO (goskip.app) — o Google Apps Script roda fora do
// Skip e NÃO acessa o domínio interno (shrd00.internal.goskip.dev).
const WEBHOOK_URL = 'https://crm-oficial-65bb8.goskip.app/backend/v1/webhook/lead';

// IDs das planilhas
const META_ADS_SHEET_ID = '1GiZZjYkBNz_i6r_0cg2D9N6FulB4rJftFctzh4WxeEk'; // NOVA — propriedade Terceirizou
const CORA_SHEET_ID = '1TYe2__HmgLUhqOoudmxm-I2fL94wKSJ8ThmXmbCUXfY';       // mantida (planilha da Cora)

// Abas das planilhas
const META_ADS_TAB_NAME = 'Leads Meta Ads - Jun.26';
const CORA_TAB_NAME = 'Principal';

// === Mapeamento Meta Ads → Webhook ===
function mapMetaAds(row) {
  return {
    nome: row[1] || '',           // Nome completo
    email: row[2] || '',          // Email
    telefone: row[3] || '',       // Telefone
    prestador: row[4] || '',      // É prestador de serviços?
    segmento: row[5] || '',       // Qual o segmento?
    cargo: row[6] || '',          // Qual seu cargo?
    gestao_financeira: row[7] || '', // Quem faz gestão financeira?
    maior_problema: row[8] || '', // Maior problema na gestão?
    motivacao: row[9] || '',      // O que motivou?
    nome_anuncio: row[10] || '',  // Nome do Anúncio
    conjunto_anuncio: row[11] || '', // Conjunto de Anúncio
    campanha: row[12] || '',      // Campanha
    origem: 'meta_ads',
    data_hora: row[0] || '',      // Data/Hora
  };
}

// === Mapeamento Cora → Webhook ===
function mapCora(row) {
  return {
    nome: row[1] || '',           // nome
    email: row[4] || '',          // email
    telefone: row[5] || '',       // telefone
    cnpj_cpf: row[2] || '',       // cnpj_ou_cpf
    tipo_empresa: row[3] || '',   // tipo_empresa
    servico_desejado: row[6] || '', // servico_desejado
    ramo_atividade: row[7] || '', // ramo_atividade
    segmento: row[8] || '',       // segmento
    estado: row[9] || '',         // estado
    cidade: row[10] || '',        // cidade
    preferencia_atendimento: row[11] || '', // preferencia_atendimento
    origem: 'cora',
    data_envio: row[0] || '',     // data_envio
  };
}

// === Enviar para webhook ===
function sendToWebhook(payload) {
  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  };

  try {
    const response = UrlFetchApp.fetch(WEBHOOK_URL, options);
    const statusCode = response.getResponseCode();
    const body = response.getContentText();

    console.log('Status: ' + statusCode + ' | Response: ' + body);

    let parsed = null;
    try { parsed = JSON.parse(body); } catch (_) { parsed = body; }

    return {
      success: statusCode >= 200 && statusCode < 300,
      statusCode: statusCode,
      body: parsed,
    };
  } catch (error) {
    console.log('Erro ao enviar webhook: ' + error.message);
    return { success: false, error: error.message };
  }
}

// === Processar Meta Ads ===
function processMetaAds() {
  const sheet = SpreadsheetApp.openById(META_ADS_SHEET_ID).getSheetByName(META_ADS_TAB_NAME);
  const data = sheet.getDataRange().getValues();

  // Pular cabeçalho (linha 0)
  let processados = 0;
  let erros = 0;

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const nome = row[1]; // Nome completo

    // Pular linhas vazias
    if (!nome || String(nome).trim() === '') continue;

    const payload = mapMetaAds(row);
    const result = sendToWebhook(payload);

    if (result.success) {
      processados++;
      console.log('Meta Ads - Lead enviado: ' + nome);
    } else {
      erros++;
      console.log('Meta Ads - Erro: ' + nome + ' | ' + (result.error || (result.body && result.body.error) || ''));
    }

    // Rate limit: 100ms entre requisições
    Utilities.sleep(100);
  }

  console.log('Meta Ads: ' + processados + ' enviados, ' + erros + ' erros');
  return { processados, erros };
}

// === Processar Cora ===
function processCora() {
  const sheet = SpreadsheetApp.openById(CORA_SHEET_ID).getSheetByName(CORA_TAB_NAME);
  const data = sheet.getDataRange().getValues();

  let processados = 0;
  let erros = 0;

  for (let i = 2; i < data.length; i++) { // Pular 2 linhas (cabeçalho + aviso)
    const row = data[i];
    const nome = row[1]; // nome

    // Pular linhas vazias
    if (!nome || String(nome).trim() === '') continue;

    const payload = mapCora(row);
    const result = sendToWebhook(payload);

    if (result.success) {
      processados++;
      console.log('Cora - Lead enviado: ' + nome);
    } else {
      erros++;
      console.log('Cora - Erro: ' + nome + ' | ' + (result.error || (result.body && result.body.error) || ''));
    }

    Utilities.sleep(100);
  }

  console.log('Cora: ' + processados + ' enviados, ' + erros + ' erros');
  return { processados, erros };
}

// === Função principal ===
function processarTodos() {
  console.log('=== Início do processamento ===');

  const metaResult = processMetaAds();
  const coraResult = processCora();

  const total = {
    processados: metaResult.processados + coraResult.processados,
    erros: metaResult.erros + coraResult.erros,
  };

  console.log('=== Fim do processamento ===');
  console.log('Total: ' + total.processados + ' enviados, ' + total.erros + ' erros');

  return total;
}

// === Teste manual ===
// Execute esta função primeiro, depois de publicar a rota no Skip.
function testarWebhook() {
  const payload = {
    nome: 'Lead Teste Apps Script',
    email: 'teste.appscript@example.com',
    telefone: '(48) 99999-1111',
    origem: 'manual',
    campanha: 'Teste GAS 2026-08-31',
    data_hora: new Date().toISOString(),
  };

  const result = sendToWebhook(payload);
  console.log('Resultado do teste: ' + JSON.stringify(result));
  return result;
}