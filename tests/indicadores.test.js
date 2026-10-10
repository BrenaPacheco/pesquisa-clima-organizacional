const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const test = require('node:test');
const code = fs.readFileSync('src/Indicadores.gs', 'utf8');
const ctx = vm.createContext({});
vm.runInContext(code, ctx);
test('Likert lê valores de 1 a 5', () => {
  assert.equal(ctx.parseRespostaLikert_('1 — Discordo totalmente'), 1);
  assert.equal(ctx.parseRespostaLikert_('5 — Concordo totalmente'), 5);
  assert.equal(ctx.parseRespostaLikert_('Sem resposta'), null);
  assert.equal(ctx.parseRespostaLikert_('0'), null);
});
test('Calcula média simples', () => assert.equal(ctx.media_([1, 3, 5]), 3));
