# Instalação e primeira execução

## Opção simples — editor do Apps Script
1. Abra https://script.google.com e crie um **projeto independente**.
2. No editor, crie os arquivos `Config.gs`, `Questionario.gs`, `CriarPesquisa.gs` e `Indicadores.gs` e copie os conteúdos da pasta `src/`.
3. Em **Configurações do projeto**, habilite a exibição de `appsscript.json` e substitua o conteúdo pelo manifesto de `src/appsscript.json`.
4. Revise `CONFIG` e as questões com a equipe responsável; não insira informações pessoais.
5. Selecione `criarPesquisaClimaParintins` e clique em **Executar**. Autorize os escopos. A função cria **novos** arquivos a cada execução.
6. Consulte **Registro de execução** para os links do formulário, planilha e pasta. Teste cuidadosamente o roteamento SEMED, SEMSA e demais órgãos.
7. Envie pelo menos cinco respostas **fictícias** completas e execute `atualizarIndicadores`.
8. Confirme quem pode responder, se o acesso exige login e quais dados a plataforma registra. Só então planeje a publicação institucional.

## Opção para desenvolvedores — Git e clasp
1. Instale Node.js compatível e `npm install -g @google/clasp`.
2. Habilite a API do Apps Script em https://script.google.com/home/usersettings e execute `clasp login`.
3. No diretório do projeto, execute `clasp create-script --title 'Pesquisa de Clima Organizacional' --type standalone --rootDir src` (consulte `clasp --help` para sua versão).
4. Confira que `.clasp.json` contém `rootDir: "src"`. Não publique esse arquivo.
5. Execute `clasp push` e abra o editor com `clasp open-script`.
6. Execute `criarPesquisaClimaParintins` **no editor** (a execução remota com clasp requer configuração adicional).

Para reaproveitar um script já existente sem recriar projetos: configure um `.clasp.json` local com o `scriptId` real e `rootDir` igual a `src`.
