/** Executar UMA VEZ para criar um novo formulário e sua planilha. */
function criarPesquisaClimaParintins() {
  const pasta = DriveApp.createFolder(CONFIG.nomePasta);
  const formulario = FormApp.create(CONFIG.titulo, true);
  formulario.setDescription('Participação voluntária. Não informe nome, matrícula, e-mail ou dados pessoais em nenhum campo. Resultados serão apresentados somente de forma agregada.');
  formulario.setCollectEmail(false);
  formulario.setLimitOneResponsePerUser(false);
  formulario.setAllowResponseEdits(false);
  formulario.setProgressBar(true);
  formulario.setShuffleQuestions(false);
  formulario.setConfirmationMessage('Obrigado pela participação! Suas respostas contribuirão para a melhoria do ambiente de trabalho.');
  formulario.setAcceptingResponses(true);

  // Primeiro trecho: somente órgão. O roteamento precisa ocorrer ao final desta página.
  const orgao = formulario.addMultipleChoiceItem()
    .setTitle('Em qual órgão você atua?').setRequired(true);

  const semedPage = formulario.addPageBreakItem().setTitle('Lotação — SEMED');
  formulario.addMultipleChoiceItem().setTitle('Sua lotação na SEMED').setRequired(true)
    .setChoiceValues(['Sede da Secretaria Municipal de Educação', 'Unidade escolar']);

  const semsaPage = formulario.addPageBreakItem().setTitle('Lotação — SEMSA');
  formulario.addMultipleChoiceItem().setTitle('Sua lotação na SEMSA').setRequired(true)
    .setChoiceValues(['Sede da Secretaria Municipal de Saúde', 'Unidade de Saúde (UBS, Hospital, Policlínica, Centro de Atenção, etc.)']);

  const perfilPage = formulario.addPageBreakItem().setTitle('Perfil funcional');
  formulario.addMultipleChoiceItem().setTitle('Tempo de atuação no órgão').setRequired(true)
    .setChoiceValues(['Menos de 1 ano','1 a 3 anos','4 a 6 anos','7 a 10 anos','Mais de 10 anos','Prefiro não informar']);
  formulario.addMultipleChoiceItem().setTitle('Tipo de vínculo').setRequired(true)
    .setChoiceValues(['Efetivo(a)','Comissionado(a)','Contratado(a) / temporário(a)','Estagiário(a)','Outro','Prefiro não informar']);

  // IMPORTANTE: a navegação associada à quebra SEMSA define a saída da página SEMED.
  // Ao final da SEMSA, a próxima página é Perfil, por progressão normal.
  semsaPage.setGoToPage(perfilPage);
  orgao.setChoices(CONFIG.orgaos.map(function(nome) {
    let alvo = perfilPage;
    if (nome === 'Secretaria Municipal de Educação — SEMED') alvo = semedPage;
    if (nome === 'Secretaria Municipal de Saúde — SEMSA') alvo = semsaPage;
    return orgao.createChoice(nome, alvo);
  }));

  DIMENSOES.forEach(function(d) {
    formulario.addPageBreakItem().setTitle(d.titulo + ' (' + d.id + ')');
    formulario.addGridItem().setTitle('Avalie as afirmações abaixo')
      .setRows(d.perguntas).setColumns(CONFIG.escala).setRequired(true);
  });

  const planilha = SpreadsheetApp.create('Respostas e indicadores — Pesquisa de Clima');
  formulario.setDestination(FormApp.DestinationType.SPREADSHEET, planilha.getId());
  const guia = planilha.getSheets()[0];
  guia.setName('LEIA-ME');
  guia.getRange('A1:B5').setValues([
    ['PESQUISA DE CLIMA', 'Orientações'],
    ['Privacidade', 'Restrinja acesso à planilha de respostas; nunca publique dados brutos.'],
    ['Indicadores', 'Execute atualizarIndicadores() no editor do Apps Script após coletar respostas.'],
    ['Limite', 'Grupos menores que ' + CONFIG.minimoDivulgacao + ' respostas não são exibidos.'],
    ['Observação', 'As médias são descritivas, não constituem avaliação individual.']
  ]);
  guia.setFrozenRows(1);
  guia.autoResizeColumns(1, 2);

  // Move os arquivos gerados para a mesma pasta (sem duplicar o formulário).
  [formulario.getId(), planilha.getId()].forEach(function(id) {
    DriveApp.getFileById(id).moveTo(pasta);
  });
  PropertiesService.getScriptProperties().setProperties({
    FORM_ID: formulario.getId(), PLANILHA_ID: planilha.getId(), PASTA_ID: pasta.getId()
  });
  Logger.log('Formulário (edição): ' + formulario.getEditUrl());
  Logger.log('Formulário (resposta): ' + formulario.getPublishedUrl());
  Logger.log('Planilha: ' + planilha.getUrl());
  Logger.log('Pasta: ' + pasta.getUrl());
  return { formulario: formulario.getPublishedUrl(), planilha: planilha.getUrl(), pasta: pasta.getUrl() };
}
