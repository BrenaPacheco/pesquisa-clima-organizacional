/** Versão inicial demonstrativa: 20 assertivas divididas em quatro índices. */
const DIMENSOES = Object.freeze([
  { id: 'ICR', titulo: 'Clima e relações no trabalho', perguntas: [
    'Sou tratado(a) com respeito no ambiente de trabalho.',
    'Existe cooperação entre colegas de equipe.',
    'Posso expressar opiniões com respeito e segurança.',
    'Conflitos são tratados de maneira adequada.',
    'Considero saudável o ambiente de trabalho.'
  ]},
  { id: 'IOT', titulo: 'Organização do trabalho', perguntas: [
    'Minhas atribuições estão claras.',
    'Conheço as prioridades da minha equipe.',
    'As tarefas são distribuídas de maneira equilibrada.',
    'Há planejamento adequado das atividades.',
    'Demandas urgentes são tratadas de maneira organizada.'
  ]},
  { id: 'ICI', titulo: 'Comunicação institucional', perguntas: [
    'Recebo informações claras para realizar meu trabalho.',
    'As comunicações importantes chegam em tempo oportuno.',
    'Sou informado(a) sobre mudanças que afetam minhas atividades.',
    'As decisões relevantes são explicadas adequadamente.',
    'Existem canais para diálogo com a gestão.'
  ]},
  { id: 'IAG', titulo: 'Apoio e gestão', perguntas: [
    'Recebo orientação suficiente para executar minhas atividades.',
    'Minha liderança atua com respeito e imparcialidade.',
    'Tenho acesso aos recursos necessários para trabalhar.',
    'Recebo retorno construtivo sobre meu trabalho.',
    'Percebo compromisso da gestão com melhorias.'
  ]}
]);
