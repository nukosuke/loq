/**
 * auto directory loader
 * ex) return user-controller.js as UserController
 */
'use strict';

module.exports = function(dirname, uppercase) {
  if(uppercase === undefined) {
    uppercase = true;
  }
  
  var modules   = {};

  require('fs').readdirSync(dirname + '/').forEach(file => {
    if (file.match(/\.js$/) !== null && file !== 'index.js') {
      var name = file
      .replace('.js', '')
      .split('-')
      .map(term => uppercase ? term[0].toUpperCase() + term.slice(1) : term)
      .join('');

      modules[name] = require(dirname + '/' + file);
    }
  });

  return modules;
};
