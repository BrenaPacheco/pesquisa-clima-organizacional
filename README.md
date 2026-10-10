# Pesquisa de Clima Organizacional

![Status](https://img.shields.io/badge/status-modelo%20inicial-blue) ![Google Apps Script](https://img.shields.io/badge/Google-Apps%20Script-4285F4) ![License: MIT](https://img.shields.io/badge/license-MIT-green)

Projeto open source em **Google Apps Script** para criar uma pesquisa de clima organizacional com Google Forms, planilha de respostas e indicadores agregados no Google Sheets. Exemplo adaptável para secretarias municipais e outras instituições.

> **Versão 0.1.0 — modelo inicial demonstrativo.** Inspirado por necessidades administrativas de Parintins/AM; não é um sistema oficial da Prefeitura e não apresenta dados reais. Antes da aplicação oficial, o questionário, a privacidade e a metodologia devem ser validados institucionalmente.

## Funcionalidades

- Criação automatizada do formulário, planilha e pasta no Google Drive.
- Identificação do órgão e **rotas específicas**: SEMED → Lotação SEMED → Perfil; SEMSA → Lotação SEMSA → Perfil; demais → Perfil.
- 20 assertivas divididas em ICR, IOT, ICI e IAG, com escala Likert de 1 a 5.
- Respostas sem coleta de e-mail habilitada no formulário pelo script; configurações Workspace exigem revisão adicional.
- Indicadores globais por dimensão com supressão quando há menos de 5 respostas completas.
- Testes unitários para interpretação de respostas e cálculo de média.

## Comece aqui

**Sem ferramentas de linha de comando:** copie os arquivos `src/*.gs` para um projeto independente no editor do Google Apps Script e execute `criarPesquisaClimaParintins`. Veja [instalação detalhada](docs/INSTALACAO.md).

**Com clasp:** `npm install -g @google/clasp`, `clasp login`, `clasp create-script --title 'Pesquisa de Clima Organizacional' --type standalone --rootDir src`, `clasp push` e execução manual no editor. Consulte a [documentação oficial](https://developers.google.com/apps-script/guides/clasp) e o guia local.

**Testes locais:** Node.js 20+ e `npm test`.

### Estrutura

```text
src/                Apps Script e manifesto
  Config.gs         Configurações e secretarias
  Questionario.gs   Dimensões e perguntas
  CriarPesquisa.gs  Criação e desvio SEMED/SEMSA
  Indicadores.gs    Agregação com limite mínimo
  appsscript.json   Manifesto Apps Script
tests/              Testes unitários Node.js
docs/               Instalação, privacidade, metodologia
examples/           Exemplo fictício de resultados
.github/workflows/  Verificação automática no GitHub
```

## Como funciona

```text
Órgão ─┬─ SEMED → Lotação SEMED ─┐
       ├─ SEMSA → Lotação SEMSA ─┼→ Perfil → ICR → IOT → ICI → IAG → Enviar
       └─ Demais órgãos ────────┘
```

Depois de pelo menos cinco respostas fictícias de teste, execute `atualizarIndicadores` para gerar a aba `INDICADORES` na planilha criada. A função é manual; não há atualização automática agendada nesta versão.

## Proteção de dados

**Não publique respostas individuais.** O GitHub deve armazenar apenas código, documentação e dados sintéticos. O script suprime valores de índices com menos de cinco respostas completas, mas isso **não garante anonimato absoluto**: questionários e acessos devem ser revisados sob a LGPD. Leia [privacidade](docs/PRIVACIDADE.md).

## Limitações

- Os 20 itens são um ponto de partida, não o questionário institucional completo de 40–45 itens.
- As médias são descritivas e não foram psicometricamente validadas.
- O Dashboard Web est disponível para visualização dos indicadores consolidados.
- Execução remota, autorização e comportamentos de formulários devem ser testados no ambiente Google Workspace de destino.
- **Reexecutar a criação gera novos arquivos**; não é um comando de atualização.

## Documentação

[Instalação](docs/INSTALACAO.md) · [Metodologia](docs/METODOLOGIA.md) · [Privacidade](docs/PRIVACIDADE.md) · [Contribuição](CONTRIBUTING.md) · [Segurança](SECURITY.md)

## Licença

MIT — consulte [LICENSE](LICENSE). Conteúdo demonstrativo sem vínculo institucional oficial.
