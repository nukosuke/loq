/**
 * auto directory loader
 * ex) return user-controller.js as UserController
 */
'use strict';

module.exports = function(dirname) {
  var modules = {};

  require('fs').readdirSync(dirname + '/').forEach(file => {
    if (file.match(/\.js$/) !== null && file !== 'index.js') {
      var name = file
      .replace('.js', '')
      .split('-')
      .map(term => term[0].toUpperCase() + term.slice(1))
      .join('');

      modules[name] = require(dirname + '/' + file);
    }
  });

  return modules;
};
