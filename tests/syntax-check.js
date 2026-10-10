const fs = require('node:fs');
const vm = require('node:vm');
for (const name of fs.readdirSync('src').filter(n => n.endsWith('.gs'))) {
  new vm.Script(fs.readFileSync('src/' + name, 'utf8'), { filename: name });
  console.log('OK ' + name);
}
