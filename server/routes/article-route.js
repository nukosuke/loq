'use strict';

module.exports = function(controllers, middlewares) {
  var router = require('express').Router({ strict: true });

  router.get('/', controllers.article.index);

  return router;
};
