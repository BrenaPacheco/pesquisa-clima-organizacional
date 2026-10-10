/** Indicadores agregados; nunca gera relatórios de respostas individuais. */
function atualizarIndicadores() {
  const id = PropertiesService.getScriptProperties().getProperty('PLANILHA_ID');
  if (!id) throw new Error('Execute criarPesquisaClimaParintins() antes.');
  const arquivo = SpreadsheetApp.openById(id);
  const respostas = arquivo.getSheets().find(function(a) { return /^Respostas ao formulário|^Form Responses/i.test(a.getName()); });
  if (!respostas) throw new Error('A aba de respostas ainda não existe. Envie uma resposta de teste.');
  const matriz = respostas.getDataRange().getValues();
  const aba = arquivo.getSheetByName('INDICADORES') || arquivo.insertSheet('INDICADORES');
  aba.clearContents();
  aba.getRange('A1:D1').setValues([['Índice','Dimensão','Respostas completas','Média (1–5)']]);
  const cabecalho = matriz[0] || [];
  const linhas = matriz.slice(1);
  const saida = DIMENSOES.map(function(d) {
    // Perguntas de grade do Google Forms originam colunas, em geral "Título [linha]".
    const indices = d.perguntas.map(function(pergunta) {
      return cabecalho.findIndex(function(h) {
        const s = String(h);
        return s === pergunta || s.endsWith('[' + pergunta + ']');
      });
    });
    if (indices.some(function(i) { return i === -1; })) {
      throw new Error('Colunas não localizadas para ' + d.id + '. Confira nomes e respostas da grade.');
    }
    const medias = linhas.map(function(l) {
      const nums = indices.map(function(i) { return parseRespostaLikert_(l[i]); });
      return nums.every(function(n) { return n !== null; }) ? media_(nums) : null;
    }).filter(function(n) { return n !== null; });
    const suficiente = medias.length >= CONFIG.minimoDivulgacao;
    return [d.id, d.titulo, suficiente ? medias.length : 'Suprimido', suficiente ? media_(medias) : 'Suprimido'];
  });
  aba.getRange(2, 1, saida.length, 4).setValues(saida);
  aba.getRange('D2:D' + (saida.length+1)).setNumberFormat('0.00');
  aba.getRange('A7').setValue('ATENÇÃO: agregados com menos de ' + CONFIG.minimoDivulgacao + ' respostas completas são suprimidos. Não compartilhe a aba de respostas.');
  aba.setFrozenRows(1);
  aba.autoResizeColumns(1,4);
  Logger.log('Indicadores atualizados: ' + arquivo.getUrl());
}
function parseRespostaLikert_(valor) {
  const match = String(valor).match(/^([1-5])(?:\s|\b)/);
  return match ? Number(match[1]) : null;
}
function media_(nums) { return nums.reduce(function(s,n){ return s+n; },0)/nums.length; }
