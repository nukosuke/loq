'use strict';

module.exports = function(controllers, middlewares) {
  var router = require('express').Router({ strict: true });

  router.get('/', controllers.article.index);

  router.get('/api/articles/', controllers.api.article.index);
  router.get('/api/articles/:id', controllers.api.article.show);
  router.post('/api/articles/', controllers.api.article.create);

  return router;
};
