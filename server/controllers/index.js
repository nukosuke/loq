/**
 * controller class loader
 */

require('fs').readdirSync(__dirname + '/').forEach(file => {
  if (file.match(/\.js$/) !== null && file !== 'index.js') {
    var name = file
    .replace('.js', '')
    .split('-')
    .map(term => term[0].toUpperCase() + term.slice(1))
    .join('');

    module.exports[name] = require('./' + file);
  }
});
