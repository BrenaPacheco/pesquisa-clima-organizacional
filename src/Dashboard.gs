/** Dashboard Administrativo */

function doGet(e) {
  return HtmlService.createTemplateFromFile('Index')
      .evaluate()
      .setTitle('Dashboard de Pesquisa de Clima')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function getDashboardData() {
  const id = PropertiesService.getScriptProperties().getProperty('PLANILHA_ID');
  if (!id) return { error: 'Planilha não configurada. Execute criarPesquisaClimaParintins() antes.' };
  
  try {
    const arquivo = SpreadsheetApp.openById(id);
    const aba = arquivo.getSheetByName('INDICADORES');
    if (!aba) return { error: 'Aba INDICADORES não encontrada. Execute atualizarIndicadores().' };
    
    const dados = aba.getDataRange().getValues();
    if (dados.length < 2) return { error: 'Nenhum indicador gerado ainda.' };
    
    const linhas = dados.slice(1);
    
    const indicadores = linhas.map(function(row) {
      if (String(row[0]).startsWith("ATENÇÃO") || String(row[0]).startsWith("ATEN")) return null; // Ignora linha de aviso
      return {
        indice: row[0],
        dimensao: row[1],
        respostas: row[2],
        media: row[3]
      };
    }).filter(function(i) { return i !== null && i.indice; });
    
    return { indicadores: indicadores };
  } catch(e) {
    return { error: 'Erro ao carregar dados: ' + e.message };
  }
}
